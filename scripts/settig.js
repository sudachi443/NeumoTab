const add_shortcut_title = document.getElementById("add_shortcut_title");
const add_shortcut_uri = document.getElementById("add_shortcut_uri");
const add_engine_name = document.getElementById("add_engine_name");
const add_engine_link = document.getElementById("add_engine_link");
const remove_shortcut_title = document.getElementById("remove_shortcut_title");
const remove_engine_name = document.getElementById("remove_engine_name");
const result_shortcut = document.getElementById("result_shortcut");
const result_engine = document.getElementById("result_engine");
document.getElementById("add_shortcut").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = add_shortcut_title.value;
  const uri = add_shortcut_uri.value;
  if (title == "" || uri == "") { 
    alert("please enter title and uri");
    return 0;
  }else {
    await add_shortcut(title,uri);
    result_shortcut.textContent = uri + " is saved as "+title+" !";
    event.target.reset();
  }
});
document.getElementById("add_engine").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = add_engine_name.value;
  const link = add_engine_link.value;
  if (name == "" || link == "") { 
    alert("please enter name and link");
    return 0;
  }else {
    await add_engine(name,link);
    result_shortcut.textContent = link + " is saved as "+name+" !";
    event.target.reset();
  }
});

document.getElementById("remove_shortcut").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = remove_shortcut_title.value;
  if (title == "") { 
    alert("please enter title");
    return 0;
  }else {
    await remove_shortcut(title);
    result_shortcut.textContent = title +" is removed!";
    event.target.reset();
  }
});
document.getElementById("remove_engine").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = remove_engine_name.value;
  alert("please enter name");
  if (name == "") { 
    return 0;
  }else {
    await remove_engine(name);
    result_shortcut.textContent = name +" is removed!";
  event.target.reset();
  }
});

document.getElementById("reset_shortcut").addEventListener("submit",async (event) => {
  event.preventDefault();
  if (confirm("is it ok to reset shortcut?")){
    await reset_shortcut();
    result_shortcut.textContent ="shortcut reseted";
  }else{
  }
  event.target.reset();
});
document.getElementById("reset_engine").addEventListener("submit",async (event) => {
  event.preventDefault();
  if (confirm("is it ok to reset engine?")){
    await reset_engine();
    result_engine.textContent ="engine reseted";
  }else{
  }
  event.target.reset();
});

document.addEventListener("focusin", (e) => {
  e.target.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

