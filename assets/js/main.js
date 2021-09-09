function dev() {
  console.log("salam")
}

async function seach() {
  console.log("salam")
  let keyword = 'news'
  let query = `/q/${ keyword }/nonce/12`
  let response = await fetch('http://localhost:3000' + query)
  response.json()
}

function eventListener() {
  document.getElementById("btn_search").onclick = x=>{
    seach()
      .then( data => {
        console.log(data)
      })
      .catch( err => {
        console.error(err)
      })
    document.getElementById('search_page').classList.add("hide")
    document.getElementById('result_page').classList.remove("hide")
  }
}

eventListener()