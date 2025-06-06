
/**
 * Open a URL in a new tab in the browser.
 * https://gist.github.com/smhmic/e7f9a8188f59bb1d9f992395c866a047
 * TODO - create separate html file vs inline
 */
function openUrl(newDocUrl) {
  var html = HtmlService.createHtmlOutput('<!DOCTYPE html><html><script>'
    + 'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
    + 'var a = document.createElement("a"); a.href="' + newDocUrl + '"; a.target="_blank";'
    + 'if(document.createEvent){'
    + '  var event=document.createEvent("MouseEvents");'
    + '  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'
    + '  event.initEvent("click",true,true); a.dispatchEvent(event);'
    + '}else{ a.click() }'
    + 'close();'
    + '</script>'
    // Offer URL as clickable link in case above code fails.
    + '<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically.  Click below:<br/><a href="' + newDocUrl + '" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
    + '<script>google.script.host.setHeight(55);google.script.host.setWidth(410)</script>'
    + '</html>')
    .setWidth(150).setHeight(5);
  SpreadsheetApp.getUi().showModalDialog(html, "Opening Client Notes Google Doc...");
}
