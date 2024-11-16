import axios from "axios";
import JSZip from "jszip";

export type SplitTimestamps = Record<string, number>;

export type StemmedAudio = Record<string, Buffer>;

class AudioProcessor {
  /**
   * Extracts the stems from an audio file
   * File input should be a .wav file
   * @param buffer - The audio file to extract the stems from
   * @returns - A record of the stems
   */
  public async getStemmedAudio(buffer: Buffer): Promise<StemmedAudio> {
    const formData = new FormData();

    formData.append("file", new Blob([buffer]), "audio-file");

    // Send the POST request to stem
    const response = await axios.post("http://localhost:5001/stem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });

    // Load the zip content as a buffer
    const zip = await JSZip.loadAsync(response.data);
    const stems: Record<string, Buffer> = {};

    // Extract each file and convert it to a buffer
    const extractionPromises = Object.keys(zip.files).map(async (filename) => {
      const fileData = await zip.files[filename].async("nodebuffer");
      stems[filename] = fileData;
    });

    await Promise.all(extractionPromises);

    return stems;
  }

  /**
   * Splits an audio file into multiple segments
   * File input should be a .wav file
   * @param buffer - The audio file to split
   * @returns A record of the split timestamps
   */
  public async getSplitTimestamps(buffer: Buffer): Promise<SplitTimestamps> {
    const formData = new FormData();

    formData.append("file", new Blob([buffer]), "audio-file");

    // Send the POST request to split
    const response = await axios.post("http://localhost:5001/split", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

export default AudioProcessor;
