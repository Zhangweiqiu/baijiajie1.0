        $(document).ready(function() {
            $('body').height($(window).height());
            var land = document.querySelector('#land');
            var mobile = document.querySelector('#mobile');
            var password = document.querySelector('#password');
            var reg = document.querySelector('#reg');
            var mobile1 = document.querySelector('#mobile1');
            var password1 = document.querySelector('#password1');
            var btn_send = document.querySelector('#btn_send');
            var meone = /^1[3456789]{1}[0-9]{9}$/;
            // land.onclick = login;
            // reg.onclick = reg;
            fans_ini();
            var openid = getCookie('openid')
                   console.log(openid)
                // 获取验证码
            var btnend = ['btnsend2', 'btnsend1', 'Determine', 'land', 'reg']
            for (i = 0; i < btnend.length; i++) {
                var wait = 60;

                $("." + btnend[i]).click(function() { // 修改密码验证码
                        // var _this = $(this);

                        if ($(this).attr('class') == 'btnsend2') {
                            console.log(this)
                            if (!$('#mobile2').val()) {
                                mui.toast('手机号不能为空！')
                                return false;
                            }
                            var phone = $('#mobile2').val();
                            //注册api_send_sms_code()  api_send_reset_code()
                            code(phone, api_send_reset_code(), this)

                        }

                        if ($(this).attr('class') == 'btnsend1') { // 注册验证码
                            //                          console.log($('#mobile1').val())
                            if ($('#mobile1').val() == '') {
                                mui.toast('手机号不能为空！')
                                return false;
                            }
                            //                          alert('ok')
                            //                          time(this);
                            var phone = $('#mobile1').val();
                            code(phone, api_send_sms_code(), this)
                        }

                    })
                    // 修改密码成功
                $("#" + btnend[i]).click(function() {
                    if (this.id == 'Determine') { //修改密码成功
                        var url = api_send_pwd();
                        var phone = $('#mobile2').val();
                        var sms_code = $('#sms_code2').val();
                        var pwd = $('#password2').val();
                        revipwd(url, phone, sms_code, pwd)
                    } else if (this.id == 'land') { //登录成功
                        login()
                    } else if (this.id == 'reg') { //注册成功
                        var url = api_verify();
                        var phone = $('#mobile1').val();
                        var sms_code = $('#sms_code1').val();
                        var pwd = $('#password1').val();
                        revipwd(url, phone, sms_code, pwd)
                            //                      location_page_information()
                    }
                })
            }


            // 修改密码&注册
            function revipwd(url, phone, sms_code, pwd) {

                if (!phone) {
                    mui.toast('手机号不能为空！')
                    return false;
                }
                if (!meone.test(phone)) {
                    mui.toast('请输入正确的手机号码！')
                    return false;
                }
                if (!sms_code) {
                    mui.toast('验证码不能为空！')
                    return false;
                }
                if (!pwd) {
                    mui.toast('密码不能为空！')
                    return false;
                }
                if(window.location.pathname=='/w_bjj/reg.html'){
                	var check= $('.check_box li').is('.liacti');
                	if(check){
                		mui.toast('请勾选下方协议')
                   		return false;
                	}
                }
                $(".mui-backdroplo").show()
                $.ajax({
                    type: "post",
                    url: url,
                    dataType: 'json',
                    async: true,
                    data: {
                        phone: phone,
                        sms_code: sms_code,
                        'uniacid': get_uniacid(),
                        pwd: pwd,
                        openid: openid
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            $(".mui-backdroplo").hide()
                            mui.toast(res.info)
                            setCookie('token', res.data.token);
                            location_page_member()
                                // window.location.reload();
                        } else {
                            $(".mui-backdroplo").hide()
                            mui.toast(res.info)
                        }
                    }

                });
            }

            // 验证码提交 注册api_send_sms_code()  api_send_reset_code()
            function code(phone, url, id) {
                $(".mui-backdroplo").show()
                $.ajax({
                    type: "post",
                    url: url,
                    dataType: 'json',
                    async: true,
                    data: {
                        phone: phone,
                        'uniacid': get_uniacid(),
                        openid: openid,
                        verify:$('#imgcode').val()
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            $(".mui-backdroplo").hide()
                            time(id);
                            mui.toast(res.info)
                        } else {
                        	console.log(res)
                        	
                            $(".mui-backdroplo").hide()
                            mui.toast(res.info)
                        }
                    }

                });
            }

            // 验证码倒计时
            function time(o) {
                if (wait == 0) {
                    o.removeAttribute("disabled");
                    o.value = "获取验证码";
                    wait = 60;
                } else {
                    o.setAttribute("disabled", false);
                    o.value = "重新发送(" + wait + ")";
                    wait--;
                    setTimeout(function() {
                            time(o)
                        },
                        1000)
                }
            }

            $('#forgetPassword').click(function() {
                $('.mui-title').text('修改密码')
                $(".mui-content .mui-input-group").eq(2).fadeIn().siblings(".mui-content .mui-input-group").hide();
            })
            $('#loreg').click(function() {
                $('.mui-title').text('注册')
                $(".mui-content .mui-input-group").eq(1).fadeIn().siblings(".mui-content .mui-input-group").hide();
            })
			
			
//			$('#imgcode').val()
			console.log(location.host)
			$('.imgfire').click(function() {
                $(this).attr('src','http://a.rrjiekuan.com/index.php?s=/open/cron/getVerify.html')
            })
			
			

            // 登录
            function login() {
                if (!mobile.value) {
                    mui.toast('手机号不能为空！')
                    return false;
                }
                if (!meone.test(mobile.value)) {
                    mui.toast('请输入正确的手机号码！')
                    return false;
                }
                if (!password.value) {
                    mui.toast('密码不能为空！')
                    return false;
                }
                $(".mui-backdroplo").show()
                $.ajax({
                    type: "post",
                    url: api_login(),
                    dataType: 'json',
                    async: true,
                    data: {
                        phone: mobile.value,
                        pwd: password.value,
                        'uniacid': get_uniacid()
                        
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            $(".mui-backdroplo").hide()
                            setCookie('token', res.data);
                            mui.toast(res.info)
//                          return false;
//							return fasle;
                            location_page_home()
                            $("input").val('')
                        } else {
                            $(".mui-backdroplo").hide()
                            mui.toast(res.info)
                        }
                    }

                });

            }

        });