/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: Studio page that displays advanced options for remixing.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getMix } from '@/app/api/api';
import { GetMixResponse } from '@/app/api/types';
import { StudioHeader } from './header';
import { Line } from './line';

export interface NamedAudioSegment {
  buffer: AudioBuffer;
  start: number;
  end: number;
  name: string;
  volume: number;
}

export default function StudioPage(): JSX.Element {
  const { id } = useParams();

  const [mix, setMix] = useState<GetMixResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  // list of all segments per stem
  const [vocalsSegments, setVocalsSegments] = useState<NamedAudioSegment[]>([]);
  const [bassSegments, setBassSegments] = useState<NamedAudioSegment[]>([]);
  const [drumsSegments, setDrumsSegments] = useState<NamedAudioSegment[]>([]);
  const [otherSegments, setOtherSegments] = useState<NamedAudioSegment[]>([]);

  // ordering of all segments per stem
  const [vocalsOrder, setVocalsOrder] = useState<number[]>([]);
  const [bassOrder, setBassOrder] = useState<number[]>([]);
  const [drumsOrder, setDrumsOrder] = useState<number[]>([]);
  const [otherOrder, setOtherOrder] = useState<number[]>([]);

  // audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // constants
  const pixelsPerSecond = 20;
  const maxColHeight = duration * pixelsPerSecond;
  const lineTop = (currentTime / duration) * maxColHeight;

  // audio sorces
  const currentSourcesRef = useRef<{
    vocals?: AudioBufferSourceNode[];
    bass?: AudioBufferSourceNode[];
    drums?: AudioBufferSourceNode[];
    other?: AudioBufferSourceNode[];
  }>({});

  // drag/drop ref/states
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingStem, setDraggingStem] = useState<string | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingLine, setIsDraggingLine] = useState(false);

  const orderMap: Record<
    string,
    [number[], React.Dispatch<React.SetStateAction<number[]>>]
  > = {
    vocals: [vocalsOrder, setVocalsOrder],
    bass: [bassOrder, setBassOrder],
    drums: [drumsOrder, setDrumsOrder],
    other: [otherOrder, setOtherOrder]
  };

  const segmentsMap: Record<
    string,
    [
      NamedAudioSegment[],
      React.Dispatch<React.SetStateAction<NamedAudioSegment[]>>
    ]
  > = {
    vocals: [vocalsSegments, setVocalsSegments],
    bass: [bassSegments, setBassSegments],
    drums: [drumsSegments, setDrumsSegments],
    other: [otherSegments, setOtherSegments]
  };

  // initialize mix data, or redirect if invalid
  useEffect(() => {
    if (!id) return;

    const validStudioData = (mix: GetMixResponse | null) =>
      !mix ||
      !mix.split_json ||
      !mix.splits ||
      !mix.splits.length ||
      !mix.vocalsUrl ||
      !mix.bassUrl ||
      !mix.drumsUrl ||
      !mix.otherUrl;

    const fetchMix = async () => {
      try {
        const data = await getMix({
          mixId: parseInt(id as string),
          mock: false
        });
        if (validStudioData(data)) window.location.href = `/mix/${id}`;
        else setMix(data);
      } catch (err) {
        setError('Failed to fetch mix details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMix();
  }, [id]);

  useEffect(() => {
    if (!mix) return;

    if (!audioContextRef.current) audioContextRef.current = new AudioContext();

    const ctx = audioContextRef.current;

    const loadAndSegment = async (
      audioUrl: string
    ): Promise<NamedAudioSegment[]> => {
      const audioResopnse = await fetch(audioUrl);
      const arrayBuffer = await audioResopnse.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      const splits = (mix.splits ?? []).sort(
        (a, b) => a.timestamp - b.timestamp
      );

      // split the audio url into segments
      const segments: NamedAudioSegment[] = [];
      for (let i = 0; i < splits.length; i++) {
        const segmentStart = splits[i].timestamp;
        const segmentEnd =
          i < splits.length - 1
            ? splits[i + 1].timestamp
            : audioBuffer.duration;

        const segmentBuffer = ctx.createBuffer(
          audioBuffer.numberOfChannels,
          Math.ceil((segmentEnd - segmentStart) * audioBuffer.sampleRate),
          audioBuffer.sampleRate
        );

        for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
          const channelData = audioBuffer
            .getChannelData(ch)
            .subarray(
              Math.floor(segmentStart * audioBuffer.sampleRate),
              Math.floor(segmentEnd * audioBuffer.sampleRate)
            );
          segmentBuffer.getChannelData(ch).set(channelData);
        }

        segments.push({
          buffer: segmentBuffer,
          start: segmentStart,
          end: segmentEnd,
          name: splits[i].name,
          volume: 1
        });
      }

      return segments;
    };

    const loadAll = async (mix: GetMixResponse) => {
      if (!mix.vocalsUrl || !mix.bassUrl || !mix.drumsUrl || !mix.otherUrl) {
        return;
      }

      try {
        // load audio segments for all stems
        const [vocals, bass, drums, other] = await Promise.all([
          loadAndSegment(mix.vocalsUrl),
          loadAndSegment(mix.bassUrl),
          loadAndSegment(mix.drumsUrl),
          loadAndSegment(mix.otherUrl)
        ]);

        // set stem segments
        setVocalsSegments(vocals);
        setBassSegments(bass);
        setDrumsSegments(drums);
        setOtherSegments(other);

        // set stem order to default
        setVocalsOrder(vocals.map((_, i) => i));
        setBassOrder(bass.map((_, i) => i));
        setDrumsOrder(drums.map((_, i) => i));
        setOtherOrder(other.map((_, i) => i));

        // duration of all stems are the same
        setDuration(vocals[vocals.length - 1].end);
      } catch (err) {
        console.error('Error loading or segmenting audio', err);
      }
    };

    loadAll(mix);
  }, [mix]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const ctx = audioContextRef.current;

    const invalidSegments = () =>
      !ctx ||
      !vocalsSegments.length ||
      !bassSegments.length ||
      !drumsSegments.length ||
      !otherSegments.length;

    if (invalidSegments()) return;

    stopAllPlayback();

    if (isPlaying) schedulePlayback(currentTime);
  }, [
    isPlaying,
    vocalsOrder,
    bassOrder,
    drumsOrder,
    otherOrder,
    vocalsSegments,
    bassSegments,
    drumsSegments,
    otherSegments
  ]);

  const resetMix = () => {
    stopAllPlayback();
    setCurrentTime(0);
    setIsPlaying(false);

    // reset order of segments
    setVocalsOrder(vocalsOrder.map((_, i) => i));
    setBassOrder(bassOrder.map((_, i) => i));
    setDrumsOrder(drumsOrder.map((_, i) => i));
    setOtherOrder(otherOrder.map((_, i) => i));
  };

  const stopAllPlayback = () => {
    const currentSources = currentSourcesRef.current;
    currentSources.bass?.forEach((source) => source.stop());
    currentSources.vocals?.forEach((source) => source.stop());
    currentSources.drums?.forEach((source) => source.stop());
    currentSources.other?.forEach((source) => source.stop());
    currentSourcesRef.current = {};
  };

  const schedulePlayback = (startAt: number = 0) => {
    const ctx = audioContextRef.current!;
    const currentSources = {
      vocals: [] as AudioBufferSourceNode[],
      bass: [] as AudioBufferSourceNode[],
      drums: [] as AudioBufferSourceNode[],
      other: [] as AudioBufferSourceNode[]
    };

    const scheduleStems = (
      segments: NamedAudioSegment[],
      order: number[],
      outputArray: AudioBufferSourceNode[]
    ) => {
      let playbackStart = ctx.currentTime,
        accumulated = 0,
        startSegmentIndex = 0,
        startOffsetWithinSegment = 0;

      for (let i = 0; i < order.length; i++) {
        const segLength = segments[order[i]].buffer.duration;
        if (accumulated + segLength > startAt) {
          startSegmentIndex = i;
          startOffsetWithinSegment = startAt - accumulated;
          break;
        }
        accumulated += segLength;
      }

      for (let j = startSegmentIndex; j < order.length; j++) {
        const seg = segments[order[j]];
        const segBuffer = seg.buffer;
        const source = ctx.createBufferSource();
        source.buffer = segBuffer;

        const gainNode = ctx.createGain();
        gainNode.gain.value = seg.volume;
        source.connect(gainNode).connect(ctx.destination);

        let segmentPlaybackDuration =
          segBuffer.duration -
          (j === startSegmentIndex ? startOffsetWithinSegment : 0);
        source.start(
          playbackStart,
          j === startSegmentIndex ? startOffsetWithinSegment : 0
        );

        playbackStart += segmentPlaybackDuration;
        outputArray.push(source);
      }
    };

    scheduleStems(vocalsSegments, vocalsOrder, currentSources.vocals);
    scheduleStems(bassSegments, bassOrder, currentSources.bass);
    scheduleStems(drumsSegments, drumsOrder, currentSources.drums);
    scheduleStems(otherSegments, otherOrder, currentSources.other);

    currentSourcesRef.current = currentSources;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (isPlaying) {
      stopAllPlayback();
      schedulePlayback(seekTime);
    }
  };

  useEffect(() => {
    let requestAnimationFrameId: number;
    const trackTime = () => {
      if (!isPlaying || isDraggingLine) return;

      const framerate = 60;
      setCurrentTime((prev) => Math.min(prev + 1 / framerate, duration));

      requestAnimationFrameId = requestAnimationFrame(trackTime);
    };

    trackTime();

    return () => cancelAnimationFrame(requestAnimationFrameId);
  }, [isPlaying, duration, isDraggingLine]);

  const handleSegmentVolumeChange = (
    stemName: 'vocals' | 'bass' | 'drums' | 'other',
    segmentIndex: number,
    newVolume: number
  ) => {
    const [segments, setSegments] = segmentsMap[stemName];

    const updatedSegments = [...segments];

    // update volume of segment
    updatedSegments[segmentIndex].volume = newVolume;

    setSegments(updatedSegments);
  };

  const onDragStart = (stem: string, index: number) => (e: React.DragEvent) => {
    setDraggingStem(stem);
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (index: number) => (e: React.DragEvent) => {
    if (!draggingStem) return;

    e.preventDefault();
    setDragOverIndex(index);
  };

  const onDrop = (stem: string, index: number) => (e: React.DragEvent) => {
    e.preventDefault();

    if (draggingIndex == null) return;

    if (draggingStem === stem) {
      const [order, setOrder] = orderMap[stem];
      const newOrder = [...order];

      const [removed] = newOrder.splice(draggingIndex, 1);
      newOrder.splice(index, 0, removed);

      setOrder(newOrder);
    }

    resetDragState();
  };

  const onDragEnd = () => {
    resetDragState();
  };

  const resetDragState = () => {
    setDraggingStem(null);
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const getCurrentlyPlayingSegments = () => {
    function findCurStem(stem: 'vocals' | 'bass' | 'drums' | 'other'): number {
      const isInRange = (start: number, end: number) => {
        return currentTime >= start && currentTime < end;
      };

      let curLength = 0;
      let [segments] = segmentsMap[stem];
      let [order] = orderMap[stem];

      // find the segment that is currently playing based on intervals
      for (let i = 0; i < order.length; i++) {
        const newLength = segments[order[i]].buffer.duration;
        if (isInRange(curLength, curLength + newLength)) return i;
        curLength += newLength;
      }

      return 0;
    }

    return {
      vocals: findCurStem('vocals'),
      bass: findCurStem('bass'),
      drums: findCurStem('drums'),
      other: findCurStem('other')
    };
  };

  // currently playing segments
  const currentlyPlaying = getCurrentlyPlayingSegments();

  const handleSegmentClick = (
    stemName: 'vocals' | 'bass' | 'drums' | 'other',
    clickedIndex: number
  ) => {
    const [segments] = segmentsMap[stemName];
    const [order] = orderMap[stemName];

    let accumulated = 0;
    for (let i = 0; i < clickedIndex; i++) {
      accumulated += segments[order[i]].buffer.duration;
    }

    setCurrentTime(accumulated);

    if (isPlaying) {
      stopAllPlayback();
      schedulePlayback(accumulated);
    }
  };

  const renderSegments = (stemName: 'vocals' | 'bass' | 'drums' | 'other') => {
    const currentIndex = currentlyPlaying[stemName];

    const formattedName = (name: string) => name.padEnd(30, ' ');

    const [order] = orderMap[stemName];
    const [segments] = segmentsMap[stemName];

    return (
      <div className="flex flex-col border border-gray-600">
        {order.map((segmentIndex, i) => {
          const segment = segments[segmentIndex];
          const sliderValue = 1 - segment.volume;
          const isCurrent = i === currentIndex;
          const segDuration = segment.buffer.duration;
          const segmentHeight = (segDuration * pixelsPerSecond) / 10;

          let bgColor = isCurrent ? 'bg-yellow-500' : 'bg-gray-600';
          let textColor = isCurrent ? 'text-black' : 'text-white';
          bgColor = i === dragOverIndex ? 'bg-blue-700' : bgColor;
          textColor = i === dragOverIndex ? 'text-white' : textColor;

          return (
            <div
              key={i}
              draggable
              onDragStart={onDragStart(stemName, i)}
              onDragOver={onDragOver(i)}
              onDrop={onDrop(stemName, i)}
              onDragEnd={onDragEnd}
              onClick={() => handleSegmentClick(stemName, i)}
              className={`relative px-2 py-1 border-t-white border-t-2 cursor-pointer flex flex-row justify-between items-center transition-colors w-full ${bgColor} ${textColor} studio-volume`}
              style={{
                height: `${segmentHeight}px`
              }}
            >
              <span className="text-sm mr-2">
                {formattedName(segment.name)}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sliderValue}
                draggable={false}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleSegmentVolumeChange(
                    stemName,
                    segmentIndex,
                    1 - parseFloat(e.target.value)
                  )
                }
                className="w-20 transform rotate-90 bg-transparent appearance-none mr-10 hover:cursor-grab active:cursor-grabbing studio-volume"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const handleMouseDownOnLine = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingLine(true);
  };

  const handleMouseMoveLine = (e: MouseEvent) => {
    if (!isDraggingLine) return;
    if (!containerRef.current) return;

    // set the current time based on the mouse position
    // this is just for dragging the line
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const clampedY = Math.min(Math.max(y, 0), maxColHeight);
    const newTime = (clampedY / maxColHeight) * duration * 10 - 4;

    setCurrentTime(newTime);
  };

  const handleMouseUpLine = (e: MouseEvent) => {
    if (!isDraggingLine) return;

    setIsDraggingLine(false);
    if (isPlaying) {
      stopAllPlayback();
      schedulePlayback(currentTime);
    }
  };

  useEffect(() => {
    if (isDraggingLine) {
      window.addEventListener('mousemove', handleMouseMoveLine);
      window.addEventListener('mouseup', handleMouseUpLine);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveLine);
      window.removeEventListener('mouseup', handleMouseUpLine);
    };
  }, [isDraggingLine, currentTime, isPlaying]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-white text-lg mb-8">Loading Studio #{id}</p>
        <p className="w-fit spinning">🎛️</p>
      </div>
    );
  }

  if (error || !mix) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">{error || 'Mix not found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <StudioHeader
          mix={mix}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          currentTime={currentTime}
          duration={duration}
          resetMix={resetMix}
          handleSeek={handleSeek}
          orderMap={orderMap}
          segmentsMap={segmentsMap}
          audioContextRef={audioContextRef}
        />

        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${maxColHeight / 9.5}px` }}
        >
          <Line
            lineTop={lineTop}
            handleMouseDownOnLine={handleMouseDownOnLine}
          />

          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="bg-gray-800 p-2">{renderSegments('vocals')}</div>
            <div className="bg-gray-800 p-2">{renderSegments('bass')}</div>
            <div className="bg-gray-800 p-2">{renderSegments('drums')}</div>
            <div className="bg-gray-800 p-2">{renderSegments('other')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
