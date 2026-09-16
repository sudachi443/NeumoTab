async function load_file(id,key){
  document.getElementById(id).addEventListener("change",async (event) => {
  const files = event.target.files;
  if (files.length === 0) {
    return;
  }
  const file = files[0];
  console.log("read file...")
  if (!file.type.startsWith("application/json")){
    console.log("this file is not json")
    document.getElementById(key).textContent = "select .json file"
    return;
  }
  try {
    const json = await file.text();
    const data = JSON.parse(json);
    console.log("succeed!");
    console.log(data);
    document.getElementById(key).textContent = "read your file!";
    await save_storage(key,data);
    console.log("your file is saved!");
  }catch (error){
    console.error("read error",error);
    document.getElementById(key).textContent = "read error";
  }
  });
};
async function export_file(id,key){
  document.getElementById(id).addEventListener('click',async () => {
  const json = await load_storage(key);
  const data = JSON.stringify(json);
  const blob = new Blob([data], { type: 'application/json' });
  let dummy_a_el = document.createElement('a');
  document.body.appendChild(dummy_a_el);
  dummy_a_el.href = window.URL.createObjectURL(blob);
  dummy_a_el.download = key+'.json';
  dummy_a_el.click();
  document.body.removeChild(dummy_a_el);
  console.log(data);
  console.log(key+".json is saved");
  });
};


export_file("export_shortcut","shortcuts");
load_file("import_shortcut","shortcuts");
export_file("export_engine","engines");
load_file("import_engine","engines");
