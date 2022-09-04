function login() {
  let mail = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let bool = true;

  if (mail.length < 1) {
    alert("Falta email");
    bool = false;
  }

  if (pass.length < 1) {
    alert("Falta contraseña");
    bool = false;
  }

  if (bool) {
    window.location.href = "inicio.html";
  }

  localStorage.setItem("usuario", mail);
}
/*
let mail = document.getElementById("email").value;
let pass = document.getElementById("password").value;
let btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", login);

function login() {
  if (mail.length > 0 && pass.length > 0) {
    console.log("hola");
    window.location.href = "inicio.html";
  } else {
    console.log("Falta algo");
    //window.location.href = "inicio.html";
  }
}
*/
