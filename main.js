const searchInput = document.getElementById("search-form");
const engines = document.getElementById("engine");
const shortcuts = document.getElementById("dashboard");

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  console.log(keyword);
});

async function load_storage(key){
  const result = await chrome.storage.local.get(key);
  return result[key];
};
async function save_storage(key, data){
  await chrome.storage.local.set({
    [key]: data
  });
  const json = JSON.stringify(data);
  return json
};
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
async function reset_engine(){
  const data = await fetch ("engine.json").then(i => i.json());
  await save_storage('engines',data);
  console.log("engine is default");
};

async function reset_shortcut(){
  const data = await fetch ("shortcut.json").then(i => i.json());
  await save_storage('shortcuts',data);
  console.log("shortcut_default");
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
async function add_engine(names,link){
  const data = await load_storage('engines');
  const adddata = 
    {"name":names , "link":link}
  data.push(adddata);
  const newdata = await save_storage('engines',data);
  console.log("newdata of engine is here");
  console.log(newdata);
};
async function add_shortcut(title,uri){
  const data = await load_storage('shortcuts');
  const adddata = 
    {"title":title , "uri":uri}
  data.push(adddata);
  const newdata = await save_storage('shortcuts',data);
  console.log("newdata of shortcut is here");
  console.log(newdata);
};
async function remove_engine(name){
  const data = await load_storage('engines');
  const matchData = [];
  const len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const engine = data[i];
    if (engine.name != name){
      const add_data = {"name":engine.name,"link":engine.link};
      matchData.push(add_data);
    };
  };
  const newdata = await save_storage('engines',matchData);
  console.log("newdata of engine is here");
  console.log(newdata);
};
async function remove_shortcut(title){
  const data = await load_storage('shortcuts');
  const matchData = [];
  const len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const shortcut = data[i];
    if (shortcut.title != title){
      const add_data = {"title":shortcut.title,"uri":shortcut.uri};
      matchData.push(add_data);
    };
  };
  const newdata = await save_storage("shortcuts",matchData);
  console.log("newdata of shortcut is here");
  console.log(newdata);
};
async function list_engine(){
  const jsons = await load_storage('engines');
  console.log(jsons);
};
async function list_shortcut(){
  const jsons = await load_storage('shortcuts');
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
