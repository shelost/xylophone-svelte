// idb-helper.js
const dbName = "myDB";
const storeName = "pages";

export async function saveToIndexedDB(data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const putRequest = objectStore.put(data, "pagesData");
      putRequest.onsuccess = resolve;
      putRequest.onerror = reject;
    };
    request.onerror = reject;
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore(storeName);
    };
  });
}

export async function getFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);
      const getRequest = objectStore.get("pagesData");
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = reject;
    };
    request.onerror = reject;
  });
}
