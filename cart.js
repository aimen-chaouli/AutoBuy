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
var products=JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById("table");
var total = 0;

 //HTML
 function tableHTML(i){
     return `
     
             <tr>
             <th scope="row">${i+1}</th>
             <td><img style ="width:90px;" src="${products[i].url}"></td>
             <td>${products[i].name}</td>
             <td>1</td>
             <td>${products[i].price}</td>
             </tr>
     `;
 }

 //BUY
 function buy(){
     var d= new Date();
     var t= d.getTime();
     var counter=t;
     counter+=1;
     let db=firebase.database().ref("order/"+counter);
     let itemdb = {
         id:counter,
         order:counter-895,
         total:total
     }
     db.set(itemdb);
     swal({
      position:'center',
      type:'success',
      title:'Purchase made successfully',
      text:`Your purchase order is: ${itemdb.order}`,
      showConfirmButton:true,
      timer:5000

     });
     clean();
 }

 //CLEAN 
 function clean(){

     localStorage.clear();
     for (let index = 0; index < products.length; index++) {
         table.innerHTML+= tableHTML(index);
         total=total+parseInt(products[index].price);
         
     }
     total=0;
     table.innerHTML=`
            <tr>
             <th></th>
             <th></th>
             <th></th>
             <th></th>
             <th></th>
             </tr>
     `;
     cart_n.innerHTML='';
     document.getElementById("btnBuy").style.display="none";
     document.getElementById("btnClean").style.display="none";
 }


  //RENDER
function render(){
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHTML(index);
        total=total+parseInt(products[index].price);
    }
    table.innerHTML+=`
            <tr>
             <th scope="col"></th>
             <th scope="col"></th>
             <th scope="col"></th>
             <th scope="col"></th>
             <th scope="col">Total: DZD ${total}.00</th>
             </tr>
             <tr>
             <th scope="col"></th>
             <th scope="col"></th>
             <th scope="col"></th>
             <th scope="col"></th>
             <button id="btnClean" onclick="clean()" class="btn text-white btn-warning">Clear Shopping Cart
             </button>
             </th>
             <th scope="col"><button id="btnBuy" onclick="buy()" class="btn btn-success">Buy</button></th>
             </tr>
    
             `;
             
        products=JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
}