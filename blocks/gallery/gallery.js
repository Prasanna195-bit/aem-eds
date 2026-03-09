/**
 * Gallery Block JS
 * Decorates a table with 1 column and multiple rows as a gallery of images.
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  block.classList.add("gallery");

  // Expecting a table with 1 column, multiple rows, each row contains an image (URL or <img>), render as <picture>
  const rows = [...block.querySelectorAll("tr")];
  rows.forEach((row) => {
    const cell = row.querySelector("td");
    if (!cell) return;
    let picture = cell.querySelector("picture");
    if (!picture) {
      let img = cell.querySelector("img");
      let url = null;
      let alt = "";
      if (!img) {
        // If cell contains a URL, create a picture with an img
        url = cell.textContent.trim();
      } else {
        url = img.src;
        alt = img.alt || "";
      }
      if (url && url.match(/^https?:\/\//i)) {
        picture = document.createElement("picture");
        const imgEl = document.createElement("img");
        imgEl.src = url;
        imgEl.alt = alt;
        picture.appendChild(imgEl);
        cell.textContent = "";
        cell.appendChild(picture);
      }
    }
    if (picture) {
      const galleryRow = document.createElement("div");
      galleryRow.className = "gallery-row";
      galleryRow.appendChild(picture);
      row.replaceWith(galleryRow);
    }
  });

  // Remove table if present, keep only gallery rows
  const table = block.querySelector("table");
  if (table) {
    while (table.firstChild) block.appendChild(table.firstChild);
    table.remove();
  }
}
