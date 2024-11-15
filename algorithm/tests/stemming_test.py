import unittest
from unittest.mock import MagicMock, patch
from torch import Tensor
from stemming import StemSplittingInterface, SongStemmer

class MockStemSplittingAdapter(StemSplittingInterface):
    def __init__(self):
        self.split = MagicMock()
        self.save_stem = MagicMock()
        self.save_stems = MagicMock()

    def split(self, audio: Tensor) -> dict:
        return {
            "vocals": Tensor([0.0]),
            "drums": Tensor([0.0]),
            "bass": Tensor([0.0]),
            "other": Tensor([0.0])
        }

    def save_stem(self, source: Tensor, filepath: str):
        pass

    def save_stems(self, separated: dict, file: str):
        pass

class SongStemmerTest(unittest.TestCase):

    @patch("zipfile.ZipFile")
    async def test_stem_method(self, mock_zipfile):
        mock_splitter = MockStemSplittingAdapter()
        stemmer = SongStemmer(splitter=mock_splitter)
        
        filepath = "test_audio.wav"
        
        result = stemmer.stem(filepath, save_filepath="test_stems.zip")

        await mock_splitter.split.assert_called_once_with(filepath)
        self.assertEqual(result, "test_stems.zip")
        
        mock_zipfile.assert_called_once_with("test_stems.zip", 'w')
        self.assertEqual(mock_splitter.save_stem.call_count, 4)

    async def test_save_stem(self):
        mock_splitter = MockStemSplittingAdapter()
        stemmer = SongStemmer(splitter=mock_splitter)

        stem = Tensor([0.0])  # Mock tensor for stem data
        filepath = "vocals.wav"

        await stemmer.save_stem(stem, filepath)

        mock_splitter.save_stem.assert_called_once_with(stem, filepath)

    async def test_save_stems(self):
        mock_splitter = MockStemSplittingAdapter()
        stemmer = SongStemmer(splitter=mock_splitter)

        separated = {
            "vocals": Tensor([0.0]), 
            "drums": Tensor([0.0]), 
            "bass": Tensor([0.0]), 
            "other": Tensor([0.0])
        }
        filepath = "output_folder"

        await stemmer.save_stems(separated, filepath)

        mock_splitter.save_stems.assert_called_once_with(separated, filepath)

if __name__ == '__main__':
    unittest.main()
