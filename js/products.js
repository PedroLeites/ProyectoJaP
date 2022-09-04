const productosJSON =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(productosJSON)
  .then((respuesta) => respuesta.json())

  .then((datos) => {
    datos.products.forEach((producto) => {
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

document.getElementById("nombreUsuario").innerHTML =
  localStorage.getItem("usuario");
