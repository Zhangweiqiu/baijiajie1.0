	$(function() {
	    var get_lunbo = getCookies('wx_lunbo');
	    html = '';
//	    console.log(get_lunbo);
	    $.each(get_lunbo, function(index) {
	        if (this.type == 2) {
	            var l = this.name.length;
	            if (l == 6) {
	                var url = 'Details.html?bid=' + this.name + '&from=lunbo2';
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

	jQuery(function($) {
	    var gallery = mui('.mui-slider');
	    gallery.slider({
	        interval: 2500 //自动轮播周期，若为0则不自动播放，默认为0；
	    });

	    function wanchen() {
	        $('#hide-content>div>ul>li').click(function() {
	            $(this).addClass('hiactive').siblings().removeClass('hiactive');
	            console.log($(this));
	        })
	        $('.search-handle .reset-btn').click(function() {
	            $('#hide-content>div>ul>li').removeClass('hiactive');

	        })
	        $('.tab span').click(function() {
	            var idx = $(this).index();
	            $(this).addClass('rotatei').siblings().removeClass('rotatei');
	            $(this).addClass('spanav').siblings().removeClass('spanav');
	            $(this).parents('.sx-content').addClass('Top_fixed');
	            $("#hide-content>div").eq(idx).show().siblings("#hide-content>div").hide();
	            $('.search-handle').show();
	            $('.mui-bar-nav').show();
	            $('.dddpp').show();
	            var tihtml = $(this).text();
	            $('.title').html(tihtml);
	            console.log($(this));
	        })

	        $('.mui-bar .mui-icon').click(function() {
	            $('.mui-bar-nav').hide();
	            $('.hide-index').hide();
	            $('.sx-content').removeClass('Top_fixed');
	            $('.tab span').removeClass('rotatei');
	            $('.dddpp').hide();

	            $('.search-handle').hide();
	        })
	        $('.dddpp').click(function() {
	            $(this).hide();
	            $('.mui-bar-nav').hide();
//	            $('.sx-content').removeClass('Top_fixed');
	            $('.sx-content').hide();
	            $('.tab span').removeClass('rotatei');
	            $('.search-handle').hide();
	            $('.hide-index').hide();
	        })
	    }
	    wanchen();


	    //获取筛选参数 存入

	    var getSearchParams = function() {
	        filter = [];
	        var sort = $('#hide-content').find('.hide-index ul li.hiactive').attr('data-sort');
	        $('#hide-content').find('.hide-index ul li').siblings().removeClass('hiactive');
	        filter.push({ sort: sort });
	        return sort;
	    }

	    $('.search-btn').click(function() {
	        sort = getSearchParams();
	        console.log(sort);
	        var type_two = $_GET['type_two'];
	        if (!type_two) {
	            type_two = 0;
	        }

	        if (type_two == 1) {
	            $('.tab').hide();
	            $('.jksj-tab').show();
	        }

	        if (type_two == 0) {
	            $('.tab').show();
	        }

	        var datas = {
	            'uniacid': get_uniacid(),
	            'openid': getCookie('openid'),
	            'type_two': type_two,
	            'sort': sort
	        };

	        $.ajax({
	            type: "post",
	            url: api_business_list(),//ybh 2017年5月2日 18:31:47
	            dataType: 'json',
	            async: false,
	            data: datas,
	            success: function(res) {
	                data = res;
	                Template_ini('centent', '#matchingbj', data);
	                wanchen();
	                smallXing();
	                $(".newtogg dd:first-child").click(function() {
	                    $(this).nextAll().find('i').remove();
	                    $(this).nextAll().slideToggle();
	                });
	            }
	        });

	        $('.mui-bar-nav').hide();
	        $('.hide-index').hide();
	         $('.sx-content').hide();
//	        $('.sx-content').removeClass('Top_fixed');
	        $('.search-handle').hide();
	        $('.dddpp').hide();

	    })

	})
	var sort = $_GET['sort'];
	var type_two = $_GET['type_two'];

	var url = "jietiao.html";
	var url_m = url + '?sort=m1';
	var url_l = url + '?sort=m2';
	var url_i = url + '?sort=m3';
	//url = url+'?sort=no_sort';
	if (!type_two) {
	    type_two = 0;
	}

	url = url + '?type_two=' + type_two;
	url_m = url_m + '&type_two=' + type_two;
	url_l = url_l + '&type_two=' + type_two;
	url_i = url_i + '&type_two=' + type_two;

	if (!sort) {
	    sort = '';
	}

	var datas = {
	    'uniacid': get_uniacid(),
	    'openid': getCookie('openid'),
	    'type_two': type_two,
	    'sort': sort,
	    'px2':'hot',
	    'token': get_token()
	};

	$.ajax({
	    type: "post",
	    url: api_business_list(),//ybh 2017年5月2日 18:31:47
	    dataType: 'json',
	    async: false,
	    data: datas,
	    success: function(res) {
	        data = res;
	        data_2=res.data_2;
	        console.log(res)
	        if (!type_two) {
			    type_two = 0;
			    if(type_two==0){
			    	if(!data_2.is_borrow){
			        	$("#is_borrow").html('(0)')
			        }else{
			        	$("#is_borrow").html('('+data_2.is_borrow+')')
			        }
			        if(!data_2.no_borrow){
			        	$("#no_borrow").html('(0)')
			        }else{
			        	 $("#no_borrow").html('('+data_2.no_borrow+')')
			        }
			    }
			    
			}
	        
	        
//	        Template_ini('centent2', '#matchingbj2', data_2);
	        Template_ini('centent', '#matchingbj', data);
	    }

	});
//	console.log(data)
	$('#no_sort').attr('href', url);
	$('#maxloan').attr('href', url_m);
	$('#zhima_lower').attr('href', url_l);
	$('#interest').attr('href', url_i);

	if (type_two == 1) {
	    $('#jt').addClass('p-active').siblings().removeClass('p-active')
	    $('#xiug').text('温馨提示:借条商家普遍门槛较低，但利息偏高');

	} else if (type_two == 0) {
	    $('#wd').addClass('p-active').siblings().removeClass('p-active')
	    $('#xiug').text('温馨提示:网贷平台流程较多 ,但利息低额度较大');
	}

	if (type_two == 1) {

	    $('.tab').hide();
	    $('.jksj-tab').show();
	    $('#jt').addClass('p-active').siblings().removeClass('p-active')
	    $('.mui-matchingbj h5 p').html('<em class="mui-icon iconfont icon-gonggao"></em>' + '温馨提示:借条商家普遍门槛较低，但利息偏高');

	    if (sort == 'm1') {
	        $('.jksj-tab a').eq(1).addClass('ya-active').siblings().removeClass('ya-active');
	    } else if (sort == 'm2') {
	        $('.jksj-tab a').eq(2).addClass('ya-active').siblings().removeClass('ya-active');
	    } else if (sort == 'm3') {
	        $('.jksj-tab a').eq(3).addClass('ya-active').siblings().removeClass('ya-active');
	    }

	} else if (type_two == 0) {
	    $('.tab').show();
	    $('.jksj-tab').hide();
	    $('#wd').addClass('p-active').siblings().removeClass('p-active')
	    $('.mui-matchingbj h5 p').html('<em class="mui-icon iconfont icon-gonggao"></em>' + '温馨提示:网贷平台通过率较低 ,但利息低额度较大')
	}

	function smallXing() {
	    $.each($(".product_xing"), function(a, b) {
	        if ($(this).find("b").text() == 0) {
	            $(this).find("i").eq(idx).css({
	                "background": "url('../img/半星.png')",
	                "background-size": "100% 100%"
	            });
	        } else {
	            var reg = /^[0-9]*[1-9][0-9]*$/;
	            if (!reg.test(Number($(this).find("b").text()))) {
	                var zIdx = Math.floor($(this).find("b").text());
	                $(this).find("i").eq(zIdx).prevAll("i").css({
	                    "background": "url('images/星1.png')",
	                    "background-size": "100% 100%"
	                });

	                $(this).find("i").eq(zIdx).css({
	                    "background": "url('images/星1.png')",
	                    "background-size": "100% 100%"
	                });
	            } else {
	                var idx = Number($(this).find("b").text()) - 1;
	                $(this).find("i").eq(idx).prevAll("i").css({
	                    "background": "url('images/星1.png')",
	                    "background-size": "100% 100%"
	                });

	                $(this).find("i").eq(idx).css({
	                    "background": "url('images/星1.png')",
	                    "background-size": "100% 100%"
	                });
	            }
	        }
	    })
	}
	smallXing();

	$(".newtogg dd:first-child").click(function() {
	    $(this).nextAll().find('i').remove();
	    $(this).nextAll().slideToggle();
	});

	$('.seach').click(function() {
	    $('.search').fadeToggle();
	    $('.mui-media').show();
	})

//	console.log(data.data.mode)
	$('.search button:first-child').click(function() {
	    var arr = $('.mui-media').each(function(index, i) {
	        if ($(this).find('a div .newsp2').text().substr(0, 7) != '借贷宝、今借到') {
	            $(this).hide();
	        } else {
	            $(this).show();
	        }
	    })

	})

	$('.search button').eq(1).click(function() {
	    var arr = $('.mui-media').each(function(index, i) {
	        if ($(this).find('a div .newsp2').text() != '借贷宝') {
	            $(this).hide();
	        } else {
	            $(this).show();
	        }
	    })

	})

	$('.search button:last-child').click(function() {
	    var arr = $('.mui-media').each(function(index, i) {
	        if ($(this).find('a div .newsp2').text() != '无忧借条') {
	            $(this).hide();
	        } else {
	            $(this).show();
	        }
	    })

	})

	$(window).scroll(function() {
	    var _top = $(window).scrollTop();
	    if (type_two == 1) {
	        $('#returnTop').hide();
	        $('.seach').show();
	    }

	    if (type_two == 0) {
	        if (_top > 100) {
	            $('#returnTop').fadeIn(600);
	        } else {
	            $('#returnTop').fadeOut(600);
	        }
	    }

	});
	$("#returnTop").click(function() {
	    $("html,body").animate({ scrollTop: 0 }, 600);
	});