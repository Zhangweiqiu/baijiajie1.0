package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.model.User;

@Service
public class UserService {
	@Autowired
	UserDao userDao;
	
	
	public Map<String,Object> login(String phone,String password){
		Map<String,Object> map = new HashMap<>();
		
		User user = new User();
		user = userDao.findOne(phone);
		
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
	
	public Map<String,Object> checkInfo(String phone){
		Map<String,Object> map = new HashMap<>();
		
		User user = new User();
		user = userDao.findOne(phone);
		
		if(user !=null ) {
			if(user.getState() == 0) {
				map.put("state", true);
				map.put("Info", 0);
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
	
	public Map<String,Object> addUser(String phone,String password){
		User user = new User();
		Map<String,Object> map = new HashMap<>();
		user.setPhone(phone);
		user.setPassword(password);
		user.setState(0);
		if(userDao.findOne(phone)==null) {
			if(userDao.save(user) != null) {
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
		user = userDao.findOne(phone);
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
		nuser = userDao.findOne(user.getPhone());
		nuser.setAge(user.getAge());
		nuser.setEdu(user.getEdu());
		nuser.setFuzhai(user.getFuzhai());
		nuser.setHuabei(user.getHuabei());
		nuser.setJiedaibao(user.getJiedaibao());
		nuser.setName(user.getName());
		nuser.setPassword(user.getPassword());
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
}
