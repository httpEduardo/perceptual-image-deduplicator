const imageAInput = document.getElementById("imageA") as HTMLInputElement;
const imageBInput = document.getElementById("imageB") as HTMLInputElement;
const compareButton = document.getElementById("compareButton") as HTMLButtonElement;
const result = document.getElementById("result") as HTMLParagraphElement;

function readFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

compareButton.addEventListener("click", async () => {
  if (!imageAInput.files?.length || !imageBInput.files?.length) {
    result.textContent = "Pick two images.";
    return;
  }
  const imageA = await readFile(imageAInput.files[0]);
  const imageB = await readFile(imageBInput.files[0]);

  fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_a: imageA, image_b: imageB }),
  })
    .then((res) => res.json())
    .then((data) => {
      result.textContent = `Distance: ${data.distance} / ${data.bits} | Match: ${data.match}`;
    });
});
