//Retrieves the current user's orders
let orderUser
orderUser = JSON.stringify({

    "email": sessionStorage.getItem("user")

})

if (user !== undefined) {
    const Http = new XMLHttpRequest();
    const url = 'https://localhost:5001/api/showcase/getorders';
    Http.open("POST", url, true);
    Http.setRequestHeader("content-type", "application/json")
    Http.send(orderUser)
    Http.onreadystatechange = (e) => {
        if (Http.status === 200) {
            console.log(Http.responseText);
            let orders = JSON.parse(Http.responseText)
            generateOrder(orders)
        } else {
            sessionStorage.setItem("error", Http.responseText);
            console.log(sessionStorage.getItem("error"));
            alert(Http.responseText)
        }
    }
}
//generates the visual representaton of the orders
createdOrder = document.getElementById("orders")
function generateOrder(orders) {
    createdOrder.innerHTML = ""
    orders.forEach(function (e) {
        let trElement = document.createElement("tr");
        let tdElementID = document.createElement("td");
        let tdElementDate = document.createElement("td");
        let tdElementTakeAway = document.createElement("td");
        let tdElementTotal = document.createElement("td");
        let tdElementStatus = document.createElement("td");

        let resdate = new Date(e.reservationTime)

        let d = resdate.getDate()
        let m = resdate.getMonth()
        let y = resdate.getFullYear()
        let h = resdate.getHours()
        let min = resdate.getMinutes()
        tdElementID.innerHTML = e.id;
        tdElementDate.innerHTML =  d+"."+m+"."+y+", "+h+":"+min
        let takeAwayLabel=""
        if(e.takeAway=true){
            takeAwayLabel="Yes"
        }else{
            takeAwayLabel="No"
        }
        tdElementTakeAway.innerHTML = takeAwayLabel;
        tdElementTotal.innerHTML = e.totalPrice + "DKK";
        console.log(d+"."+m+"."+y+"  "+h+":"+min)
        tdElementStatus.innerHTML = e.status
        if(e.status==="Accepted"){
        tdElementStatus.style.color = "green"
        }

        trElement.appendChild(tdElementID);
        trElement.appendChild(tdElementDate);
        trElement.appendChild(tdElementTakeAway);
        trElement.appendChild(tdElementTotal);
        trElement.appendChild(tdElementStatus);

        createdOrder.appendChild(trElement);


    });
}
