let user = sessionStorage.user
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let profile = document.getElementById("profile");
let myorders = document.getElementById("myorders")
if (sessionStorage.getItem("user") && user.includes("@")) {
    login.style.display = "none";
    signup.style.display = "none";
    profile.style.display = "block";
    myorders.style.display = "block";
    document.getElementById("email").innerHTML = sessionStorage.getItem("user")
} else {
    login.style.display = "block";
    signup.style.display = "block";
    profile.style.display = "none";
    myorders.style.display = "none";
}

function logoutUser() {
    const Http = new XMLHttpRequest();
    const url = 'https://localhost:5001/api/account/logout';
    Http.open("POST", url, true);
    Http.setRequestHeader("content-type", "application/json")
    Http.send()
    Http.onreadystatechange = (e) => {
        if (Http.status === 200) {
            sessionStorage.removeItem("user");
            console.log(sessionStorage.getItem("user"));
            window.location.href = "index.html"
        } else {
            sessionStorage.setItem("error", Http.responseText);
            console.log(sessionStorage.getItem("error"));
            alert(Http.responseText)
        }
    }
}