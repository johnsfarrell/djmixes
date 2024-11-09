import axios from 'axios';
import JSZip from 'jszip';

class AudioProcessor {
  /**
   * Extracts the stems from an audio file
   * File input should be a .wav file
   * @param fileStream - The audio file to extract the stems from
   * @returns - A record of the stems
   */
  public async getStemmedAudio(
    fileStream: File
  ): Promise<Record<string, Blob>> {
    const formData = new FormData();
    formData.append('file', fileStream);

    const response = await axios.post('/stem', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });

    const zip = await JSZip.loadAsync(response.data);
    const stems: Record<string, Blob> = {};

    const extractionPromises = Object.keys(zip.files).map(async (filename) => {
      const fileData = await zip.files[filename].async('blob');
      stems[filename] = fileData;
    });

    await Promise.all(extractionPromises);

    return stems;
  }

  /**
   * Splits an audio file into multiple segments
   * File input should be a .wav file
   * @param fileStream - The audio file to split
   * @returns A record of the split timestamps
   */
  public async getSplitTimestamps(
    fileStream: File
  ): Promise<Record<string, number>> {
    const formData = new FormData();
    formData.append('file', fileStream);

    const response = await axios.post('/split', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
}

export default AudioProcessor;
