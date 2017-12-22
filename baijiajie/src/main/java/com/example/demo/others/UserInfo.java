package com.example.demo.others;

public class UserInfo {
	
		//拉取用户信息的请求地址
		public static String User_Message = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
		public static String getUserMessage(String access_token, String openid) {
			return User_Message.replace("ACCESS_TOKEN", access_token).replaceAll("OPENID", openid);
		}
}
