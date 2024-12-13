# REST API

The REST API is an interface for interacting with the algorithm and database services. `client` communicates with the REST API to send and receive data.

## Running the REST API

> ⚠️ **Important:** users must have an `.env` file in the `server/` directory matching [`.env.example`](.env.example). The AWS parameters are used to setup a [Digital Ocean AWS S3 Bucket](https://www.digitalocean.com/products/spaces), required for running this API.

### Run the REST API (with Docker):

```bash
# Build the image
docker build -t server .

# Run the image
docker run -d -p 4000:4000 server
```

### Run the REST API (without Docker):

Make sure to have `.env` file variables (as shown in the `.env.example` file) in the root directory.

```bash
npm i
npm run dev
```

## API Endpoints:

Please refer to [API design docs](../design-docs/api-design.md) for full API endpoint documentation.

## Testing

The command below will run all REST API tests, (included in the `tests` directory):
After you have npm installed, you might also need to have packages installed by typing:

```bash
cd server # if you are not in the server folder
npm ci # install the dependencies

```

To run backend test, please have the db clear and start the server before running

```bash
cd .. # exit to root
docker-compose up --build # start the server, wait until finishes
npm run test
```

To test the database, run from the `server` directory:

```bash
cd dist/database/db_test
node db_test.js
```
