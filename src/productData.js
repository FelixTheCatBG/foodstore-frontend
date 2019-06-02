let products = []
//gets all products from the database
function getProducts(callback) {
    const Http = new XMLHttpRequest();
    const url = 'https://localhost:5001/api/product';
    Http.open("GET", url, true);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.status === 200) {
            products = JSON.parse(Http.responseText)
            if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) === "shoppingCart.html") {
                generateItem()
                calculateTotal()
            } else if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) === "checkout.html") {
                generateMiniItem()
                calculateTotal()
            } else if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) === "discounts.html") {
                generateDProducts()
                generateMiniItem()
                calculateTotal()

            } else {
                callback()
                if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) === "category.html") {
                    generateMiniItem()
                    calculateTotal()
                }
            }

            console.log(products)
        } else {
            sessionStorage.setItem("error", Http.responseText);
            console.log(sessionStorage.getItem("error"));
        }
    }
}
function getCategories() {
    let i = 0
    let categs = []
    //creates list of all existing categories
    products.forEach(function (e) {
        if (categs.includes(e.category)) {
        }
        else { categs.push(e.category) }
    })
    generateCategories(categs)
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) === "category.html") {
        generateProducts()
    }
}
//Generation of the mini-cart elements
let miniItem = document.getElementById("miniCart");
function generateMiniItem() {
    miniItem.innerHTML = ""
    cart = JSON.parse(sessionStorage.getItem("products"));
    console.log(cart)
    calculateTotal()
    cart.forEach(function (e) {
        let findingProducts;
        let outerdiv = document.createElement("div");
        findingProducts = products.find(obj => obj.id === e.id)
        console.log(findingProducts)

        outerdiv.innerHTML = e.quantity + " " + findingProducts.name;

        miniItem.appendChild(outerdiv);


    });
}
getProducts(getCategories)