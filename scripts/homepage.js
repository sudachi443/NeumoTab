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

document.addEventListener("keydown",async (event) => {
  if (event.key === "/" && document.activeElement === searchInput) {
    return;
  }
  if (event.key === "Enter" && document.activeElement === searchInput) {
    event.preventDefault();
    const data = await load_storage('engines');
    const default_searchengine = data[0];
    const keyword = searchInput.value;
    let url;
    if ( keyword.includes(':')){
      url=keyword;
    }else if (keyword.includes('.')) {
      url = 'https://'+keyword;
    }else{
      url = default_searchengine.link+encodeURIComponent(keyword);
    }
    try {
      new URL(url);
      console.log(url);
      window.location.href = url;
    }catch(error){
      url = default_searchengine.link+encodeURIComponent(keyword);
      console.log(url);
      window.location.href = (url);
    }
  }
  if (event.key === "Escape" || event.key === "/") {
    event.preventDefault();
    searchInput.focus();
  }
});


