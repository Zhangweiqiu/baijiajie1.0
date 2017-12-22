package com.example.demo.service.weixin;

import org.springframework.stereotype.Service;

import com.example.demo.util.WeixinUtil;

import net.sf.json.JSONObject;

@Service
public class QrcodeService {
	// 临时整数二维码  
	private final static String QR_SCENE = "QR_SCENE"; 
	// 临时字符串二维码  
	private final static String QR_STR_SCENE = "QR_STR_SCENE"; 
	//获取ticket
	public static String qrcode_create_url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN";
	//通过ticket换取二维码
	public static String qrcode_get_url = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET";
	/** 
	 * 创建临时带参数二维码 
	 * @param accessToken 
	 * @expireSeconds 该二维码有效时间，以秒为单位。 最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。 
	 * @param sceneId 场景Id 
	 * @return 
	 */  
	public JSONObject createTicket(String expireSeconds,String accesstoken,String sceneId) {
		String url = qrcode_create_url.replace("TOKEN", accesstoken);
		String jsonStr = "{\"expire_seconds\":"+ expireSeconds+", \"action_name\":\""+QR_STR_SCENE+"\", \"action_info\": {\"scene\": {\"scene_str\": \""+sceneId+"\"}}}";
		JSONObject jsonObject = WeixinUtil.httpRequest(url, "POST", jsonStr);
		return jsonObject;		
	}
	/**
	 * 获取二维码
	 * 
	 */
	public JSONObject getQrcode(String ticket) {
		String url = qrcode_get_url.replace("TICKET", ticket);
		JSONObject jsonObject = WeixinUtil.httpRequest(url, "GET", null);
		return jsonObject;
	}
}
