let user
//updates according to input
function inputUpdate() {
    let emailInput = document.getElementById("inputEmail").value
    let passwordInput = document.getElementById("inputPassword").value
    user = JSON.stringify({
        "email": emailInput,
        "password": passwordInput
    })
    console.log(user)
}
//adds functionality to the login button on the login page
console.log(sessionStorage.getItem("user"));
document.getElementById("loginbtn").addEventListener("click", function (event) {
    if (document.getElementById("loginbtn").classList.contains("disabled")){
    }else{
        event.preventDefault();
    if (user !== undefined) {
        const Http = new XMLHttpRequest();
        const url = 'https://localhost:5001/api/account/login';
        Http.open("POST", url, true);
        Http.setRequestHeader("content-type", "application/json")
        Http.send(user)
        Http.onreadystatechange = (e) => {
            if (Http.status === 200) {
                sessionStorage.setItem("user", JSON.parse(Http.responseText).userEmail);
                console.log(sessionStorage.getItem("user"));
                document.getElementById("alert-login").style.display = "block"; 
                window.location.href ="#alert-login"
                setTimeout(function () {
                  window.location.href = "index.html"
                }, 1000);  
            }
            else {
                let errorMessage = document.getElementById("help-block");
                errorMessage.innerHTML = "Incorect username or password.";
                errorMessage.setAttribute("class", "text-danger");
                sessionStorage.setItem("error", Http.responseText);
                console.log(sessionStorage.getItem("error"));
                alert(JSON.parse(Http.responseText))
            }
        }
        Http.onerror = function () {
         //  alert(Http.responseText)
        }
    }}
})
