function getThisSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //console.log(ss.getName());
  return ss;
}

function getThisSheetId() {
  var ssId = getThisSheet().getId();
  //console.log(ssId);
  return ssId;
}

function getThisFolder() {
  var folderParents = DriveApp.getFileById(getThisSheetId()).getParents();
  var thisFolder = folderParents.next();
  //console.log(thisFolder.getName());
  if (folderParents.hasNext()) {
    throw new Error("Multiple Parents Found!")
  };
  return thisFolder;
}

function getThisFolderId() {
  var thisFolderId = getThisFolder().getId();
  //console.log("Parent Folder ID: " + thisFolderId);
  return thisFolderId;
}

function getDashboard() {
  var dashboardSheet = getThisSheet().getSheetByName('Create Client');
  //console.log(dashboardSheet);
  return dashboardSheet;
}

function getLogSheet() {
  var logSheet = getThisSheet().getSheetByName('Log');
  //console.log(logSheet);
  return logSheet;
}

function hideSheetByName(sheetName) {
 getThisSheet().getSheetByName(sheetName).hideSheet();
}
