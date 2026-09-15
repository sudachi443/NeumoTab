const add_engine_name = document.getElementById("add_engine_name");
const add_engine_link = document.getElementById("add_engine_link");

document.getElementById("add_engine").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = add_engine_name.value;
  const link = add_engine_link.value;
  await add_engine(name,link);
  event.target.reset();
});
