//***********
//手机字体rem计算

var fontSizeRem = document.documentElement.clientWidth * 0.0375;
document.getElementsByTagName("html")[0].style.fontSize = fontSizeRem + "px";
var wxisready;
// var imgUrl = 'http://local.yifu.com/w_bjj/images/bbjlogo.png',
//     // lineLink = location.href,
//     lineLink = 'http://www.rrjiekuan.com/w_bjj/msgzhu.html',
//     descContent = '借钱找借贷宝!',
//     shareTitle = '人人借贷宝!！',
//     appid = "",
//     hideAllNonBaseMenuItem = true;

var aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
}

// 身份证号码验证
function isCardID(sId) {
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return "你输入的身份证号非法";
    return true;
}


// 获取get参数
function getSearchKey(key) {
    var arr = window.location.search.substr(1).split(/&/),
        i = arr.length,
        re = new RegExp(key + '=', 'i');
    while (i--) {
        if (re.test(arr[i])) {
            return arr[i].substr(key.length + 1);
        }
    }
}

// 消息提示
function show_msg(msg) {
    $('.pop_msg').html(msg);
    $(".pop_alert").show().css("display", "table");
    $(".pop_alert").click(function() {
        $(".pop_alert").hide();
    });
}
// 弹窗
function show_msg2(btn, hidebtn) {
    $("." + btn).css("display", "table");

    $("." + hidebtn).click(function() {
        $("." + btn).hide();
    })
}

// 弹窗
function shid(showbtn, btn, hidebtn) {
    $("." + showbtn).click(function() {
        $("." + btn).css("display", "table");
    })
    $("." + hidebtn).click(function() {
        $("." + btn).hide();
    })
}

function userAgent() {
    filter = {
        //浏览器代号
        appCodeName: navigator.appCodeName,
        //浏览器名称
        appName: navigator.appName,
        //浏览器版本
        appVersion: navigator.appVersion,
        //硬件平台
        platform: navigator.platform,
        //用户代理
        userAgent: navigator.userAgent
    };
    return filter;
}


//自动登录 及跳转验证
function auto_login(){

    var local = window.location.host;
    var token = get_token(); //uid
    var fans = getCookies('fans'); //fans
    var code = getQueryString("code"); //授权链接进入时,才会带的code身份验证码

    if (isWeiXin()) { //微信端进入

        if (local == 'local.yifu.com') {
             // setCookie('token', 'HVKCH39J17GV7MP1');
            // setCookie('openid', 'oUZViwMdDXqEsxhwYo3niz5F30HY');
           setCookie('openid', 'oUZViwMBUU3qREfatpiqh_47uBaE');
            
        }
        var openid = getCookie('openid'); //openid

        if (!getCookie('openid')) {
            if (code) { //从授权链接进入的合法的粉丝 即使用微信端的用户
                var datas = { 'uniacid': get_uniacid(), code: code };
                $.ajax({
                    type: "post",
                    url: api_getUserInfo(),
                    dataType: 'json',
                    async: false, //设置为同步操作就可以给全局变量赋值成功 
                    data: datas,
                    success: function(res) {
                        setCookie('openid', res.openid);
                        openid = res.openid;
                    }
                });
            } else {
                go_reg();
            }

        } else {
            setCookie('openid', openid);
        }
    }

    var openid = getCookie('openid'); //openid
    var token = get_token(); //uid
    if (isWeiXin() && openid && !token) { //微信端进入并获取到openid且无token
        jqajax(get_wxuser_uid(), { openid: getCookie('openid'), 'uniacid': get_uniacid() }, callback)
        //请求token 并存入缓存
            function callback(res) {
                if (res.status == 1) {
                    setCookie('token', res.data.token);
                    fans_ini();
                } else {
                    go_reg();
                }
            }
        console.log('token');
    }else{
        if(token){
            fans_ini();
        }else{
            go_reg();
        }
    }
}
auto_login();

//获取粉丝信息
function fans_ini() {

    //setCookie('openid','oUZViwCczs2QU-N5ZzVaNj5Q1cVw');
    //setCookie('openid','oUZViwGBIghXFlCI8fd1HcJls39E');
    // setCookie('openid','oUZViwBmqQ5hwLBjHq3Krog15hUY');

    var local = window.location.host;
    var openid = getCookie('openid'); //openid
    var token = get_token(); //uid
    var fans = getCookies('fans'); //fans
    var code = getQueryString("code"); //授权链接进入时,才会带的code身份验证码

    if (isWeiXin()) { //微信端进入

        if (!fans || code) { //粉丝信息缓存过期或从公众号菜单重新进入时,刷新粉丝信息
            var token = getCookie('token');
            var openid = getCookie('openid');
            var datas = { 'uniacid': get_uniacid(), token: token, openid: openid };
            fans_info(datas)
        }

    } else { //其他进入

        var fans = getCookies('fans');
        if (fans) {
            setCookies('fans', fans);
            setCookie('token', fans.token);

        } else {
            if (getCookie('token')) {
                var datas = { 'uniacid': get_uniacid(), token: getCookie('token') };
                fans_info(datas)
            }
        }

    }

      var Disable = '<div id="Disable"><li>您已被封号</li><li>如果想继续推广,请联系客服！</li><img src="./images/yuer.png" alt="" class="kefuma"></div>';
       if (fans.status == -1) {
           $('a').removeAttr('href');
           $('body').html('');
           $('title').html('您已被封号！');
           $('body').html(Disable);
           $('#Disable li').css({
               'font-size': '15px',
               'font-family': 'microsoft yahei',
               'margin-top': '8px '

           })
           $('.kefuma').css({
               'display': 'block',
               'width': '39%',
               'margin': '20px auto',
               'border': '7px solid #ffffff'
           })
           $('#Disable').css({
               'position': 'fixed',
               'top': '0',
               'left': '0',
               'width': '100%',
               'height': '100%',
               'z-index': '9999',
               'background-color': '#ffffff',
               'text-align': 'center',
               'line-height': '100%',
               'padding-top': '20px'


           });
       }
}

function weihu(){
//		  var Disable = '<div id="Disable"><li>您已被封号</li><li>如果想继续推广,请联系客服！</li><img src="./images/yuer.png" alt="" class="kefuma"></div>';
	      var Disable = '<div id="Disable"><li></li><li>服务器维护中！</li></div>';
	      
//     if (fans.status == -1) {
           $('a').removeAttr('href');
           $('body').html('');
           $('title').html('维护中！');
           $('body').html(Disable);
           $('#Disable li').css({
               'font-size': '15px',
               'font-family': 'microsoft yahei',
               'margin-top': '8px '

           })
           $('.kefuma').css({
               'display': 'block',
               'width': '39%',
               'margin': '20px auto',
               'border': '7px solid #ffffff'
           })
           $('#Disable').css({
               'position': 'fixed',
               'top': '0',
               'left': '0',
               'width': '100%',
               'height': '100%',
               'z-index': '9999',
               'background-color': '#ffffff',
               'text-align': 'center',
               'line-height': '100%',
               'padding-top': '20px'


           });
}
//weihu()
function jqajax(url, data, callback) {
    $.ajax({
        type: "post",
        url: url,
        dataType: 'json',
        async: false, //设置为同步操作就可以给全局变量赋值成功 
        data: data,
        success: callback
    });
}

function fans_info(datas) {
    $.ajax({
        type: "post",
        url: api_fans_info(),
        dataType: 'json',
        async: false, //设置为同步操作就可以给全局变量赋值成功 
        data: datas,
        success: function(res) {
            if (res.status == 1) {
                setCookies('fans', res.data);
                console.log(getCookies('fans'))
            } else {
                if(res.info == 'need register'){
                    setCookie('token','');
                }
            }

        }
    });
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


/**********图片转base_64************/
function run(input_file, get_data) {
    /*input_file：文件按钮对象*/
    /*get_data: 转换成功后执行的方法*/
    if (typeof(FileReader) === 'undefined') {
        alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
    } else {
        try {
            /*图片转Base64 核心代码*/
            var file = input_file.files[0];
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件  
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.onload = function() {
                get_data(this.result);
            }
            reader.readAsDataURL(file);
        } catch (e) {
            alert('图片转Base64出错啦！' + e.toString())
        }
    }
}

window.onload = function() {
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (browser.versions.ios) {
        $("select").addClass("sel");
    }
    if (browser.versions.android) {

    }
    $('img[source]').each(function() {
        var url = $(this).attr('source') || '';
        if (url) {
            url = url.replace('rs.v5kf', 'rs.zljianjie');
            url = url.replace('static.v5kf', 'static.zljianjie');
            $(this).attr('src', url);
        }
    });
    // 自定义链接
    //	$("*").click(function() {
    //      var linkHref = $(this).attr("data-href");
    //      if (linkHref) window.location.href = linkHref;
    //  });
    // 文本弹窗
    shid("text_i", "pop_jl", "close_jl");
    // 按钮弹窗
    shid("btn_i", "pop_i", "close_i");
    shid("btn_i1", "pop_i1", "close_i");
    //奖励
    shid("jl", "pop_jl", "close_jl");
    //滚屏弹窗
    shid("pop_gp", "pop_gp_box", "close_gp");

    //粉丝数据初始化
    // fans_ini();

    //分享js
    var shareLink = lineLink;
    //	shareLink = shareLink.indexOf("?") > 0 ? shareLink + '&share=' : shareLink + '?share=';

    if(typeof(wx) != "undefined"){

        wx.error(function(res) {});

        wx.ready(function() {
            wxisready = 1;

            // wx.hideMenuItems({
            //     menuList: [
            //     	"menuItem:share:timeline"
            //     ] 
            // });
            wx.onMenuShareTimeline({
                title: shareTitle,
                link: shareLink,
                imgUrl: imgUrl,
                success: function(res) {

                },
                cancel: function(res) {}
            });
            wx.onMenuShareAppMessage({
                title: shareTitle,
                desc: descContent,
                link: shareLink,
                imgUrl: imgUrl,
                success: function(res) {

                },
                cancel: function(res) {}
            });
            wx.onMenuShareQQ({
                title: shareTitle,
                desc: descContent,
                link: shareLink,
                imgUrl: imgUrl,
                success: function(res) {

                },
                cancel: function(res) {}
            });
            wx.onMenuShareWeibo({
                title: shareTitle,
                desc: descContent,
                link: shareLink,
                imgUrl: imgUrl,
                success: function(res) {

                },
                cancel: function(res) {}
            });

            // 隐藏所有非基础按钮
            if (hideAllNonBaseMenuItem && hideAllNonBaseMenuItem == true) {
                wx.hideAllNonBaseMenuItem();
            } else {
                // wx.showAllNonBaseMenuItem();
            }
        });
    }

};

function get_config() {

    $.ajax({
        type: "post",
        data: 'uniacid=' + get_uniacid(),
        url: api_get_config(),
        dataType: 'json',
        async: false, //设置为同步操作就可以给全局变量赋值成功 
        success: function(res) {
            setCookies('wx_config', res.data);
            version = res.version;
        }
    });
    return version;

}
//function kil(){
//	setInterval(function(){
//	localStorage.clear();
//},50000)
//}
//kil()


function timestamp(url){
     //  var getTimestamp=Math.random();
      var getTimestamp=new Date().getTime();
      if(url.indexOf("?")>-1){
        url=url+"&timestamp="+getTimestamp
      }else{
        url=url+"?timestamp="+getTimestamp
      }
      return url;
    }

timestamp(window.location.href)
console.log(timestamp(window.location.href))
console.log(window.location.href)
function check_version(num) {
    if (!num) {
        var version = getCookie('version');
        if (!version) {
            version = get_config();
            get_lunbo();
            // Scrol_pic();
            setCookie('version', version);
        }
    } else {
        var version = getCookie('version');
        if (!version || num != version) {
            setCookie('version', num);
            get_config();
            get_lunbo();
            localStorage.clear();
            // Scrol_pic();
        }
    }


}
check_version();

function Scrol_pic() {
    $.ajax({
        type: "post",
        url: api_business_lunbo(),
        dataType: 'json',
        async: false,
        data: 'uniacid=' + get_uniacid(),
        success: function(res) {
            datae = res;
            setCookies('Scrol_pic', datae);
        }
    });
}

function get_lunbo() {

    $.ajax({
        type: "post",
        data: 'uniacid=' + get_uniacid(),
        url: api_get_lunbo(),
        dataType: 'json',
        async: false, //设置为同步操作就可以给全局变量赋值成功 
        success: function(res) {
            setCookies('wx_lunbo', res.data);


        }
    });

}

function device_collection(api_name) {

    var usa = {
        'uniacid': get_uniacid(),
        'api_name': api_name,
        openid: getCookie('openid'),
        token: get_token(),
        // app_code_name:navigator.appCodeName,
        //浏览器名称
        // app_name:navigator.appName,
        //浏览器版本
        // app_version:navigator.appVersion,
        //硬件平台
        platform: navigator.platform,
        //用户代理
        user_agent: navigator.userAgent
    }
    $.ajax({
        type: "post",
        url: api_save_equip(),
        dataType: 'json',
        async: false, //设置为同步操作就可以给全局变量赋值成功 
        data: usa,
        success: function(res) {
            //								
        }
    });

}

//console.log(window.location.href)
//
function locationk(){
	if(isWeiXin() && !getCookie('openid')){
		
		if(getQueryString("code")){
			
		}else{
			var datas = {
            url: encodeURIComponent(location.href.split('#')[0]),
            uniacid: get_uniacid()
	         };
			jqajax(getAuthUrl(),datas, callback)
			function callback(res){
				
				if(res.status==1){
					alert(res.info)
					window.location=res.data.url
				}else{
					alert('请关注公众号百家借')
				}
				 
			}
		}
		
		
		
	}
}
//if (local == 'local.yifu.com'){
//	
//}else{
//	locationk()
//}


function check_limu(i) {
    var fans = getCookies('fans');
    if (fans.limu == 1 || i == 1) {
        var set = setInterval(function() {
            if (getCookie('code')) {
                ajax_limu(i)
            }
        }, 10000)
        console.log(1)
    }


}
//check_limu(0)
function ajax_limu(i) {

    fans_ini();
    var token = getCookie('token_limu');
    var fans = getCookies('fans');
    console.log(1)
    console.log()
        //	console.log(token)
    var do1 = 3
    if (fans.limu == 1 && getCookie('code')) {
        do1 = 1;
    } else if (i == 1) {
        do1 = 1;
    } else if (fans.limu == 2) {

        console.log('完成')
        setCookie('code', '');
    } else if (fans.limu == -1) {

        setCookie('code', '');
    } else if (fans.limu == -2) {
        setCookie('code', '');
    }
    if (do1 == 1) {
        console.log(2)
        $.ajax({
            type: "post",
            url: getUrl() + "/index.php?s=/ox2/user/limu_get_status",
            dataType: 'json',
            data: {
                token: token,
                'uniacid': get_uniacid()
            },
            async: true,
            success: function(res) {
                if (res.status == 1) {
                    fans_ini();
                    setCookie('code', '');
                } else if (res.status == -1 || res.status == -2 || res.status == -3) {
                    setCookie('code', '');
                }
            }
        })
    }

}


//检查是否登录 如未登录除首页(home.html)均跳转至注册页(reg.html)
function go_reg(){
    var page_name = window.location.pathname;
    var token = get_token();
    if( !token && page_name != '/w_bjj/home.html' && page_name != '/w_bjj/msgzhuw.html' && page_name != '/w_bjj/msgzhu.html'){
        

        var url =  'http://'+window.location.host+'/w_bjj/reg.html';
        // alert(url);
        window.location.href =url;
    }
    
}


/**************************************************************************************************/