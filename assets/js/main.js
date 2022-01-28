let BASE_URL = 'http://market.ir'
let PORT = ':3000'
let ENV = 'development'
let RESULT_CHARACTER_LIMIT = 350;

window.onload = async ()=>{
  await getProductMetadata()
}

async function seach() {
  let query = document.getElementById('search_input').value
  log('[QUERY] ' + query)
  return await fetch(BASE_URL + PORT + '/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    .then(async response => {
      let e = await response.json()
      return e;
    })
    .catch((err) => {
      log(err)
      return err
    })
}

async function getProductMetadata() {
  return await fetch(BASE_URL + PORT + '/product/metadata')
    .then(async response => {
      let res = await response.json()
      log('[PRODUCT-METADATA] ' + JSON.stringify(res))
      return res;
    })
    .catch((err) => {
      log(err)
      return err
    })
}


function log(msg) {
  if (ENV === 'development') {
    console.log(msg)
  }
}

function eventListener() {
  document.getElementById("btn_search").onclick = x => {
    seach()
      .then(data => {
        log(data.meta)
        log(data)
        contentRender("channels", data.channel)
      })
      .catch(err => {
        log(err)
      })
    document.getElementById('search_page').classList.add("hide")
    document.getElementById('result_page').classList.remove("hide")

  }
}


function contentRender(tag, articles) {
  let contentWrapper = document.getElementsByClassName(tag)[0]
  if (!contentWrapper) {
    return log("Html content wrapper dosn't exists")
  }
  if (!articles) {
    return log("Articles dosn't exists")
  }
  let tmp = '<h2>کانال</h2>'
  for (let item of articles) {
    tmp += "<div class=\"article text-primary\">" +
      "<h3>" +
      item.title +
      "</h3>" +
      "<span class=\"body text-primary text-fade\">" +
      "..." + item.preText.substring(item.preText.length - RESULT_CHARACTER_LIMIT, item.preText.length) +
      "</span>" +
      "<span class=\"body text-primary\">" +
      item.boldText +
      "</span>" +
      "<span class=\"body text-primary text-fade\">" +
      item.postText.substring(0, RESULT_CHARACTER_LIMIT) +
      "</span>" +
      "<div class=\"url text-link ltr\"><a href=\"" + item.link + "\">" +
      item.link +
      "</a></div>" +
      "</div>"
  }
  contentWrapper.innerHTML = tmp
}

eventListener()