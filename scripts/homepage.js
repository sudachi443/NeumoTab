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
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class","pointer");
    svg.setAttribute("width", "10");
    svg.setAttribute("height", "10");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "3");
    circle.setAttribute("cy", "3");
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", "blue");
    svg.appendChild(circle);
    button.appendChild(svg);
    button.appendChild(document.createTextNode(engine.name));
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
    const favicon_url = new URL(shortcut.uri).origin+"/favicon.ico";
    const alt = title.substr(0,1).toUpperCase();
    console.log(favicon_url);
    const img = document.createElement("img");
    img.src = favicon_url;
    img.alt = alt;
    img.style.width = "50%";
    img.style.height = "50%";
    img.style.objectFit = "contain";
    img.style.fontSize = "16px";
    const br = document.createElement("br");
    const span = document.createElement("span");
    span.textContent = title;
    button.appendChild(img);
    button.appendChild(br);
    button.appendChild(span);
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
async function main(){
  await initialization_json();
  createpage();
};
main();
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


