var firebaseConfig = {
    apiKey: "AIzaSyAQBzkNdAQDAzDBITi-fvf4hx16clS8IxE",
    authDomain: "autobuy-9a544.firebaseapp.com",
    projectId: "autobuy-9a544",
    storageBucket: "autobuy-9a544.appspot.com",
    messagingSenderId: "581143871456",
    appId: "1:581143871456:web:0b83d8e14028fbb167b585",
    measurementId: "G-5T2HP75TY6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  //GLOBAL
  var products =[];
  var carItems =[];
  var cart_n = document.getElementById('cart_n');

  //DIVS
  var hatchbackDiv = document.getElementById("hatchbackDiv");
  var SedansDiv = document.getElementById("SedansDiv");
  var suvDiv = document.getElementById("suvDiv");

  //INFORMATIONS
  var Hatchback = [
      {name:'VOLKSWAGEN Golf' ,price:2200000},
      {name:'SEAT Leon' ,price:2430000},
      {name:'TOYOTA Yaris' ,price:1600000}];
  var Sedans = [
      {name:'TOYOTA Corolla' ,price:2330000},
      {name:'VOLKSWAGEN Passat' ,price:2643000},
      {name:'MERCEDES C Class' ,price:5400000},
  ];
  var SUV = [
    {name:'Audi Q5' ,price:6550000},
    {name:'BMW X5' ,price:6800000},
    {name:'TOYOTA Rav4' ,price:4550000}
  ];

  //HTML

  function HTMLhatchbackProducts(con){
      let URL = `img/Hatchback/Hatchback1${con}.jpg`;
      let btn = `btnHatchback${con}`;
      return`
      <div class = "col-md-4">
      <div class="card mb-4 shadow-sm">
      <img class="card-img-top" style="height:16rem;" src="${URL}"
      alt="Card image cap">
      <div class ="card-body">
      <i style="color:orange;" class="fa fa-star"></i>
      <i style="color:orange;" class="fa fa-star"></i>
      <i style="color:orange;" class="fa fa-star"></i>
      <i style="color:orange;" class="fa fa-star-half"></i>
      <p class="card-text">${Hatchback[con-1].name}</p>
      <p class="card-text">Price: ${Hatchback[con-1].price}.00</p>
      <div class="d-flex justify-content-between align-items-center">
         <div class="btn-group">
            <button type="button" onclick="cart2('${Hatchback[con-1].name}','${Hatchback[con-1].price}','${URL}',
             '${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a
             href="cart.html" style="color:inherit;">Buy</a></button>
             <button id="${btn}" type="button" onclick="cart('${Hatchback[con-1].name}','${Hatchback[con-1].price}',
              '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
         </div>
        <small class="text-muted">Free Shipping</small>
        </div>
        </div>
       </div>
       </div>
      `
}

function HTMLSedansProducts(con){
    let URL = `img/SEDANS/SEDANS1${con}.jpg`;
    let btn = `btnSedans${con}`;
    return`
    <div class = "col-md-4">
    <div class="card mb-4 shadow-sm">
    <img class="card-img-top" style="height:16rem;" src="${URL}"
    alt="Card image cap">
    <div class ="card-body">
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <p class="card-text">${Sedans[con-1].name}</p>
    <p class="card-text">Price: ${Sedans[con-1].price}.00</p>
    <div class="d-flex justify-content-between align-items-center">
       <div class="btn-group">
          <button type="button" onclick="cart2('${Sedans[con-1].name}','${Sedans[con-1].price}','${URL}',
           ,'${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a
           href="cart.html" style="color:inherit;">Buy</a></button>
           <button id="${btn}" type="button" onclick="cart('${Sedans[con-1].name}','${Sedans[con-1].price}',
            '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
       </div>
      <small class="text-muted">Free Shipping</small>
      </div>
      </div>
     </div>
     </div>
    `
}
function HTMLSUVProducts(con){
    let URL = `img/SUV/SUV1${con}.jpg`;
    let btn = `btnSUV${con}`;
    return`
    <div class = "col-md-4">
    <div class="card mb-4 shadow-sm">
    <img class="card-img-top" style="height:16rem;" src="${URL}"
    alt="Card image cap">
    <div class ="card-body">
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <i style="color:orange;" class="fa fa-star"></i>
    <p class="card-text">${SUV[con-1].name}</p>
    <p class="card-text">Price: ${SUV[con-1].price}.00</p>
    <div class="d-flex justify-content-between align-items-center">
       <div class="btn-group">
          <button type="button" onclick="cart2('${SUV[con-1].name}','${SUV[con-1].price}','${URL}',
           ,'${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a 
            href="cart.html" style="color:inherit;">Buy</a></button>
           <button id="${btn}" type="button" onclick="cart('${SUV[con-1].name}','${SUV[con-1].price}',
            '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
       </div>
      <small class="text-muted">Free Shipping</small>
      </div>
      </div>
     </div>
     </div>
    `
}

//ANIMATION
function animation(){
    const toast=swal.mixin({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:1000

    });
    toast({
      type:'success',
      title:'Added to shopping cart'
    });
}

//CART FUNCTIONS
function cart(name,price,url,con,btncart) {
    var item={
        name:name,
        price:price,
        url:url
    }
    carItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    else{
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
        products= JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
        document.getElementById(btncart).style.display ="none";
        animation();
    }

function cart2(name,price,url,con,btncart){
    var item={
        name:name,
        price:price,
        url:url
    }
    carItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    else{
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    products= JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
        document.getElementById(btncart).style.display ="none";
}

//RENDER
function render(){
   for(let index =1; index<=3; index++){
    hatchbackDiv.innerHTML+=`${HTMLhatchbackProducts(index)}`;
   }
   for(let index =1; index<=3; index++){
    SedansDiv.innerHTML+=`${HTMLSedansProducts(index)}`;
   }
   for(let index =1; index<=3; index++){
    suvDiv.innerHTML+=`${HTMLSUVProducts(index)}`;
   }
    if (localStorage.getItem("cart")==null) {
        }
        else{
            products=JSON.parse(localStorage.getItem("cart"));
            cart_n.innerHTML=`[${products.length}]`;
        }
};