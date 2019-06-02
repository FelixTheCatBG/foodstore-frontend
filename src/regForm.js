let user
//updates the imput information
function inputUpdate() {
    let emailInput = document.getElementById("inputEmail").value
    let passwordInput = document.getElementById("inputPassword").value

    user = JSON.stringify({
        "email": emailInput,
        "password": passwordInput,

    })
    console.log(user)
} inputUpdate()
console.log(sessionStorage.getItem("response"));
//Attaches functionality to the register button in the registration form.
document.getElementById("regbtn").addEventListener("click", function (event) {
    if (document.getElementById("regbtn").classList.contains("disabled")) {
    } else {
        event.preventDefault();
        if (user !== undefined) {
            const Http = new XMLHttpRequest();
            const url = 'https://localhost:5001/api/account/createuser';
            Http.open("POST", url, true);
            Http.setRequestHeader("content-type", "application/json")
            Http.send(user)
            Http.onreadystatechange = (e) => {
                if (Http.status === 201) {
                    sessionStorage.setItem("response", Http.responseText);
                    console.log(sessionStorage.getItem("response"));
                    document.getElementById("alert-register").style.display = "block";
                     window.location.href ="#alert-register"
                    setTimeout(function () {
                        window.location.href = "loginForm.html"
                    }, 1000);

                } else {
                    let regError = document.getElementById("regError");
                    regError.innerHTML = "This email address already exists.";
                    regError.setAttribute("class", "text-danger");
                    sessionStorage.setItem("error", Http.responseText);
                    console.log(sessionStorage.getItem("error"));
                    //     alert(Http.responseText)
                }
            }
        }
    }
})