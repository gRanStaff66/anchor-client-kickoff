function getCurrentUserInfo() {
  var tempUser = Session.getActiveUser();
  var userTimeZone = CalendarApp.getDefaultCalendar().getTimeZone();
  //console.log(userTimeZone);

  var tempName = tempUser.getUsername();
  var userEmail = tempUser.getEmail();
  //var userLoginId = tempUser.getUserLoginId();
  //console.log(tempName);
  //console.log(userEmail);
  //console.log(userTimeZone);
  //console.log(userLoginId);
  var splitName = tempName.split(".");
  var fName = splitName[0];
  var lName = splitName[splitName.length - 1];
  //console.log(fName + "." + lName);
  var userFirstName = fName.charAt(0).toUpperCase() + fName.slice(1);
  var userLastName = lName.charAt(0).toUpperCase() + lName.slice(1);
  console.log(userFirstName + " " + userLastName + " " + userEmail + " " + userTimeZone);
  return { userFirstName, userLastName, userEmail, userTimeZone };

}