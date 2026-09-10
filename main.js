const searchInput = document.getElementById("search-form");
const engines = document.getElementById("engine");

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  console.log(keyword);
});
async function getengine() {
  const data = await fetch("engine.json").then(i => i.json());
  for (const engine of data) {
    const button = document.createElement("button");
    button.className = "searchengine";
    button.type = "button";
    button.innerHTML = `
        <svg class="pointer" width="10" height="10">
            <circle cx="3" cy="3" r="3" fill="blue" />
        </svg>
        ${engine.name}
    `;
    button.addEventListener("click", () => {
        const keyword = searchInput.value;
        const url = engine.link + encodeURIComponent(keyword);
        window.location.href = url;
    });
    console.log(button);
    engines.appendChild(button);
  };
};
getengine();
