//available pickup times
let available = ["08:15","08:45","09:15", "09:45", "10:15", "10:45", "11:15", "11:45", "12:15", "12:45", "13:15"
    , "13:45", "14:15", "14:45", "15:15", "15:45", "16:15", "16:45",
    "17:15", "17:45", "18:15", "18:45","17:15", "17:45", "23:15"]
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let resTime
let takeAway = false
document.getElementById("takeAway").checked =false
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
console.log(today);
// adds the appropriate items in the time selection dropdown menu
time = document.getElementById("dropdowntime")
function generateDropdown() {
    time.innerHTML = ""
    available.forEach(function (e) {
        if (parseInt(e.substring(0, 2)) > today.getHours()) {
            let li = document.createElement("li")
            let a = document.createElement("a")
            a.addEventListener("click", function () {
                selectTime(e)
            })
            a.innerHTML = e
            li.appendChild(a)
            time.appendChild(li)
        }
    })
}
generateDropdown()
// sets the selected time based on the input from the dropdown
function selectTime(e) {
    resTime = e
    document.getElementById("displayDate").innerHTML="Your selected pickup time: "+e
}
// sets if the order should be takeaway
function isTakeAway(){
     takeAway = document.getElementById("takeAway").checked
    console.log(takeAway)
}
// places the order based on the given parameters
function placeOrder() {
      if(resTime!==undefined){
    let order
    order = JSON.stringify({
        "info": {
            "reservationTime": yyyy + "-" + mm + "-" + dd + "T" + resTime + ":" + "00",
            "totalPrice": sum,
            "takeAway": takeAway,
            "email": sessionStorage.getItem("user")
        },
        "products": cart 
    })
console.log(order)
    if (user !== undefined) {
        const Http = new XMLHttpRequest();
        const url = 'https://localhost:5001/api/showcase/createorder';
        Http.open("POST", url, true);
        Http.setRequestHeader("content-type", "application/json")
        Http.send(order)
        Http.onreadystatechange = (e) => {
            if (Http.status === 201) {
                   sessionStorage.removeItem("products");
                   window.location.href = "myOrders.html"
            } else {
                sessionStorage.setItem("error", Http.responseText);
                console.log(sessionStorage.getItem("error"));
             alert(JSON.parse(Http.responseText).Products)
            }
        }
    }}
}

