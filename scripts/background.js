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
  return data;
};
async function reset_shortcut(){
  const data = await fetch ("/json/shortcut.json").then(i => i.json());
  await save_storage('shortcuts',data);
  console.log("shortcut_default");
  return data;
};

async function initialization_json(){
  const engines = await load_storage('engines');
  const shortcuts = await load_storage('shortcuts');
  if (engines === undefined){ 
    await reset_engine();
  };
  if (shortcuts === undefined){
    await reset_shortcut();
  };
};
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await initialization_json();
  }
});

