function dev() {
  console.log("salam")
}

function seach() {
  console.log("salam")
}

function eventListener() {
  document.getElementById("btn_search").onclick = x=>{
    seach()
    document.getElementById('search_page').classList.add("hide")
    document.getElementById('result_page').classList.remove("hide")
  }
}

eventListener()