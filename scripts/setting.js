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
}

load_file("import_shortcut","shortcuts");
load_file("import_engine","engines");

