let categ = location.search.substring(10); //current category
let title = document.getElementById('categ-title')
let productdiv = document.getElementById('products')
title.innerHTML = '<h2>' + categ + '</h2>'
console.log(categ)
//generates the visual representation of the elements on the product page
function generateProducts() {
    productdiv.innerHTML = ""
    products.forEach(function (e) {
        if (e.category === categ) {
            let outerdiv = document.createElement('div');
            let divThumb = document.createElement('div');
            let divCaption = document.createElement('div');
            let buttonAdd = document.createElement('button')
            let label = document.createTextNode('Add to cart')
            let link = document.createElement('a');
            let image = document.createElement('img')
            let text = document.createTextNode(e.name)
            let newline = document.createElement("br")
            let textstyle = document.createElement('b')
            let p = document.createElement('p')
            let price = document.createTextNode(e.price + 'DKK')
            let discountPrice = document.createTextNode(" " + e.discountPrice + 'DKK')
            let s = document.createElement('s');
            let discountStyle = document.createElement('i')

            discountStyle.style.color = "red";
            discountStyle.appendChild(discountPrice)
            buttonAdd.appendChild(label);
            document.body.appendChild(buttonAdd);
            buttonAdd.setAttribute('class', 'btn btn-default')
            buttonAdd.addEventListener("click", function () {
                let products = []
                if (sessionStorage.getItem("products") && JSON.parse(sessionStorage.products).filter(p => p.id === e.id).length > 0) {
                    console.log("present")
                    products = JSON.parse(sessionStorage.products)
                    products.forEach(function (p) {
                        if (p.id === e.id) {
                            p.quantity = p.quantity + 1
                        }
                    })
                    sessionStorage.setItem("products", JSON.stringify(products));
                    generateMiniItem()
                } else {
                    if (sessionStorage.getItem("products")) {
                        products = JSON.parse(sessionStorage.products)
                        products.push({ id: e.id, quantity: 1 })
                        sessionStorage.setItem("products", JSON.stringify(products));
                        generateMiniItem()
                    } else {
                        products.push({ id: e.id, quantity: 1 })
                        sessionStorage.setItem("products", JSON.stringify(products));
                        generateMiniItem()
                    }
                    console.log(JSON.parse(sessionStorage.products).includes({ id: e.id, quantity: 1 }))
                } console.log(JSON.parse(sessionStorage.products))
            });

            divCaption.appendChild(textstyle)
            divCaption.appendChild(p)
            divThumb.setAttribute('class', 'thumbnail');
            divCaption.setAttribute('class', 'caption text-center');
            outerdiv.setAttribute('class', 'col-md-3 col-sm-6');
            outerdiv.style.marginBottom = '20px'
            image.setAttribute('src', 'img/' + e.id + '.png')
            image.setAttribute('class', 'img-responsive')
            image.setAttribute('width', "100%")
            link.title = e.name;
            link.href = ""
            textstyle.setAttribute('class', 'text-center')

            p.appendChild(buttonAdd)
            textstyle.appendChild(text)
            textstyle.appendChild(newline)
            s.appendChild(price)
            if (e.discountPrice > 0) {
                textstyle.appendChild(s)
                textstyle.appendChild(discountStyle)
            } else { textstyle.appendChild(price) }
            link.appendChild(image)
            divCaption.appendChild(textstyle)
            divCaption.appendChild(p)
            divThumb.appendChild(link)
            divThumb.appendChild(divCaption)
            outerdiv.appendChild(divThumb)

            productdiv.appendChild(outerdiv);
        }
    })
}
//generates the items in the categories side navigation
let sideNav = document.getElementById('sidenav');
function generateCategories(categs) {
    sideNav.innerHTML = ""
    categs.forEach(function (e) {
        let link = document.createElement('a');
        let text = document.createTextNode(e)
        link.title = e;
        link.href = 'category.html?category=' + e;
        if (categ === e) {
            link.setAttribute("class", "activeTab")
        }
        link.appendChild(text)

        sideNav.appendChild(link);
    })
}
