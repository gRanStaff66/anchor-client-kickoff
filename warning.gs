function showAlert() {
  var ui = SpreadsheetApp.getUi();
  var uiAlert = SpreadsheetApp.getUi(); // Same variations.

  var result = uiAlert.alert(
     'The Client Name or Destination Folder is Blank',
     'Please enter a client name or Destination Folder.',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == uiAlert.Button.YES) {
    // User clicked "Yes".
    uiAlert.alert('Thanks.');
  } else {
    // User clicked "No" or X in the title bar.
    uiAlert.alert('Sorry MultiPass not accepted here.');
  }
}