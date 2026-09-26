import base64
import io

from PIL import Image


def _load_image(data_url):
    header, encoded = data_url.split(",", 1)
    raw = base64.b64decode(encoded)
    return Image.open(io.BytesIO(raw))


def dhash(image, size=8):
    image = image.convert("L").resize((size + 1, size), Image.LANCZOS)
    pixels = list(image.getdata())
    rows = [pixels[i * (size + 1) : (i + 1) * (size + 1)] for i in range(size)]
    bits = []
    for row in rows:
        for i in range(size):
            bits.append(row[i + 1] > row[i])
    value = 0
    for bit in bits:
        value = (value << 1) | int(bit)
    return value, len(bits)


def hamming_distance(hash_a, hash_b, bits):
    return bin(hash_a ^ hash_b).count("1")


def compare_images(data_url_a, data_url_b):
    img_a = _load_image(data_url_a)
    img_b = _load_image(data_url_b)
    hash_a, bits = dhash(img_a)
    hash_b, _ = dhash(img_b)
    distance = hamming_distance(hash_a, hash_b, bits)
    return {
        "distance": distance,
        "bits": bits,
        "match": distance <= 10,
    }
