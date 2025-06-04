function displayClientNamePrompt() {
  
  var tempUserInfo = getCurrentUserInfo();
  SpreadsheetApp.flush();
  Utilities.sleep(100);
  getDashboard().getRange(userNameA1).setValue(tempUserInfo.userFirstName + " " + tempUserInfo.userLastName);
  getDashboard().getRange(timeZoneA1).setValue(tempUserInfo.userTimeZone);
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt("Please enter Client Name");
  
  //console.log("Opened and fields cleared by: " + getCurrentUserInfo().userFirstName + " " + getCurrentUserInfo().userLastName + " UserName: " + getCurrentUserInfo().userEmail);
  
  getSuperMapArray();
  console.log("Getting the Super Map Array: ");
  //console.log("Got Super Map Array: " + superMapArray);
  
  //Get the button that the user pressed.
  var button = result.getSelectedButton();
  
  if (button === ui.Button.OK) {
    console.log("The user clicked the [OK] button.");
    var responseString = result.getResponseText();
    getDashboard().getRange(clientNameA1).setValue(responseString);
    if (responseString != null){
     var searchString = responseString;
     console.log("User Entered the searchString: " + searchString);
     getSuggestedAccounts();//Kick off the suggestion for folders
    return searchString;
    }

  } else if (button === ui.Button.CLOSE) {
    console.log("The user clicked the [X] button and closed the prompt dialog.");
    var searchString = null; 
    return searchString;
  }
  
    
}