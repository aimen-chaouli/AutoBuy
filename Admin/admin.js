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
  var d = new Date();
  var t = d.getTime();
  var counter = t;

  //FORM
  document.getElementById("form").addEventListener("submit",(e)=>{
    var order =  document.getElementById("order").value;
    var total = document.getElementById("total").value;
    e.preventDefault();
    createOrder(order,total);
    form.reset();
  });

  //CREATE NEW ORDER
  function createOrder(order,total){
      console.log(counter);
      counter+=1;
      console.log(counter);
      var newOrder ={
          id:counter,
          order:order,
          total:total
        }
      let db=firebase.database().ref("order/"+counter);
      db.set(newOrder);
      document.getElementById("cardSection").innerHTML='';
      readOrder();
  }


function readOrder (){
   var order = firebase.database().ref("order/");
   order.on("child_added",function(data){
      var orderValue = data.val();
      document.getElementById("cardSection").innerHTML+=`
      <div class="card mb-3">
       <div class="card-body">
        <h5 class="card-title">Order: ${orderValue.order}</h5>
        <p class="card-text">Total: ${orderValue.total}</p>
        <button type="submit" style="color:white" class="btn btn-warning"
         onclick="updateOrder(${orderValue.id},'${orderValue.order}','${orderValue.total }')"><i 
         class="fas fa-edit"></i>
        Edit Order</button> 
        <button type="submit" class="btn btn-danger"
         onclick="deleteOrder(${orderValue.id})"><i 
         class="fas fa-trash-alt"></i>
        Delete Order</button> 
        <div></div>


      `
   });
};
function reset(){
  document.getElementById("firstSection").innerHTML=`
               <form class="border p-4 mb-4" id="form">
                       <div class="form-group">
                           <label>Order</label>
                           <input type="text" class="form-control" id="order" placeholder="Add Order">
                       </div>
                       <div class="form-group">
                        <label>Total</label>
                        <input type="text" class="form-control" id="total" placeholder="Add total">
                    </div>
             <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus">Add Order</i>
                    </button>
                    <button style="display:none" id="button2" class="btn btn-success">Update Order</button>
                    <button style="display:none" id="button3" class="btn btn-success">Cancel</button>
                   </form>


  `;
  document.getElementById("form").addEventListener("submit",(e)=>{
    var order =  document.getElementById("order").value;
    var total = document.getElementById("total").value;
    e.preventDefault();
    createOrder(order,total);
    form.reset();
  });
}
function updateOrder(id,order,total){
  document.getElementById("firstSection").innerHTML=`
   
  <form class="border p-4 mb-4" id="form2">
  <div class="form-group">
      <label>Order</label>
      <input type="text" class="form-control" id="order" placeholder="Add Order">
  </div>
  <div class="form-group">
   <label>Total</label>
   <input type="text" class="form-control" id="total" placeholder="Add total">
</div>
<button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus">Add Order</i>
</button>
<button id="button2" class="btn btn-success">Update Order</button>
<button id="button3" class="btn btn-success">Cancel</button>
</form>
           `;
           document.getElementById("form2").addEventListener("submit",(e)=>{
            e.preventDefault();
            
          });
          document.getElementById("button3").addEventListener("click",(e)=>{
         reset();
          });
          document.getElementById("button2").addEventListener("click",(e)=>{
            updateOrder2(id,document.getElementById("order").value,
            document.getElementById("total").value);
             });
             document.getElementById("order").value=order;
             document.getElementById("total").value=total;

}
function updateOrder2(id,order,total){
  var orderUpdated ={
    id:id,
    order:order,
    total:total
  }
  let db=firebase.database().ref("order/"+id);
  db.set(orderUpdated);
  document.getElementById("cardSection").innerHTML="";
  readOrder();
  reset();

}
function deleteOrder(id){
  console.log(id);
  var order= firebase.database().ref("order/"+id);
  order.remove();
  reset();
  document.getElementById("cardSection").innerHTML="";
  readOrder();

}
