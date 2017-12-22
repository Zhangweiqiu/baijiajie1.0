package com.example.demo.service.weixin;

import org.springframework.stereotype.Service;

import com.example.demo.model.weixinmodel.Menu;
import com.example.demo.util.WeixinUtil;

import net.sf.json.JSONObject;

@Service
public class MenuService {
	public static String menu_create_url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";
	
	/** 
	 * 创建菜单 
	 *  
	 * @param menu 菜单实例 
	 * @param accessToken 有效的access_token 
	 * @return 0表示成功，其他值表示失败 
	 */ 
	
	public int createMenu(Menu menu ,String accessToken) {
		int result = 0;
		//拼装创建菜单的url
		String url = menu_create_url.replace("ACCESS_TOKEN", accessToken);
		//将菜单对象转换成json字符串
		String jsonMenu = JSONObject.fromObject(menu).toString();
		//调用接口创建菜单
		JSONObject jsonObject = WeixinUtil.httpRequest(url, "POST", jsonMenu);
		if(null != jsonObject) {
			if(0 != jsonObject.getInt("errcode")) {
				result = jsonObject.getInt("errcode");
			}
		}
		
		
		return result;
	}
}
