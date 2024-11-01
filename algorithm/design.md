# DJ Mix Algorithm Design Document

The algorithm portion of DJ Mix has two major components: song stemming and song splitting.

There is an API that handles requests and responses. The API has two endpoints: `stem` and `split`.

## Song Stemming Class

The `SongStemming` class is responsible for splitting the song into stems. I.e. separate the song into its constituent parts (e.g. drums, bass, vocals, etc.).

### `__init__(self, splitter: StemSplittingInterface = DemucsStemmingAdapter()) -> None`

The constructor of the class.

Uses the `splitter` to split the song into stems. By default, the `splitter` is the `DemucsStemmingAdapter` class.

### `stem(self, filepath: str) -> Dict[str, Tensor]`

This method takes in a filepath (referring to the song) and returns a dictionary of stems. Stems take the form of Tensor objects. The keys of the dictionary refer to the names of a stem (e.g. "drums", "bass", "vocals", etc.).

### `save_stem(self, stem: Tensor, filepath: str) -> None`

Saves `stem` (a `Tesnor` object) to a file (`filepath`). The file is saved in the `.wav` format.

## Song Splitting Class

The `SongSplitting` class is responsible for splitting the DJ mix into segments. I.e. recognize and classify the original songs in a mix of songs.

### `__init__(self) -> None`

The constructor of the class. It initializes the `SongStemming` class. The song splitting class depends on `Shazam` for API (song recognition).

### `split(self, filepath: str) -> Dict[int, str]`

First, converts the audio file (at `filepath`) into a mono channel (a array of `bytes`) and specifies a `sample_rate`.

Second, splits the song into segments.

Third, each segment is recognized using the `recognize` method.

Returns a dictionary where the keys are the start time of the segment and the values are the name of the song recognized. (`{ timestamp -> song_name }`)

### `recognize(self, audio: bytes, sample_rate: int, adapter: SongRecognitionInterface) -> str`

Creates a temporary file from `audio` and `sample_rate`.

Uses the `adapter` method to recognize the song. Returns the name of the song recognized.

## Song Recognition Interface

The `SongRecognitionInterface` interface is used to recognize songs. The `Shazam` class implements this interface.

### `recognize(self, filepath: str) -> str`

Takes in a filepath and returns the name of the song recognized.

## Shazam Song Recognition Adapter (SongRecognitionInterface)

### `__init__(self) -> None`

The constructor of the class. It initializes the Shazam API.

### `recognize(filepath: String) -> str`

Takes in a filepath and returns the name of the song recognized using Shazam API.

## Stem Splitting Interface

The `StemSplittingInterface` interface is used to split stems. The `DemucsStemmingAdapter` class implements this interface.

### `stem(self, filepath: str) -> Dict[str, Tensor]`

Takes in a filepath and returns the stems of the song.

## Demucs Stemming Adapter (StemSplittingInterface)

### `__init__(self) -> None`

The constructor of the class. It initializes the Demucs API.

### `stem(filepath: String) -> Dict[str, Tensor]`

Takes in a filepath and returns the stems of the song using Demucs API.

## API

The API is responsible for handling requests and responses. The API has two endpoints: `stem` and `split`.

### `HTTP POST stem`

**Request:**

Input is a file.

**Response:**

Output is a `zip` file containing the stems of the song.

The stems are saved in the `.wav` format.

### `HTTP POST split`

**Request:**

```json
{
  "filepath": "path/to/dj_mix"
}
```

**Response:**

```json
{
  "segments": {
    "timestamp": "song_name"
  }
}
```

Where `timestamp` is seconds from the start of the song.

## Helper Functions

### `zip(self, filepath: str, filepaths: List[str]) -> None`

Zips the stems of the song and saves them in a `.zip` file at `filepath`.
