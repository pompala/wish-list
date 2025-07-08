const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const addProductBtn = document.getElementById('addProductBtn');
const productList = document.getElementById('productList');
const totalSumSpan = document.getElementById('totalSum');

let products = [];

function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        renderProductsList();
    }
}

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct() {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value.replace(',', '.'));

    if (name == '') {
        alert('Proszę podać nazwę produktu!');
        return;
    }
    if (isNaN(price) || price <= 0) {
        alert('Proszę podać prawidłową cenę!');
        return;
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
    };

    products.push(newProduct)
    saveProductsToLocalStorage();
    renderProductList();
    calculateTotalSum();

    productNameInput.value = '';
    productPriceInput.value = '';
    productNameInput.focus();
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    saveProductsToLocalStorage();
    renderProductList();
    calculateTotalSum();
}

