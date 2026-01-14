# VisionHash

VisionHash compares images using perceptual hashing (dHash) to detect near-duplicates.

## Quick start

```bash
pip install -r requirements.txt
python -m app.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/compare` `{ "image_a": "data:image/...", "image_b": "data:image/..." }`

