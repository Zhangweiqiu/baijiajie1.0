//接口用地址
    function getUrl() {
        return 'http://' + window.location.host;
        //     return 'http://127.0.0.1/qh_bjj'
    }
    //页面用地址
    function getTrueUrl() {
        return 'http://' + window.location.host;
        //     return 'http://127.0.0.1/qh_bjj'
    }

    function getDir() {
        return getTrueUrl() + '/w_bjj/';
    }

function get_news() {
	return getUrl() + "/index.php?s=/open/news/get_news";
}

function get_detail() {
	return getUrl() + "/index.php?s=/open/news/get_news_detail";
}

function news_lunbo() {
	return getUrl() + "/index.php?s=/open/news/news_lunbo";
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
function Template_ini(template_name, content_id, obj) {
    if (!arguments[2]) obj = {};
    // obj.L = L();//获取语言包ch.js返回的对象
    var html = template(template_name, obj);
    document.querySelector(content_id).innerHTML = html
}
function jqajax(url, data, callback) {
	$.ajax({
		type: "POST",
		url: url,
		dataType: 'json',
		async: true,
		data: data,
		success: callback
	});
}

/**
 *实现1(返回 $_GET 对象, 仿PHP模式)
 */
var $_GET = (function() {
	var url = window.document.location.href.toString();
	var u = url.split("?");
	if(typeof(u[1]) == "string") {
		u = u[1].split("&");
		var get = {};
		for(var i in u) {
			var j = u[i].split("=");
			get[j[0]] = j[1];
		}
		return get;
	} else {
		return {};
	}
})();



mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		//	          down: {
		//	              callback: pl //下拉刷新
		//	          },
		up: {
			contentrefresh: '正在加载...', //上拉刷新
			contentnomore: '没有数据了啊 最后一页了',
			callback: pullupRefresh1
		}
	}
});







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

$(document).ready(function() {
	$('.icon-wrong').on('click', function() {
		alert('2')
	})
	
	if(window.location.href == getTrueUrl() + "/w_bjj/news/view/news-main.html") {
		jqajax(news_lunbo(), { uniacid:get_uniacid()}, callback)
	}
	
	
	function callback(res){
		html=''
		data=res.data.lunbo;
		data1=res.data.note;
		
		if(res.status==1){
			console.log(res)
			
			html1=['<i class="iconfont icon-laba"></i>',
			'<div id="scroll_div" class="fl">',
			'<div id="scroll_begin">',
			
			'</div>',
			'<div id="scroll_end"></div>',
			'</div>'
//			'<i class="iconfont icon-cuowu1 icon-wrong"></i>'
			].join("");
			html2=''
			for(i in data1){
				html2+=['<span class="pad_right">',data1[i].value,'</span>'].join("");
			}
			
			
			
			for(i in data){
				html+=[
				'<div class="swiper-slide" name="',data[i].name,'" ><img src="',data[i].value,'"></div>'
				].join("");
			}
		
		$('.swiper-wrapper').html(html)
		$('.scroll_text').html(html1)
		$('#scroll_begin').html(html2)	
//		$('.pic').append()
		jqajax(get_news(), { page: 1 ,uniacid:get_uniacid()}, callbackt)
		ScrollImgLeft()
			mui('body').on('tap', '.swiper-slide', function() {
				
				var name=$(this).attr('name');
				if(!name){
					mui.toast('目前没有链接!')
				}else{
					window.location=name;
				}
			});
			
			
	
			
		}
	}
	
//	mui('.news-title').on('tap', 'li', function() {
//			alert('2')
//	});

	
});


$('.input-less').keyup(function(){
	
	var title=$(this).val();
	if(title==''){
		jqajax(get_news(), {title:title,uniacid:get_uniacid()}, callbackt)
	}else{
		jqajax(get_news(), {title:title,uniacid:get_uniacid()}, callbackq)
	
	}
	
	
	function callbackq(res) {
	data = res.data.data;
	html = '';
	var newsbox = document.querySelector('.news-box');
	if(res.status == 1) {
		for(i in data) {

			html +=
				'<li>' +
				'<a class="to_detail" data-id="' + data[i].id + '" href="javascript:;">' +
				'<div class="news-text" data-id="' + data[i].id + '" >' +
				'<img src="' + data[i].cover + '"/>' +
				'<div class="news-right">' +
				'<dl class="dl-one">' + data[i].title + '</dl>' +
				'<dl class="dl-two">'+ data[i].description +'</dl>' +
				'<dl class="dl-tht"><span>百家借VIP小编</span>'+ data[i].create_time +'</dl>' +
				'</div>' +
				'</div>' +
				'</a>' +
				'</li>';
//				阅读 '+data[i].view+'
//				+ data[i].description +
		}
		$('#page').val(res.data.page)
		$('#page').attr('to', res.data.total)
		$('.loading-text').remove()
		$('.dd').html(html)
		
		mui('body').on('tap', '.to_detail', function() {
			var id = this.getAttribute('data-id');
			window.location.href = 'news-details.html?id=' + id;
		});

	} else {
		mui.toast(res.info)
	}
}
	
	
})


function pullupRefresh1() { //上拉加载

	setTimeout(function() {
		var page = $('#page').val();
		var page1 = $('#page').attr('to');
		var t = Math.ceil(page1 - 8 * page)
		if(t > 0) {
			page++
		} else {
			mui.toast('没有更多数据了')
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
			return false;

		}
		console.log(t)
		console.log(page)
		jqajax(get_news(), { page: page ,uniacid:get_uniacid()}, callbackt)
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
	}, 500);

}

//function lunbo(){
//	var get_lunbo = getCookies('wx_lunbo');
////   console.log(get_lunbo)
//   html = '';
//   $.each(get_lunbo, function(index) {
//       if (this.type == 1) {
//           var l = this.name.length;
//           if (l == 6) {
//               var url = 'Details.html?bid=' + this.name + '&from=lunbo';
//           } else {
//               var url = this.name;
//           }
//           <div class="swiper-slide"><img src="http://www.rrjiekuan.com/Uploads/BusinessIcon/2017-02-15/58a422c91d568.jpg"></div>
//           html += '<div class="mui-slider-item"><a href="' + url + '"><img data-original="' + this.value + '" src="' + this.value + '" class="lazy"></a></div>';
//       }
//   })
//}

function callbackt(res) {
	data = res.data.data;
	html = '';
	var newsbox = document.querySelector('.news-box');
	if(res.status == 1) {
		for(i in data) {

			html +=
				'<li>' +
				'<a class="to_detail" data-id="' + data[i].id + '" href="javascript:;">' +
				'<div class="news-text" data-id="' + data[i].id + '" >' +
				'<img src="' + data[i].cover + '"/>' +
				'<div class="news-right">' +
				'<dl class="dl-one">' + data[i].title + '</dl>' +
				'<dl class="dl-two">'+ data[i].description +'</dl>' +
				'<dl class="dl-tht"><span>百家借VIP小编</span>'+ data[i].create_time +'</dl>' +
				'</div>' +
				'</div>' +
				'</a>' +
				'</li>';
//				阅读 '+data[i].view+'
//				+ data[i].description +
		}
		$('#page').val(res.data.page)
		$('#page').attr('to', res.data.total)
		$('.loading-text').remove()
		$('.dd').append(html)
		
		mui('body').on('tap', '.to_detail', function() {
			var id = this.getAttribute('data-id');
			window.location.href = 'news-details.html?id=' + id;
		});

	} else {
		mui.toast(res.info)
	}
}