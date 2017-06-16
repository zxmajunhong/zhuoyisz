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
pg.pageCount = 12; //������ҳ��(��Ҫ)
pg.argName = 'p';  //���������(��ѡ,ȱʡΪpage)
pg.printHtml();    //��ʾ


Supported in Internet Explorer, Mozilla Firefox
*/

function showPages(name) { //��ʼ������
	this.name = name;      //��������
	this.page = 1;         //��ǰҳ��
	this.pageCount = 1;    //��ҳ��
	this.argName = 'page'; //������
	this.showTimes = 1;    //��ӡ����
}

showPages.prototype.getPage = function(){ //��url��õ�ǰҳ��,��������ظ�ֻ��ȡ���һ��
	var args = location.search;
	var reg = new RegExp('[\?&]?' + this.argName + '=([^&]*)[&$]?', 'gi');
	var chk = args.match(reg);
	this.page = RegExp.$1;
}
showPages.prototype.checkPages = function(){ //���е�ǰҳ������ҳ������֤
	if (isNaN(parseInt(this.page))) this.page = 1;
	if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
	if (this.page < 1) this.page = 1;
	if (this.pageCount < 1) this.pageCount = 1;
	if (this.page > this.pageCount) this.page = this.pageCount;
	this.page = parseInt(this.page);
	this.pageCount = parseInt(this.pageCount);
}
showPages.prototype.createHtml = function(mode){ //����html����
	var strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;
	if (mode == '' || typeof(mode) == 'undefined') mode = 0;
	switch (mode) {
		case 0 : //ģʽ1 (ҳ��,��ҳ,ǰҳ,��ҳ,βҳ)
			strHtml += '<span class="count">ҳ��: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="number">';
			if (prevPage < 1) {
				strHtml += '<span title="��ҳ">&#171;</span>';
				strHtml += '<span title="��һҳ">&#139;</span>';
			} else {
				strHtml += '<span title="��ҳ"><a href="javascript:' + this.name + '.toPage(1);">&#171;</a></span>';
				strHtml += '<span title="��һҳ"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">&#139;</a></span>';
			}
			for (var i = 1; i <= this.pageCount; i++) {
				if (i > 0) {
					if (i == this.page) {
						strHtml += '<span title="��' + i + 'ҳ">' + i + '</span>';
					} else {
						strHtml += '<span title="��' + i + 'ҳ"><a href="javascript:' + this.name + '.toPage(' + i + ');">' + i + '</a></span>';
					}
				}
			}
			if (nextPage > this.pageCount) {
				strHtml += '<span title="��һҳ">&#155;</span>';
				strHtml += '<span title="ĩҳ">&#187;</span>';
			} else {
				strHtml += '<span title="��һҳ"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">&#155;</a></span>';
				strHtml += '<span title="ĩҳ"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">&#187;</a></span>';
			}
			strHtml += '</span><br />';
			break;
			
			
		case 1 : //ģʽ1 (10ҳ����,��ҳ,ǰҳ,��ҳ,βҳ)
			//strHtml += '<span class="count">ҳ��: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="number">';
			if (prevPage < 1) {
				strHtml += '<span title="��ҳ">&#171;</span>';
				strHtml += '<span title="��һҳ">&#139;</span>';
			} else {
				strHtml += '<a href="javascript:' + this.name + '.toPage(1);"><span title="��ҳ">&#171;</span></a>';
				strHtml += '<a href="javascript:' + this.name + '.toPage(' + prevPage + ');"><span title="��һҳ">&#139;</span></a>';
			}
			if (this.page % 3 ==0) {
				var startPage = this.page - 2;
			} else {
				var startPage = this.page - this.page % 3 + 1;
			}
			if (startPage > 6) strHtml += '<a href="javascript:' + this.name + '.toPage(' + (startPage - 1) + ');"><span title="ǰ��ҳ">...</span></a>';
			for (var i = startPage; i < startPage + 6; i++) {
				if (i > this.pageCount) break;
				if (i == this.page) {
					strHtml += '<span class="pagenumber" title="��' + i + 'ҳ">' + i + '</span>';
				} else {
					strHtml += '<a href="javascript:' + this.name + '.toPage(' + i + ');"><span title="��' + i + 'ҳ">' + i + '</span></a>';
				}
			}
			if (this.pageCount >= startPage + 6) strHtml += '<a href="javascript:' + this.name + '.toPage(' + (startPage + 6) + ');"><span title="����ҳ">...</span></a>';
			if (nextPage > this.pageCount) {
				strHtml += '<span title="��һҳ">&#155;</span>';
				strHtml += '<span title="ĩҳ">&#187;</span>';
			} else {
				strHtml += '<a href="javascript:' + this.name + '.toPage(' + nextPage + ');"><span title="��һҳ">&#155;</span></a>';
				strHtml += '<a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');"><span title="ĩҳ">&#187;</span></a>';
			}
			strHtml += '</span><br />';
			break;
		case 2 : //ģʽ2 (ǰ������,ҳ��,��ҳ,ǰҳ,��ҳ,βҳ)
			strHtml += '<span class="count">ҳ��: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="number">';
			if (prevPage < 1) {
				strHtml += '<span title="��ҳ">&#171;</span>';
				strHtml += '<span title="��һҳ">&#139;</span>';
			} else {
				strHtml += '<span title="��ҳ"><a href="javascript:' + this.name + '.toPage(1);">&#171;</a></span>';
				strHtml += '<span title="��һҳ"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">&#139;</a></span>';
			}
			if (this.page != 1) strHtml += '<span title="��1ҳ"><a href="javascript:' + this.name + '.toPage(1);">1</a></span>';
			if (this.page >= 5) strHtml += '<span>...</span>';
			if (this.pageCount > this.page + 2) {
				var endPage = this.page + 2;
			} else {
				var endPage = this.pageCount;
			}
			for (var i = this.page - 2; i <= endPage; i++) {
				if (i > 0) {
					if (i == this.page) {
						strHtml += '<span title="��' + i + 'ҳ">[' + i + ']</span>';
					} else {
						if (i != 1 && i != this.pageCount) {
							strHtml += '<span title="��' + i + 'ҳ"><a href="javascript:' + this.name + '.toPage(' + i + ');">' + i + '</a></span>';
						}
					}
				}
			}
			if (this.page + 3 < this.pageCount) strHtml += '<span>...</span>';
			if (this.page != this.pageCount) strHtml += '<span title="��' + this.pageCount + 'ҳ"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
			if (nextPage > this.pageCount) {
				strHtml += '<span title="��һҳ">&#155;</span>';
				strHtml += '<span title="ĩҳ">&#187;</span>';
			} else {
				strHtml += '<span title="��һҳ"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">&#155;</a></span>';
				strHtml += '<span title="ĩҳ"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">&#187;</a></span>';
			}
			strHtml += '</span><br />';
			break;
		case 3 : //ģʽ3 (��ͷ��ʽ,��ҳ,ǰҳ,��ҳ,βҳ) (only IE)
			strHtml += '<span class="count">ҳ��: ' + this.page + ' / ' + this.pageCount + '</span>';
			strHtml += '<span class="arrow">';
			if (prevPage < 1) {
				strHtml += '<span title="��ҳ">9</span>';
				strHtml += '<span title="��һҳ">7</span>';
			} else {
				strHtml += '<span title="��ҳ"><a href="javascript:' + this.name + '.toPage(1);">9</a></span>';
				strHtml += '<span title="��һҳ"><a href="javascript:' + this.name + '.toPage(' + prevPage + ');">7</a></span>';
			}
			if (nextPage > this.pageCount) {
				strHtml += '<span title="��һҳ">8</span>';
				strHtml += '<span title="ĩҳ">:</span>';
			} else {
				strHtml += '<span title="��һҳ"><a href="javascript:' + this.name + '.toPage(' + nextPage + ');">8</a></span>';
				strHtml += '<span title="ĩҳ"><a href="javascript:' + this.name + '.toPage(' + this.pageCount + ');">:</a></span>';
			}
			strHtml += '</span><br />';
			break;
		case 4 : //ģʽ4 (������)
			if (this.pageCount < 1) {
				strHtml += '<select name="toPage" disabled>';
				strHtml += '<option value="0">��ҳ</option>';
			} else {
				var chkSelect;
				strHtml += '<select name="toPage" onchange="' + this.name + '.toPage(this);">';
				for (var i = 1; i <= this.pageCount; i++) {
					if (this.page == i) chkSelect=' selected="selected"';
					else chkSelect='';
					strHtml += '<option value="' + i + '"' + chkSelect + '>ҳ��: ' + i + ' / ' + this.pageCount + '</option>';
				}
			}
			strHtml += '</select>';
			break;
		case 5 : //ģʽ5 (�����)
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
showPages.prototype.createUrl = function (page) { //����ҳ����תurl
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
showPages.prototype.toPage = function(page){ //ҳ����ת
	var turnTo = 1;
	if (typeof(page) == 'object') {
		turnTo = page.options[page.selectedIndex].value;
	} else {
		turnTo = page;
	}
	self.location.href = this.createUrl(turnTo);
}
showPages.prototype.printHtml = function(mode){ //��ʾhtml����
	this.getPage();
	this.checkPages();
	this.showTimes += 1;
	document.write('<div id="pages_' + this.name + '_' + this.showTimes + '" class="pages"></div>');
	document.getElementById('pages_' + this.name + '_' + this.showTimes).innerHTML = this.createHtml(mode);
	
}
showPages.prototype.formatInputPage = function(e){ //�޶�����ҳ����ʽ
	var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
	if(!ie) var key = e.which;
	else var key = event.keyCode;
	if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
	return false;
}

