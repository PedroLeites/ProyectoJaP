document.getElementById("nombreUsuario").innerHTML = localStorage.getItem("usuario");

infoProduct = [];
commentsList = [];

function showProductInfo(){
  let htmlContentToAppend = "";
  htmlContentToAppend = `
  <div class="row">
    <h1>${infoProduct.name}</h1>
    <hr>
    <p class="mb-1 fw-bold">Precio:</p>
    <p>${infoProduct.currency} ${infoProduct.cost}</p>
    <p class="mb-1 fw-bold">Descripción:</p>
    <p>${infoProduct.description}</p>
    <p class="mb-1 fw-bold">Categoría:</p>
    <p>${infoProduct.category}</p>
    <p class="mb-1 fw-bold">Cantidad vendidos:</p>
    <p>${infoProduct.soldCount}</p>
    <p class="mb-1 fw-bold">Imagenes ilustrativas:</p>
  </div>
  `
  document.getElementById("ProductInfo").innerHTML = htmlContentToAppend;

  let ImgsHTML = "";
  for (let img of infoProduct.images){
    ImgsHTML += `
    <div class="col">
      <img src="${img}" alt="imgProducto" class="img-thumbnail">
    </div>
    `
    document.getElementById("ProductImgs").innerHTML = ImgsHTML;
  }
}

document.addEventListener("DOMContentLoaded", function(e){
  let productID = localStorage.getItem("productID");
  getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function(resultObj){
    if (resultObj.status == "ok"){
      infoProduct = resultObj.data;
      showProductInfo();
    }
  });
});

document.addEventListener("DOMContentLoaded", function(e){
  let productID = localStorage.getItem("productID");
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function(resultObj){
    if (resultObj.status == "ok"){
      commentsList = resultObj.data;
      showProductComments();
    }
  });
});