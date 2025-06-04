/**
 * Delivers selected files from a payload sheet to a specified destination folder in Google Drive, 
 * replacing placeholders in the file names with dynamic values.
 *
 * This script:
 * 1. Reads user input from the 'Create Client' sheet.
 * 2. Validates the input for payload name, destination folder ID, and search query.
 * 3. Retrieves the payload sheet and the destination folder.
 * 4. Filters the payload data to exclude empty rows.
 * 5. Iterates through the filtered data, attempting to copy each file to the destination folder.
 *    - Replaces placeholders ({{Customer Name}}, {{Year}}, {{User Name}}) in the file names with dynamic values.
 * 6. Logs detailed information about each copy attempt, including success/failure and error messages.
 * 7. Displays a toast notification with the number of files copied and a clickable link to the destination folder.
 */
function deliverSelectedPayload() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const createClientSheet = ss.getSheetByName("Create Client");

  const PAYLOAD_NAME = createClientSheet.getRange("A25").getValue();
  const DESTINATION_FOLDER_ID = createClientSheet.getRange("B17").getValue(); 
  const SEARCH_QUERY = createClientSheet.getRange("A2").getValue(); 
  const USER_NAME = createClientSheet.getRange("A8").getValue(); 

  // Input validation
  if (!PAYLOAD_NAME || !DESTINATION_FOLDER_ID || !SEARCH_QUERY) {
    SpreadsheetApp.getUi().alert("Please enter valid payload name, destination folder ID, and search query on the 'Create Client' sheet.");
    return;
  }

  const payloadSheet = ss.getSheetByName(PAYLOAD_NAME);
  if (!payloadSheet) {
    SpreadsheetApp.getUi().alert("Payload sheet not found: " + PAYLOAD_NAME);
    return;
  }

  const destinationFolder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);
  if (!destinationFolder) {
    SpreadsheetApp.getUi().alert("Destination folder not found.");
    return;
  }

  const lastRow = payloadSheet.getLastRow();
  const templateData = payloadSheet.getRange("A1:C" + lastRow).getValues();
  const filteredTemplateData = templateData.filter(row => row[0] !== "");

  let copiedFilesCount = 0;
  const year = new Date().getFullYear();

  // Copy files and replace placeholders in file names
  for (let i = 1; i < filteredTemplateData.length; i++) {
    const templateId = filteredTemplateData[i][0];
    const templateFile = DriveApp.getFileById(templateId);

    let newFileName = filteredTemplateData[i][2];
    newFileName = newFileName.replace(/{{Customer Name}}/g, SEARCH_QUERY);
    newFileName = newFileName.replace("{{Year}}", year);
    newFileName = newFileName.replace("{{User Name}}", USER_NAME);

    // Log details before copying
    console.log(`Attempting to copy file: ${newFileName} (ID: ${templateId})`);

    try {
      templateFile.makeCopy(newFileName, destinationFolder);
      copiedFilesCount++;
      console.log(`Copied file successfully: ${newFileName}`); 
    } catch (error) {
      console.error(`Error copying file "${newFileName}": ${error.message}`);
      SpreadsheetApp.getUi().alert(`Error copying file "${newFileName}": Please check permissions and try again.`);
    } 
  }

  // Create clickable link for destination folder
  const folderUrl = destinationFolder.getUrl();
  const folderLink = `<a href="${folderUrl}" target="_blank">${destinationFolder.getName()}</a>`;

  // Display toast notification with clickable link
  const toastMessage = `Successfully copied ${copiedFilesCount} files to ${folderLink}`;
  ss.toast(toastMessage, "Success", -1); // Display indefinitely until dismissed

  // Log summary
  console.log(toastMessage.replace(folderLink, folderUrl)); // Log message without HTML link
}
