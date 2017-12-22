package com.example.demo.service.weixin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.weixin.UserInfoDao;
import com.example.demo.model.weixinmodel.UserInfo;

@Service
public class UserInfoService {
	
	@Autowired
	UserInfoDao userinfoDao;
	
	@SuppressWarnings("null")
	public void addUser(String openid,String nickname,String headimgurl) {
		UserInfo userinfo = new UserInfo();
		UserInfo u = new UserInfo();
		userinfo = userinfoDao.findOne(openid);
		if(userinfo != null) {
			userinfo.setNickname(nickname);
			userinfo.setheadimgurl(headimgurl);
			userinfoDao.save(userinfo);	
		}else {
			u.setOpenid(openid);
			u.setNickname(nickname);
			u.setheadimgurl(headimgurl);
			userinfoDao.save(u);
		}
		
	}
}
