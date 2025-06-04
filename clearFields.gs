function clearFields() {
  getDashboard().getRange(clientNameA1).clearNote();
  getDashboard().getRange(clientNameA1).setValue(null);
  getDashboard().getRange(timeZoneA1).setValue(null);
  getDashboard().getRange(userNameA1).setValue(null);
  getDashboard().getRange(selectedFolderUrlA1 + ":" + selectedFolderIdA1).setValue(null);
  getDashboard().getRange(selectedFolderUrlA1 + ":" + selectedFolderIdA1).clearNote();
  getDashboard().getRange(suggestedFoldersArray).clearNote();
  getDashboard().getRange(suggestedFoldersArray).setValue(null);
  
  

}