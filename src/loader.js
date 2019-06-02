function loading() {
  document.getElementById("loader").style.display = "block";
  console.log("loading")
}

function loaded() {
  document.getElementById("loader").style.display = "none";
} 


window.addEventListener("beforeunload", function(event) { 
    loading()
 });
 window.addEventListener("DOMContentLoaded", function(event) { 
    loading()
 });
 window.addEventListener("load", function(event) { 
    loaded()
 });

/*
window.addEventListener("load", function(event) { 
    loading()
 });

*/