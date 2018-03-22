package com.example.demo.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.weixinmodel.message.TextMessage;
import com.example.demo.others.CheckUtil;
import com.example.demo.others.CreateMenu;
import com.example.demo.others.Download;
import com.example.demo.others.GetToken;
import com.example.demo.others.UserInfo;
import com.example.demo.service.weixin.MenuService;
import com.example.demo.service.weixin.QrcodeService;
import com.example.demo.service.weixin.UserInfoService;
import com.example.demo.util.MessageUtil;
import com.example.demo.util.WeixinUtil;

import net.sf.json.JSONObject;

@RestController
@RequestMapping("/")
public class WeixinController {
	
	
	@Autowired
	MenuService menuService;
	@Autowired
	UserInfoService userinfoService;
	@Autowired
	QrcodeService qrcodeService;

	private String TOKEN = "baijiajie";
	
	@GetMapping(value="")
	public void doGet(HttpServletRequest request,HttpServletResponse response)throws Exception {
		System.out.println("接入成功");
		String signature = request.getParameter("signature");
		String timestamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echostr = request.getParameter("echostr");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			//排序
			String sortString = CheckUtil.sort(TOKEN,timestamp,nonce);
			//加密
			String myString = CheckUtil.sha1(sortString);
			if(myString != null && myString != "" && myString.equals(signature)) {
				System.out.println("签名校验成功");
				out.println(echostr);
			}else {
				System.out.println("签名校验失败");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
//		String at = GetToken.accessToken.getToken();
//		int result = 0 ;
//		if(at != null) {
//			result = menuService.createMenu(CreateMenu.getMenu(null), at);
//			if(0==result) {
//				System.out.println("菜单创建成功！");
//			}else {
//				System.out.println("菜单创建失败,错误码：" + result);
//			}
//		}
		
	}
	
	@PostMapping(value="")
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		Map<String,String>  map = MessageUtil.parseXml(request);
		 // 发送方帐号（open_id）
        String fromUserName = map.get("FromUserName");
        // 公众帐号
        String toUserName = map.get("ToUserName");
        // 消息类型
        String msgType = map.get("MsgType");
        //接受到内容
        String content = map.get("Content");
//        String code = map.get("code");
		// 默认返回的文本消息内容
        String respContent = "";
		
        //昵称
		String nickname = null;
		//头像
		String headimgurl = null;
		//上一级openid9 
		String father = null;
		//推送事件类型
		String eventType = null;
		String code = null;
//		//获取个人信息并进行储存
		String at = GetToken.accessToken.getToken();
//		int result = 0 ;
//		if(at != null) {
//			result = menuService.createMenu(CreateMenu.getMenu(fromUserName), at);
//			if(0==result) {
//				System.out.println("菜单创建成功！");
//			}else {
//				System.out.println("菜单创建失败,错误码：" + result);
//			}
//		}
		
		String url2 = UserInfo.getUserMessage(at, fromUserName);
		JSONObject jsonObject = WeixinUtil.httpRequest(url2, "GET", null);
		if(jsonObject != null) {
			nickname = jsonObject.getString("nickname");
			System.out.println(nickname);
			headimgurl = jsonObject.getString("headimgurl");	
		}
//		Download.download(headimgurl, fromUserName+".jpg", "C:\\Users\\Administrator\\Desktop\\apache-tomcat-8.5.24-windows-x64\\apache-tomcat-8.5.24\\webapps\\ROOT\\WEB-INF\\classes\\static\\headimg");
		
		eventType = map.get("Event");
		if(msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
			if(eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) { //关注公众号时推送，或未关注
				respContent = "欢迎您加入享来介大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]";
				father = map.get("EventKey");
				father = father.replace("qrscene_", "");
				userinfoService.addUser(fromUserName, nickname, fromUserName+".jpg", father);
				int result = 0 ;
				if(at != null) {
					com.example.demo.model.weixinmodel.UserInfo u = userinfoService.findUser(fromUserName);
					CreateMenu createMenu = new CreateMenu();
					result = menuService.createMenu(createMenu.getMenu(),at);
					//code = request.getParameter("code");
					
					if(0==result) {
						System.out.println("菜单创建成功！");
					}else {
						System.out.println("菜单创建失败,错误码：" + result);
					}
				}
			}
			else if(eventType.equals(MessageUtil.EVENT_TYPE_SCAN)) {//已关注群体，刷二维码
				respContent = "欢迎您加入享来介大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]";
			}
			else if(eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {//自定义菜单点击事件
				
				String eventKey = map.get("EventKey");
				if(eventKey.equals("11")) {
					respContent = "【享来介】\n" + 
                			"火爆上线，实力招商！\n" + 
                			"享来介条机构！百家网贷平台！！\n" + 
                			"\n" + 
                			"全网首创佣金制度：\n" + 
                			"百家机构，百份佣金\n" + 
                			"赚钱机制最大化！\n" + 
                			"\n" + 
                			"邀请好友关注即送现金！\n" + 
                			"好友借款成功更多奖励！\n" + 
                			"\n" + 
                			"层层返佣，让你嗨到无法自拔，\n" + 
                			"提现提到手软！\n" + 
                			"\n" + 
                			"猛戳下方，开始赚钱↓↓↓↓\n" + 
                			" <a href=\"";
				}else { //
					respContent = "欢迎您加入享来介大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]\r\n";
				}
			}
		}	
		
			//处理文本类型，回复用户输入的内容
		else if(msgType == MessageUtil.RESP_MESSAGE_TYPE_TEXT) {
				respContent = "欢迎您加入享来介大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]\r\n";
		}else{
				respContent = "欢迎您加入享来介大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]\r\n";
		}
		System.out.println(fromUserName);
		//回复消息
		TextMessage tm = new TextMessage();
		tm.setToUserName(fromUserName);
		tm.setFromUserName(toUserName);
		tm.setMsgType("text");
		tm.setCreateTime(new Date(0).getTime());

		

		

		
		//生成二维码
		String expireSeconds = "2592000";
		JSONObject json = qrcodeService.createTicket(expireSeconds, at, fromUserName);
		if(eventType != null) {
			if(eventType.equals(MessageUtil.EVENT_TYPE_CLICK) ) {
				if(json != null) {
					String url3 = qrcodeService.qrcode_get_url.replace("TICKET", json.getString("ticket"));
		//			Download.download(url3, fromUserName+".jpg", "C:\\Users\\Administrator\\Desktop\\apache-tomcat-8.5.24-windows-x64\\apache-tomcat-8.5.24\\webapps\\ROOT\\WEB-INF\\classes\\static\\qrcode");
					com.example.demo.model.weixinmodel.UserInfo u = userinfoService.findUser(fromUserName);
					respContent += "http://b4e79a33.ngrok.io/sharing.html?"+u.getNickname()+"&"+u.getheadimgurl()+"&"+u.getMoney()+" \">【 查看我的推广海报】</a>\n" + 
		        			"\n"+
		        			" <a href=\"http://b4e79a33.ngrok.io/piaoq.html?openid="+u.getOpenid()+"\">【 查看我的分享链接】</a>\n";
				}else {
					respContent +=" \">【 查看我的推广海报】</a>\n" + 
		        			"\n"+
		        			" <a href=\"\">【 查看我的分享链接】</a>\n";
				}
			}
		}
		tm.setContent(respContent);
	
		
		
		
		//回复信息
		String message = null;
		message = MessageUtil.textMessageToXml(tm);
		
		out.write(message);
		out.close();
	}
	
	 @RequestMapping(value="/vote.do")
	public void getweixininfo(@RequestParam(name="code",required=false)String code,@RequestParam(name="state")String state,HttpServletResponse res,HttpServletRequest req) throws IOException {
		
		 System.out.println("-----------------------------收到请求，请求数据为："+code+"-----------------------"+state);
			String get_access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?"
	                + "appid=wx35589b0ee9272c4b"
	                + "&secret=436a53ca7750e945faaf12f098f7894d"
	                + "&code=CODE&grant_type=authorization_code";
			get_access_token_url = get_access_token_url.replace("CODE", code);
			JSONObject jsonObject = WeixinUtil.httpRequest(get_access_token_url, "GET", null);
			String openid = jsonObject.getString("openid");
			String access_token = jsonObject.getString("access_token");
			res.sendRedirect("news-main.html?"+openid); 
//			System.out.println("你的网名是:"+jsonObject.getString("nickname"));
//			com.example.demo.model.weixinmodel.UserInfo u = userinfoService.findUser(openid);
//			Map<String,Object> map = new HashMap<>();
//			map.put("nickname", u.getNickname());
//			map.put("headimg", u.getHeadimgurl());
//			map.put("cache_coin", u.getMoney());
//			return map;
	}
}
