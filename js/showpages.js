/* JavaScript Document */

/*

showPages v1.1
=================================

Infomation
----------------------
Author : Lapuasi
E-Mail : lapuasi@gmail.com
Web : http://www.lapuasi.com
Date : 2005-11-17


Example
----------------------
var pg = new showPages('pg');
pg.pageCount = 12; //定义总页数(必要)
pg.argName = 'p';  //定义参数名(可选,缺省为page)
pg.printHtml();    //显示


Supported in Internet Explorer, Mozilla Firefox
*/

function showPages(name) { //初始化属性
	this.name = name;      //对象名称
	this.page = 1;         //当前页数
	this.pageCount = 1;    //总页数
	this.argName = 'page'; //参数名
	this.showTimes = 1;    //打印次数
}

showPages.prototype.getPage = function(){ //丛url获得当前页数,如果变量重复只获取最后一个
	var args = location.search;
	var reg = new RegExp('[\?&]?' + this.argName + '=([^&]*)[&$]?', 'gi');
	var chk = args.match(reg);
	this.page = RegExp.$1;
}
showPages.prototype.checkPages = function(){ //进行当前页数和总页数的验证
	if (isNaN(parseInt(this.page))) this.page = 1;
	if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
	if (this.page < 1) this.page = 1;
	if (this.pageCount < 1) this.pageCount = 1;
	if (this.page > this.pageCount) this.page = this.pageCount;
	this.page = parseInt(this.page);
	this.pageCount = parseInt(this.pageCount);
}
showPages.prototype.createHtml = function(mode){ //生成html代码
	var strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;
	if (mode == '' || typeof(mode) == 'undefined') mode = 0;
	switch (mode) {
		case 0 : //模式1 (页数,首页,前页,后页,尾页)
			strHtml += '<span class="count">页码: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="number">';
			if (prevPage < 1) {
				strHtml += '<span title="首页">&#171;</span>';
				strHtml += '<span title="上一页">&#139;</span>';
			} else {
				strHtml += '<span title="首页"><a href="javascript:' + this.name + '.toPage(1);">&#171;</a></span>';
				strHtml += '<span title="上一页"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">&#139;</a></span>';
			}
			for (var i = 1; i <= this.pageCount; i++) {
				if (i > 0) {
					if (i == this.page) {
						strHtml += '<span title="第' + i + '页">' + i + '</span>';
					} else {
						strHtml += '<span title="第' + i + '页"><a href="javascript:' + this.name + '.toPage(' + i + ');">' + i + '</a></span>';
					}
				}
			}
			if (nextPage > this.pageCount) {
				strHtml += '<span title="下一页">&#155;</span>';
				strHtml += '<span title="末页">&#187;</span>';
			} else {
				strHtml += '<span title="下一页"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">&#155;</a></span>';
				strHtml += '<span title="末页"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">&#187;</a></span>';
			}
			strHtml += '</span><br />';
			break;
			
			
		case 1 : //模式1 (10页缩略,首页,前页,后页,尾页)
			//strHtml += '<span class="count">页码: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="number">';
			if (prevPage < 1) {
				strHtml += '<span title="首页">&#171;</span>';
				strHtml += '<span title="下一页">&#139;</span>';
			} else {
				strHtml += '<a href="javascript:' + this.name + '.toPage(1);"><span title="首页">&#171;</span></a>';
				strHtml += '<a href="javascript:' + this.name + '.toPage(' + prevPage + ');"><span title="下一页">&#139;</span></a>';
			}
			if (this.page % 3 ==0) {
				var startPage = this.page - 2;
			} else {
				var startPage = this.page - this.page % 3 + 1;
			}
			if (startPage > 6) strHtml += '<a href="javascript:' + this.name + '.toPage(' + (startPage - 1) + ');"><span title="前三页">...</span></a>';
			for (var i = startPage; i < startPage + 6; i++) {
				if (i > this.pageCount) break;
				if (i == this.page) {
					strHtml += '<span class="pagenumber" title="第' + i + '页">' + i + '</span>';
				} else {
					strHtml += '<a href="javascript:' + this.name + '.toPage(' + i + ');"><span title="第' + i + '页">' + i + '</span></a>';
				}
			}
			if (this.pageCount >= startPage + 6) strHtml += '<a href="javascript:' + this.name + '.toPage(' + (startPage + 6) + ');"><span title="后三页">...</span></a>';
			if (nextPage > this.pageCount) {
				strHtml += '<span title="下一页">&#155;</span>';
				strHtml += '<span title="末页">&#187;</span>';
			} else {
				strHtml += '<a href="javascript:' + this.name + '.toPage(' + nextPage + ');"><span title="下一页">&#155;</span></a>';
				strHtml += '<a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');"><span title="末页">&#187;</span></a>';
			}
			strHtml += '</span><br />';
			break;
		case 2 : //模式2 (前后缩略,页数,首页,前页,后页,尾页)
			strHtml += '<span class="count">页码: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="number">';
			if (prevPage < 1) {
				strHtml += '<span title="首页">&#171;</span>';
				strHtml += '<span title="下一页">&#139;</span>';
			} else {
				strHtml += '<span title="首页"><a href="javascript:' + this.name + '.toPage(1);">&#171;</a></span>';
				strHtml += '<span title="下一页"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">&#139;</a></span>';
			}
			if (this.page != 1) strHtml += '<span title="第1页"><a href="javascript:' + this.name + '.toPage(1);">1</a></span>';
			if (this.page >= 5) strHtml += '<span>...</span>';
			if (this.pageCount > this.page + 2) {
				var endPage = this.page + 2;
			} else {
				var endPage = this.pageCount;
			}
			for (var i = this.page - 2; i <= endPage; i++) {
				if (i > 0) {
					if (i == this.page) {
						strHtml += '<span title="第' + i + '页">[' + i + ']</span>';
					} else {
						if (i != 1 && i != this.pageCount) {
							strHtml += '<span title="第' + i + '页"><a href="javascript:' + this.name + '.toPage(' + i + ');">' + i + '</a></span>';
						}
					}
				}
			}
			if (this.page + 3 < this.pageCount) strHtml += '<span>...</span>';
			if (this.page != this.pageCount) strHtml += '<span title="第' + this.pageCount + '页"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
			if (nextPage > this.pageCount) {
				strHtml += '<span title="下一页">&#155;</span>';
				strHtml += '<span title="末页">&#187;</span>';
			} else {
				strHtml += '<span title="下一页"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">&#155;</a></span>';
				strHtml += '<span title="末页"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">&#187;</a></span>';
			}
			strHtml += '</span><br />';
			break;
		case 3 : //模式3 (箭头样式,首页,前页,后页,尾页) (only IE)
			strHtml += '<span class="count">页码: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="arrow">';
			if (prevPage < 1) {
				strHtml += '<span title="首页">9</span>';
				strHtml += '<span title="上一页">7</span>';
			} else {
				strHtml += '<span title="首页"><a href="javascript:' + this.name + '.toPage(1);">9</a></span>';
				strHtml += '<span title="上一页"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">7</a></span>';
			}
			if (nextPage > this.pageCount) {
				strHtml += '<span title="下一页">8</span>';
				strHtml += '<span title="末页">:</span>';
			} else {
				strHtml += '<span title="下一页"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">8</a></span>';
				strHtml += '<span title="末页"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">:</a></span>';
			}
			strHtml += '</span><br />';
			break;
		case 4 : //模式4 (下拉框)
			if (this.pageCount < 1) {
				strHtml += '<select name="toPage" disabled>';
				strHtml += '<option value="0">分页</option>';
			} else {
				var chkSelect;
				strHtml += '<select name="toPage" onchange="' + this.name + '.toPage(this);">';
				for (var i = 1; i <= this.pageCount; i++) {
					if (this.page == i) chkSelect=' selected="selected"';
					else chkSelect='';
					strHtml += '<option value="' + i + '"' + chkSelect + '>页码: ' + i + ' / ' + this.pageCount + '</option>';
				}
			}
			strHtml += '</select>';
			break;
		case 5 : //模式5 (输入框)
			strHtml += '<span class="input">';
			if (this.pageCount < 1) {
				strHtml += '<input type="text" name="toPage" value="No Pages" class="itext" disabled="disabled">';
				strHtml += '<input type="button" name="go" value="GO" class="ibutton" disabled="disabled"></option>';
			} else {
				strHtml += '<input type="text" value="Enter Page:" class="ititle" readonly="readonly">';
				strHtml += '<input type="text" id="pageInput' + this.showTimes + '" value="' + this.page + '" class="itext" title="Input page" onkeypress="return ' + this.name + '.formatInputPage(event);" onfocus="this.select()">';
				strHtml += '<input type="text" value=" / ' + this.pageCount + '" class="icount" readonly="readonly">';
				strHtml += '<input type="button" name="go" value="GO" class="ibutton" onclick="' + this.name + '.toPage(document.getElementById(\'pageInput' + this.showTimes + '\').value);"></option>';
			}
			strHtml += '</span>';
			break;
		default :
			strHtml = 'Javascript showPage Error: not find mode ' + mode;
			break;
	}
	return strHtml;
}
showPages.prototype.createUrl = function (page) { //生成页面跳转url
	if (isNaN(parseInt(page))) page = 1;
	if (page < 1) page = 1;
	if (page > this.pageCount) page = this.pageCount;
	var url = location.protocol + '//' + location.host + location.pathname;
	var args = location.search;
	var reg = new RegExp('([\?&]?)' + this.argName + '=[^&]*[&$]?', 'gi');
	args = args.replace(reg,'$1');
	if (args == '' || args == null) {
		args += '?' + this.argName + '=' + page;
	} else if (args.substr(args.length - 1,1) == '?' || args.substr(args.length - 1,1) == '&') {
			args += this.argName + '=' + page;
	} else {
			args += '&' + this.argName + '=' + page;
	}
	return url + args;
}
showPages.prototype.toPage = function(page){ //页面跳转
	var turnTo = 1;
	if (typeof(page) == 'object') {
		turnTo = page.options[page.selectedIndex].value;
	} else {
		turnTo = page;
	}
	self.location.href = this.createUrl(turnTo);
}
showPages.prototype.printHtml = function(mode){ //显示html代码
	this.getPage();
	this.checkPages();
	this.showTimes += 1;
	document.write('<div id="pages_' + this.name + '_' + this.showTimes + '" class="pages"></div>');
	document.getElementById('pages_' + this.name + '_' + this.showTimes).innerHTML = this.createHtml(mode);
	
}
showPages.prototype.formatInputPage = function(e){ //限定输入页数格式
	var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
	if(!ie) var key = e.which;
	else var key = event.keyCode;
	if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
	return false;
}

