const searchInput = document.getElementById("search-form");

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  console.log(keyword);
});
function ddg() {
  const keyword = searchInput.value;
  window.location.href ="https://duckduckgo.com/?q=" + encodeURIComponent(keyword);
};
function chatgpt() {
  const keyword = searchInput.value;
  window.location.href ="https://chatgpt.com/?q=" + encodeURIComponent(keyword);
};
function twitter() {
  const keyword = searchInput.value;
  if(keyword=="") { 
    window.location.href ="https://x.com/home" + encodeURIComponent(keyword);
  } else {
    window.location.href ="https://x.com/search?q=" + encodeURIComponent(keyword);
  }
};
function niconico() {
  const keyword = searchInput.value;
  if(keyword=="") { 
    window.location.href ="https://nicovideo.jp/my" + encodeURIComponent(keyword);
  } else {
    window.location.href ="https://nicovideo.jp/search/" + encodeURIComponent(keyword);
  }
};
