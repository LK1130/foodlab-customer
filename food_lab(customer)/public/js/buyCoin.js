$(document).ready(function () {

var modal = document.getElementById('modal5');
var modal2 = document.getElementById('modal6');
var coinInput = document.getElementById('ccalcul');
var mmkInput = document.getElementById('mmkcalcul');
var coinRate = document.getElementById('coinratedata');
var coinChargeinput= document.getElementById('coinChargeinput');
var fileimginput=document.getElementById('formFile');
var reset= document.getElementById('reset');
var error=document.getElementById('errorBox');
var submit = document.getElementById('submitbtn');
var coin_body = document.getElementsByClassName('coins');
var mmk = document.getElementsByClassName("mmk");
var aftercoinSum=0;
var aftermmkSum=0;

coinInput.addEventListener("keyup" , function (){
    aftercoinSum = coinInput.value * coinRate.innerHTML;
    mmkInput.value= aftercoinSum;
    coinChargeinput.value=coinInput.value; 
})
coinChargeinput.addEventListener("keyup" , function (){
    aftercoinSum = coinChargeinput.value * coinRate.innerHTML;
    mmkInput.value= aftercoinSum;
    coinInput.value=coinChargeinput.value; 
})

mmkInput.addEventListener("keyup" , function (){
    aftermmkSum = mmkInput.value/coinRate.innerHTML;
    coinInput.value = aftermmkSum;
    coinChargeinput.value=coinInput.value; 
})
reset.addEventListener("click" , function (){
    coinChargeinput.value="";
    coinInput.value="";
    mmkInput.value="";  
    fileimginput.value="";

})
coinChargeinput.addEventListener('input',validate);
fileimginput.addEventListener('input',validate);


$('#submitbtn').click(function(e){
    e.preventDefault();

    
    let coins = $('#coinChargeinput').val();
    let sum = $('#mmkcalcul').val();
    let result =`<span><i class="fas fa-check-circle text-success mx-2"></i></span>
    <span> Do you want to buy ${coins} coins for ${sum} MMK?</span>`;
   
    $('#coins').append(result);

    

});

$('.backBtn').click(function(){
    coinChargeinput.value="";
    coinInput.value="";
    mmkInput.value="";  
    fileimginput.value="";
    
    validate();
    $('#coins').empty();
});


$('.chargeBtn').click(function(e){
    e.preventDefault();
});

function validate(){

    if(coinChargeinput.value === "" ||  fileimginput.value === ""){
        submit.setAttribute("disabled","disabled");
    }else{
        submit.removeAttribute("disabled"); 
    }
}

// $(".modal").each(function (l) {
    $("#modal5").on("show.bs.modal", function (l) {
      var o = $("#modal5").attr("data-easein");
      "shake" == o
        ? $(".modal-dialog").velocity("callout." + o)
        : "pulse" == o
        ? $(".modal-dialog").velocity("callout." + o)
        : "tada" == o
        ? $(".modal-dialog").velocity("callout." + o)
        : "flash" == o
        ? $(".modal-dialog").velocity("callout." + o)
        : "bounce" == o
        ? $(".modal-dialog").velocity("callout." + o)
        : "swing" == o
        ? $(".modal-dialog").velocity("callout." + o)
        : $(".modal-dialog").velocity("transition." + o);
    });
//   });
});



