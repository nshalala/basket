

let products = fetchUrl('https://dummyjson.com/products');

async function fetchUrl(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    
    return data;
}



function showProducts(products) {
    let row = document.querySelector('.productsRow');

    let code = '';
    products.foreach(product => {
        console.log(product);
        
        code += `<div class="col mb-5">
                    <div class="card h-100">
                        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                        <img class="card-img-top" src="${product.thumbnail}" alt="${product.title}" />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${product.title}</h5>
                                <div class="d-flex justify-content-center small text-warning mb-2">
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                </div>
                                <span class="text-muted text-decoration-line-through">$20.00</span>
                                $${product.price}
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                        </div>
                    </div>
                </div>`
    })
    row.innerHTML = code;
}