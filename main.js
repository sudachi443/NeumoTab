const searchInput = document.getElementById("search-form");
const engines = document.getElementById("engine");
const shortcuts = document.getElementById("dashboard");

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  console.log(keyword);
});

function load_localstorage(key){
  const jsons = localStorage.getItem(key);
  const data = JSON.parse(jsons);
  return data;
};

function save_localstorage(key,json){
  const data = JSON.stringify(json);
  localStorage.removeItem(key);
  localStorage.setItem(key,data);
  return data;
};

function loadengine() {
  const data = load_localstorage('engines');
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
function loadshortcut() {
  const MAX_LENGTH = 10;
  const data = load_localstorage('shortcuts');
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
async function reset_engine(){
  const data = await fetch ("engine.json").then(i => i.json());
  save_localstorage('engines',data);
  console.log("engine is default");
};

async function reset_shortcut(){
  const data = await fetch ("shortcut.json").then(i => i.json());
  save_localstorage('shortcuts',data);
  console.log("shortcut_default");
};

async function createpage(){
  if (localStorage.getItem('engines') == null){ 
    await reset_engine();
  };
  if (localStorage.getItem('shortcuts') == null){
    await reset_shortcut();
  };
  loadengine();
  loadshortcut();
};
function add_engine(names,link){
  const data = load_localstorage('engines');
  const adddata = 
    {"name":names , "link":link}
  data.push(adddata);
  const newdata = save_localstorage('engines',data);
  console.log("newdata of engine is here");
  console.log(newdata);
};
function add_shortcut(title,uri){
  const data = load_localstorage('shortcuts');
  const adddata = 
    {"title":title , "uri":uri}
  data.push(adddata);
  const newdata = save_localstorage('shortcuts',data);
  console.log("newdata of shortcut is here");
  console.log(newdata);
};
function remove_engine(name){
  const data = load_localstorage('engines');
  const matchData = [];
  const len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const engine = data[i];
    if (engine.name != name){
      const add_data = {"name":engine.name,"link":engine.link};
      matchData.push(add_data);
    };
  };
  const newdata = save_localstorage('engines',matchData);
  console.log("newdata of engine is here");
  console.log(newdata);
};
function remove_shortcut(title){
  const data = load_localstorage('shortcuts');
  const matchData = [];
  const len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const shortcut = data[i];
    if (shortcut.title != title){
      const add_data = {"title":shortcut.title,"uri":shortcut.uri};
      matchData.push(add_data);
    };
  };
  const newdata = save_localstorage("shortcuts",matchData);
  console.log("newdata of shortcut is here");
  console.log(newdata);
};
function list_engine(){
  const jsons = localStorage.getItem('engines');
  console.log(jsons);
};
function list_shortcut(){
  const jsons = localStorage.getItem('shortcuts');
  console.log(jsons);
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
