let sum = 0
let cart = JSON.parse(sessionStorage.getItem("products"));
let createTd = document.getElementById("cart-products");
let cartProducts = [];
console.log(cart);
console.log(products)
//generates an item in the main shopping cart
function generateItem() {
    createTd.innerHTML = ""
    cart = JSON.parse(sessionStorage.getItem("products"));
    cart.forEach(function (e) {
        let findingProducts;
        let trElement = document.createElement("tr");

        let tdElementName = document.createElement("td");
        let tdElementPrice = document.createElement("td");
        let tdElementAmount = document.createElement("td");
        let tdButtons = document.createElement("td");
        let tdElementButtonPlus = document.createElement("button");
        let tdElementButtonMinus = document.createElement("button");
        let plusLabel = document.createElement("i");
        let minusLabel = document.createElement("i");
        let buttonGroup = document.createElement("div");

        findingProducts = products.find(obj => obj.id === e.id)
        console.log(findingProducts)


        tdElementName.innerHTML = findingProducts.name;
        tdElementAmount.innerHTML = e.quantity;
        if (findingProducts.discountPrice > 0) {
            tdElementPrice.innerHTML = findingProducts.discountPrice + "DKK";
        } else {
            tdElementPrice.innerHTML = findingProducts.price + "DKK";
        }
        plusLabel.setAttribute("class", "fas fa-plus");
        minusLabel.setAttribute("class", "fas fa-minus");

        
        tdElementButtonPlus.setAttribute("class", "btn btn-default");
        tdElementButtonMinus.setAttribute("class", "btn btn-default btnq");
        tdElementButtonMinus.setAttribute("style", "margin-right:5px");
        tdElementButtonPlus.addEventListener("click", function () {
            let sessionProducts = [];
            sessionProducts = JSON.parse(sessionStorage.products);
            let q = e.quantity;
            sessionProducts.forEach(function (x) {
                if (x.id === e.id) {
                    x.quantity = x.quantity + 1;
                    q = x.quantity;
                }
            })
            sessionStorage.setItem("products", JSON.stringify(sessionProducts));
            tdElementAmount.innerHTML = q;
            console.log(sessionStorage.getItem("products"));
            calculateTotal()
        });
        tdElementButtonMinus.addEventListener("click", function () {
            let sessionProducts = [];
            sessionProducts = JSON.parse(sessionStorage.products);
            let q = e.quantity;
            sessionProducts.forEach(function (x) {
                if (x.id === e.id) {
                    if (x.quantity - 1 > 0) {
                        x.quantity = x.quantity - 1;
                        q = x.quantity;
                    } else {
                        console.log("delete " + x.id)
                        sessionProducts.splice(sessionProducts.indexOf(x), 1)
                        trElement.innerHTML = ""
                    }
                }
            })

            tdElementAmount.innerHTML = q;
            sessionStorage.setItem("products", JSON.stringify(sessionProducts));
            console.log(sessionStorage.getItem("products"));
            calculateTotal()
        });

        tdElementButtonMinus.appendChild(minusLabel);
        tdElementButtonPlus.appendChild(plusLabel);
        buttonGroup.appendChild(tdElementButtonMinus);
        buttonGroup.appendChild(tdElementButtonPlus);
        tdButtons.appendChild(buttonGroup);


        trElement.appendChild(tdElementName);
        trElement.appendChild(tdElementPrice);
        trElement.appendChild(tdElementAmount);
        trElement.appendChild(tdButtons);

        createTd.appendChild(trElement);


    });
}
//calculates the total price of the items in the cart
function calculateTotal() {
    let cartvar = JSON.parse(sessionStorage.getItem("products"));
    sum = 0
    cartvar.forEach(function (e) {
        let findingProducts = products.find(obj => obj.id === e.id)
        if (findingProducts.discountPrice > 0) {
            sum = sum + findingProducts.discountPrice * e.quantity
        } else {
            sum = sum + findingProducts.price * e.quantity
        }
    })
    console.log(sum)
    document.getElementById("total-price").innerHTML = sum + "DKK"
}
//handles the functionality of the chekout button in the cart page
function checkOut() {
    let cartCheck = JSON.parse(sessionStorage.getItem("products"));
    if (sessionStorage.getItem("user") && user.includes("@")) {
        if (cartCheck[0]){
 window.location.href = "checkout.html"
        }
    } else {
        window.location.href = "loginForm.html"
    }
}
