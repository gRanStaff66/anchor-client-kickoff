/**
 * Script Creates a client Drive folder and Google Doc
 */
function getSheetClientName() {
  clientNameRange = getDashboard().getRange(clientNameA1);
  clientName = clientNameRange.getValue();
  clientNameIsBlank = clientNameRange.isBlank();

  if (clientNameIsBlank != true) {
    console.log("Got Client Name from Sheet: " + clientName)
    return clientName;
  }//if loop
  else {
    showAlert();
  }
}

function getSaveLocationUrl() {
  saveLocationUrlRange = getDashboard().getRange(selectedFolderUrlA1);
  saveLocationUrl = getDashboard().getRange(selectedFolderUrlA1).getValue();
  saveLocationUrlIsBlank = saveLocationUrlRange.isBlank();
if (saveLocationUrlIsBlank != true) {
  console.log("Got Destination Folder URL from Sheet: " + saveLocationUrl)
  return saveLocationUrl;
}//if loop
  else {
    showAlert();
  }
}

function getSaveLocationId() {
  getSaveLocationIdRange = getDashboard().getRange(selectedFolderIdA1);
  getSaveLocationId = getDashboard().getRange(selectedFolderIdA1).getValue();
  getSaveLocationIdIsBlank = getSaveLocationIdRange.isBlank();
if (getSaveLocationIdIsBlank != true) {
  console.log("Got Destination Folder URL from Sheet: " + getSaveLocationId)
  return getSaveLocationId;
}//if loop
  else {
    showAlert();
  }
}

function getTimeZone() {
  timeZone = getDashboard().getRange(timeZoneA1).getValue();
  console.log("Got TimeZone from Sheet: " + timeZone)
  return timeZone;
}

function getUserName() {
  userName = getDashboard().getRange(userNameA1).getValue();
  console.log("Got User Name from Sheet: " + userName)
  return userName;
}

/**
 * The function creating the client drive folder and Google Doc.
 */
function createClientFolderDoc() {
  const clientName = getSheetClientName();
  const saveLocationId = getSaveLocationId();
  console.log("Save Location ID: " + saveLocationId);
  //const saveLocationUrl = getSaveLocationUrl();
  const userName = getUserName();
  // Get the Postpend for DocName on the Dashboard
  const docPostpend = getDashboard().getRange(docPostpendA1).getDisplayValues();
  // Combines the "Client Name" and Postpend with a space inbetween
  const docName = clientName + " " + docPostpend + " " + userName
  console.log("Document Name: " + docName);



  try {
    /** Create formatted date time stamp for use in names */
    // https://developers.google.com/apps-script/reference/utilities/utilities#formatdatedate,-timezone,-format 
    // https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
    const formattedDateTime = Utilities.formatDate(new Date(), getTimeZone(), "MM.dd.yyyy 'at' HH:mm:ss z");
    var folderYearDate = Utilities.formatDate(new Date(), getTimeZone(), "yyyy");
    var folderMonthDate = Utilities.formatDate(new Date(), getTimeZone(), "MMMM");
    console.log("Date: " + folderMonthDate + " " + folderYearDate);


    /** Create a new folder, and save the new Doc into new folder*/
    // Set the root folder to chosen location by user in constant above
    const rootFolder = DriveApp.getFolderById(saveLocationId);
    //const rootFolder = DriveApp.getFolderById(saveLocationUrl.replace(/^.+\//, ''));
    // Create new Client folder (destinationFolder) saved under the root folder
    // https://stackoverflow.com/questions/11910734/how-do-i-create-a-file-in-a-folder
    const destinationFolder = rootFolder.createFolder(clientName + " - " + folderMonthDate + " " + folderYearDate );
    //get Url of Dest. Folder to type out on the log sheet
    const destinationFolderURL = destinationFolder.getUrl();
    openUrl(destinationFolderURL);

    /** Create a new Google Doc
     *Creating the new doc in the Shared Drive instead of making then moving note the Supports All Drives --- The idea here is to avoid permissions issues later.
     */
    // TODO make this support multi MimeTypes based on the Templates oh and support templates
    const newNoteDoc = Drive.Files.insert({ title: docName, mimeType: MimeType.GOOGLE_DOCS, parents: [{ id: destinationFolder.getId() }] }, null, { supportsAllDrives: true });
    //get the Id of the New Doc so we can open it and Edit it
    const newNoteDocId = newNoteDoc.getId();
    console.log("New Note Document ID: " + newNoteDocId);

    /** Modify the Google Doc */
    //reopen the document that was just made in the Shared Drive 
    //since we are switching apps we need to reopen
    const tempDoc = DocumentApp.openById(newNoteDocId);
    //get the body of the doc -- which is empty
    const body = tempDoc.getBody();
    //set the first lint to the Client Name Variable and Format it
    const title = body.appendParagraph(clientName);
    title.setHeading(DocumentApp.ParagraphHeading.TITLE);

    //const userName = getUserName();
    //add a line with some info
    const sourceText = '66degrees | Created by Google Apps Script at ' + formattedDateTime + '. By: ' + userName;
    body.appendParagraph(sourceText);
    body.appendParagraph("");
    body.appendParagraph("Company Domain - ");
    const headingOverview = body.appendParagraph("Notes");
    headingOverview.setHeading(DocumentApp.ParagraphHeading.HEADING2);

    /** Make results of the script known in the console of the project editor */
    // Get the URL of the document.
    const newDocUrl = tempDoc.getUrl();
    // Get the name of the document to use in console statement
    const newDocName = tempDoc.getName();
    // Print results to console
    console.info('Google Doc Created = %s | newDocUrl = %s', newDocName, newDocUrl);

    /** Make results of the script known in the sheet on a seperate Tab called Log */
    getLogSheet().insertRowAfter(1);
    //getLogSheet().getRange()
    getLogSheet().getRange(2, 1).setValue(clientName);
    getLogSheet().getRange(2, 2).setValue(newDocName);
    getLogSheet().getRange(2, 3).setValue(newDocUrl);
    getLogSheet().getRange(2, 4).setValue(sourceText);
    getLogSheet().getRange(2, 5).setValue(destinationFolderURL);


    // Open the URL of the Doc created
    openUrl(newDocUrl);

    return newDocUrl

  } catch (err) {
    // TODO - Handle exception
    console.error('Failed with error %s', err.message);
  }

}