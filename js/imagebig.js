function getViewportHeight() {
    if (window.innerHeight != window.undefined) return window.innerHeight;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientHeight;
    if (document.body) return document.body.clientHeight;

    return window.undefined;
}
function getViewportWidth() {
    if (window.innerWidth != window.undefined) return window.innerWidth;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientWidth;
    if (document.body) return document.body.clientWidth;

    return window.undefined;
}
function getScrollTop() {
    if (self.pageYOffset) {
        return self.pageYOffset;
    }
    else if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    }
    else if (document.body) {
        return document.body.scrollTop;
    }
}
function getScrollLeft() {
    if (self.pageXOffset) {
        return self.pageXOffset;
    }
    else if (document.documentElement && document.documentElement.scrollLeft) {
        return document.documentElement.scrollLeft;
    }
    else if (document.body) {
        return document.body.scrollLeft;
    }
}

var rT = true; //����ͼ�����
var bT = true; //����ͼ���뵭��
var tw = 150; //��ʾ����
var endaction = false; //��������
var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
offsetX = 10;
offsetY = 20;
var toolTipSTYLE = "";
function initToolTips() {
    tempDiv = document.createElement("div");
    tempDiv.id = "toolTipLayer";
    tempDiv.style.position = "absolute";
    tempDiv.style.display = "none";
    document.body.appendChild(tempDiv);
    if (ns4 || ns6 || ie4) {
        if (ns4) toolTipSTYLE = document.toolTipLayer;
        else if (ns6) toolTipSTYLE = document.getElementById("toolTipLayer").style;
        else if (ie4) toolTipSTYLE = document.all.toolTipLayer.style;
        if (ns4) document.captureEvents(Event.MOUSEMOVE);
        else {
            toolTipSTYLE.visibility = "visible";
            toolTipSTYLE.display = "none";
        }
        document.onmousemove = moveToMouseLoc;
    }
}
function toolTip(obj)
//function toolTip(msg, w, h, fg, bg)
{
    var fg = '', bg = '', url = '';
    try {
        if (toolTip.arguments.length < 1) // hide
        {
            if (ns4) {
                toolTipSTYLE.visibility = "hidden";
            }
            else {
                if (!endaction) { toolTipSTYLE.display = "none"; }
                if (rT) document.all("msg1").filters[1].Apply();
                if (bT) document.all("msg1").filters[2].Apply();
                document.all("msg1").filters[0].opacity = 0;
                if (rT) document.all("msg1").filters[1].Play();
                if (bT) document.all("msg1").filters[2].Play();
                if (rT) {
                    if (document.all("msg1").filters[1].status == 1 || document.all("msg1").filters[1].status == 0) {
                        toolTipSTYLE.display = "none";
                    }
                }
                if (bT) {
                    if (document.all("msg1").filters[2].status == 1 || document.all("msg1").filters[2].status == 0) {
                        toolTipSTYLE.display = "none";
                    }
                }
                if (!rT && !bT) toolTipSTYLE.display = "none";
            }
        }
        else {
            if (!fg) fg = "#777777";
            if (!bg) bg = "#eeeeee";
            try {
                url = document.getElementById(obj).value;
               
            } catch (err) {
                url = obj;
            }
            if (url == '') {
                url = '../Images/onlinenone.jpg';
            }
            var content =
            //'<table id="msg1" name="msg1" border="0" cellspacing="0" cellpadding="1" bgcolor="' + fg + '" class="trans_msg" ><td>' +
            //'<table border="0" cellspacing="2" cellpadding="3" bgcolor="' + bg + 
            //'"><td><font face="Arial" color="' + fg +
            //'" size="-2">' + '<img src=' + msg + '  width=' + w + ' height=' + h + ' />' +
            //'</font></td></table></td></table>';
            //"<div style='text-align:center; border: #cccccc 5px solid;z-index: 2;'><img src='" + msg + "'  width='" + w + "' height='" + h + "'/></div>";

            "<div style='text-align:center; border: #cccccc 3px solid;z-index: 2;'><img src='../../" + url + "?" + Math.random() + "' alt='../../" + url + "' onload='javascript:if(this.width>320){this.width=320;} if(this.height>320){this.height=320}'/></div>";               
            //alert('../../'+url);
            if (ns4) {
                toolTipSTYLE.document.write(content);
                toolTipSTYLE.document.close();
                toolTipSTYLE.visibility = "visible";
            }
            if (ns6) {
                document.getElementById("toolTipLayer").innerHTML = content;
                toolTipSTYLE.display = 'block'
            }
            if (ie4) {
                document.all("toolTipLayer").innerHTML = content;
                toolTipSTYLE.display = 'block'
                //--ͼ����ɣ����봦��--
                var cssopaction = document.all("msg1").filters[0].opacity
                document.all("msg1").filters[0].opacity = 0;
                if (rT) document.all("msg1").filters[1].Apply();
                if (bT) document.all("msg1").filters[2].Apply();
                document.all("msg1").filters[0].opacity = cssopaction;
                if (rT) document.all("msg1").filters[1].Play();
                if (bT) document.all("msg1").filters[2].Play();
            }
        }
    } catch (e) { }
}
function moveToMouseLoc(e) {
    var scrollTop = getScrollTop();
    var scrollLeft = getScrollLeft();
    if (ns4 || ns6) {
        x = e.pageX + scrollLeft;
        y = e.pageY - scrollTop;
    }
    else {
        x = event.clientX + scrollLeft;
        y = event.clientY;
    }

    if (x - scrollLeft > getViewportWidth() / 2) {
        x = x - document.getElementById("toolTipLayer").offsetWidth - 2 * offsetX;
    }

    if ((y + document.getElementById("toolTipLayer").offsetHeight + offsetY) > getViewportHeight()) {
        y = getViewportHeight() - document.getElementById("toolTipLayer").offsetHeight - offsetY;
    }
    toolTipSTYLE.left = (x + offsetX) + 'px';
    toolTipSTYLE.top = (y + offsetY + scrollTop) + 'px';
    return true;
}
initToolTips();


function txtEmpty(obj)
{
    try
    {
    document.getElementById(obj).value = '';
    }
    catch(err)
    {
    document.getElementById(obj).text = '';
    }
}

