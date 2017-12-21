 

 $('body').height($(window).height());
 $('#bbj_home i').click(function() {
     $('#bbj_home').fadeOut()
 })
 $(function() {
 	
 	
 	ScrollImgLeft();
 	ScrollImgLeft1()
     var get_lunbo = getCookies('wx_lunbo');
//   console.log(get_lunbo)
     html = '';
     $.each(get_lunbo, function(index) {
         if (this.type == 1) {
             var l = this.name.length;
             if (l == 6) {
                 var url = 'Details.html?bid=' + this.name + '&from=lunbo';
             } else {
                 var url = this.name;
             }
             html += '<div class="mui-slider-item"><a href="' + url + '"><img data-original="' + this.value + '" src="' + this.value + '" class="lazy"></a></div>';
         }
     })

     $('.mui-lunbo').html(html);
     $('.mui-lunbo').append($('.mui-lunbo div:first').clone(true));
     $('.mui-lunbo').prepend($('.mui-lunbo  div').eq(-2).clone(true));
     $('.mui-lunbo div:first').attr('class', 'mui-slider-item mui-slider-item-duplicate');
     $('.mui-lunbo div:last').attr('class', 'mui-slider-item mui-slider-item-duplicate');
     $(".lazy").lazyload({
         effect: "fadeIn"
     });
     var gallery = mui('.mui-slider');
     gallery.slider({
         interval: 2500 //自动轮播周期，若为0则不自动播放，默认为0；
     });

 });


 function timeo() {
     $.ajax({
         type: "post",
         url: api_business_lunbo(),
         dataType: 'json',
         async: false,
         data: 'uniacid=' + get_uniacid(),
         success: function(res) {
             datae = res;
//           console.log(datae)
             setCookies('Scrol_pic', datae);
         }
     });
 }

 function getData() {
     if (getCookie('lastTime')) {
         var now = (new Date()).valueOf();
         var lastTime = getCookie('lastTime');
         if (now - lastTime >= 360000) {
             timeo()
             console.log(now);
             var now = (new Date()).valueOf();
             setCookie('lastTime', now);
         }
     } else {
         timeo()
//       console.log(2);
         var now = (new Date()).valueOf();
         setCookie('lastTime', now);
     }
 }
 getData()
 var Scrol_pic = getCookies('Scrol_pic');
// console.log(Scrol_pic)
 Template_ini('centent', '#matchingbj', Scrol_pic);

 /*单行广告轮播*/
 function poster() {
     var liHeight = $(".font_inner li").height();
     //一个li的高度
     var clickEndFlag = true; //设置每张走完才能再点击
     setInterval(function() {
         random(1)
         $(".font_inner").animate({
             top: -56
         }, 500, function() {
             $(".font_inner li").eq(0).appendTo($(".font_inner")); //克隆第一个放到最后(实现无缝滚动)
             $(".font_inner").css({
                 "top": 0
             });
         })
     }, 3000)
 }

 /*广告内随机数*/
 function random(idx) {
     //2.生成随机姓名
     var nameArr = ['张', '李', '陈', '王', '赵', '钱', '孙', '周', '武', '郑', '齐', '刘', '白', '胡', '杨', '秦'];
     var namexing = nameArr[Math.floor(Math.random() * nameArr.length)]
     $(".font_inner li").eq(idx).find(".random_mobile").text(namexing + "先生")
         //3.随机生成价钱
     function rnd() {
         var min = $(".font_inner li").eq(1).find(".random_money").data("min") / 100
         var max = $(".font_inner li").eq(1).find(".random_money").data("max") / 100;
         var money = parseInt((min + Math.floor(Math.random() * (max - min + 1))) / 5) * 5;
         if (money == 0) {
             var money = 5;
         }
         $(".font_inner li").eq(idx).find(".random_money").text(money + "00")
     }
     rnd()

     //4.随机生成数组内城市
     var arr = ["长丰", "肥西", "肥东", "黄山", "祁门", "福州", "闽清", "闽侯", "罗源", "连江", "长乐", "福清", "兰州", "皋兰", "榆中", "永登", "永昌", "白银", "会宁", "景泰", "靖远", "天水", "甘谷", "武山", "清水", "张家川", "嘉峪关", "酒泉", "敦煌", "广州", "从化", "增城", "番禺", "汕头", "潮阳", "澄海", "南澳", "深圳", "珠海", "南宁", "隆安", "马山", "上林", "武鸣", "宾阳", "邕宁", "贵阳", "息烽", "开阳", "修文", "清镇", "六盘水", "海口", "三亚", "通什", "琼海", "儋州", "文昌", "万宁", "东方", "澄迈", "荥阳", "登封", "新郑", "中牟", "密县", "巩义", "洛阳", "宜阳", "洛宁", "新安", "哈尔滨", "巴彦", "双城", "呼兰", "武汉", "汉阳", "新洲", "武昌", "宜昌", "秭归", "远安", "当阳", "长阳", "郴州", "安仁", "永兴", "桂东", "桂阳"]
     var city = arr[Math.floor(Math.random() * arr.length)]
     $(".font_inner li").eq(idx).find(".random_city").text(city)
 }
 random(0)
 poster()
     //获取后台配置
 var wx_config = getCookies('wx_config');

 $.ajax({
     type: "post",
     url: api_index_stat(),
     dataType: 'json',
     async: false, //设置为同步操作就可以给全局变量赋值成功 
     data: {
         'uniacid': get_uniacid()
     },
     success: function(res) {
         var today = parseInt(res.data.today) + parseInt(wx_config._WX_JIN_RI_JI_SHU_3);
         var total = parseInt(res.data.history) + parseInt(wx_config._WX_LEI_JI_JI_SHU_3);
         $('.newtext p:first-child span').text(today);
         $('.newtext p:last-child span').text(2000000+total);
//       console.log(res.data);
         check_version(res.version);
     }
 });


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

 $(document).ready(function() {
 	$('.follow_coverc2').click(function() {	
 		$('.follow_coverc2').fadeOut();
 		$('.ckeck_alert').fadeOut();
 	})
 	$('#bun_al2').click(function() {	
 		$('.follow_coverc2').fadeOut();
 		$('.ckeck_alert').fadeOut();
 		
 	})
 	$('#bun_al').click(function() {	
// 		$('.landingCover').show();
		$('.follow_covercc').fadeOut();
		$('.ckeck_alert').fadeOut();
		
		$('.muibjj-backdrop').fadeIn();
		
//		show_msg2("pop_i4", "close_i");
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
 	
 	
     fans_ini();
     var openid = getCookie('openid');
     var btnnum=$('#bun_al').val()
     $('.com_btn').click(function() {
     	$('.landingCover').show();
         if (!get_token()) {
//       	 alert('请登录')
//       	setTimeout(function() {
//             location_page_login()
//          }, 1000)
             var btnArray = ['否', '是'];
             mui.confirm('您还没有登录？是否登录', '百家借', btnArray, function(e) {
                 if (e.index == 1) {
                     setTimeout(function() {
                         location_page_login()
                     }, 1000)
                 } else {}
             })
             return false;
         }
         var datas = {
             'uniacid': get_uniacid(),
             openid: getCookie('openid'),
             token: getCookie('token'),
             'is_auto': 0
         };
         $.ajax({
             type: "post",
             url: api_borrow_apply(),
             dataType: 'json',
             async: true, //设置为同步操作就可以给全局变量赋值成功 
             data: datas,
             success: function(res) {
                 if (res.status == 1002) {
                 	$('.landingCover').hide();
                     location_page_reg();
                     return false;
                 }
                 if (res.status == 1003) {
                 	$('.landingCover').hide();
                     location_page_information();
                     return false;
                 }
                 if (res.status == 1004) {
                 	$('.landingCover').hide();
                     show_msg2("pop_i5", "close_i");
                     return false;
                 }
                 if (res.status == 1) {
                 		var fans_w=getCookies('fans');
                 		
                 		$('.landingCover').hide();
                 		$('#forser_em1').html(getNowFormatDate())
                 		$('#forser_em2').html(fans_w.nickname)
                 		$('.follow_coverc2').fadeIn();
                 		$('.ckeck_alert').fadeIn();
                 		return false;
                 	
//               	console.log(res)
//               	console.log(res.data)
//                   show_msg2("pop_i4", "close_i");
//                   return false;
                 } else if (res.status == -1) { //未完善资料
                 	$('.landingCover').hide();
                     $("#has_info_notice").html(res.info);
                     show_msg2("pop_i2", "close_i");
                     return false;
                 } else {
                 	$('.landingCover').hide();
                     $("#has_borrow_notice").html(res.info);
                     show_msg2("pop_i3", "close_i");
                     return false;
                 }
             }
         });
     });
     
    
    
    
     if(getQueryString('to_apply')==1){
     	$("#com_btn_w").trigger("click")
     }
//    if(window.location.search){$("#com_btn_w").trigger("click");}
 		

	 	
	 		
	 	
 });
 




function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}


