/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the audio utilities for downloading and exporting audio files.
 */

import { NamedAudioSegment } from '@/app/mix/studio/[id]/page';
import { encode } from 'wav-encoder';

export class AudioUtils {
  static async exportMix(
    audioContextRef: React.RefObject<AudioContext>,
    duration: number,
    orderMap: Record<
      string,
      [number[], React.Dispatch<React.SetStateAction<number[]>>]
    >,
    segmentsMap: Record<
      string,
      [
        NamedAudioSegment[],
        React.Dispatch<React.SetStateAction<NamedAudioSegment[]>>
      ]
    >,
    mix: { title: string; artist: string }
  ) {
    if (!audioContextRef.current) return;

    const sampleRate = audioContextRef.current.sampleRate;

    const offlineCtx = new OfflineAudioContext(
      2,
      Math.ceil(duration * sampleRate),
      sampleRate
    );

    const connectStems = (stem: 'vocals' | 'bass' | 'drums' | 'other') => {
      const [order] = orderMap[stem];
      const [segments] = segmentsMap[stem];

      let startTime = 0;
      for (let i = 0; i < order.length; i++) {
        const currentSegment = segments[order[i]];

        // set up the buffer source
        const source = offlineCtx.createBufferSource();
        source.buffer = currentSegment.buffer;

        // set up the gain node
        const gainNode = offlineCtx.createGain();
        gainNode.gain.value = currentSegment.volume;

        // connect the source to the gain node to the destination
        source.connect(gainNode).connect(offlineCtx.destination);
        source.start(startTime);

        startTime += currentSegment.buffer.duration;
      }
    };

    connectStems('vocals');
    connectStems('bass');
    connectStems('drums');
    connectStems('other');

    const renderedBuffer = await offlineCtx.startRendering();

    const blob = await this.bufferToBlob(renderedBuffer);
    const filename = `${mix.artist} - ${mix.title}.wav`;
    this.downloadBlob(blob, filename);
  }

  // AudioBuffer to Blob for STEREO audio (2 channels)
  static async bufferToBlob(buffer: AudioBuffer) {
    const wavData = await encode({
      sampleRate: buffer.sampleRate,
      channelData: [buffer.getChannelData(0), buffer.getChannelData(1)]
    });

    return new Blob([wavData], { type: 'audio/wav' });
  }

  // Downloads a blob as a file
  static async downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
