/*

let listaProductos = [];
let min = undefined;
let max = undefined;
/*
function filtarProductos(listaProductos) {
  let listaFiltrada = filter(
    (producto) =>
      (parseInt(producto.cost) >= min || min == undefined) &&
      (parseInt(producto.cost) <= max || max == undefined)
  );
  return listaFiltrada;
}*/
document.getElementById("nombreUsuario").innerHTML =
  localStorage.getItem("usuario");

let listado = [];
let min = undefined;
let max = undefined;
let search = "";

let catID = localStorage.getItem("catID");
const productosJSON =
  "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json";

function mostrarProductos(listaProductos) {
  fetch(productosJSON)
    .then((respuesta) => respuesta.json())

    .then((listaProductos) => {
      let nombreCat = listaProductos.catName;
      document.getElementById("catNom").innerHTML = nombreCat;

      listaProductos.products.forEach((producto) => {
        let row = "";
        row =
          `<div class="list-group-item list-group-item-action cursor-active">
      <div class="row">
        <div class="col-3">
          <img src="` +
          producto.image +
          `" alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
              <h4>` +
          producto.name +
          ` - ` +
          producto.currency +
          " " +
          producto.cost +
          `</h4>
              <p>` +
          producto.description +
          `</p>
            </div>
            <small class="text-muted">` +
          producto.soldCount +
          ` vendidos</small>
          </div>
        </div>
      </div>
    </div>`;
        document.getElementById("products-container").innerHTML += row;
      });
    })
    .catch((error) => alert("Hubo un error" + error));
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(productosJSON).then((resultObj) => {
    if (resultObj.status === "ok") {
      listado = resultObj.data;
      mostrarProductos(listado);
    } else {
      alert("Error");
    }
  });

  document.getElementById("precioDesc").addEventListener("click", function () {
    console.log("bonton desc ");
    listado.sort(function (a, b) {
      return parseInt(b.cost) - parseInt(a.cost);
    });
    mostrarProductos(listado);
  });
});
