let BASE_URL = 'http://market.ir'

function dev() {
  console.log("salam")
}

async function seach() {
  let keyword = 'news'
  // let query = `/q/${ keyword }/nonce/12`
  // return await fetch(BASE_URL + query)
  return await fetch('http://me:3000/dev/' + keyword + '?q=12')
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.error(err)
      return err
    })

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