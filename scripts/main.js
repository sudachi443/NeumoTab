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

async function reset_engine(){
  const data = await fetch ("/json/engine.json").then(i => i.json());
  await save_storage('engines',data);
  console.log("engine is default");
};
async function reset_shortcut(){
  const data = await fetch ("/json/shortcut.json").then(i => i.json());
  await save_storage('shortcuts',data);
  console.log("shortcut_default");
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
