const form = document.getElementById("analysisForm");
const fileInput = document.getElementById("chartFile");
const preview = document.getElementById("preview");
const emptyState = document.getElementById("emptyState");
const message = document.getElementById("message");
const button = document.getElementById("analyzeBtn");

fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    showMessage("Image is too large. Choose an image under 8 MB.");
    fileInput.value = "";
    preview.hidden = true;
    return;
  }
  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  showMessage(`Selected: ${file.name}`);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!fileInput.files[0]) return showMessage("Choose a chart screenshot first.");
  const data = new FormData(form);
  button.disabled = true;
  button.textContent = "Checking upload…";
  try {
    const response = await fetch("/api/analyze", { method: "POST", body: data });
    const result = await response.json();
    showMessage([result.error, result.detail].filter(Boolean).join(" "));
    emptyState.hidden = true;
  } catch {
    showMessage("Could not reach the server. Check your connection and try again.");
  } finally {
    button.disabled = false;
    button.innerHTML = 'Prepare analysis <span>→</span>';
  }
});

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}
