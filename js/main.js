var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCatogry = document.getElementById("productCatogry");
var productDesc = document.getElementById("productDesc");
var tbody = document.getElementById("tableBody");
var Btn = document.getElementById("BtnMain");
var errors=``;
var productsContainer; //local
if (localStorage.getItem("productsList")==null) {
    productsContainer=[];
}
else{
    productsContainer = JSON.parse(localStorage.getItem("productsList"));
    displayProduct();
}

function addProduct() {

    if (CheckProduct() == true) {
        var product ={
            pName : productName.value,
            pPrice : productPrice.value,
            pCatogry : productCatogry.value,
            pDesc : productDesc.value
        }


        productsContainer.push(product);
        localStorage.setItem("productsList",JSON.stringify(productsContainer));
        displayProduct();
        //console.log(productsContainer);
         Clear();
    }
    else{
        window.alert("Please Write All Fields ..! ");
    }

   
}

function Clear() {
    productName.value="";
    productPrice.value="";
    productCatogry.value="";
    productDesc.value="";
}

function displayProduct() {
    var productList=``;

    for (var i =0; i <productsContainer.length;i++){
        productList+=`<tr>
        <td>${i}</td>
        <td>${productsContainer[i].pName}</td>
        <td>${productsContainer[i].pPrice}</td>
        <td>${productsContainer[i].pCatogry}</td>
        <td>${productsContainer[i].pDesc}</td>
        <td><button onclick="UpdateProduct(`+i+`)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(`+i+`);" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    tbody.innerHTML = productList;
}

function CheckProduct() {
    if (productName.value !=""&& productPrice.value !="" && productDesc.value !="" && productCatogry.value!="") {
        return true;
    }
    else{
        return false;
    }
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex,1);
    localStorage.setItem("productsList" , JSON.stringify(productsContainer));
    displayProduct();
}

function SearchProduct(productTerm) {
    var Items = ``;
    for(var i = 0 ; i <productsContainer.length; i++){
        if (productsContainer[i].pName.toLowerCase().includes(productTerm.toLowerCase())) {
            Items += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].pName}</td>
            <td>${productsContainer[i].pPrice}</td>
            <td>${productsContainer[i].pCatogry}</td>
            <td>${productsContainer[i].pDesc}</td>
            <td><button class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(`+i+`);" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
        
    }
    tbody.innerHTML=Items;
}


function UpdateProduct(productItems) {
    productName.value = productsContainer[productItems].pName;
    productPrice.value = productsContainer[productItems].pPrice;
    productCatogry.value = productsContainer[productItems].pCatogry;
    productDesc.value = productsContainer[productItems].pDesc;

    Btn.innerHTML="Update Product"

    Btn.onclick = function (){
        productsContainer[productItems].pName = productName.value;
        productsContainer[productItems].pPrice = productPrice.value;
        productsContainer[productItems].pCatogry = productCatogry.value;
        productsContainer[productItems].pDesc = productDesc.value;
        
        localStorage.setItem("productsList" , JSON.stringify(productsContainer));
        displayProduct();
        Clear();
        Btn.innerHTML="Add Product"

        Btn.onclick = addProduct;
    }
}

// function validationPName() {
//     var regex = /^[A-Z][a-z]{3,8}$/;
//     if (regex.test(productName.value)==true) {
//         return true;
//     }else
//     {
//         errors+=`<p> productName in-valid</p>`
//         return false;
//     }
    
// }