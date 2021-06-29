var x = document.getElementById("email");
var p = document.getElementById("password");

document.getElementById("form").addEventListener("submit",(ee)=>{
    ee.preventDefault();
    console.log(x.value);
    console.log(p.value);

    if (x.value=="admin@gmail.com" && p.value=="admin") {
        swal({
            title:'Welcome',
            html:'Access Granted',
            type:'Success'
        });
        setTimeout(()=>{
            loadPage();
        },3000);
        
    }
    else{
        swal({
         title:'ERROR',
         html:'Access Denied',
         type:'Error'
        });
    }
    function loadPage(){
        window.location.href="./admin.html";
    }
});