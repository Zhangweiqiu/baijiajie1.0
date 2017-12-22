package com.example.demo.others;

public class UserInfo {
	
		//拉取用户信息的请求地址
		public static String User_Message = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN";
		public static String getUserMessage(String access_token, String openid) {
			return String.format(User_Message, access_token,openid);
		}
}
