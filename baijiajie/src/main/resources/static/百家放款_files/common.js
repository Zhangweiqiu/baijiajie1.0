
	function goPAGE() {
		if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

				 return true;
		}
			else {
				return false;
				//window.location.href="你的电脑版地址";	
			}
		}
	//接口用地址
    function getUrl() {
        return 'http://' + window.location.host;
        //     return 'http://127.0.0.1/qh_bjj'
    }
    // //页面用地址
    // function getTrueUrl() {
    //     return 'http://' + window.location.host;
    //     //     return 'http://127.0.0.1/qh_bjj'
    // }

     //bus用地址
    function getTrueUrl() {
        // return 'http://bus.rrjiekuan.com';
        return 'http://' + window.location.host;
        //     return 'http://127.0.0.1/qh_bjj'
    }

    function getDir() {
        return getUrl() + '/w_bjj/';
    }

    function get_uniacid() {

        if (isWeiXin()) {
            return 3;
        } else if (!get_openid() && !isWeiXin()) {
            return 4;
        }



    }
    function get_kouzi(){
        return getUrl() + "/index.php?s=/open/business/get_kouzi";
    }

    function get_access_token() {
        return getCookie('access_token');
    }

    function get_openid() {
        return getCookie('openid');
    }

    function get_token() {
        return getCookie('token');
    }

    function api_business_card(){
        return getUrl() + "/index.php?s=/open/public/get_wechat_img";
    }

    function api_rank_list(){
        return getUrl() + "/index.php?s=/open/invite/invite_rank_list.html";
    }
    function api_verify_rank(){
        return getUrl() + "/index.php?s=/open/invite/verify_rank_list";
    }

    //api推广h5页面注册
    function api_register() {
        return getUrl() + '/index.php?s=/open/relate/register';
    }
    function api_h_code() {
        return getUrl() + '/index.php?s=/open/relate/send_0812_code';
    }

    // api 商家列表
    function api_business_list() {
        return getTrueUrl() + "/index.php?s=/open/business/business.html";//ybh 2017年5月2日 18:30:48
    }

    // api 商家轮播
    function api_business_lunbo() {
        return getUrl() + "/index.php?s=/open/business/business_lunbo.html";
    }

    // 移动端获取分享链接
    function get_invite_url() {
        return getUrl() + "/index.php?s=/open/user/get_invite_url.html";
    }

    //   api 获取openid
    function api_getUserInfo() {
        return getUrl() + "/index.php?s=/open/Wx/getUserInfo_oauth.html";
    }

    //	api 余额体现
    function api_tx() {
        return getUrl() + "/index.php?s=/open/user/tx.html";
    }
    //取消订单
	function jk_cancle() {
        return getUrl() + "/index.php?s=/open/user/jk_cancle.html";
    }
	 function getAuthUrl() {
        return getUrl() + "/index.php?s=/open/wx/getAuthUrl";
    }
	
    //   api 余额体现
    function api_uploadPictureBase64() {
        return getUrl() + "/index.php?s=/Core/File/uploadPictureBase64.html";
    }


    //	api邀请页 - 商家返佣
    function api_businessRebate() {
        return getUrl() + "/index.php?s=/open/invite/businessRebate.html";
    }

    //	api邀请页 - 佣金说明
    function api_rebateTotal() {
        return getUrl() + "/index.php?s=/open/invite/rebateTotal.html";
    }

    //	api邀请页 - 获取粉丝专属推广二维码
    function api_getFansQr() {
        return getUrl() + "/index.php?s=/open/invite/getFansQr.html";
    }

    //	api客服-提交反馈
    function api_feed_back() {
        return getUrl() + "/index.php?s=/open/user/feed_back.html";
    }

    //	api 注销
    function api_feed_back() {
        return getUrl() + "/index.php?s=/open/user/feed_back.html";
    }
    //api  首页统计信息
    function api_index_stat() {
        return getTrueUrl() + "/index.php?s=/open/public/index_stat.html";//ybh 2017年5月2日 18:26:46
    }
    //api  注销
    function api_logout() {
        return getUrl() + "/index.php?s=/open/public/logout.html";
    }

    //api  申请借款
    function api_borrow_apply() {
        return getTrueUrl() + "/index.php?s=/open/borrow/apply.html";//ybh 2017年5月2日 18:26:59
    }

    //api  发送短信
    function api_send_sms_code() {
        return getTrueUrl() + "/index.php?s=/open/public/send_0812_code.html";// zwr 2017-7-20 10:46:03 短信借口被刷
    }

    //	修改密码验证码
    function api_send_reset_code() {
        return getUrl() + "/index.php?s=/open/public/reset_send_0815_code";
    }

    function api_send_pwd() {
        return getUrl() + "/index.php?s=/open/public/reset_pwd";
    }

    //api  用户验证
    function api_verify() {
        return getTrueUrl() + "/index.php?s=/open/public/verify.html";//ybh 2017年5月2日 18:27:19
    }

    //api  登录
    function api_login() {
        return getTrueUrl() + "/index.php?s=/open/public/login.html";//ybh 2017年5月2日 18:27:31
    }

    //api  获取粉丝个人信息
    function api_fans_info() {
        return getTrueUrl() + "/index.php?s=/open/user/fans_info.html";//ybh 2017年5月2日 18:27:39
    }

    //api获取配置
    function api_get_config() {
        return getUrl() + "/index.php?s=/open/public/get_config.html";
    }

    //api获取轮播图
    function api_get_lunbo() {
        return getUrl() + "/index.php?s=/open/public/get_lunbo.html";
    }

    //api 保存用户设备
    function api_save_equip() {
        return getUrl() + "/index.php?s=/open/user/save_equip";
    }

    //api  用户信息更新(修改)
    function api_fans_info_up() {
        return getTrueUrl() + "/index.php?s=/open/user/fans_info_up.html";//ybh 2017年5月2日 18:27:49
    }
    //api  获取jssdk签名报
    function api_get_sign_package() {
        return getUrl() + "/index.php?s=/open/wx/getSignPackage.html";
    }

    //api  获取用户网页base授权
    function api_get_base_oauth() {
        return getUrl() + "/index.php?s=/open/wx/getBaseOauth.html";
    }

    //api  点击马上关注按钮 邀请粉丝记录
    function api_inviteFans() {
        return getUrl() + "/index.php?s=/open/invite/inviteFans.html";
    }

    //api 商家详情
    function api_business_more() {
        return getTrueUrl() + "/index.php?s=/open/business/business_more";//ybh 2017年5月2日 18:28:00
    }

    //api 随机商家推荐
    function api_rand_business() {
        return getUrl() + "/index.php?s=/open/business/rand_business.html";
    }

    //api 手动借款
    function api_hand_borrow() {
        return getTrueUrl() + "/index.php?s=/open/borrow/handBorrow.html";//ybh 2017年5月2日 18:28:09
    }

    //api 提现详情
    function api_tx_record() {
        return getUrl() + "/index.php?s=/open/user/tx_record.html";
    }

    //api 借款历史
    function api_jk_history() {
        return getUrl() + "/index.php?s=/open/user/jk_history_new";
    }

    //api 催单
    function api_add_reminder() {
        return getUrl() + "/index.php?s=/open/order/addremind";
    }

    function api_remind_list() {
        return getUrl() + "/index.php?s=/open/business/business_remind";
    }

    //跳转  登录页
    function location_page_login() {
        window.location = getDir() + "login.html";
    }

    //token 获取
    function get_wxuser_uid() {
        return getUrl() + "/index.php?s=/open/user/get_wxuser_uid";
    }
    
    function get_wait_qrcode() {
        return getUrl() + "/index.php?s=/open/public/wait_qrcode";
    }

    //邀请 统计
    function get_tj_check() {
        return getUrl() + "/index.php?s=/open/relate/tj_check";
    }
    //注册 统计
    function get_res_check() {
        return getUrl() + "/index.php?s=/open/relate/res_check";
    }

    //跳转 二维码页
    function location_page_sharing() {
        window.location = getDir() + "sharing.html";
    }

    function location_page_personal() {
        window.location = getDir() + "personal.html";
    }

    function location_page_home() {
        window.location = getDir() + "home.html";
    }
	function location_page_reg() {
        window.location = getDir() + "reg.html";
    }
    //跳转 粉丝信息(完善)页
    function location_page_information() {
        window.location = getDir() + "information.html";
    }
     function location_page_member() {
        window.location = getDir() + "member.html";
    }

function jqajax(url, data, callback) {
    $.ajax({
        type: "post",
        url: url,
        dataType: 'json',
        async: true, //设置为同步操作就可以给全局变量赋值成功 
        data: data,
        success: callback
    });
}

    // 抛出异常,强制停止js程序,测试用
    function die() {
        var msg = arguments[0] ? arguments[0] : 'just test now!';
        throw new Error(msg);
    }

    function empty(v) {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (trim(v).length == 0)
                    return true;
                break;
            case 'boolean':
                if (!v)
                    return true;
                break;
            case 'number':
                if (0 === v)
                    return true;
                break;
            case 'object':
                if (null === v)
                    return true;
                if (undefined !== v.length && v.length == 0)
                    return true;
                for (var k in v) {
                    return false;
                }
                return true;
                break;
        }
        return false;
    }

    function trim(str) {
        for (var i = 0; i < str.length && str.charAt(i) == "  "; i++)
        ;
        for (var j = str.length; j > 0 && str.charAt(j - 1) == "  "; j--)
        ;
        if (i > j)
            return "";
        return str.substring(i, j);
    }

    /**
     *实现1(返回 $_GET 对象, 仿PHP模式)
     */
    var $_GET = (function() {
        var url = window.document.location.href.toString();

        var u = url.split("?");

        if (typeof(u[1]) == "string") {
            u = u[1].split("&");
            var get = {};
            for (var i in u) {
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return {};
        }
    })();


    /**
     *实现2(返回 $_GET 对象, 仿PHP模式)
     */
    var $_GET2 = (function() {
        var url = window.document.location.href.toString();

        var u = url.split("?");
        if (typeof(u[1]) == "string") {

            return u[1];
        } else {
            return '';
        }
    })();

    //模板渲染
    function Template_ini(template_name, content_id, obj) {

        if (!arguments[2]) obj = {};

        // obj.L = L();//获取语言包ch.js返回的对象
        var html = template(template_name, obj);
        $(content_id).html(html);
    }

    function setCookie(c_name, c_value) {
        window.localStorage.setItem(c_name, c_value);
    }

    function getCookie(c_name) {
        var val = window.localStorage.getItem(c_name);
        if (empty(val)) {
            val = "";
        }
        return val;
    }

    function setCookies(c_name, c_value) {
        var c_value = JSON.stringify(c_value); //对象类型 => 字符类型
        window.localStorage.setItem(c_name, c_value);
    }

    function getCookies(c_name) {
        var val = window.localStorage.getItem(c_name);
        var val = JSON.parse(val);
        if (empty(val)) {
            val = "";
        }
        return val;
    }


    //语言包初始化 保存到cookie
    function L_ini() {
        var Obj_lang = L(); //取语言包对象
        //window.Glo_lang = Obj_lang;//对象全局
        var Str_lang = JSON.stringify(Obj_lang); //对象类型 => 字符类型
        setCookie('Str_lang', Str_lang); //cookie只能保存字符类型
        // return Obj_lang;
    }

    //取得语言包对象
    function L_get() {
        Str_lang = getCookie('Str_lang');
        var Obj_lang = JSON.parse(Str_lang);
        return Obj_lang;
    }
    //百分数转化
    function toPercent(data) {
        var strData = parseFloat(data) * 100;
        var ret = strData.toString() + "%";
        return ret;
    }

    //格式化数字  
    function number_format(number, decimals, dec_point, thousands_sep) {
        /* 
         * 参数说明： 
         * number：要格式化的数字 
         * decimals：保留几位小数 
         * dec_point：小数点符号 
         * thousands_sep：千分位符号 
         * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    //封装过期控制代码
    function seTime(key, value) {
        var curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
    }

    function get(key, exp) {
        var data = localStorage.getItem(key);
        var dataObj = JSON.parse(data);
        if (new Date().getTime() - dataObj.time > exp) {
            console.log('信息已过期');
        } else {
            var dataObjDatatoJson = JSON.parse(dataObj.data)
            return dataObjDatatoJson;
        }
    }

	
	function ScrollImgLeft() {
		var speed = 50;
		var MyMar = null;
		var scroll_begin = document.getElementById("scroll_begin");
		var scroll_end = document.getElementById("scroll_end");
		var scroll_div = document.getElementById("scroll_div");
		scroll_end.innerHTML = scroll_begin.innerHTML;
	
		function Marquee() {
			if(scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
				scroll_div.scrollLeft -= scroll_begin.offsetWidth;
			else
				scroll_div.scrollLeft++;
		}
		MyMar = setInterval(Marquee, speed);
		// scroll_div.onmouseover = function() { clearInterval(MyMar);}　　　　
		// scroll_div.onmouseout = function() { MyMar = setInterval(Marquee, speed);}
	}
	
	
	function ScrollImgLeft1() {
		var speed = 50;
		var MyMar = null;
		
		var scroll_begin = document.getElementById("scroll_begin1");
		var scroll_end = document.getElementById("scroll_end1");
		var scroll_div = document.getElementById("scroll_div1");
		scroll_end.innerHTML = scroll_begin.innerHTML;
	
		function Marquee() {
			if(scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
				scroll_div.scrollLeft -= scroll_begin.offsetWidth;
			else
				scroll_div.scrollLeft++;
		}
		MyMar = setInterval(Marquee, speed);
		// scroll_div.onmouseover = function() { clearInterval(MyMar);}　　　　
		// scroll_div.onmouseout = function() { MyMar = setInterval(Marquee, speed);}
	}
	
	
    //function getLunBo(type){
    //  var all = getCookies('wx_lunbo');
    //  var html = '';
    //  console.log(all);
    //  $.each(all,function(index){
    //
    //  	
    //  	
    //
    //      if(this.type==type){
    //      	var l = this.name.length;
    //         if(l == 6){
    //  		var url = 'Details.html?'+this.name;
    //	    	}else{
    //	    		var url = this.name;
    //	    	}
    //          html+='<div class="mui-slider-item"><a href="'+url+'"><img data-original="'+this.value+'" src="'+this.value+'" class="lazy"></a></div>';
    //          
    //          
    //      }
    //  })
    //  return html;
    //}
    

(function(ww, dt) {
    var links = document.getElementsByTagName('head')[0].getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        links[i].setAttribute('href', href += '?time=' + (new Date()).valueOf())
    }
    var bodys = document.getElementsByTagName('body')[0].getElementsByTagName('script');

    for (var i = 0; i < bodys.length; i++) {
        var href = bodys[i].getAttribute('src');
        bodys[i].setAttribute('src', href += '?time=' + (new Date()).valueOf())
    }



}(window, window.document));