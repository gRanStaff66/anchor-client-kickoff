function onOpen(e) {
  addMenu();
  clearFields();

}

function addMenu() {
  var menu = SpreadsheetApp.getUi().createMenu('**** ANCHOR CUSTOM MENU ****');
  menu.addItem('Insert Destination Drive Folder ...', 'showPicker');
  menu.addItem('Create New Client Notes and Folder', 'displayClientNamePrompt');
  menu.addItem('Update Company Templates', 'getCompanyTemplateArray');

  //menu.addItem('Create New Client Notes and Folder', 'createClientFolderDoc');

  //menu.addSeparator();
  //menu.addItem('Get Parent Folder ID', 'checkIDs');
  menu.addSeparator();
  menu.addItem('Create new Version Copy', 'folderCopy');
  menu.addToUi();
}


