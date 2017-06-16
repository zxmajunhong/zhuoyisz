function showObj(num) {
  for(var i=0;i<3;i++){
     if(i!=num){
       var o = document.getElementById("odiv_"+i);
       o.style.display="none";
     }  
  }

  var odiv = document.getElementById("odiv_"+num);
  if(odiv.style.display=="none"){
    odiv.style.display="inline";
  }else{
    odiv.style.display="none";  
  }
}


function showObj1(num) {
  for(var i=0;i<3;i++){
     if(i!=num){
       var o = document.getElementById("odiv_"+i);
       o.style.display="none";
     }  
  }

  var odiv = document.getElementById("odiv_"+num);
  if(odiv.style.display=="none"){
    odiv.style.display="inline";
  }else{
    odiv.style.display="none";  
  }
}

function showObj2(num) {
  for(var i=0;i<4;i++){
     if(i!=num){
       var o = document.getElementById("odiv_"+i);
       o.style.display="none";
       var t = document.getElementById("tdiv_"+i);
       t.style.display="none";
     }  
  }
  document.getElementById("cardId_div").style.display="none";
  document.getElementById("cardPwd_div").style.display="none";
  changeCardDesc();

  var odiv = document.getElementById("odiv_"+num);
  odiv.style.display="inline";

  var tdiv = document.getElementById("tdiv_"+num);
  tdiv.style.display="inline";
  var payfor = document.getElementById("tdiv_"+num).getElementsByTagName("input");
  if(payfor !=null){
	payfor[0].checked = true;
 }
 if(num ==2){
	document.getElementById("cardId_div").style.display="";
	document.getElementById("cardPwd_div").style.display="";
 }
 if(num==2){
	 changeCardDesc(60);
 }
 if(num==3){
	changeCardDesc(40);
 }

 if(num==2){
	document.getElementById("money_1_0").style.display="";
	document.getElementById("money_1_1").style.display="";
	document.getElementById("money_2_0").style.display="none";
	document.getElementById("money_2_1").style.display="none";

	document.getElementById("check10").checked = true;
 }else{
	document.getElementById("money_1_0").style.display="none";
	document.getElementById("money_1_1").style.display="none";
	document.getElementById("money_2_0").style.display="";
	document.getElementById("money_2_1").style.display="";
	document.getElementById("check5").checked = true;
 }
}

function changeCardDesc(num){
	document.getElementById('desc_60').style.display	='none';
	document.getElementById('desc_50').style.display	='none';
	document.getElementById('desc_70').style.display	='none';
	document.getElementById('desc_80').style.display	='none';
	document.getElementById('desc_40').style.display	='none';
	if(num>0){
		document.getElementById('desc_'+num).style.display	='';
	}
}

function showObj3(num) {
  for(var i=0;i<5;i++){
     if(i!=num){
       var o = document.getElementById("odiv_"+i);
	   if(o !=null){
		o.style.display="none";
	   }
     }  
  }

  var odiv = document.getElementById("odiv_"+num);
  if(odiv !=null){
	  if(odiv.style.display=="none"){
		odiv.style.display="inline";
	  }else{
		odiv.style.display="none";  
	  }
  }
}


function showObj4(num) {
  for(var i=0;i<2;i++){
     if(i!=num){
       var o = document.getElementById("odiv_"+i);
       o.style.display="none";
     }  
  }

  var odiv = document.getElementById("odiv_"+num);
  if(odiv.style.display=="none"){
    odiv.style.display="inline";
  }else{
    odiv.style.display="none";  
  }
}