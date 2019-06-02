//generates the categories based on the existing categories
let categsdiv = document.getElementById('categories');
function generateCategories(categs) {
    categsdiv.innerHTML = ""
    console.log(categs)
    categs.forEach(function (e) {
        let divOuter = document.createElement('div');
        let divThumb = document.createElement('div');
        let divCaption = document.createElement('div');
        let link = document.createElement('a');
        let image = document.createElement('img')
        let text = document.createTextNode(e)
        let btn = document.createElement('a')
        let newline = document.createElement("br")
        let h3 = document.createElement('h3')
        let label = document.createTextNode('More Info')
        let p = document.createElement('p')
        divOuter.setAttribute('class', 'col-md-3 col-sm-6');
        divThumb.setAttribute('class', 'thumbnail');
        divCaption.setAttribute('class', 'caption');
        image.setAttribute('class', 'img-responsive')
        image.setAttribute('src', 'img/' + e + '.png')
        image.setAttribute('width', "100%")
        h3.setAttribute('class', 'text-center')
        p.setAttribute('class', 'text-center')
        h3.appendChild(text)
        btn.setAttribute('class', 'btn btn-default')
        btn.href = 'category.html?category=' + e;
        btn.appendChild(label)
        p.appendChild(btn)
        link.title = e;
        link.href = 'category.html?category=' + e;

        divCaption.appendChild(h3)
        divCaption.appendChild(p)
        link.appendChild(image)
        divThumb.appendChild(link)
        divThumb.appendChild(divCaption)
        divOuter.appendChild(divThumb)

        categsdiv.appendChild(divOuter);
    })
}