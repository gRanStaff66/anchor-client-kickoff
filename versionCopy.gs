
function folderCopy() {
  const fromFolder = DriveApp.getFolderById(getThisFolderId());
  var ui = SpreadsheetApp.getUi();
  var toFolderName = ui.prompt('Enter New Folder Name below the Old Folder was: ' + getThisFolder().getName()); 
      console.log('Destination Folder name:' +  toFolderName.getResponseText());
  const fromFolderParentId = fromFolder.getParents().next().getId();
  const toFolder = DriveApp.getFolderById(fromFolderParentId).createFolder(toFolderName.getResponseText());
  const toFolderId = toFolder.getId();

  console.log('Destination Folder Id:' +  toFolderId);
  const toFolderURL = DriveApp.getFolderById(toFolderId).getUrl();

    // Open the URL of the Doc created
    openUrl(toFolderURL);


  // copy the folder content recursively.
  copy(fromFolder, toFolder)
}

function copy(fromFolder, toFolder) {
  // copy files
  var files = fromFolder.getFiles()
  while (files.hasNext()) {
    var file = files.next();
    var newFile = file.makeCopy(toFolder)
    var fileName = file.getName().toString();
    var toFolderName = toFolder.getName();
    var tempFileName = fileName.replace(getThisFolder().getName(), toFolderName); 
    console.log(tempFileName);
    newFile.setName(tempFileName)
  }

  // copy folders
  var folders = fromFolder.getFolders()
  while (folders.hasNext()) {
    var folder = folders.next()
    var newFolder = toFolder.createFolder(folder.getName())
    copy(folder, newFolder)
  }
}