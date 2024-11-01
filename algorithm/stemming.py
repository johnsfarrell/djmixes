import demucs.api

import os

import zipfile

from torch import Tensor

class StemSplittingInterface:
    
        def split(self, audio: Tensor) -> dict:
            raise NotImplementedError
        
        def save_stem(self, source: Tensor, filepath: str):
             raise NotImplementedError
        
        def save_stems(self, separated: dict, file: str):
            raise NotImplementedError
        
class DemucsStemmingAdapter(StemSplittingInterface):
        
        def __init__(self):
            self.demucs = demucs.api.Separator()
            
        def split(self, audio: Tensor) -> dict:
            _, separated = self.demucs.separate_audio_file(audio)
            return separated
        
        def save_stem(self, source: Tensor, filepath: str):
            demucs.api.save_audio(source, filepath, samplerate=self.demucs.samplerate)
            
        def save_stems(self, separated: dict, file: str):
            for stem, source in separated.items():
                self.save_stem(stem, source, file)

class SongStemmer:

    def __init__(self, splitter: StemSplittingInterface = DemucsStemmingAdapter()):
        self.splitter = splitter

    async def stem(self, filepath: str, save_filepath: str = "files/stems.zip") -> str:
        stems = self.splitter.split(filepath)  # stems is a list of file paths to stem files

        
        with zipfile.ZipFile(save_filepath, 'w') as zipf:
            for stem, source in stems.items():
                self.splitter.save_stem(source, path := f"{stem}.wav")
                zipf.write(path, os.path.basename(path))
                os.remove(path)

        return save_filepath

    def save_stem(self, stem: Tensor, source: Tensor, filepath: str):
        self.splitter.save_stem(stem, source, filepath)
            
    def save_stems(self, separated: dict, file: str):
        self.splitter.save_stems(separated, file)

# Usage
# song = 'files/shortest-mix.mp3'
# stemmer = SongStemmer()
# print(stemmer.stem(song))
# stemmer.save_stems(separated, song)