/**
 * Displays an HTML-service dialog in Google Sheets that contains
 * client-side JavaScript code for the Google Picker API.
 */
function showPicker() {
  try {
    const html = HtmlService.createHtmlOutputFromFile('Picker.html')
      .setWidth(1070)
      .setHeight(600)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showModalDialog(html, 'Select Folder');
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.error('Failed with error: %s', e.error);
  }
}

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  try {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.error('Failed with error: %s', e.error);
  }
}

/**
*Function that takes item Id from Picker.html once user has made selection.
*Creates clickable Url in spreadsheet.
*Pastes in item Id to spreadsheet.
*Returns string that is the URL of the Google Drive Folder
*
*TODO make this return all the atributes together
*/
function insertFolderURL(id) {
  // get Google Drive folder by Id from Picker
  var folder = DriveApp.getFolderById(id);
  // get Googel Drive folder name
  var folderName = folder.getName();
  // get Google Drive folder Url
  var folderUrl = folder.getUrl();
  // get relevant cells for pasting in values
  getDashboard().getRange(selectedFolderUrlA1).setValue(folderUrl);
  getDashboard().getRange(selectedFolderNameA1).setValue(folderName);
  getDashboard().getRange(selectedFolderIdA1).setValue(id);


  return folderUrl;

}

  /**
   * graveyard for old things
   * pay no attention 
   * 
   * 
        .
       -|-
        |
    .-'~~~`-.
  .'         `.
  |  R  I  P  |
  |           |
  |           |
\\|           |//
^^^^^^^^^^^^^^^^^^
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
  // create and set Url link to Google Drive folder
  var formula = '=HYPERLINK("' + folderUrl +  '", "' + folderName + '")';
  urlCell.setFormula(formula);
  
  // set folder Id into spreadsheet cell
  idCell.setValue(id);



   */
