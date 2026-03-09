export default function decorate(block) {
  const text = block.textContent.trim();
  block.textContent = "";
  const p = document.createElement("p");
  p.textContent = text;
  p.addClassList.add("textcomp");
  block.appendChild(p);
}
