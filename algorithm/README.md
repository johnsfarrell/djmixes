# Algorithm API

The algorithm API includes endpoints for splitting and stemming audio files.

## Run the algorithm API locally with Docker:

```bash
# Build the image
docker build -t algo .

# Run the image
docker run -d -p 5001:5000 algo
```

## To run the application without docker:

1. Set up the environment:

```bash
# prereqs: python3, pip, virtualenv
# make sure to be in the algorithm directory

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

2. Run the application:

```bash
export FLASK_APP=api.py

flask run
```

## API Endpoints:

The app will be available at `http://localhost:5001`

- `POST /stem`

  - input: body form-data with key `file` and value as a file
  - output: `.zip` file containing stemmed audio files

- `POST /split`
  - input: body form-data with key `file` and value as a file
  - output: JSON containing `key: song name` and `value: starting timestamp in seconds`

## Testing

To test the algorithm API, use the following command to run all `_test.py` files in the `algorithm/tests` directory:

```bash
cd algorithm
python -m unittest discover -s tests -p "*_test.py"
```
