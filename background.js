function search(selectionText) {
  if (selectionText == "") {
    chrome.tabs.create({ url: "https://www.baidu.com" });
  } else {
    const searchUrl =
      "https://www.baidu.com/s?wd=" + encodeURIComponent(selectionText);
    console.log("Opening Baidu search URL: " + searchUrl);
    chrome.tabs.create({ url: searchUrl });
  }
}

function searchOnBaidu(info, tab) {
  const selectionText = info["selectionText"];
  console.info("Selected Text on link is " + selectionText);
  search(selectionText);
}

chrome.contextMenus.create({
  title: "使用百度搜索",
  contexts: ["selection"],
  onclick: searchOnBaidu
});

chrome.browserAction.onClicked.addListener(tab => {
  var body = "";
  chrome.tabs.sendMessage(tab.id, { method: "getSelection" }, function(
    response
  ) {
    // var url = response.url;
    // var subject = response.subject;
    if (!!response) {
      body = response.body;
      console.info("User searched for word " + body);
      search(body);
    } else {
      search("");
    }
  });
});
