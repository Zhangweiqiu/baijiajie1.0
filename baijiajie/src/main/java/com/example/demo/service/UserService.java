package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.dao.weixin.UserInfoDao;
import com.example.demo.model.User;
import com.example.demo.model.weixinmodel.UserInfo;
import com.example.demo.others.Api;

@Service
public class UserService {
	@Autowired
	UserDao userDao;
	
	@Autowired
	UserInfoDao userInfoDao;
	
	
	public Map<String,Object> login(String phone,String password){
		Map<String,Object> map = new HashMap<>();
		
		User user = new User();
		user = userDao.findByPhone(phone);
		
		if(user !=null ) {
			if(password.equals(user.getPassword())) {
				map.put("state", true);
				map.put("user", user);
				map.put("url", "/首页.html");
			}else {
				map.put("state", false);
			}
		}else
			map.put("state", false);
		
		return map;
	}
	
	public Map<String,Object> checkInfo(String openid){
		Map<String,Object> map = new HashMap<>();
		
		UserInfo userInfo = new UserInfo();
		userInfo = userInfoDao.findOne(openid);
		
		User user =new User();
		user = userDao.findByPhone(userInfo.getPhone());
		if(user !=null ) {
			if(user.getState() == 0) {
				map.put("state", true);
				map.put("Info", 0);
				map.put("user", user);
				map.put("phone", user.getPhone());
				map.put("psw", user.getPassword());
				map.put("url", "/完善个人信息.html");
			}else {
				map.put("state", true);
				map.put("Info", 1);
				map.put("url", "/百家放款.html");
			}
		}else
			map.put("state", false);
		
		return map;
	}
	
	public Map<String,Object> addUser(String phone,String password,String openid){
		User user = new User();
		UserInfo userinfo = new UserInfo();
		Map<String,Object> map = new HashMap<>();
		user.setPhone(phone);
		user.setPassword(password);
		user.setState(0);
		userinfo = userInfoDao.findOne(openid);
		userinfo.setPhone(phone);
		if(userDao.findByPhone(phone)==null) {
			if(userDao.save(user) != null) {
				userInfoDao.save(userinfo);
				map.put("state", true);
				map.put("url", "/登录.html");
			}else
				map.put("state", false);
		}else {
			map.put("state", false);
		}
		return map;
	}
	
	public Map<String,Object> modifyPsw(String phone,String password){
		User user = new User();
		Map<String,Object> map = new HashMap<>();
		user = userDao.findByPhone(phone);
		if(user != null) {
			user.setPassword(password);
			userDao.save(user);
			map.put("state", true);
			map.put("url", "/登录.html");
		}else
			map.put("state", false);
		
		return map;
	}
	
	public boolean addInfo(User user){
		User nuser = new User();
		nuser = userDao.findByPhone(user.getPhone());
		nuser.setAge(user.getAge());
		nuser.setEdu(user.getEdu());
		nuser.setFuzhai(user.getFuzhai());
		nuser.setHuabei(user.getHuabei());
		nuser.setJiedaibao(user.getJiedaibao());
		nuser.setName(user.getName());
		nuser.setPhoto(user.getPhoto());
		nuser.setQq(user.getQq());
		nuser.setQrcode(user.getQrcode());
		nuser.setState(user.getState());
		nuser.setZhima(user.getZhima());
		nuser.setAddress(user.getAddress());
		if(userDao.save(nuser) != null) {
			System.out.println("个人信息完善成功");
			return true;
		}
		else {
			System.out.println("个人信息完善失败");
			return false;
		}
	}

	public Map<String,Object> yanzhengma(String mobile){
		Map<String,Object> map = new HashMap<>();
		int random=(int)(Math.random()*10000);
		String a = Api.Sendinfo(mobile, random);
		System.out.println(random);
		System.out.println(a);
		map.put("yzm", random);
		return map;
		
	}

	public Map<String, Object> addshenqingtime(String phone) {
		User user = new User();
		Map<String,Object> map = new HashMap<>();
		user = userDao.findByPhone(phone);
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
		user.setShenqingshijian(df.format(new Date()));
		if(userDao.save(user) != null) {
			map.put("state", true);
			return map;
		}
		else {
			map.put("state", false);
			return map;
		}
	}
}
