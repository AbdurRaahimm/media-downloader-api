# Social Video Downloader API

A simple and efficient API for downloading videos from various social media platforms.

## Features

- Download videos from TikTok, YouTube, and other social media platforms.
- API versioning (v1, v2).
- Rate limiting to prevent abuse.
- Extensible and modular architecture.

## API Endpoints

### API v1

- `GET /api/v1/status`: Get the status of the API.
- `POST /api/v1/download/tiktok`: Download a video from TikTok.
- `POST /api/v1/download/all`: Download a video from any supported platform.

#### Request Body for `/download/*` endpoints:

```json
{
  "url": "VIDEO_URL"
}
```

### API v2

- `GET /api/v2/status`: Get the status of the API, including a list of supported features.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdurRaahimm/media-downloader-api.git 
   cd media-downloader-api
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the server:
   ```bash
   pnpm start
   ```

## Usage

Send a POST request to the desired download endpoint with the video URL in the request body.

**Example using cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"url":"https://www.tiktok.com/@marufulmahim173/video/7514204968941882642?is_from_webapp=1&sender_device=pc"}' http://localhost:3000/api/v1/download/tiktok

```

## Error Handling

The API returns standard HTTP status codes for errors. The error response body includes an `error` message and the `version` of the API that handled the request.

**Example error response:**

```json
{
  "error": "Invalid YouTube URL",
  "version": "1.0.0"
}
```

## Dependencies

- [Express](https://expressjs.com/)
- [btch-downloader](https://www.npmjs.com/package/btch-downloader)
- [cors](https://www.npmjs.com/package/cors)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
