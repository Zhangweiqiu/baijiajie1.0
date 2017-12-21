window.onload = function() {
    // 信息接口
    $('body').height($(window).height());
    fans_ini();
    // localStorage.clear();
    //城市选择 
    var pro = ["北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "内蒙古", "广西", "西藏", "宁夏", "新疆", "香港", "澳门", "台湾"];
    for (var i = 0; i < pro.length; i++) {
        $option = $("<option/>")
        $option.attr("value", pro[i]);
        $option.text(pro[i]);
        $("#address_s").append($option);
    }
    //			add_one_imgp()

    //经纬度获取
    var url = encodeURIComponent(location.href.split('#')[0]);
    var datas = {
        url: url,
        uniacid: get_uniacid(),
        token: get_token(),
        'type': 2
    };
    $.ajax({
        type: "post",
        url: api_get_sign_package(),
        dataType: 'json',
        async: false, //设置为同步操作就可以给全局变量赋值成功 
        data: datas,
        success: function(res) {
            slolink = res.OauthRedirect;
            console.log(res);
            weixin(res);
        }
    });

    function weixin(res) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function() {
            wx.getLocation({
                type: 'wgs84',
                success: function(res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    console.log(latitude)
                    var latlon = latitude + ',' + longitude;
                    var location1 = '{"place_x":"' + latitude + '","place_y":"' + longitude + '","place_str":"' + $('#location').val() + '"}'
                    $('#local_lo').val(location1)
                }

            });

        });
    }
    //结束



    //$('#code').val(getCookie('code'))
    //$('#password').val(getCookie('password'))
    //删除缓存
    $("#clearhc").click(function() {
        window.location = 'home.html';
        localStorage.removeItem("fansy");

    })

    //
    $('#sfjdb').change(function() {
            var sf = $("#sfjdb option:selected").val();
            if (sf == '1') {
                $('#jdbfzkl').show();
            } else {
                $('#jdbfzkl').hide();
            }
        })
        //  $(“#div1").on("click",".k1",function(){
        //
        //      alert(11);
        //  })

//  $("ul").on("click", "li", function() {
//          var idx = $(this).index();
//          $(this).addClass("bj-active1").siblings().removeClass("bj-active1");
//          $(".bjj-info").eq(idx).fadeIn().siblings(".bjj-info").hide();
//
//      })
        //  $("ul li").click(function() {
        //      var idx = $(this).index();
        //      $(this).addClass("bj-active").siblings().removeClass("bj-active");
        //      $(".bjj-info").eq(idx).fadeIn().siblings(".bjj-info").hide();
        //  })

    var openid = getCookie('openid');
    var datas = {
        'uniacid': get_uniacid(),
        token: get_token(),
        openid: openid
    };
    $.ajax({
        type: "post",
        url: api_fans_info(),
        dataType: 'json',
        data: datas,
        success: function(res) {
            if (res.status == 1) {
                data = res.data;
                console.log(data)
                console.log(res.data.verify)
                $("#phone").val(data.phone);
                console.log(data.phone)
                setCookies('fans', data);
                if (res.data.verify == 0) {

                    location_page_reg();
                    return false;
                }
                var fanyu = getCookies('fansy');
                console.log(fanyu.hand_in_id)
                if (fanyu) {
                    var name = $("#name").val(fanyu.name); //姓名
                    var phone = $("#phone").val(data.phone); //手机号码
                    var phone_time = $("#phone_time").val(data.phone_time); //手机号码使用时间
                    var qq = $("#qq").val(fanyu.qq); //qq号
                    var address_s = $("#address_s").val(fanyu.address_s); //省份
                    var yongyu = $("#yongyu").val(data.yongyu); //用途
                    var zhima = $("#zhima").val(fanyu.zhima); //芝麻分
                    var jiebei = $("#jiebei").val(fanyu.jiebei); //借呗
                    var huabei = $("#huabei").val(fanyu.huabei); //花呗
                    var sex = $("#sex").val(fanyu.sex); //性别    
                    var age = $("#age").val(fanyu.age); //年龄
                    var sfjdb = $("#sfjdb").val(fanyu.is_jdb); //是否有借贷宝
                    $('#wx-sfz').attr('src', fanyu.hand_in_id);
                    $('#wxewf').attr('src', fanyu.qr_code);
                    $('#edu').val(fanyu.qi_wang)
                    $('#wx-sfzmz').attr('src', fanyu.idcard);
                    var idnumber = $("#idnumber").val(fanyu.idnumber); /*身份证号*/
                    var is_credit = $("#is_credit").val(fanyu.is_credit); //有无信用卡
                    $('.s img').attr('src', data.invite_headimgurl);
                    $('.s strong').text(data.invite_nickname)
                    if (data.is_jdb == -1) {
                        $('#poluk').css('color', 'red');
                    }
                    if (fanyu.is_jdb == 1) {
                        $('#jdbfzkl').show();
                    } else {
                        $('#jdbfzkl').hide();
                    }
                    $('#weixinjietu').val(data.qr_code);
                    $('#cover_url2 img').attr('src', data.qr_code);
                    var is_credit = $("#is_credit").val(fanyu.is_credit); //有无信用卡
                    var fund = $("#fund").val(data.fund); //有无公积金
                    var phzfb = $("#phzfb").val(data.phzfb); //支付宝和手机号是否统一
                    var jdbfz = $("#jdbfz").val(fanyu.jdb_borrow); /*借贷宝负债*/
                    var jdbhk = $("#jdbhk").val(fanyu.jdb_return); /*借贷宝还款*/

                    var work = $("#work").val(data.work) /*职业类型*/
                    if (data.invite_headimgurl == '' || data.invite_nickname == '') {
                        $('.s').hide();
                        $('.s').next('input').show();
                    } else {
                        $('.s img').attr('src', data.invite_headimgurl);
                        $('.s strong').text(data.invite_nickname)
                    }
                    if (data.judge == 1) {
                        $('.scsfz').remove();
                    }



                } else {
                    //                      console.log(fanyu)
                    //                      console.log(data.limu);
                    var name = $("#name").val(data.name); //姓名
                    var phone = $("#phone").val(data.phone); //手机号码
                    var phone_time = $("#phone_time").val(data.phone_time); //手机号码使用时间
                    var qq = $("#qq").val(data.qq); //qq号
                    var address_s = $("#address_s").val(data.address_s); //省份
                    var yongyu = $("#yongyu").val(data.yongyu); //用途
                    var zhima = $("#zhima").val(data.zhima); //芝麻分
                    var jiebei = $("#jiebei").val(data.jiebei); //借呗
                    var huabei = $("#huabei").val(data.huabei); //花呗
                    var sex = $("#sex").val(data.sex); //性别    
                    var age = $("#age").val(data.age); //年龄
                    var sfjdb = $("#sfjdb").val(data.is_jdb); //是否有借贷宝
                    if (data.is_jdb == -1) {
                        $('#poluk').css('color', 'red');
                    }
                    if (data.is_jdb == 1) {
                        $('#jdbfzkl').show();
                    } else {
                        $('#jdbfzkl').hide();
                    }
                    $('#weixinjietu').val(data.qr_code);
                    $('#cover_url2 img').attr('src', data.qr_code);
                    var is_credit = $("#is_credit").val(data.is_credit); //有无信用卡
                    var fund = $("#fund").val(data.fund); //有无公积金
                    var phzfb = $("#phzfb").val(data.phzfb); //支付宝和手机号是否统一
                    var jdbfz = $("#jdbfz").val(data.jdb_borrow); /*借贷宝负债*/
                    var jdbhk = $("#jdbhk").val(data.jdb_return); /*借贷宝还款*/
                    var idnumber = $("#idnumber").val(data.idnumber); /*身份证号*/
                    var work = $("#work").val(data.work) /*职业类型*/
                    if (data.invite_headimgurl == '' || data.invite_nickname == '') {
                        $('.s').hide();
                        $('.s').next('input').show();
                    } else {
                        $('.s img').attr('src', data.invite_headimgurl);
                        $('.s strong').text(data.invite_nickname)
                    }
                    if (data.judge == 1) {
                        $('.scsfz').remove();
                    }
                    $('#wx-sfz').attr('src', data.hand_in_id);
                    $('#wxewf').attr('src', data.qr_code);
                    $('#edu').val(data.qi_wang)
                    $('#wx-sfzmz').attr('src', data.idcard);
                }

            } else {
                location_page_login();
            }
        }
    });


}
$('.wx-img').click(function() {
    $(this).next('.mui-backdrop').fadeIn();
})
$('.mui-backdrop').click(function() {
    $('.mui-backdrop').fadeOut();
})
$('.bg-go i').click(function() {
    $('.mui-backdrop').fadeOut();
})
$('.bbj-liti').click(function() {
    $(this).next('p').fadeToggle();

})
var fans = getCookies('fans');
var fansy = [];
//console.log(fans.limu)




function que() {
    pl = que;
    console.log(pl)
}



$('#bbj-one').click(function() {
    var qye = {
        name: $('#name').val(),
        wechat: $('#wechat').val(),
        zhima: $('#zhima').val(),
        jiebei: $('#jiebei').val(),
        huabei: $('#huabei').val(),
        sex: $('#sex').val(),
        age: $('#age').val(),
        qq: $('#qq').val(),
        address_s: $('#address_s').val(),
        is_credit: $('#is_credit').val(),
        idnumber: $('#idnumber').val(),
        jdb_borrow: $('#jdbfz').val(),
        jdb_return: $('#jdbhk').val(),
        is_jdb: $('#sfjdb').val(),
        qr_code: $("#wxewf").attr('src'),
        hand_in_id: $('#wx-sfz').attr('src'),
        qi_wang: $('#edu').val(),
        idcard: $('#wx-sfzmz').attr('src'),
        location: $('#local_lo').val()
    }
    var name = $('#name').val();
    var sex = $('#sex').val();
    var age = $('#age').val();
    var phone = $('#phone').val();
    var password = $('#password').val();
    var qq = $('#qq').val();
     var zhima = $("#zhima").val(); //芝麻分
      var zhimaa = /^\d{3}$/;
	var address_s = $("#address_s").val()
    var idnumber = $("#idnumber").val(); /*身份证号*/
    var myreg = /^[\u4e00-\u9fa5]+$/;
    if (name == '') {
        mui.toast('姓名不能为空');
        return false;
    }
    if (name.length > 0 && !myreg.test(name)) {
        mui.toast('请输入中文姓名');
        return false;
    }

//  if (!sex) {
//      mui.toast('性别不能为空');
//      return false;
//  }
    if (age == '') {
        mui.toast('年龄不能为空');
        return false;
    }

    var age1 = /^(?:[1-9][0-9]?|1[01][0-9]|110)$/;
    if (!age1.test(age)) {
        mui.toast('请输入格式正确的年龄');
        return false;
    }
    if (qq == '') {
        mui.toast('QQ不能为空');
        return false;
    }

    var qq1 = /^[1-9]([0-9]{5,11})$/;
    if (!qq1.test(qq)) {
        mui.toast('QQ的格式不正确');
        return false;
    }
    if (!zhimaa.test(zhima)) {
        mui.toast('请输入正确的芝麻分数');
        return false;
    }
    var reg = /^1[3456789]{1}[0-9]{9}$/;
    if (!phone || !reg.test(phone)) {
        mui.toast('请输入正确的手机号码');
        return false;
    }
    if (!address_s) {
        mui.toast('请选择省份！');
        return false;
    }
//  var idnumbera = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
//  if (!idnumbera.test(idnumber)) {
//      mui.toast('请输入正确的身份证号码');
//      return false;
//  }
//  if (!$("#checkedx1").is(':checked')) {
//      mui.toast('请同意！');
//      return false;
//  }
    //alert('ok 下一步') 正则验证通过 跳转第二页

    console.log(qye)
    setCookies('fansy', qye)

    var idx = $(this).index();
    //console.log(idx)
    $('ul li').eq(1).addClass("bj-active1").siblings().removeClass("bj-active1");
    $(".bjj-info").eq(1).fadeIn().siblings(".bjj-info").hide();
    //          if (fans.limu == 0 || fans.limu == -1) {
    //              if (password == '') {
    //                  mui.toast('服务密码不能为空');
    //                  return false;
    //              }
    //              $.ajax({
    //                  type: "post",
    //                  url: getUrl() + "/index.php?s=/ox/user/add_limu",
    //                  dataType: 'json',
    //                  data: {
    //                      phone: phone,
    //                      password: password,
    //                      openid: getCookie('openid'),
    //                      'uniacid': get_uniacid(),
    //                  },
    //                  async: true,
    //                  success: function(res) {
    //                      if (res.status == 1) {
    //                          mui.toast(res.info);
    //                          setCookie('token_limu', res.data.token);
    //                          setCookie('password', $('#password').val());
    //                          var idx = $(this).index();
    //                          console.log(idx)
    //                          $('ul li').eq(1).addClass("bj-active").siblings().removeClass("bj-active");
    //                          $(".bjj-info").eq(1).fadeIn().siblings(".bjj-info").hide();
    //                      } else if (res.status == 0) {
    //                          mui.toast(res.info);
    //                      } else {
    //                          mui.toast(res.info);
    //                      }
    //                  }
    //              })
    //              return false;
    //          } else if (fans.limu == 2 || fans.limu == 1) {
    //          	alert(1)
    //              var idx = $(this).index();
    //              //              console.log(idx)
    //              $('ul li').eq(1).addClass("bj-active").siblings().removeClass("bj-active");
    //              $(".bjj-info").eq(1).fadeIn().siblings(".bjj-info").hide();
    //          }


    //				$.ajax({
    //                  type: "post",
    //                   url: getUrl() + "/index.php?s=/ox/user/add_limu_code",
    //                  dataType: 'json',
    //                  data: {phone:phone,openid:getCookie('openid'),'uniacid':get_uniacid()},
    //                  async:true, 
    //                  success: function (res) {
    //                  	if(res.status==0){
    //                  		mui.toast(res.info); 
    //                  		
    //                  	}else{
    //                  		mui.toast(res.info); 
    //                  	}
    //                  }
    //              })


})

//征信验证
$('.yzzhenx').click(function() {
    var fans = getCookies('fans');
    console.log(fans.phone)
    if ($('#password').val() == '') {
        mui.toast('服务密码不能为空');
        return false;
    }
    $.ajax({
        type: "post",
        url: getUrl() + "/index.php?s=/ox/user/add_limu",
        dataType: 'json',
        data: {
            phone: fans.phone,
            password: $('#password').val(),
            token: get_token(),
            'uniacid': get_uniacid()
        },
        async: true,
        success: function(res) {
            if (res.status == 1) {

                show_msg('运营商验证中，如长时间无法收到验证码，请直接点击下一步。');
                $('.phyzm').show();
                setCookie('token_limu', res.data.token);
                setCookie('password', $('#password').val());
                $('.yzzhenx').attr('disabled', 'disabled')

            } else if (res.status == 0) {
                mui.toast(res.info);
            } else {
                mui.toast(res.info);
            }
        }
    })
})
if (fans.limu == 2) {
    $('.yzzhenx').attr('disabled', 'disabled')
    $('.yzzhenx').text('已验证')
}
$('#fhslss').click(function() {
    show_msg('运营商验证中，如长时间无法收到验证码，请直接点击下一步。');

    //			var idx = $(this).index();
    //			var i=0;
    //			i++;
    //				$('ul li').eq(i).addClass("bj-active").siblings().removeClass("bj-active");
    //          	$(".bjj-info").eq(i).fadeIn().siblings(".bjj-info").hide();
    //			console.log(idx)
    //			if(idx>0){
    //				mui.toast('已经是第一页了');
    //			}else{
    //				
    //			}

})

$('.yzzhenx1').click(function() {
    var fans = getCookies('fans');
    //			$('.mui-backdrop').show();
    //			setTimeout(function(){
    //			$('.mui-backdrop').hide();
    //			 mui.toast('已关闭');
    //			},5000)

    $.ajax({
        type: "post",
        url: getUrl() + "/index.php?s=/ox2/user/add_limu_code",
        dataType: 'json',
        data: {
            phone: fans.phone,
            code: $('#code').val(),
            'uniacid': get_uniacid()
        },
        async: true,
        beforeSend: function() {
            $(".mui-backdrop1").show()
        },
        success: function(res) {
            if (res.status == 1) {
                $(".mui-backdrop1").hide()
                mui.toast('提交成功');

            } else if (res.status == 0) {
                $(".mui-backdrop1").hide()
                mui.toast('提交成功');
                setCookie('code', $('#code').val());
                $('.yzzhenx1').attr('disabled', 'disabled')
                check_limu(1)
            } else if (res.status == -1) {
                mui.toast(res.info);
                $(".mui-backdrop1").hide()
                $('.phyzm').hide();
                $('.yzzhenx').removeAttr('disabled')
                $('#password').val('')
                $('#code').val('')
                setCookie('code', '');
            } else if (res.status == -2) {
                mui.toast(res.info);
                $(".mui-backdrop1").hide()
                $('.phyzm').hide();
                $('.yzzhenx').removeAttr('disabled')
                $('#password').val('')
                $('#code').val('')
                setCookie('code', '');
            } else if (res.status == -3) {
                mui.toast(res.info);
                $(".mui-backdrop1").hide()
                $('.phyzm').hide();
                $('.yzzhenx').removeAttr('disabled')
                $('#password').val('')
                $('#code').val('')
                setCookie('code', '');
            } else {
                mui.toast('网络错误，请稍后重试！');
            }
        }
    })



})

$('#bbj-two').click(function() {
    var zhima = $("#zhima").val(); //芝麻分
    var jiebei = $("#jiebei").val(); //借呗
    var huabei = $("#huabei").val(); //花呗
   
    var wxsfz = $("#wx-sfz").attr('src')
    var wxsfzmz = $("#wx-sfzmz").attr('src')
    var code = $("#code").val()
    var address_s = $("#address_s").val()
    var idnumber = $("#idnumber").val(); /*身份证号*/


    var qye = {
        name: $('#name').val(),
        wechat: $('#wechat').val(),
        zhima: $('#zhima').val(),
        jiebei: $('#jiebei').val(),
        huabei: $('#huabei').val(),
        sex: $('#sex').val(),
        age: $('#age').val(),
        qq: $('#qq').val(),
        address_s: $('#address_s').val(),
        is_credit: $('#is_credit').val(),
        idnumber: $('#idnumber').val(),
        jdb_borrow: $('#jdbfz').val(),
        jdb_return: $('#jdbhk').val(),
        is_jdb: $('#sfjdb').val(),
        qr_code: $("#wxewf").attr('src'),
        hand_in_id: $('#wx-sfz').attr('src'),
        qi_wang: $('#edu').val(),
        idcard: $('#wx-sfzmz').attr('src'),
        location: $('#local_lo').val()
    }
    

    var huabei1 = /^(?:(?!0{1,4})\d{1,5}|10{5}|0)$/;
    if (!huabei1.test(jiebei)) {
        mui.toast('请输入正确的借呗分数');
        return false;
    }
    if (!huabei1.test(huabei)) {
        mui.toast('请输入正确的花呗分数');
        return false;
    }

    var idnumbera = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    if (!idnumbera.test(idnumber)) {
        mui.toast('请输入正确的身份证号码');
        return false;
    }
//  if (wxsfz == '') {
//      mui.toast('请上传正面的半身照片');
//      return false;
//  }
    if (wxsfzmz == '') {
        mui.toast('请上传身份证正面');
        return false;
    }
    if (!$("#checkedx2").is(':checked')) {
        mui.toast('请同意！');
        return false;
    }
    if (!address_s) {
        mui.toast('请选择省份！');
        return false;
    }
    //			console.log(address_s)
    console.log(qye)
    setCookies('fansy', qye)
        //          if (code == '') {
        //              mui.toast('运营商短信验证码 ');
        //              return false;
        //          }
        //alert('ok 2下一步') 正则验证通过 跳转第三页
    $('ul li').eq(2).addClass("bj-active").siblings().removeClass("bj-active");
    $(".bjj-info").eq(2).fadeIn().siblings(".bjj-info").hide();
    //          
    //          $.ajax({
    //              type: "post",
    //              url: getUrl() + "/index.php?s=/ox/user/add_limu_code",
    //              dataType: 'json',
    //              data: {
    //                  phone: $('#phone').val(),
    //                  code: code,
    //                  'uniacid': get_uniacid()
    //              },
    //              async: true,
    //              success: function(res) {
    //                  if (res.status == 1) {
    //                      console.log(res.info);
    //                       setCookie('code', $('#code').val());
    //                      var idx = $(this).index();
    //
    //                      $('ul li').eq(2).addClass("bj-active").siblings().removeClass("bj-active");
    //                      $(".bjj-info").eq(2).fadeIn().siblings(".bjj-info").hide();
    //                  } else if (res.status == 0) {
    //                      mui.toast(res.info);
    //                  } else {
    //                      mui.toast(res.info);
    //                  }
    //              }
    //          })

})

$('#reggo').click(function() {

    var openid = getCookie('openid');
    var dataq = {
        'uniacid': get_uniacid(), //标识3
        token: get_token(),
        openid: openid, //粉丝id
        name: $('#name').val(),
        //              phone: $('#phone').val(),
        wechat: $('#wechat').val(),
        zhima: $('#zhima').val(),
        jiebei: $('#jiebei').val(),
        huabei: $('#huabei').val(),
        sex: $('#sex').val(),
        age: $('#age').val(),
        qq: $('#qq').val(),
        address_s: $('#address_s').val(),
        is_credit: $('#is_credit').val(),
        idnumber: $('#idnumber').val(),
        jdb_borrow: $('#jdbfz').val(),
        jdb_return: $('#jdbhk').val(),
        //                			work:work,
        is_jdb: $('#sfjdb').val(),
        qr_code: $("#wxewf").attr('src'),
        hand_in_id: $('#wx-sfz').attr('src'),
        qi_wang: $('#edu').val(),
        idcard: $('#wx-sfzmz').attr('src'),
        location: $('#local_lo').val()
    };
    console.log(dataq)
    var sfjdb = $("#sfjdb").val();
    var is_credit = $("#is_credit").val();
    var edu = $("#edu").val();
    var wxewf = $("#wxewf").attr('src');
    var jdbfz = $("#jdbfz").val(); /*借贷宝负债*/
    var jdbhk = $("#jdbhk").val(); /*借贷宝还款*/
	var wxsfzmz = $("#wx-sfzmz").attr('src')
	var hand_in_id=$('#wx-sfz').attr('src')
    var qye = {
        name: $('#name').val(),
        wechat: $('#wechat').val(),
        zhima: $('#zhima').val(),
        jiebei: $('#jiebei').val(),
        huabei: $('#huabei').val(),
        sex: $('#sex').val(),
        age: $('#age').val(),
        qq: $('#qq').val(),
        address_s: $('#address_s').val(),
        is_credit: $('#is_credit').val(),
        idnumber: $('#idnumber').val(),
        jdb_borrow: $('#jdbfz').val(),
        jdb_return: $('#jdbhk').val(),
        is_jdb: $('#sfjdb').val(),
        qr_code: $("#wxewf").attr('src'),
        hand_in_id: $('#wx-sfz').attr('src'),
        qi_wang: $('#edu').val(),
        idcard: $('#wx-sfzmz').attr('src'),
        location: $('#local_lo').val()
    }
    setCookies('fansy', qye)
    
        var name = $('#name').val();
    var sex = $('#sex').val();
    var age = $('#age').val();
    var phone = $('#phone').val();
    var password = $('#password').val();
    var qq = $('#qq').val();
     var zhima = $("#zhima").val(); //芝麻分
      var zhimaa = /^\d{3}$/;
	var address_s = $("#address_s").val()
    var idnumber = $("#idnumber").val(); /*身份证号*/
    var myreg = /^[\u4e00-\u9fa5]+$/;
    var huabei=$('#huabei').val();
    if (name == '') {
        mui.toast('姓名不能为空');
        return false;
    }
    if (name.length > 0 && !myreg.test(name)) {
        mui.toast('请输入中文姓名');
        return false;
    }

//  if (!sex) {
//      mui.toast('性别不能为空');
//      return false;
//  }
    if (age == '') {
        mui.toast('年龄不能为空');
        return false;
    }

    var age1 = /^(?:[1-9][0-9]?|1[01][0-9]|110)$/;
    if (!age1.test(age)) {
        mui.toast('请输入格式正确的年龄');
        return false;
    }
    if (qq == '') {
        mui.toast('QQ不能为空');
        return false;
    }

    var qq1 = /^[1-9]([0-9]{5,11})$/;
    if (!qq1.test(qq)) {
        mui.toast('QQ的格式不正确');
        return false;
    }
    if (!zhimaa.test(zhima)) {
        mui.toast('请输入正确的芝麻分数');
        return false;
    }
    var reg = /^1[3456789]{1}[0-9]{9}$/;
    if (!phone || !reg.test(phone)) {
        mui.toast('请输入正确的手机号码');
        return false;
    }
    if (!address_s) {
        mui.toast('请选择省份！');
        return false;
    }
	if(!huabei){
		mui.toast('花呗有无必填');
        return false;
	}
    if (!sfjdb) {
        mui.toast('借贷宝有无必填');
        return false;
    }
        if (sfjdb == '1') {
            if (jdbfz == '') {
                mui.toast('借贷宝负债额度不能为空');
                return false;
            }
            if (jdbhk == '') {
                mui.toast('借贷宝还款额度不能为空');
                return false;
            }
        }

//  if (!is_credit) {
//      mui.toast('信用卡有无必填');
//      return false;
//  }
//  if (!edu) {
//      mui.toast('借款额度不能为空');
//      return false;
//  }
//	if (wxsfzmz == '') {
//      mui.toast('请上传身份证正面');
//      return false;
//  }
	if (!hand_in_id) {
        mui.toast('请上传手持身份证照');
        return false;
    }
	
    if (wxewf == '') {
        mui.toast('二维码截图不能为空');
        return false;
    }
//  if (!$("#checkedx").is(':checked')) {
//      mui.toast('请同意！');
//      return false;
//  }

    var openid = getCookie('openid');
    var tz = $_GET['bid'];
    if ($_GET['from']) {
        tz += "&from=" + $_GET['from']
    }
    $.ajax({
        type: "post",
        url: api_fans_info_up(),
        dataType: 'json',
        data: dataq,
        async: true,
        beforeSend: function() {
            $(".mui-backdrop1").show()
        },
        success: function(json) {
            console.log(json);
            if (json.status == 1) {
                $(".mui-backdrop1").hide()
                    //                  	setCookie('fansy', '');
                localStorage.removeItem("fansy");
                if (tz) {
                    $('#apply_jiedai').attr('href', 'Details.html?bid=' + tz)
                    show_msg2("pop_i1", "close_i");
                    $('#apply_jiedai').text('返回商家');
                    return false;
                } else {
                    show_msg2("pop_i1", "close_i");
                }
            } else {
                $(".mui-backdrop1").hide()
                mui.toast(json.info);
            }
        }
    });

})



//$("#file_input").localResizeIMG({
//  width: 400,
//  quality: 1,
//  success: function(result) {
//      console.log(result)
//      var obj = {
//          data: result.clearBase64,
//      };
//      var id = '#wx-sfz';
//      imgulond(obj, id)
//  }
//});
//$("#file_input2").localResizeIMG({
//  width: 400,
//  quality: 1,
//  success: function(result) {
//      console.log(result)
//      var obj = {
//          data: result.clearBase64,
//      };
//      var id = '#wx-sfzmz';
//      imgulond(obj, id)
//  }
//});
//$("#file_input1").localResizeIMG({
//  width: 400,
//  quality: 1,
//  success: function(result) {
//      console.log(result)
//      var obj = {
//          data: result.clearBase64,
//      };
//      var id = '#wxewf';
//      imgulond(obj, id)
//  }
//});
//var file_input = ['file_input', 'file_input2', 'file_input1'];
//var idimg = ['wx-sfz', 'wx-sfzmz', 'wxewf'];
//for (i = 0; i < file_input.length; i++) {
//	
//	
//	
//  $("#" + file_input[i]).change(function() {
//      if (this.id == 'file_input') {
//          console.log(this.id)
//          canvasResize(this.files[0], {
//              crop: false,
//              quality: 0.5,
//              rotate: 0,
//              callback(baseStr) {
//                  var obj = baseStr;
//                  imgulond(obj, '#wx-sfz')
//              }
//          })
//
//      } else if (this.id == 'file_input2') {
//          console.log(this.id)
//          canvasResize(this.files[0], {
//              crop: false,
//              quality: 0.5,
//              rotate: 0,
//              callback(baseStr) {
//                  var obj = baseStr;
//                  imgulond(obj, '#wx-sfzmz')
//              }
//          })
//      } else if (this.id == 'file_input1') {
//          console.log(this.id)
//          canvasResize(this.files[0], {
//              crop: false,
//              quality: 0.5,
//              rotate: 0,
//              callback(baseStr) {
//                  var obj = baseStr;
//                  imgulond(obj, '#wxewf')
//              }
//          })
//      }
//
//  });
//	
//	 
//
//	



	var file_input2w=document.querySelector('#file_input2');
	var file_input1w=document.querySelector('#file_input1');
//	file_input2w.onchange = function () {
//      lrz(this.files[0], {
//          width:1200,
//          before: function() {
//              console.log('压缩开始');
//          },
//          fail: function(err) {
//              console.error(err);
//          },
//          always: function() {
//              console.log('压缩结束');
//          },
//          done: function (results) {
//          // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
//         		console.log(results);
//         		console.log(results.base64)
//         		var obj = {
//		          data: results.base64
//		      };
//		      var id = '#wx-sfzmz';
//		      imgulond(obj, id)
//         
//          }
//      });
//  };
	
   

file_input1w.onchange = function () {
        // 也可以传入图片路径：lrz('../demo.jpg', ...
        lrz(this.files[0], {
            width:1200,
            before: function() {
                console.log('压缩开始');
            },
            fail: function(err) {
                console.error(err);
            },
            always: function() {
                console.log('压缩结束');
            },
            done: function (results) {
            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
           		console.log(results);
           		console.log(results.base64)
           		var obj = {
		          data: results.base64
		      };
		      var id = '#wxewf';
		      imgulond(obj, id)
           
            }
        });
    };


file_input2w.onchange = function () {
        // 也可以传入图片路径：lrz('../demo.jpg', ...
        lrz(this.files[0], {
            width:1200,
            before: function() {
                console.log('压缩开始');
            },
            fail: function(err) {
                console.error(err);
            },
            always: function() {
                console.log('压缩结束');
            },
            done: function (results) {
            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
           		console.log(results);
           		console.log(results.base64)
           		var obj = {
		          data: results.base64
		      };
		      var id = '#wx-sfz';
		      imgulond(obj, id)
           
            }
        });
    };





function imgulond(obj, id) {
    $.ajax({
        type: "POST",
        url: api_uploadPictureBase64(),
        data: obj,
        dataType: "json",
        async: true,
        beforeSend: function() {
            $(".mui-backdrop2").show()
        },
        success: function(msg) {
            if (msg.status == 1) {
                var qye = {
                    name: $('#name').val(),
                    wechat: $('#wechat').val(),
                    zhima: $('#zhima').val(),
                    jiebei: $('#jiebei').val(),
                    huabei: $('#huabei').val(),
                    sex: $('#sex').val(),
                    age: $('#age').val(),
                    qq: $('#qq').val(),
                    address_s: $('#address_s').val(),
                    is_credit: $('#is_credit').val(),
                    idnumber: $('#idnumber').val(),
                    jdb_borrow: $('#jdbfz').val(),
                    jdb_return: $('#jdbhk').val(),
                    is_jdb: $('#sfjdb').val(),
                    qr_code: $("#wxewf").attr('src'),
                    hand_in_id: $('#wx-sfz').attr('src'),
                    qi_wang: $('#edu').val(),
                    idcard: $('#wx-sfzmz').attr('src'),
                    location: $('#local_lo').val()
                }
                console.log(msg)
                $(".mui-backdrop2").hide()
                mui.toast('上传成功');
                document.querySelector(id).setAttribute('src', msg.path)
                setCookies('fansy', qye)
                console.log(qye)
            } else {
                mui.toast('上传失败');
            }
        }
    });

}

var rangeList = document.querySelectorAll('input[type="range"]');
    for(var i=0,len=rangeList.length;i<len;i++){
        rangeList[i].addEventListener('input',function(){
            if(this.id.indexOf('field')>=0){
                document.getElementById(this.id+'-input').value = this.value;
            }else{
                document.getElementById(this.id+'-val').innerHTML = this.value;
            }
            

        });
    }

$("#apply_jiedai").click(function() {
    var datas = { 'uniacid': get_uniacid(), token: get_token(), openid: getCookie('openid'), 'is_auto': 0 };
    $.ajax({
        type: "post",
        url: api_borrow_apply(),
        dataType: 'json',
        async: true, //设置为同步操作就可以给全局变量赋值成功 
        data: datas,
        success: function(res) {
            if (res.status == 1) {

            	$('.muibjj-backdrop').fadeIn();
            	$('.pop_i1').hide();
      			
//              window.location = getDir() + "count-down.html?is_auto=1";
                return false;
            } else {
                show_msg(res.info);
                return false;
            }
        }
    });
})

$('.btn-qux').click(function() {	
		$('.muibjj-backdrop').fadeOut();
 	})
 	
 	$('.btn-ts').click(function() {	
		var rannum=$('#block-range').val();
		if(!rannum || rannum==0){
			mui.alert('按住滑块选择商家！')
			return false;
		}
		var url='count-down.html?is_auto=1&send_c_limit='+rannum;
//		console.log(url);
		window.location.href =url;
		
 	})

//	function readFile(obj){   
//      var file = obj.files[0];      
//      //判断类型是不是图片  
//      if(!/image\/\w+/.test(file.type)){     
//              alert("请确保文件为图像类型");   
//              return false;   
//      }   
//      var reader = new FileReader();   
//      reader.readAsDataURL(file);   
//      reader.onload = function(e){   
//              console.log(this.result)
//              var obj={
//              	data:this.result
//              }
//              var id='#wxewf'
// 				imgulond(obj, id)
//      }   
//	}   

//document.querySelector('#file_input5').addEventListener('change', function () {
//	
//	canvasResize(this.files[0], {
//      crop: false,
//      quality: 0.4,
//      rotate: 0,
//      callback(baseStr) {
//      	var obj={
//          	data:baseStr
//          }
//          var id='#wxewf'
//			imgulond(obj,id)
//      }
//    })
	
//	lrz(this.files[0])
//      .then(function (rst) {
//          // 处理成功会执行
//          var obj={
//          	data:rst.base64
//          }
//          var id='#wxewf'
//			imgulond(obj,id)
//      })
//      .catch(function (err) {
//      	alert('上传失败')
//          // 处理失败会执行
//      })
//      .always(function () {
//      	
//          // 不管是成功失败，都会执行
//      });
//});
  


/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */



