##
#  Copyright (c) 2024 DJMixes. All rights reserved.
#  Licensed under the MIT License.
#  Description: Test cases for the splitting module.
##

import unittest
from unittest.mock import patch
import numpy as np
from splitting import SongRecognitionInterface, SongSplitter

class MockShazamAdapter(SongRecognitionInterface):
    async def recognize(self, filepath: str) -> str:
        return "Test Song - Artist"

class TestSongSplitter(unittest.TestCase):

    def setUp(self):
        self.splitter = SongSplitter(adapter=MockShazamAdapter(), chunk_duration=60)

    @patch("librosa.load")
    async def test_split_method(self, mock_load):
        sample_rate = 22050
        audio_data = np.random.rand(sample_rate * 180)
        mock_load.return_value = (audio_data, sample_rate)
        
        result = await self.splitter.split("test_audio.mp3")

        self.assertTrue(isinstance(result, dict))
        self.assertIn("Test Song - Artist", result)
        mock_load.assert_called_once_with("test_audio.mp3", sr=None, mono=True)

    @patch("soundfile.write")
    @patch("tempfile.NamedTemporaryFile")
    async def test_recognize_method(self, mock_tempfile, mock_sf_write):
        mock_tempfile.return_value.__enter__.return_value.name = "temp_audio.wav"
        mock_sf_write.return_value = None

        audio_data = np.random.rand(22050 * 60)  # 60 seconds of audio
        sample_rate = 22050

        title = await self.splitter.recognize(audio_data, sample_rate)

        # Assertions
        self.assertEqual(title, "Test Song - Artist")
        mock_sf_write.assert_called_once_with("temp_audio.wav", audio_data, sample_rate)

    @patch("tempfile.NamedTemporaryFile")
    async def test_process_chunk(self, mock_tempfile):
        mock_tempfile.return_value.__enter__.return_value.name = "temp_audio.wav"
        
        audio_chunk = np.random.rand(22050 * 60)
        sample_rate = 22050

        timestamp, title = await self.splitter.process_chunk(audio_chunk, sample_rate, 0, len(audio_chunk))

        self.assertEqual(timestamp, 0)
        self.assertEqual(title, "Test Song - Artist")

if __name__ == "__main__":
    unittest.main()
