//FIREBASE
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




function renderTable(){
   var order = firebase.database().ref("order/"); 
   order.on("child_added",function(data){
       var orderValue=data.val();
       document.getElementById("table").innerHTML+=`
        <tr>
         <td>${orderValue.id}</td>
         <td>${orderValue.order}</td>
         <td>${orderValue.total}</td>
        </tr>       
       `;

   });
};