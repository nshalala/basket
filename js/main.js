let products = [];
let cartItems = [];

localGet();
displayCart();

function localAdd(){
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function localGet(){
    let items = JSON.parse(localStorage.getItem('cartItems'));
    cartItems = items;
}


function showProducts(products) {
    let row = document.querySelector('.productsRow');
    let code = '';
    products.forEach(product => {
        code += `<div class="col mb-5">
                    <div class="card h-100">
                        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                        <img class="card-img-top h-50 w-auto" src="${product.thumbnail}" alt="${product.title}" />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${product.title}</h5>
                                <div class="d-flex justify-content-center small text-warning mb-2">
                                    ${showRate(product.rating)}
                                </div>
                                <span class="text-muted text-decoration-line-through">$${product.price}</span>
                                $${calcDiscountPrice(product.price, product.discountPercentage)}
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" onclick="addToList(${product.id})">Add to cart</a></div>
                        </div>
                    </div>
                </div>`
    })
    row.innerHTML = code;
    let count = document.querySelector('.itemsCount');
    count.innerHTML = cartItems.length;
}

function addToList(id) {
    let index = cartItems.findIndex(item => item.id == id);
    if (index == -1 || cartItems.length === 0) {
        let new_product = Object.assign({}, products[id - 1]);
        new_product.count = 1;
        cartItems.push(new_product);
    } else {
        increaseCount(index);
    }
    localAdd();
    displayCart();
}

function displayCart() {
    let list = document.querySelector('.itemsList');
    let count = document.querySelector('.itemsCount');

    let code = `<thead>
                    <tr class="text-center">
                        <th scope="col">#</th>
                        <th scope="col"></th>
                        <th scope="col">Product title</th>
                        <th scope="col">$</th>
                        <th scope="col">Count</th>
                        <th scope="col">Total $</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>`;

    for (let i = 0; i < cartItems.length; i++) {
        let p = cartItems[i];
        code += `<tr class="text-center">
                    <th scope="row">${i + 1}</th>
                    <td><img src="${p.thumbnail}" class="img-thumbnail" alt="${p.title}" style="width: 70px;"></td>
                    <td>${p.title}</td>
                    <td>${calcDiscountPrice(p.price, p.discountPercentage)}</td>
                    <td><button class="btn btn-sm" type="button" onclick="increaseCount(${i})"><i class="fa-solid fa-chevron-up fa-xxs"></i></button>
                    ${p.count}
                    <button class="btn btn-sm" type="button" onclick="decreaseCount(${i})"><i class="fa-solid fa-chevron-down fa-xxs"></i></button></td>
                    <td>${p.count * calcDiscountPrice(p.price, p.discountPercentage)}</td>
                    <td><button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteItem(${i})">X</button></td>
                </tr>`;
    }
    code += `</tbody>`;

    list.innerHTML = code;
    count.innerHTML = cartItems.length;
}

function deleteItem(index) {
    cartItems.splice(index, 1);
    localAdd();
    displayCart();
}

function increaseCount(index) {
    let product = cartItems[index];
    product.count++;
    localAdd();
    displayCart();
}
function decreaseCount(index) {
    let product = cartItems[index];
    if (product.count > 1) {
        product.count--;
    } else {
        return;
    }
    localAdd();
    displayCart();
}

function showRate(rate) {
    let filled = Math.round(rate);
    let empty = 5 - filled;
    let code = '';
    for (let i = 0; i < filled; i++) {
        code += `<div class="bi-star-fill"></div>`
    }
    for (let i = 0; i < empty; i++) {
        code += `<div class="bi-star"></div>`
    }
    return code;
}

function calcDiscountPrice(price, discountPercentage) {
    let discount = Math.floor(price * discountPercentage / 100);
    return price - discount;
}

async function fetchUrl(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getProducts() {
    let data = await fetchUrl('https://dummyjson.com/products');
    let products = Array.from(data.products);
    return products;
}