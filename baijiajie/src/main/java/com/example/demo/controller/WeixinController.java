package com.example.demo.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.weixinmodel.message.TextMessage;
import com.example.demo.others.CheckUtil;
import com.example.demo.others.CreateMenu;
import com.example.demo.others.GetToken;
import com.example.demo.others.UserInfo;
import com.example.demo.service.MenuService;
import com.example.demo.util.MessageUtil;
import com.example.demo.util.WeixinUtil;

import net.sf.json.JSONObject;

@RestController
@RequestMapping("/")
public class WeixinController {
	
	
	@Autowired
	MenuService menuService;

	private String TOKEN = "baijiajie";
	
	@GetMapping(value="")
	public void doGet(HttpServletRequest request,HttpServletResponse response) {
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
		
		String at = GetToken.accessToken.getToken();
		System.out.println(at + "*************************");
		int result = 0 ;
		if(at != null) {
			result = menuService.createMenu(CreateMenu.getMenu(), at);
			if(0==result) {
				System.out.println("菜单创建成功！");
			}else {
				System.out.println("菜单创建失败,错误码：" + result);
			}
		}
	}
	
	@PostMapping(value="")
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException, DocumentException {
		response.setCharacterEncoding("utf-8");
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
		
		// 默认返回的文本消息内容
        String respContent = "请求处理异常，请稍候尝试！";
		
		String message = null;
		
		if(msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
			String eventType = map.get("Event");
			if(eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) {
				respContent = "欢迎您加入百家借大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]";
			}
			else if(eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {
				String eventKey = map.get("EventKey");
				if(eventKey.equals("11")) {
					respContent = "【百家借】\n" + 
                			"火爆上线，实力招商！\n" + 
                			"百家借条机构！百家网贷平台！！\n" + 
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
                			" <a href=\"\">【 查看我的推广海报】</a>\n" + 
                			"\n"+
                			" <a href=\"\">【 查看我的分享链接】</a>\n";
				}else {
					respContent = "欢迎您加入百家借大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]\r\n";
				}
			}
		}	
		
			//处理文本类型，回复用户输入的内容
		else if(msgType == MessageUtil.RESP_MESSAGE_TYPE_TEXT) {
				respContent = "欢迎您加入百家借大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]\r\n";
		}else{
				respContent = "欢迎您加入百家借大家庭，点击下方的菜单的【我要赚钱】，轻松邀请好友，就能让您轻松躺赚收益[调皮]\r\n";
		}
		
		//回复消息
		TextMessage tm = new TextMessage();
		tm.setToUserName(fromUserName);
		tm.setFromUserName(toUserName);
		tm.setMsgType("text");
		tm.setCreateTime(new Date(0).getTime());
		tm.setContent(respContent);
		message = MessageUtil.textMessageToXml(tm);
		//显示个人信息
		String at = GetToken.accessToken.getToken();
		String url = UserInfo.getUserMessage(at, fromUserName);
		JSONObject object = WeixinUtil.httpRequest(url, "GET", null);
		System.out.println(object);
		out.write(message);
		out.close();
	}
	
}
