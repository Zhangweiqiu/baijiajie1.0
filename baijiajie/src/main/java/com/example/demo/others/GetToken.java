package com.example.demo.others;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.model.weixinmodel.AccessToken;
import com.example.demo.util.WeixinUtil;

/**
 * 定时获取微信access_token的线程
 *在WechatMpDemoApplication中注解@EnableScheduling，在程序启动时就开启定时任务。
 * 每7200秒执行一次
 */
@Component
public class GetToken {
	private static Logger log = LoggerFactory.getLogger(GetToken.class);
	//第三方用户唯一凭证
	public static String appid = "wxc82f3a1b0a17373d";
	//第三方用户唯一凭证密钥
	public static String appsecret = "fee5fcfe97328d8c0c47b3a4e443513f";
	public static AccessToken accessToken = null;
	
	@Scheduled(fixedDelay = 7200000)
	public void gettoken() {
		accessToken = WeixinUtil.getAccesstoken(appid, appsecret);
		if(null != accessToken) {
			log.info("获取成功，accessToken:"+accessToken.getToken());
		}else {
			log.error("获取token失败");
		}
	}
}
