package com.example.demo.service.weixin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.weixin.UserInfoDao;
import com.example.demo.model.weixinmodel.UserInfo;

@Service
public class UserInfoService {
	
	@Autowired
	UserInfoDao userinfoDao;
	
	//增加关注者
	public void addUser(String openid,String nickname,String headimgurl,String father) {
		UserInfo userinfo = new UserInfo();
		//本身
		UserInfo u = new UserInfo();
		//父亲
		UserInfo fu = new UserInfo();
		//爷爷
		UserInfo gfu = new UserInfo();
		userinfo = userinfoDao.findOne(openid);
		if(userinfo != null) {
			userinfo.setNickname(nickname);
			userinfo.setheadimgurl(headimgurl);
			userinfoDao.save(userinfo);	
		}else {
			if(!"".equals(father)) {
				fu = userinfoDao.findOne(father);
				u.setFather(father);
				if(fu.getFather() != null) {
					u.setGfather(fu.getFather());
					//爷爷获利
					gfu = userinfoDao.findOne(fu.getFather());
					float money2 = gfu.getMoney();
					money2 += 0.1;
					gfu.setMoney(money2);
					userinfoDao.save(gfu);
				}
				//爸爸获利
				float money = fu.getMoney();
				int number = fu.getNumber();
				money += 0.2;
				number += 1;
				fu.setNumber(number);
				fu.setMoney(money);
				userinfoDao.save(fu);
			}
			u.setMoney(0.0f);
			u.setNumber(0);
			u.setOpenid(openid);
			u.setNickname(nickname);
			u.setheadimgurl(headimgurl);
			userinfoDao.save(u);
		}
	}
}
