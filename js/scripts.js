let products = [{
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
},
{
    "id": 2,
    "title": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "discountPercentage": 17.94,
    "rating": 3.44,
    "stock": 34,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
    ]
},
{
    "id": 3,
    "title": "Samsung Universe 9",
    "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
    "price": 1249,
    "discountPercentage": 15.46,
    "rating": 4.09,
    "stock": 36,
    "brand": "Samsung",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/3/1.jpg"
    ]
},
{
    "id": 4,
    "title": "OPPOF19",
    "description": "OPPO F19 is officially announced on April 2021.",
    "price": 280,
    "discountPercentage": 17.91,
    "rating": 4.3,
    "stock": 123,
    "brand": "OPPO",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/4.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
    ]
},]

let cartItems = [];

showProducts(products);

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
}

function addToList(id) {
    let index = cartItems.findIndex(item => item.id == id);
    if (index == -1 || cartItems.length === 0) {
        let new_product = Object.assign({}, products[id - 1]);
        new_product.count = 1;
        cartItems.push(new_product);
    } else {
        cartItems[index].count++;
    }
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
                    <th scope="row">${i+1}</th>
                    <td><img src="${p.thumbnail}" class="img-thumbnail" alt="${p.title}" style="width: 70px;"></td>
                    <td>${p.title}</td>
                    <td>${calcDiscountPrice(p.price, p.discountPercentage)}</td>
                    <td><button class="btn btn-primary btn-sm" type="button">+</button>
                    ${p.count}
                    <button class="btn btn-primary btn-sm" type="button">-</button></td>
                    <td>${p.count * calcDiscountPrice(p.price, p.discountPercentage)}</td>
                    <td><button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteItem(${i})">X</button></td>
                </tr>`;
    }
    code += `</tbody>`;

    list.innerHTML = code;
    count.innerHTML = cartItems.length;
}

function deleteItem(index){
    cartItems.splice(index, 1);
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