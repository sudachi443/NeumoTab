const searchInput = document.getElementById("search-form");
const engines = document.getElementById("engine");
const shortcuts = document.getElementById("dashboard");
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
    engines.appendChild(button);
  };
};
async function getshortcut() {
  const MAX_LENGTH = 10;
  const data = await fetch("shortcut.json").then(i => i.json());
  var len = Object.keys(data).length;
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
    console.log(button);
    shortcuts.appendChild(button);
  };
};
getengine();
getshortcut();

