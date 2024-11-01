import asyncio
import librosa
import soundfile as sf
from shazamio import Shazam
from tempfile import NamedTemporaryFile
from viz import plot_audio_waveform

class SongRecognitionInterface:
    async def recognize(self, filepath: str) -> str:
        raise NotImplementedError
    
class ShazamAdapter(SongRecognitionInterface):
    def __init__(self):
        self.shazam = Shazam()
    
    async def recognize(self, filepath: str) -> str:
        result = await self.shazam.recognize(filepath)
        title = f"{result['track']['title']} - {result['track']['subtitle']}"
        return title

class SongSplitter:
    def __init__(self, adapter: SongRecognitionInterface = ShazamAdapter(), chunk_duration: int =60):
        self.chunk_duration = chunk_duration
        self.adapter = adapter

    async def split(self, filepath: str) -> dict:
        """Split the audio into chunks and return the recognized songs"""
        try:
            # audio is a 1D numpy array containing the audio samples
            # sr is an integer representing the sample rate of the audio
            audio, sr = librosa.load(filepath, sr=None, mono=True)
            chunk_samples = int(self.chunk_duration * sr)
        except Exception as e:
            raise ValueError(f"Error loading audio file {filepath}: {str(e)}")

        tasks = []
        song_recognition = []

        for i in range(0, len(audio), chunk_samples):
            tasks.append(self.process_chunk(audio, sr, i, chunk_samples))

        results = await asyncio.gather(*tasks)

        for timestamp, title in results:
            if not song_recognition or title != song_recognition[-1][1]:
                song_recognition.append((timestamp, title))

        return {title: timestamp for timestamp, title in song_recognition}

    async def recognize(self, audio: bytes, sr: int):
        """Recognize the song from the audio chunk using Shazam API"""
        try:
            with NamedTemporaryFile(suffix='.wav') as temp_file:
                sf.write(temp_file.name, audio, sr)
                title = await self.adapter.recognize(temp_file.name)
        except Exception:
            title = "Unknown"

        return title

    async def process_chunk(self, audio, sr, i, chunk_samples):
        """Process each chunk of audio and return the recognized song with timestamp"""
        chunk = audio[i:i + chunk_samples]
        timestamp = i // sr

        title = await self.recognize(chunk, sr)
        return timestamp, title

    def graph_splits(self, file_path, song_recognition):
        """Graph the audio waveform with song splits marked"""
        plot_audio_waveform(file_path, labels=song_recognition, title='Song Splits')


# Usage
# song = 'wonka.mp3'
# splitter = SongSplitter()
# splitter.graph_splits(song, asyncio.run(splitter.split(song)))