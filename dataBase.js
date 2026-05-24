/*Student ID: 24635752
Name: Mariam Diop
File Name: dataBase.js for project 2
Description: Assignment about Index Database API
*/

let db;

const request = indexedDB.open("NayaraDB", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    const store = db.createObjectStore("products", { keyPath: "id" });

    store.createIndex("name", "name", { unique: false });
    store.createIndex("price", "price", { unique: false });
    store.createIndex("category", "category", { unique: false });
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database ready");
};

request.onerror = function () {
    console.log("Database error");
};

// ADD PRODUCT
function addProduct(product) {
    const tx = db.transaction("products", "readwrite");
    const store = tx.objectStore("products");
    store.put(product);
}

// GET PRODUCTS
function getProducts(callback) {
    const tx = db.transaction("products", "readonly");
    const store = tx.objectStore("products");

    const req = store.getAll();

    req.onsuccess = () => callback(req.result);
}