const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COST = "Precio";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function showProductslist(){
  let htmlContentToAppend = "";
  for (let product of currentProductsArray){
        
      if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
          ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

      htmlContentToAppend += `
      <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
              <div class="col-3">
                  <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                      <small class="text-muted">${product.soldCount} vendidos</small>
                  </div>
                  <p class="mb-1">${product.description}</p>
              </div>
          </div>
      </div>
      `
          }
          
          document.getElementById("products-container").innerHTML = htmlContentToAppend;
  }

}

function sortProducts(criteria, array){
  let listaFiltrada = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
      listaFiltrada = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
      listaFiltrada = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
      listaFiltrada = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return listaFiltrada;
}

function sortAndShowProductslist(sortCriteria, productosListArray){
  currentSortCriteria = sortCriteria;

  if(productosListArray != undefined){
    currentProductsArray = productosListArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);


  showProductslist();
}

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        sortAndShowProductslist(ORDER_ASC_BY_COST, resultObj.data.products);
    } 
  });

  document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProductslist(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProductslist(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProductslist(ORDER_BY_PROD_COST);
  });
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterPriceMin").value = "";
  document.getElementById("rangeFilterPriceMax").value = "";

  minCount = undefined;
  maxCount = undefined;

  showProductslist();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){

  minCount = document.getElementById("rangeFilterPriceMin").value;
  maxCount = document.getElementById("rangeFilterPriceMax").value;

  if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
      minCount = parseInt(minCount);
  }
  else{
      minCount = undefined;
  }

  if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
      maxCount = parseInt(maxCount);
  }
  else{
      maxCount = undefined;
  }

  showProductslist();
});

document.getElementById("nombreUsuario").innerHTML = localStorage.getItem("usuario");

let arrayOriginal = currentProductsArray;
document.getElementById("searchBar").addEventListener("keyup", function () {
  filterSerch = document.getElementById("searchBar").value;
  
  if (filterSerch != undefined) {
    arrayOriginal = currentProductsArray;
    currentProductsArray = currentProductsArray.filter(function (elemento) {
      return elemento.name.toLowerCase().includes(filterSerch.toLowerCase());
    })
  }
  showProductslist();
  
  currentProductsArray = arrayOriginal;
})

function setProductID(id){
  localStorage.setItem("productID", id);
  window.location.href = "product-info.html"
}