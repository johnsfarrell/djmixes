Run the algorithm API locally with Docker:

```bash
# Build the image
docker build -t algo .

# Run the image
docker run -d -p 5001:5000 algo
```

The app will be available at `http://localhost:5001`

- `POST /stem`

  - input: body form-data with key `file` and value as a file
  - output: `.zip` file containing stemmed audio files

- `POST /split`
  - input: body form-data with key `file` and value as a file
  - output: JSON containing `key: song name` and `value: starting timestamp in seconds`
