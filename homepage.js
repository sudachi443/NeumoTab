const searchInput = document.getElementById("search-form");
const engines = document.getElementById("engine");
const shortcuts = document.getElementById("dashboard");
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  console.log(keyword);
});
async function loadengine() {
  const data = await load_storage('engines');
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
    engines.appendChild(button);
  };
};
async function loadshortcut() {
  const MAX_LENGTH = 10;
  const data = await load_storage('shortcuts');
  const len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const button = document.createElement("button");
    const shortcut = data[i];
    if (i == 0){
      button.id = "fs";
    } else{
      button.className = "shortcut";
    }
    button.type = "button";
    const string = shortcut.title;
    const title = string.length > MAX_LENGTH ? string.slice(0, MAX_LENGTH) + "..." : string;
    button.innerHTML = `
        <img src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(shortcut.uri)}" alt="${title}">
        <span>${title}</span>
    `;
    button.addEventListener("click", () => {
      const url = shortcut.uri;
      window.location.href = url;
    });
    shortcuts.appendChild(button);
  };
};

async function createpage(){
  const engines = await load_storage('engines');
  const shortcuts = await load_storage('shortcuts');
  if (engines === undefined){ 
    await reset_engine();
  };
  if (shortcuts === undefined){
    await reset_shortcut();
  };
  await loadengine();
  await loadshortcut();
};

createpage();

document.addEventListener("focusin", (e) => {
  e.target.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement === searchInput) {
    return;
  }
  if (event.key === "Escape" || event.key === "/") {
    event.preventDefault();
    searchInput.focus();
  }
});

