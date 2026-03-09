/**
 * Gallery Block JS
 * Decorates a table with 1 column and multiple rows as a gallery of images.
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  block.classList.add("gallery");

  // Find all direct children that contain a <picture>.
  // (AEM EDS may have already converted table to divs)
  [...block.children].forEach((child) => {
    // If already a .gallery-row, skip
    if (child.classList.contains("gallery-row")) return;
    const picture = child.querySelector("picture");
    if (picture) {
      const galleryRow = document.createElement("div");
      galleryRow.className = "gallery-row";
      // Move the picture (and any siblings) into the row
      while (child.firstChild) {
        galleryRow.appendChild(child.firstChild);
      }
      child.replaceWith(galleryRow);
    }
  });
}
