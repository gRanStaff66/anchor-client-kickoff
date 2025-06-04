// Store an array in the Properties Service
function storeArray(array) {
  PropertiesService.getScriptProperties().setProperty('array', JSON.stringify(array));
}

// Retrieve an array from the Properties Service
function getStoredArray() {
  var storedArray = PropertiesService.getScriptProperties().getProperty('array');
  return storedArray ? JSON.parse(storedArray) : [];
}
