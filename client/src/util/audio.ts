export class AudioUtils {
  static audioBufferToWav(buffer: AudioBuffer) {
    let numOfChan = buffer.numberOfChannels,
      length = buffer.length * numOfChan * 2 + 44,
      bufferArray = new ArrayBuffer(length),
      view = new DataView(bufferArray),
      channels = [],
      i,
      sample,
      offset = 0,
      pos = 0;

    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt "
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);

    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (i = 0; i < numOfChan; i++) channels.push(buffer.getChannelData(i));

    while (offset < buffer.length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return bufferArray;
  }

  static async exportMix(
    audioContextRef: React.RefObject<AudioContext>,
    duration: number,
    vocalsSegments: { buffer: AudioBuffer; volume: number }[],
    vocalsOrder: number[],
    bassSegments: { buffer: AudioBuffer; volume: number }[],
    bassOrder: number[],
    drumsSegments: { buffer: AudioBuffer; volume: number }[],
    drumsOrder: number[],
    otherSegments: { buffer: AudioBuffer; volume: number }[],
    otherOrder: number[],
    mix: { title: string; artist: string }
  ) {
    if (!audioContextRef.current) return;
    const sampleRate = audioContextRef.current.sampleRate;
    const numberOfChannels = 2;

    const offlineCtx = new OfflineAudioContext(
      numberOfChannels,
      Math.ceil(duration * sampleRate),
      sampleRate
    );

    const scheduleStems = (
      ctx: OfflineAudioContext,
      segments: { buffer: AudioBuffer; volume: number }[],
      order: number[]
    ) => {
      let startTime = 0;
      for (let i = 0; i < order.length; i++) {
        const seg = segments[order[i]];
        const source = ctx.createBufferSource();
        source.buffer = seg.buffer;
        const gainNode = ctx.createGain();
        gainNode.gain.value = seg.volume;
        source.connect(gainNode).connect(ctx.destination);
        source.start(startTime);
        startTime += seg.buffer.duration;
      }
    };

    scheduleStems(offlineCtx, vocalsSegments, vocalsOrder);
    scheduleStems(offlineCtx, bassSegments, bassOrder);
    scheduleStems(offlineCtx, drumsSegments, drumsOrder);
    scheduleStems(offlineCtx, otherSegments, otherOrder);

    const renderedBuffer = await offlineCtx.startRendering();
    const wavArrayBuffer = this.audioBufferToWav(renderedBuffer);
    const blob = new Blob([wavArrayBuffer], { type: 'audio/wav' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mix?.title}-${mix?.artist}-mix.wav`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
