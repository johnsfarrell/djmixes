# REST API

The REST API is an interface for interacting with the algorithm and database services. `client` communicates with the REST API to send and receive data.

## Run the REST API (with Docker):

```bash
TBD
```

## Run the REST API (without Docker):

Make sure to have `.env` file variables (as shown in the `.env.example` file) in the root directory.

```bash
npm i
npm run dev
```

## API Endpoints:

The app will be available at `http://localhost:4000`

- `POST /stem`

  - input: body form-data with key `file` and value as a file
  - output: `.zip` file containing stemmed audio files

- `POST /split`
  - input: body form-data with key `file` and value as a file
  - output: JSON containing `key: song name` and `value: starting timestamp in seconds`

## Testing

The command below will run all REST API tests, (included in the `tests` directory):

```bash
TBD
```
