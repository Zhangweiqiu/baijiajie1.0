		mui.init()
		    function isWeiXin() { //识别是否为微信端
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
		    function goPAGE() {
			if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
				
				 return true;
		}
			else {
				return false;
				//window.location.href="你的电脑版地址";	
			}
		}
//		console.log()
		var fontSizeRem = document.documentElement.clientWidth * 0.0375;
		document.getElementsByTagName("html")[0].style.fontSize = fontSizeRem + "px";
		var item = document.getElementsByClassName('mui-tab-item')[0],
			item1 = document.getElementsByClassName('mui-tab-item')[1],
			item2 = document.getElementsByClassName('mui-tab-item')[2],
			item3 = document.getElementsByClassName('mui-tab-item')[3];
			item4 = document.getElementsByClassName('mui-tab-item')[4];
		var taburl='http://' + window.location.host;
		
		if(goPAGE()) {
//			alert(true)
			item.addEventListener("tap", function() {
				mui.openWindow({
					url: taburl+"/w_bjj/home.html",
					id: "home",
					createNew: true,
				})
			});
			item1.addEventListener("tap", function() {
				mui.openWindow({
					url: taburl+"/w_bjj/saixuan.html",
					id: "saixuan",
					createNew: true,
				})
			});

			item2.addEventListener("tap", function() {
				mui.openWindow({
					url: taburl+"/w_bjj/jietiao.html?type_two=1",
					id: "saixuan",
					createNew: true,
				})
			});
			item3.addEventListener("tap", function() {
				mui.openWindow({
					url: taburl+"/w_bjj/news/view/news-main.html",
					id: "news-main",
					createNew: true,
				})
			});
			item4.addEventListener("tap", function() {
				mui.openWindow({
					url: taburl+"/w_bjj/member.html",
					id: "member",
					createNew: true,
				})
			});
		} else {
//			alert(false)
			item.onclick = function() {
				window.location = 'home.html';	
			}
			item1.onclick = function() {
				window.location = 'saixuan.html';
			}
			item2.onclick = function() {
				window.location = 'jietiao.html?type_two=1';
			}
			item3.onclick = function() {
				window.location = 'news/view/news-main.html';
			}
			item4.onclick = function() {
				window.location = 'member.html';
			}
		}