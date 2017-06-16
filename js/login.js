window.loginpage={};
$("#close-login").click(function(){
	$("#login-out").hide();
	$("#fade-out").hide();
	$("#login-error").hide();
	window.loginpage.logining=false;
	clearData();
	changeValidate();
	$("#login-out").css("z-index","19");
});
$("#login-btn").click(function(){
	if(checkInput()){
		if(!window.loginpage.logining){
			$("#login-btn").val("登陆中...");
			$("#login-out").css("z-index","8");
			$("#fade-out").css("cursor","wait");
			window.loginpage.logining=true;
			login();
		}
	}
});
$("#change-validate").click(function(){
	changeValidate();
});

function checkInput(){
	var username=$("#login-username").val(),
		password=$("#login-password").val(),
		validatecode=$("#login-validate-code").val();
	if(username==""){
		showError({value:'请输入用户名!'});
		clearData();
		return false;
	}else if(password==""){
		showError({value:'请输入密码!'});
		clearData();
		return false;
	}else if(validatecode==""){
		showError({value:'请输入验证码!'});
		clearData();
		return false;
	}
	
	return true;
}
function changeValidate(){
	$("#login-validate-img").attr("src","validate-code.action?"+Math.random());
	var src=$("#validate-img");
	if(src){
		src.attr("src",$("#login-validate-img").attr("src"));
	}
	$("#login-btn").val("登陆");
}


function login(){
	var username=$("#login-username").val(),
		password=$("#login-password").val(),
		validate=$("#login-validate-code").val();
	$.ajaxSetup({
		async:false
	});
	
	/*$.ajaxSetup({
		type:"post",
		url:"user-login",
		dataType:"json",
		data:"username="+username+"&password="+password+"&validate_code="+validate,
		success:function(json){
			alert(json);
		}
	});
	$.post("user-login",
			{"user.username":username,
			"user.password":password,
			"validate_code":validate},
			function(data,json){
				//var result='';
				//eval('result=' + data + ';');
				
				alert(data);
			});
	*/
	$.get("user-login?username="+username+"&password="+password+"&validate_code="+validate,
		function(data,result,json){
			var jsonSp = json.responseText.split("|");
			if(data=='success' || jsonSp[0]=='success'){
				$("#welcome-text").show();
				$("#welcome-panel").show();
				$("#login-text").hide();
				$("#login-panel").hide();
				$("#user-center").html(username);
				//$("#close-login").trigger("click");
				if(jsonSp.length==2){
					$("#login-error").html(jsonSp[1]);
				}
				setTimeout("window.location.reload()",300);
			}else if(data=="validate" || jsonSp[0]=='validate'){
				showError({value:'验证码输入错误!'});
				clearData();
				changeValidate();
			}else if(data=="failed" || jsonSp[0]=='failed'){
				showError({value:'用户名或密码错误!'});
				clearData();
				changeValidate();
			}
			window.loginpage.logining=false;
	});
	
	
}

function showError(message){
	$("#login-error").show();
	$("#login-error").html(message.value);
}

function clearData(){
	$("#login-btn").val("登陆");
	$("#login-validate-code").val("");
	$("#login-password").val("");
	$("#fade-out").css("cursor","auto");
	$("#login-out").css("z-index","19");
}

function checkSession(){
	$.ajaxSetup({
		async:false
	});
	
	var res=false;
	$.get("checkSession",
		function(data,result,json){
			if(data=='null' || json.responseText=='null'){
				$("#login-link").trigger("click");
				 res=false;
			}else{
				 res=true;
			}
	});
	
	return res;
}

if (navigator.appName == 'Microsoft Internet Explorer') {  
        document.getElementsByClassName = function() {  
            var tTagName = "*";  
            if (arguments.length > 1) {  
                tTagName = arguments[1];  
            }  
            if (arguments.length > 2) {  
                var pObj = arguments[2]  
            } else {  
                var pObj = document;  
            }  
            var objArr = pObj.getElementsByTagName(tTagName);  
            var tRObj = new Array();  
            for ( var i = 0; i < objArr.length; i++) {  
                if (objArr[i].className == arguments[0]) {  
                    tRObj.push(objArr[i]);  
                }  
            }  
            return tRObj;  
        }  
 }
var code ; //在全局 定义验证码
function createCode(){ 
		
	code = new Array();
	var codeLength = 4;//验证码的长度
	var checkCode = document.getElementsByClassName("code");
	if(checkCode !=null){
		
		for(var i=0;i<checkCode.length;i++){
			checkCode[i].value = "";
		}
		var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

		for(var i=0;i<codeLength;i++) {
		   var charIndex = Math.floor(Math.random()*32);
		   code +=selectChar[charIndex];
		}
		if(code.length != codeLength){
		   createCode();
		}
		for(var i=0;i<checkCode.length;i++){
			checkCode[i].value = code;
		}
	}
}

function validate () {
var inputCode = document.getElementById("input1").value.toUpperCase();
var username = document.getElementById("userlogin-username").value;
var password = document.getElementById("userlogin-password").value;
if(username == ""){
   alert("请输入用户名！");
   return false;
}else if(password == ""){
   alert("请输入密码！");
   return false;	
}else if(inputCode.length <=0) {
   alert("请输入验证码！");
   return false;
}else if(inputCode != code ){
   alert("验证码输入错误！");
   createCode();
   return false;
}else {
   return true;
}
}


        function showLogin() {
            var loginDiv = document.getElementById("loginDiv");
            loginDiv.style.display = "block";
            document.getElementById("fade").style.display = "block";
        }
        function hideLogin() {
            var loginDiv = document.getElementById("loginDiv");
            loginDiv.style.display = 'none';
            document.getElementById("fade").style.display = "none";
        }


			function checkSessionFun(url){
				if(checkSession()){
					window.location=url; 
				}
			}

		function tologin(){			
			var b = validate();	
			var username = document.getElementById("userlogin-username").value;
			var password = document.getElementById("userlogin-password").value;
			var platId = document.getElementById("userlogin-platId").value;
			if(b){
				$.post("myuser-login?username="+username+"&password="+password+"&platId="+platId+"&randomNum="+Math.random(),
					function(data,result,json){
						var jsonSp = json.responseText.split("|");
						if(data=='success' || jsonSp[0]=='success'){
							if(jsonSp.length == 2){
								$("#login-error").html(jsonSp[1]);
							}
							setTimeout("window.location.reload()",300);
						}else if(data=="failed" || jsonSp[0]=='failed'){
							alert("用户名或密码错误");
							document.getElementById("userlogin-password").value = "";
							createCode();
						}
						window.loginpage.logining=false;
				});
			}
			
		}
		

function notlogin(){
	$.post("unlogin",function(data,result,json){
		var jsonSp = json.responseText.split("|");
		if(data=='success' || jsonSp[0]=='success'){
			if(jsonSp.length == 2){
				$("#logout-show").html(jsonSp[1]);
			}
			setTimeout("window.location.reload()",300);
		}	
	});
}

(function(window){



$("#login-link").click(function(){
	$("#fade-out").show();
	$("#login-out").show();
});

$("#exit-link").click(function(){
	$.get("userexit",
			function(data,result,json){
				if(data=='success' || json.responseText=='success'){
					window.location.reload();
				}
		});
});

})(window)