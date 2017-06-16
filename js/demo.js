$(function(){
$(".nav li").hover(
       function(){$(this).find(".xla1").show();},
       function(){$(this).find(".xla1").hide();}
);

$(".xla1").find("dl").hover(
       function(){$(this).find(".xla2").show();},
       function(){$(this).find(".xla2").hide();}
);
	
$(".xla2").find("dd").hover(
       function(){$(this).find(".xla3").show();},
       function(){$(this).find(".xla3").hide();}
);
	
});










 
$(function(){
$('#marquee').kxbdMarquee({
direction:'left',
controlBtn:{left:'#goL',right:'#goR'},
newAmount:10,
eventA:'mouseenter',
eventB:'mouseleave'
});
			
});
 

$(document).ready(function(){

$(".plist li:last").css("border-bottom","none")

});	