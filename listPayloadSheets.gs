function listPayloadSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();

  const allSheets = ss.getSheets();
  const payloadSheets = allSheets.filter(sheet => sheet.getName().toLowerCase().startsWith("payload"));

  const payloadSheetNames = payloadSheets.map(sheet => sheet.getName());
  const numPayloadSheets = payloadSheetNames.length;

  // Clear the range A2:B (to avoid old data)
  activeSheet.getRange("A2:B").clearContent();

  // Write payload sheet names directly to A2:B
  if (numPayloadSheets > 0) {
    const writeRange = activeSheet.getRange("A2:A" + (numPayloadSheets + 1)); 
    writeRange.setValues(payloadSheetNames.map(name => [name])); // Write names to column A
  } else {
    // Handle case where no payload sheets are found
    activeSheet.getRange("A2").setValue("No payload sheets found.");
  }
}
