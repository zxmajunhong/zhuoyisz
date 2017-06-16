function checkPayForm(){
	if(checkAccounts() && checkValidateCode() && checkConfirm() && checkCard()){
		var accounts=document.getElementById("username").value;
		var amounts,zhuomoney;
		var payvalue = getPayValue();
		var paytype	 = document.getElementById("paytype");
		paytype.value = payvalue;
		amounts  = paytype.value;
		zhuomoney= parseInt(amounts);
		if(zhuomoney == 5){
			zhuomoney = 6;
		}else if(zhuomoney == 24){
			zhuomoney = 30;
		}else if(zhuomoney == 54){
			zhuomoney = 68;
		}else if(zhuomoney == 102){
			zhuomoney = 128;
		}else if(zhuomoney == 262){
			zhuomoney = 328;
		}else if(zhuomoney == 518){
			zhuomoney = 648;
		}else{
			zhuomoney *=1.2;
		}
		
		if(checkMoney(paytype)){
			var confirmMessage=" 充值账号："+accounts+"\n 充值金额："+amounts+"元\n 卓币数："+zhuomoney+"卓币\n 确定购买吗？";
			if(confirm(confirmMessage)){
				document.getElementById("paysubject").value=zhuomoney+"卓币";
				document.getElementById("paybody").value="卓毅游戏平台"+zhuomoney+"卓币 "+amounts+"(元)";
				var qudao = getPayCompay();
				if(qudao == 10){
					document.payform.action = "alipay";
				}else if(qudao == 20){
					document.payform.action = "kqpay";
				}else if(qudao == 30){
					document.payform.action = "quickpay";
				}else if(qudao == 40){
					document.payform.action = "vpay";
				}else if(qudao == 50){
					document.payform.action = "kqpaylt";
				}else if(qudao == 60){
					document.payform.action = "kqpayszx";
				}else if(qudao == 70){
					document.payform.action = "kqpaydx";
				}else if(qudao == 80){
					document.payform.action = "kqpayjw";
				}else{
					document.payform.action = "";
				}
				document.getElementById("payform").submit();
			}
		}
	}
}

function checkPayFormById(){
	if(checkAccountId() && checkValidateCode() && checkConfirmId() && checkCard()){
		var userId=document.getElementById("userId").value;
		var amounts,zhuomoney;
		var payvalue = getPayValue();
		var paytype	 = document.getElementById("paytype");
		paytype.value = payvalue;
		amounts  = paytype.value;
		zhuomoney= parseInt(amounts);
		if(zhuomoney == 5){
			zhuomoney = 6;
		}else if(zhuomoney == 24){
			zhuomoney = 30;
		}else if(zhuomoney == 54){
			zhuomoney = 68;
		}else if(zhuomoney == 102){
			zhuomoney = 128;
		}else if(zhuomoney == 262){
			zhuomoney = 328;
		}else if(zhuomoney == 518){
			zhuomoney = 648;
		}else{
			zhuomoney *=1.2;
		}
		
		var rabate = document.getElementById("rabate").value;
		var qudao = getPayCompay();
		if(qudao == 10 || qudao == 20 || qudao == 30){
			amounts = amounts*rabate/100;
		}
		if(checkMoney(paytype)){
			var confirmMessage=" 充值UID："+userId+"\n 充值金额："+amounts+"元\n 卓币数："+zhuomoney+"卓币\n 确定购买吗？";
			if(confirm(confirmMessage)){
				document.getElementById("paysubject").value=zhuomoney+"卓币";
				document.getElementById("paybody").value="卓毅游戏平台"+zhuomoney+"卓币 "+amounts+"(元)";
				if(qudao == 10){
					document.payform.action = "alipayById";
				}else if(qudao == 20){
					document.payform.action = "kqpayById";
				}else if(qudao == 30){
					document.payform.action = "quickpayById";
				}else if(qudao == 40){
					document.payform.action = "vpayById";
				}else if(qudao == 50){
					document.payform.action = "kqpayltById";
				}else if(qudao == 60){
					document.payform.action = "kqpayszxById";
				}else if(qudao == 70){
					document.payform.action = "kqpaydxById";
				}else if(qudao == 80){
					document.payform.action = "kqpayjwById";
				}else{
					document.payform.action = "";
				}
				document.getElementById("payform").submit();
			}
		}
	}
}

function checkCard(){
	var qudao = getPayCompay();
	if(qudao == 50 || qudao == 60 || qudao == 70 || qudao == 80){
		var cardId = document.getElementById("cardId").value;
		var cardPwd= document.getElementById("cardPwd").value

		if(qudao == 50){
			if(cardId.length != 15){
				alert("联通充值卡卡号需15位");
				return false;
			}
			if(cardPwd.length != 19){
				alert("联通充值卡密码需19位");
				return false;
			}
		}

		if(qudao == 60){
			if(cardId.length != 10 && cardId.length != 16 && cardId.length != 17){
				alert("神州行充值卡卡号需10位/16位/17位");
				return false;
			}
			if(cardId.length == 10 && cardPwd.length != 8){
				alert("神州行充值卡密码需8位");
				return false;
			}
			if(cardId.length == 16 && (cardPwd.length != 17 || cardPwd.length != 21)){
				alert("神州行充值卡密码需17位/21位");
				return false;
			}
			if(cardId.length == 17 && cardPwd.length != 18 ){
				alert("神州行充值卡密码需18位");
				return false;
			}
		}
		if(qudao == 70){
			if(cardId.length != 19){
				alert("电信充值卡卡号需19位");
				return false;
			}
			if(cardPwd.length != 18){
				alert("电信充值卡密码需18位");
				return false;
			}
		}
	}
	return true;
}

function getPayValue(){
   var New=document.getElementsByName("payvalue");
   var strNew;
   for(var i=0;i<New.length;i++)
   {
     if(New[i].checked)
         strNew=New[i].value;
   }
   return strNew;
}

function getPayCompay(){
   var New=document.getElementsByName("payfor");
   var strNew;
   for(var i=0;i<New.length;i++)
   {
     if(New[i].checked)
         strNew=New[i].value;
   }
   return strNew;
}

function checkAccounts(){
	var formresult=false;
	$.ajaxSetup({
		async:false
	});
	var accounts=document.getElementById("username").value;
	var platId	=document.getElementById("platId").value;
	var message={};
	message.id="useraccount";
	if(accounts==null || accounts==''){
		message.text="请输入账号！！";
		putError(message);
	}else{
		$.get("usercountbyname?username="+accounts+"&platId="+platId+"&randomNum="+Math.random(),
				function(data,result,json){
					if(data=='success' || json.responseText=='success'){
						message.text="账号不存在！";
						putError(message);
					}else{
						message.text="";
						putAccept(message);
						formresult=true;
					}
		});
	}
	
	return formresult;
}

function checkAccountId(){
	var formresult=false;
	$.ajaxSetup({
		async:false
	});
	var userId  = document.getElementById("userId").value;
	var platId	= document.getElementById("platId").value;
	var message={};
	message.id="useraccountId";
	if(userId==null || userId==''){
		message.text="请输入UID！！";
		putError(message);
	}else{
		$.get("usercountbyid?userID="+userId+"&platId="+platId+"&randomNum="+Math.random(),
				function(data,result,json){
					if(data=='success' || json.responseText=='success'){
						message.text="";
						putAccept(message);
						formresult=true;
					}else{
						message.text="UID不存在！";
						putError(message);
					}
		});
	}
	
	return formresult;
}

function checkMoney(obj){
	var patrn = /^([1-9][\d]{1,9}|1)(\.[\d]{1,2})?$/;
	if(obj.value == "" || obj.value.length == 0  ){
		alert("请输入充值金额");
		//obj.foucs();
		return false;
	}
	//!patrn.exec(obj.value) || 
	if (!isNumber(obj.value)){
		alert("请输入正确的充值金额");
		obj.value = "";
		//obj.foucs();
		return false;
	}
	var num = obj.value;
	if(num - 10 < 0){
		//alert("充值金额小于10元,请重新输入充值金额");
		//obj.value = "";
		//obj.foucs();
		//return false;
	}
	if(num - 50000 > 0){
		alert("充值金额大于50000元,请重新输入充值金额");
		obj.value = "";
		//obj.foucs();
		return false;
	}
	return true;
}

function isNumber(oNum){

  if(!oNum) return false;

  var strP=/^\d+$/; //正整数

  if(!strP.test(oNum)) return false;

  return true;

}

function checkValidateCode(){
	var formresult=false;
	$.ajaxSetup({
		async:false
	});
	var validatecode= document.getElementById("validatecode").value;
	var checkCode	= document.getElementById("checkCode").value;
	var message={};
	message.id="validatestatus";
	if(validatecode==null || validatecode==''){
		message.text="请输入验证码！";
		putError(message);
	}else{
		if(validatecode.toLowerCase()  == checkCode.toLowerCase()){
			message.text="";
			putAccept(message);
			formresult=true;
		}else{
			message.text="验证码输入错误！";
			putError(message);
		}
	}
	return formresult;
}

function checkConfirm(){
	var formresult=false;
	var accounts=document.getElementById("username").value;
	var confirm=document.getElementById("usernameconfirm").value;
	var message={};
	message.id="userconfirm";
	
	if(confirm=='' || confirm==null){
		message.text="请输入确认账号！";
		putError(message);
	}else if(accounts!=confirm){
		message.text="两次输入的账号不一致！";
		putError(message);
	}else{
		message.text="";
		putAccept(message);
		formresult=true;
	}
	
	return formresult;
}

function checkConfirmId(){
	var formresult=false;
	var userId =document.getElementById("userId").value;
	var confirm=document.getElementById("confirmId").value;
	var message={};
	message.id="userIdconfirm";
	
	if(confirm=='' || confirm==null){
		message.text="请输入确认UID！";
		putError(message);
	}else if(userId!=confirm){
		message.text="两次输入的UID不一致！";
		putError(message);
	}else{
		message.text="";
		putAccept(message);
		formresult=true;
	}
	
	return formresult;
}



function putError(message){
	if(message && message.id){
		var ele=$("#"+message.id);
		if(ele){
			ele.attr('style','font-size:12px;color:#FF0000;text-align:left;');
			ele.html("<img src='/content/images/error.png' width='16' height=16 style='vertical-align:middle;display:inline;padding-right:5px;' />" + message.text);
		}
	}
}

function putAccept(message){
	if(message && message.id){
		var ele=$("#"+message.id);
		if(ele){
			ele.attr('style','font-size:12px;color:#55DD55;text-align:left;');
			ele.html("<img src='/content/images/accept.png' width='16' height=16 style='vertical-align:middle;display:inline;padding-right:5px;' />" + message.text);
		}
	}
	
}