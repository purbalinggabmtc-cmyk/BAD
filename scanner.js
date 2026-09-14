const API_URL =
"https://script.google.com/macros/s/AKfycbyCwRWw3LaA7-nDq7CLQ_uDZK2n275Ad-a0O3qZI3VjglHTbEuV9E32DvWJWZw2XjzZ0w/exec";



let currentPeserta = null;


let scannerLocked = false;





function onScanSuccess(decodedText){



if(scannerLocked){

return;

}



scannerLocked = true;



currentPeserta = decodedText;



checkInPeserta(decodedText);



}








function checkInPeserta(idPeserta){



fetch(API_URL,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


action:"checkin",


data:{


idPeserta:idPeserta


}


})


})


.then(response=>response.json())


.then(result=>{


showCheckInResult(result);


})


.catch(error=>{


showError(
"Connection Error"
);


});



}









function showCheckInResult(result){



const box =
document.getElementById("result");


const merchBtn =
document.getElementById("merchBtn");


const nextBtn =
document.getElementById("nextBtn");





if(result.status){



playBeep();



box.className =
"result success";



box.innerHTML = `


<div class="result-icon">
✅
</div>


<h2>
CHECK IN BERHASIL
</h2>


<p>
ID:
${result.data.idPeserta}
</p>


<p>
Nama:
${result.data.nama || "-"}
</p>


<p>
Merch:
${result.data.merch}
</p>


<p>
Status:
${result.data.merchStatus}
</p>


`;





if(

result.data.merch

&&

result.data.merch !==
"Tidak ada pembelian"

){


merchBtn.style.display =
"block";


}

else{


nextBtn.style.display =
"block";


}



}



else{



showError(
result.message
);



nextBtn.style.display =
"block";


}



}









function takeMerch(){



fetch(API_URL,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


action:"merch",


data:{


idPeserta:
currentPeserta


}


})


})


.then(response=>response.json())


.then(result=>{


showMerchResult(result);


});



}









function showMerchResult(result){



const box =
document.getElementById("result");


const merchBtn =
document.getElementById("merchBtn");


const nextBtn =
document.getElementById("nextBtn");




if(result.status){



box.innerHTML += `


<hr>


<div>

✅ MERCH SUDAH DIBERIKAN

</div>


`;



merchBtn.style.display =
"none";


nextBtn.style.display =
"block";


}

else{


alert(
result.message
);


}



}









function nextScan(){



const box =
document.getElementById("result");


const merchBtn =
document.getElementById("merchBtn");


const nextBtn =
document.getElementById("nextBtn");



box.className =
"result waiting";



box.innerHTML = `


<div class="result-icon">
📷
</div>


Menunggu scan QR...


`;



merchBtn.style.display =
"none";


nextBtn.style.display =
"none";



currentPeserta = null;


scannerLocked = false;



}









function showError(message){



const box =
document.getElementById("result");



box.className =
"result error";


box.innerHTML = `


<div class="result-icon">
❌
</div>


${message}


`;



}








function playBeep(){


const beep =
document.getElementById("beep");


beep.play()
.catch(()=>{});


}








const scanner =

new Html5QrcodeScanner(

"reader",

{


fps:10,


qrbox:250


}

);



scanner.render(

onScanSuccess

);
