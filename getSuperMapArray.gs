
/**
 * This Function will get the Array of the "Super Map"
 * of [Clients] and [Prospects] folders that are 2 levels down 
 * in the company Shared Drive folder structure
 *  --- example ---
 * G-Clients > G-Clients >> [Clients] Google, LLC
 * Shared Drive > Folder in Shared Drive >> [Clients] Folder
 */
function getSuperMapArray() {

  /**
   * Aight lets check if the Super Map sheet exists if not then make it and flush it
   */
  var sheet = SpreadsheetApp.getActive().getSheetByName("WTG_All the Accounts");
  if (sheet != null) {
    if (sheet.getLastRow() > 0) {
      var range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());

      //Grabing the array from the local sheet here
      var tempSuperMapArray = range.getValues();

      //stringify it so i can compare
      var tempMD5ThisSheet = MD5(JSON.stringify(tempSuperMapArray));
      console.log("Super Map Sheet in this file exists and the MD5 checksum of local copy of Super Map " + tempMD5ThisSheet);


    }//If lastrow loop

    //Uncomment below for testing 
    //sheet.clearContents();
    //console.log("Super Map Sheet in this file exists");

  }//If sheet is !null

  if (!sheet) {
    sheet = SpreadsheetApp.getActive().insertSheet("WTG_All the Accounts");

    //set MD5 to null so the compare check will fail
    var tempMD5ThisSheet = null
    console.log("Super Map Sheet was created and MD5 set to: " + tempMD5ThisSheet);
  }//if !sheet

  SpreadsheetApp.flush();
  Utilities.sleep(1000);




  /** get the Shared Drive Map Sheet
   *  the ID is set in Const.gs file as sharedDriveMapId
   *
   */

  const superMapSheet = SpreadsheetApp.openById(sharedDriveMapId).getSheetByName("WTG_All the Accounts");
  
  //checks if the sheet is not null then it exists
  if (superMapSheet != null) {

    console.log("superMapSheet exists on source SpreadSheet");
    var tempMD5SuperMapSheet = superMapSheet.getRange(1, 1).getNote();
    console.log("MD5 from superMapSheet: " + tempMD5SuperMapSheet);

    if (tempMD5ThisSheet === tempMD5SuperMapSheet) {
      var superMapArray = tempSuperMapArray;
      console.log("MD5 checksums are the Same ~! Woah that is cool we can just use the array on this sheet.");
      return superMapArray;
    }
    else;


    /** If the MD5 do NOT match then get the Array from master
     * then write it to this sheet and return array 
     * 
     */
    if (tempMD5ThisSheet !== tempMD5SuperMapSheet) {
      console.log("MD5 checksums are different grabbing the array from master superMapSheet");
      //if the sheet has a last row then we get the Range and Values and store that as an array
      if (superMapSheet.getLastRow() > 0) {
        var range = superMapSheet.getRange(1, 1, superMapSheet.getLastRow(), superMapSheet.getLastColumn());
        superMapArray = range.getValues();


        //write out values to the local sheet this should only happen if the MD5 checksum fails
        sheet.getRange(1, 1, superMapArray.length, superMapArray[0].length).setValues(superMapArray);
        //sheet.hideSheet();
        //sheet.showSheet();
        sheet.autoResizeColumns(1, 5);
        SpreadsheetApp.flush();
        Utilities.sleep(100);

        console.log("Got Super Map Array from shared sheet")
        return superMapArray;
      }


    }
  }




  if (!sheet) {
    console.log("superMapSheet does NOT exist on Source you are on your own");
  }

}
