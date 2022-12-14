//document.getElementById("nombreUsuario").innerHTML = localStorage.getItem("usuario");

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

function showProductComments(){
  commentsHTML = "";
  for (let comment of commentsList){
    commentsHTML += `
    <li class="list-group-item">
      <p class="mb-1"><span class="fw-bold">${comment.user}</span> &nbsp&nbsp ${comment.dateTime} &nbsp&nbsp ${showStars(comment.score)}</p>
      <p class="mb-1">${comment.description}</p>
    </li>
    `
  }
  document.getElementById("Comments").innerHTML = commentsHTML;
}

function showStars(score){
  let scoreHTML = "";
  for (let i = 1; i <= 5; i++){
    if (i <= score){
      scoreHTML += `
      <span class="fa fa-star checked"></span>
      `
    }else{
      scoreHTML += `
      <span class="fa fa-star"></span>
      `
    }
  }
  return scoreHTML;
}

document.getElementById("sendComment").addEventListener("click", function(){
  let comentario = document.getElementById("comment").value;
  let puntos = document.getElementById("score").value;

  let date = new Date();
  let fechaCompleta = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  let nuevoComentario = `
  <li class="list-group-item">
    <p class="mb-1"><span class="fw-bold">${localStorage.getItem("usuario")}</span> &nbsp&nbsp ${fechaCompleta} &nbsp&nbsp ${showStars(puntos)}</p>
    <p class="mb-1">${comentario}</p>
  </li>
  `

  document.getElementById("newComment").innerHTML = nuevoComentario;
});

document.addEventListener("DOMContentLoaded", function(e){
  let productID = localStorage.getItem("productID");
  getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function(resultObj){
    if (resultObj.status == "ok"){
      infoProduct = resultObj.data;
      showProductInfo();
      mostrarProductosRel();
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function(resultObj){
    if (resultObj.status == "ok"){
      commentsList = resultObj.data;
      showProductComments();
    }
  });
});
/*
document.addEventListener("DOMContentLoaded", function(e){
  let productID = localStorage.getItem("productID");
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function(resultObj){
    if (resultObj.status == "ok"){
      commentsList = resultObj.data;
      showProductComments();
    }
  });
});*/

function mostrarProductosRel(){
  let htmlContentToAppend = "";
  for (let producto of infoProduct.relatedProducts){
    htmlContentToAppend += `
      <div onclick="setProductID(${producto.id})" class="card col-sm-1 cursor-active" style="width: 18rem;">
        <img src="${producto.image}" class="card-img-top" alt="img">
        <div class="card-body">
          <p class="card-text">${producto.name}</p>
        </div>
      </div>
    `;
  }
  document.getElementById("ProductosRela").innerHTML = htmlContentToAppend;
}
