/*
 * Inline Form Validation Engine, jQuery plugin
 * 
 * Copyright(c) 2009, Cedric Dugas
 * http://www.position-relative.net
 *	
 * Form validation engine witch allow custom regex rules to be added.
 * Licenced under the MIT Licence
 */

$(document).ready(function() {

	// SUCCESS AJAX CALL, replace "success: false," by:     success : function() { callSuccessFunction() }, 
	$("[validatecontent^=validate]").validationEngine({
		success :  false,
		failure : function() {}
	})
});

jQuery.fn.validationEngine = function(settings) {
	if($.validationEngineLanguage){					// IS THERE A LANGUAGE LOCALISATION ?
		allRules = $.validationEngineLanguage.allRules
	}else{
		allRules = {"required":{    			  // Add your regex rules here, you can take telephone as an example
						"regex":"none",
							"alertText":"* ���ֶ��Ǳ����",
							"alertTextCheckboxMultiple":"* ��ѡ��һ��ѡ��",
							"alertTextCheckboxe":"* ���Ǳ���ĸ�ѡ��"},
						"length":{
							"regex":"none",
							"alertText":"*������ ",
							"alertText2":" �� ",
							"alertText3": " ���ַ�֮��"},
						"MaxCheckbox":{
							"regex":"none",
							"alertText":"* ������������"},	
						"confirm":{
							"regex":"none",
							"alertText":"* �������벻ƥ��"},		
						"entxt":{
							"regex":"/^[A-Za-z]+$/",
							"alertText":"* ������Ӣ��"},
						"telephone":{
							"regex":"/^[0-9\-\(\)\ ]+$/",
							"alertText":"* �绰�����ʽ����"},	
						"email":{
							"regex":"/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
							"alertText":"* �����ʼ���ʽ����"},	
						"url":{
							"regex":/^http[s]?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
							"alertText":"* URL��ʽ����"},	
						"date":{
                             "regex":"/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/",
                             "alertText":"* �������Ϣ, ������ YYYY-MM-DD ��ʽ"},
						"onlyNumber":{
							"regex":"/^[0-9\ ]+$/",
							"alertText":"* ֻ����������"},	
						"noSpecialCaracters":{
							"regex":"/^[0-9a-zA-Z]+$/",
							"alertText":"* ��������������ַ�"},	
						"onlyLetter":{
							"regex":"/^[a-zA-Z\ \']+$/",
							"alertText":"* ֻ�������ı�"}
					}	
	}

 	settings = jQuery.extend({
		allrules:allRules,
		success : false,
		failure : function() {}
	}, settings);	


	$("form").bind("submit", function(caller){   // ON FORM SUBMIT, CONTROL AJAX FUNCTION IF SPECIFIED ON DOCUMENT READY
		if(submitValidation(this) == false){
			if (settings.success){
				settings.success && settings.success(); 
				return false;
			}
		}else{
			settings.failure && settings.failure(); 
			return false;
		}
	})
	$(this).not("[type=checkbox]").bind("blur", function(caller){loadValidation(this)})
	$(this+"[type=checkbox]").bind("click", function(caller){loadValidation(this)})
	
	var buildPrompt = function(caller,promptText) {			// ERROR PROMPT CREATION AND DISPLAY WHEN AN ERROR OCCUR
		var divFormError = document.createElement('div')
		var formErrorContent = document.createElement('div')
		var arrow = document.createElement('div')
		
		
		$(divFormError).addClass("formError")
		$(divFormError).addClass($(caller).attr("name"))
		$(formErrorContent).addClass("formErrorContent")
		$(arrow).addClass("formErrorArrow")

		$("body").append(divFormError)
		$(divFormError).append(arrow)
		$(divFormError).append(formErrorContent)
		$(arrow).html('<div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3"></div><div class="line2"></div><div class="line1"></div>')
		$(formErrorContent).html(promptText)
	
		callerTopPosition = $(caller).offset().top;
		callerleftPosition = $(caller).offset().left;
		callerWidth =  $(caller).width()
		callerHeight =  $(caller).height()
		inputHeight = $(divFormError).height()

		callerleftPosition = callerleftPosition + callerWidth -30
		callerTopPosition = callerTopPosition  -inputHeight -10
	
		$(divFormError).css({
			top:callerTopPosition,
			left:callerleftPosition,
			opacity:0
		})
		$(divFormError).fadeTo("fast",0.8);
	};
	var updatePromptText = function(caller,promptText) {	// UPDATE TEXT ERROR IF AN ERROR IS ALREADY DISPLAYED
		updateThisPrompt =  $(caller).attr("name")
		$("."+updateThisPrompt).find(".formErrorContent").html(promptText)
		
		callerTopPosition  = $(caller).offset().top;
		inputHeight = $("."+updateThisPrompt).height()
		
		callerTopPosition = callerTopPosition  -inputHeight -10
		$("."+updateThisPrompt).animate({
			top:callerTopPosition
		});
	}
	var loadValidation = function(caller) {		// GET VALIDATIONS TO BE EXECUTED
		
		rulesParsing = $(caller).attr('validatecontent');
		rulesRegExp = /\[(.*)\]/;
		getRules = rulesRegExp.exec(rulesParsing);
		str = getRules[1]
		pattern = /\W+/;
		result= str.split(pattern);	
		
		var validateCalll = validateCall(caller,result)
		return validateCalll
		
	};
	var validateCall = function(caller,rules) {	// EXECUTE VALIDATION REQUIRED BY THE USER FOR THIS FILED
		var promptText =""	
		var prompt = $(caller).attr("name");
		var caller = caller;
		isError = false;
		callerType = $(caller).attr("type");
		
		for (i=0; i<rules.length;i++){
			switch (rules[i]){
			case "optional": 
				if(!$(caller).val()){
					closePrompt(caller)
					return isError
				}
			break;
			case "required": 
				_required(caller,rules);
			break;
			case "custom": 
				 _customRegex(caller,rules,i);
			break;
			case "length": 
				 _length(caller,rules,i);
			break;
			case "MaxCheckbox": 
				 _MaxCheckbox(caller,rules,i);
			break;
			case "confirm": 
				 _confirm(caller,rules,i);
			break;
			default :;
			};
		};
		if (isError == true){
			
			if($("input[name="+prompt+"]").size()> 1 && callerType == "radio") {		// Hack for radio group button, the validation go the first radio
				caller = $("input[name="+prompt+"]:first")
			}
			($("."+prompt).size() ==0) ? buildPrompt(caller,promptText)	: updatePromptText(caller,promptText)
		}else{
			closePrompt(caller)
		}		
		
		/* VALIDATION FUNCTIONS */
		function _required(caller,rules){   // VALIDATE BLANK FIELD
			callerType = $(caller).attr("type")
			
			if (callerType == "text" || callerType == "password" || callerType == "textarea"){
				
				if(!$(caller).val()){
					isError = true
					if(promptText=="")
					{
					    promptText += settings.allrules[rules[i]].alertText+"<br />";
					}
				}	
			}
			if (callerType == "radio" || callerType == "checkbox" ){
				callerName = $(caller).attr("name")
		
				if($("input[name="+callerName+"]:checked").size() == 0) {
					isError = true
					if($("input[name="+callerName+"]").size() ==1) 
					{
					    if(promptText=="")
					    {
						    promptText += settings.allrules[rules[i]].alertTextCheckboxe+"<br />" 
						}
					}else{
					    if(promptText=="")
					    {
						    promptText += settings.allrules[rules[i]].alertTextCheckboxMultiple+"<br />"
						}
					}	
				}
			}	
			if (callerType == "select-one") { // added by paul@kinetek.net for select boxes, Thank you
					callerName = $(caller).attr("name");
				
				if(!$("select[name="+callerName+"]").val()) {
					isError = true;
					if(promptText=="")
					{
					    promptText += settings.allrules[rules[i]].alertText+"<br />";
					}
				}
			}
			if (callerType == "select-multiple") { // added by paul@kinetek.net for select boxes, Thank you
					callerName = $(caller).attr("id");
				
				if(!$("#"+callerName).val()) {
					isError = true;
					if(promptText=="")
					{
					    promptText += settings.allrules[rules[i]].alertText+"<br />";
					}
				}
			}
		}
		function _customRegex(caller,rules,position){		 // VALIDATE REGEX RULES
			customRule = rules[position+1]

			pattern = eval(settings.allrules[customRule].regex)
			
			if(!pattern.test($(caller).attr('value'))){
				isError = true
				if(promptText=="")
				{
				    promptText += settings.allrules[customRule].alertText+"<br />"
				}
			}
		}
		function _confirm(caller,rules,position){		 // VALIDATE FIELD MATCH
			confirmField = rules[position+1]
			
			if($(caller).attr('value') != $("#"+confirmField).attr('value')){
				isError = true
				if(promptText=="")
				{
				    promptText += settings.allrules["confirm"].alertText+"<br />"
				}
			}
		}
		function _length(caller,rules,position){    // VALIDATE LENGTH
		
			startLength = eval(rules[position+1])
			endLength = eval(rules[position+2])
			feildLength = $(caller).attr('value').length

			if(feildLength<startLength || feildLength>endLength){
				isError = true
				if(promptText=="")
				{
				    promptText += settings.allrules["length"].alertText+startLength+settings.allrules["length"].alertText2+endLength+settings.allrules["length"].alertText3+"<br />"
				}
			}
		}
		function _MaxCheckbox(caller,rules,position){    // VALIDATE CHECKBOX NUMBER ��֤CheckBox����
		
			nbCheck = eval(rules[position+1])
			groupname = $(caller).attr("name")
			groupSize = $("input[name="+groupname+"]:checked").size()
			
			if(groupSize > nbCheck){	
				isError = true
				if(promptText=="")
				{
				    promptText += settings.allrules["MaxCheckbox"].alertText+"<br />"
			    }
			}
		}

		return(isError) ? isError : false;
	};
	var closePrompt = function(caller) {	// CLOSE PROMPT WHEN ERROR CORRECTED �ر�ʱ��ʾ�������
		closingPrompt = $(caller).attr("name")

		$("."+closingPrompt).fadeTo("fast",0,function(){
			$("."+closingPrompt).remove()
		});
	};
	var submitValidation = function(caller) {	// FORM SUBMIT VALIDATION LOOPING INLINE VALIDATIONFORM �ύ��ȷ�ϻ����ڲ��ȷ��
		var stopForm = false
		$(caller).find(".formError").remove()
		var toValidateSize = $(caller).find("[validatecontent^=validate]").size()
		
		$(caller).find("[validatecontent^=validate]").each(function(){
			var validationPass = loadValidation(this)
			return(validationPass) ? stopForm = true : "";	
		});
		if(stopForm){							// GET IF THERE IS AN ERROR OR NOT FROM THIS VALIDATION FUNCTIONS �����д����ӱ����Ǻ�����ȷ��
			destination = $(".formError:first").offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 1100)
			return true;
		}else{
			return false
		}
	};
};