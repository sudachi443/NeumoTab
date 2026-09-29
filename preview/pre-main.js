async function load_storage(key){
  const jsons = localStorage.getItem(key);
  const data = JSON.parse(jsons);
  return data;
};
function save_storage(key,json){
  const data = JSON.stringify(json);
  localStorage.removeItem(key);
  localStorage.setItem(key,data);
  return data;
};
async function reset_engine(){
  const data = await fetch ("../json/engine.json").then(i => i.json());
  await save_storage('engines',data);
  console.log("engine is default");
  return data;
};
async function reset_shortcut(){
  const data = await fetch ("../json/shortcut.json").then(i => i.json());
  await save_storage('shortcuts',data);
  console.log("shortcut_default");
  return data;
};

function url_checker(keyword){
  let url;
  if ( keyword.includes(':')){
    url=keyword;
  }else if (keyword.includes('.')) {
    url = 'https://'+keyword;
  }
  try {
    new URL(url);
  }catch(error){
    url = "";
  }
  return url;
};

async function add_engine(names,link){
  const data = await load_storage('engines');
  const links = url_checker(link);
  if (!links){
    console.log("Invalid link");
    return "";
  }
  const adddata = 
    {"name":names , "link":link}
  data.push(adddata);
  const newdata = await save_storage('engines',data);
  console.log("newdata of engine is here");
  console.log(newdata);
  return newdata;
};
async function add_shortcut(title,uri){
  const data = await load_storage('shortcuts');
  const links = url_checker(uri);
  if (!links){
    console.log("Invalid link");
    return "";
  }
  const adddata = 
    {"title":title , "uri":uri}
  data.push(adddata);
  const newdata = await save_storage('shortcuts',data);
  console.log("newdata of shortcut is here");
  console.log(newdata);
  return newdata;
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
  return newdata;
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
  return newdata;
};

async function list_engine(){
  const jsons = await load_storage('engines');
  console.log(jsons);
  return jsons;
};
async function list_shortcut(){
  const jsons = await load_storage('shortcuts');
  console.log(jsons);
  return jsons
};
async function initialization_json(){
  const engines = await load_storage('engines');
  const shortcuts = await load_storage('shortcuts');
  if (engines === null){ 
    await reset_engine();
  };
  if (shortcuts === null){
    await reset_shortcut();
  };
};
initialization_json();
