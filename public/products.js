document.addEventListener("DOMContentLoaded", () => {
    let inputSave = document.getElementById('saveProduct');
    inputSave.addEventListener('click', addProduct)
    getProducts();

    function getProducts() {
        fetch('/products.data')
        .then(response =>  response.json() )
        .then(data =>renderProd(data.products) );
    }

function renderProd(data) {
    renderTitle(data);
    renderPrice(data);
    renderThumbnail(data);
}

function renderTitle(data) {
    const html = data.map((elem, index) => {
        return(
            `
            <div>${elem.name}</div>
            `
        )
    }).join(" ");
    document.getElementById('title_set').innerHTML = html;
}
function renderPrice(data) {
    const html = data.map((elem, index) => {
        return(
            `
            <div>${elem.price}</div>
            
            `
        )
    }).join(" ");
    document.getElementById('price_set').innerHTML = html;
}
function renderThumbnail(data) {
    const html = data.map((elem, index) => {
        return(
            `
            <div>${elem.thumbnail}</div>
            `
        )
    }).join(" ");
    document.getElementById('thumbnail_set').innerHTML = html;
}


function addProduct(event) {
   // event.preventDefault();
    let data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value 
    }
    
    fetch('/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => {
        renderProd(data)
    })
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    }
})