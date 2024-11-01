import numpy as np
import librosa
import matplotlib.pyplot as plt

def plot_audio_waveform(audio_file, labels=[], title='Audio Waveform'):
    """
    Plots the waveform of an audio file and optionally adds labels at specified time stamps.

    Parameters:
    - audio_file (str): Path to the audio file.
    - labels (list of tuples): Optional list of (time_stamp, label) tuples.
    - mono (bool): If True, converts audio to mono. If False, preserves original channels.
    """
    y, sr = librosa.load(audio_file, sr=None, mono=True)

    t = np.linspace(0, len(y) / sr, len(y))
    plt.figure(figsize=(14, 5))
    plt.plot(t, y)

    for time_stamp, label in labels:
        plt.axvline(x=time_stamp, color='r', linestyle='-')
        plt.text(time_stamp - 10, plt.ylim()[0], label, rotation=90)

    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.title(title)
    plt.show()