# Perceptual Image Deduplicator

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)

Perceptual Image Deduplicator compares images using perceptual hashing (dHash) to detect near-duplicates.

## Quick start

```bash
pip install -r requirements.txt
python -m perceptual_image_deduplicator.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/compare` `{ "image_a": "data:image/...", "image_b": "data:image/..." }`

