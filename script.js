// 1. Pobieranie referencji do elementów HTML
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const addProductBtn = document.getElementById('addProductBtn');
const productList = document.getElementById('productList');
const totalSumSpan = document.getElementById('totalSum');

//tablica do przechowywania produktów
let products = []; // Będzie przechowywać obiekty { name: "...", price: ... }

//ładowanie danych z Local Storage, jeśli istnieją
function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts); //konwertuje JSON na tablicę obiektów
        renderProductsList(); //odświerza po załadowaniu
    }
}

//zapisywanie danych w Local Storage
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products)); //konwersja tablicy na JSON
}