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
    
    if (name === '' && (isNaN(price) || price <= 0)) {
        alert('Proszę podać nazwę produktu i prawidłową cenę!')
        return;
    }

    if (name === '') {
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

    products.push(newProduct);
    saveProductsToLocalStorage();
    renderProductsList();
    calculateTotalSum();

    productNameInput.value = '';
    productPriceInput.value = '';
    productNameInput.focus();
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    saveProductsToLocalStorage();
    renderProductsList();
    calculateTotalSum();
}

function renderProductsList() {
    productList.innerHTML = '';

    if (products.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Twoja lista jest pusta. Dodaj pierwszy Element';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#777';
        emptyMessage.style.padding = '20px';
        productList.appendChild(emptyMessage);
        return;
    }

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="product-info">
            <strong>${product.name}</strong>
            <span>${product.price.toFixed(2)}</span>
        </div>
        <div class="item-action">
            <button class="delete-btn" data-id="${product.id}">X</button>
        </div>
        `;
        productList.appendChild(listItem);
    });
}

function calculateTotalSum() {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    totalSumSpan.textContent = total.toFixed(2) + ' PLN';
}

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const idToDelete = parseInt(event.target.dataset.id);
        deleteProduct(idToDelete);
    }
});

addProductBtn.addEventListener('click', addProduct);

productNameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addProduct();
    }
});

productPriceInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addProduct();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromLocalStorage();
    renderProductsList();
    calculateTotalSum();
});

// theme switch

const themeToggle = document.getElementById('checkbox');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme','dark');
    } else {
        localStorage.setItem('theme','light');
    }
}

themeToggle.addEventListener('change',toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
});

// Service Workera
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}