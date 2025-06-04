
/**
 * This Function will get the Array of the "Company Templates"
 *
 */
function getCompanyTemplateArray() {

  /**
   * Aight lets check if the Company Templates sheet exists if not then make it and flush it
   */
  var sheet = SpreadsheetApp.getActive().getSheetByName("Company Templates");
  if (sheet != null) {
    if (sheet.getLastRow() > 0) {
      var range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());

      //Grabing the array from the local sheet here
      var tempCompanyTemplateArray = range.getValues();

      //stringify it so i can compare
      var tempMD5ThisSheet = MD5(JSON.stringify(tempCompanyTemplateArray));
      console.log("Company Templates Sheet in this file exists and the MD5 checksum of local copy of Company Templates Array " + tempMD5ThisSheet);


    }//If lastrow loop

    //Uncomment below for testing 
    //sheet.clearContents();
    //console.log("Company Templates Sheet in this file exists");

  }//If sheet is !null

  if (!sheet) {
    sheet = SpreadsheetApp.getActive().insertSheet("Company Templates");

    //set MD5 to null so the compare check will fail
    var tempMD5ThisSheet = null
    console.log("companyTemplateSheet was created and MD5 set to: " + tempMD5ThisSheet);
  }//if !sheet

  SpreadsheetApp.flush();
  Utilities.sleep(1000);




  /** get the Company Templates Sheet
   *  the ID is set in Const.gs file as sharedDriveMapId
   *
   */

  const companyTemplateSheet = SpreadsheetApp.openById(sharedDriveMapId).getSheetByName("Company Templates");

  //checks if the sheet is not null then it exists
  if (companyTemplateSheet != null) {

    console.log("companyTemplateSheet exists on source SpreadSheet");
    var tempMD5CompanyTemplateSheet = companyTemplateSheet.getRange(1, 1).getNote();
    console.log("MD5 from companyTemplateSheet: " + tempMD5CompanyTemplateSheet);

    if (tempMD5ThisSheet === tempMD5CompanyTemplateSheet) {
      var companyTemplateArray = tempCompanyTemplateArray;
      console.log("MD5 checksums are the Same ~! Woah that is cool we can just use the array on this sheet.");
      return companyTemplateArray;
    }
    else;


    /** If the MD5 do NOT match then get the Array from master
     * then write it to this sheet and return array 
     * 
     */
    if (tempMD5ThisSheet !== tempMD5CompanyTemplateSheet) {
      console.log("MD5 checksums are different grabbing the array from master superMapSheet");
      //if the sheet has a last row then we get the Range and Values and store that as an array
      if (companyTemplateSheet.getLastRow() > 0) {
        var range = companyTemplateSheet.getRange(1, 1, companyTemplateSheet.getLastRow(), companyTemplateSheet.getLastColumn());
        companyTemplateArray = range.getValues();


        //write out values to the local sheet this should only happen if the MD5 checksum fails
        sheet.getRange(1, 1, companyTemplateArray.length, companyTemplateArray[0].length).setValues(companyTemplateArray);
        //sheet.hideSheet();
        //sheet.showSheet();
        //sheet.autoResizeColumns(1, 5);
        SpreadsheetApp.flush();
        Utilities.sleep(100);

        console.log("Got companyTemplateArray from shared sheet")
        return companyTemplateArray;
      }


    }
  }




  if (!sheet) {
    console.log("superMapSheet does NOT exist on Source you are on your own");
  }

}
