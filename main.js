const searchInput = document.getElementById("search-form");

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  console.log(keyword);
});

const engines = document.getElementById("engine");
const shortcuts = document.getElementById("dashboard");

async function loadengine() {
  const jsons = localStorage.getItem('engines')
  const data = JSON.parse(jsons);
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
  const jsons = localStorage.getItem('shortcuts')
  const data = JSON.parse(jsons);
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
    shortcuts.appendChild(button);
  };
};


async function default_engine(){
  const data = await fetch ("engine.json").then(i => i.json());
  const data_converted = JSON.stringify(data);
  localStorage.removeItem('engines');
  localStorage.setItem('engines',data_converted);
  console.log("engine is default");
};

async function default_shortcut(){
  const data = await fetch ("shortcut.json").then(i => i.json());
  const data_converted = JSON.stringify(data);
  localStorage.removeItem('shortcuts');
  localStorage.setItem('shortcuts',data_converted);
  console.log("shortcut_default");
};

async function createpage(){
  if (localStorage.getItem('engines') == null){ 
    await default_engine();
  };
  if (localStorage.getItem('shortcuts') == null){
    await default_shortcut();
  };
  loadengine();
  loadshortcut();
};

async function add_engine(names,link){
  const jsons = localStorage.getItem('engines');
  const data = JSON.parse(jsons);
  var adddata = 
    {"name":names , "link":link}
  data.push(adddata);
  const newdata = JSON.stringify(data);
  console.log("newdata of engine is here");
  console.log(newdata);
  localStorage.removeItem('engines');
  localStorage.setItem('engines',newdata);
};
async function add_shortcut(title,uri){
  const jsons = localStorage.getItem('shortcuts');
  const data = JSON.parse(jsons);
  var adddata = 
    {"title":title , "uri":uri}
  data.push(adddata);
  const newdata = JSON.stringify(data);
  console.log("newdata of shortcut is here");
  console.log(newdata);
  localStorage.removeItem('shortcuts');
  localStorage.setItem('shortcuts',newdata);
};

async function remove_engine(name){
  const jsons = localStorage.getItem('engines');
  const data = JSON.parse(jsons);
  const matchData = [];
  var len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const engine = data[i];
    if (engine.name != name){
      const add_data = {"name":engine.name,"link":engine.link};
      matchData.push(add_data);
    };
  };
  const newdata = JSON.stringify(matchData);
  console.log("newdata of engine is here");
  console.log(newdata);
  localStorage.removeItem('engines');
  localStorage.setItem('engines',newdata);
};
async function remove_shortcut(title){
  const jsons = localStorage.getItem('shortcuts');
  const data = JSON.parse(jsons);
  const matchData = [];
  var len = Object.keys(data).length;
  for (let i = 0; i < len; i++){
    const shortcut = data[i];
    if (shortcut.title != title){
      const add_data = {"title":shortcut.title,"uri":shortcut.uri};
      matchData.push(add_data);
    };
  };
  const newdata = JSON.stringify(matchData);
  console.log("newdata of shortcut is here");
  console.log(newdata);
  localStorage.removeItem('shortcuts');
  localStorage.setItem('shortcuts',newdata);
};
async function list_engine(){
  const jsons = localStorage.getItem('engines');
  console.log(jsons);
};
async function list_shortcut(){
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
document.addEventListener('keydown', (event)=>{
  console.log(event.key);
  if (event.key === 'Escape'|| event.key==='/'){
    event.preventDefault();
    document.getElementById("search-form").focus();
  };
});
