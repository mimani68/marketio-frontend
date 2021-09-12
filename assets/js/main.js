let BASE_URL = 'http://market.local'
let PORT = ':3000'
let ENV = 'development'

function dev() {
  log("salam")
}

async function seach() {
  let nonce = noneGenerator()
  let keyword = document.getElementById('search_input').value
  let q = 'کویری اینجاست'
  let lo = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let query = '/q/' + keyword + '/nonce/' + nonce + '?q=' + q + '&lo=' + btoa(lo)
  log('[QUERY] ' + query)
  return await fetch(BASE_URL + PORT + query )
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      log(err)
      return err
    })
}

function noneGenerator() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function contentRender(articles) {
  let contentWrapper = document.getElementsByClassName('content_container')[0]
  if ( !contentWrapper ) {
    return log("Html content wrapper dosn't exists")
  }
  if ( !articles ) {
    return log("Articles dosn't exists")
  }
  let tmp = ''
  for (let item of articles) {
    tmp += "<div class=\"article\">"
    + "<h3>"
    + item.title
    + "</h3>"
    + "</div>"
    + "<div class=\"body\">"
    + item.body
    + "</div>"
    + "<div class=\"url\">" + item.link + "</div>"
    + "</div>"
    + "</div>"  
  }
  contentWrapper.innerHTML = tmp
}

function log(msg) {
  if ( ENV === 'development' ) {
    console.log(msg)
  }
}

function eventListener() {
  document.getElementById("btn_search").onclick = x=>{
    seach()
      .then( data => {
        contentRender(data.Data[0].Data)
        log(data)
      })
      .catch( err => {
        log(err)
      })
    document.getElementById('search_page').classList.add("hide")
    document.getElementById('result_page').classList.remove("hide")
    
  }
}

eventListener()