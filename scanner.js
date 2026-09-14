const API_URL =
"https://script.google.com/macros/s/AKfycbyCwRWw3LaA7-nDq7CLQ_uDZK2n275Ad-a0O3qZI3VjglHTbEuV9E32DvWJWZw2XjzZ0w/exec";





function onScanSuccess(decodedText){



console.log(decodedText);




fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:

JSON.stringify({

action:"checkin",

data:{

idPeserta:
decodedText

}

})


})


.then(res=>res.json())


.then(result=>{


showResult(result);


});



}





function showResult(result){


const box =
document.getElementById(
"result"
);



if(result.status){


box.innerHTML = `


<h2>
✅ CHECK IN BERHASIL
</h2>


<p>
ID:
${result.data.idPeserta}
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



}


else{


box.innerHTML = `


<h2>
❌ ${result.message}
</h2>


`;



}


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
