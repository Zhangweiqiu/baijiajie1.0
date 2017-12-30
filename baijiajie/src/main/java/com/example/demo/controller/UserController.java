
package com.example.demo.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	private static String[] str = new String[2]; 
	
	@RequestMapping("/login")
	public Map<String,Object> login(String phone,String password){
		System.out.println(phone);
		return userService.login(phone, password);
	}
	
	@RequestMapping("/checkInfo")
	public Map<String,Object> checkInfo(String phone){
		System.out.println(phone);
		return userService.checkInfo(phone);
	}
	
	@RequestMapping("/addUser")
	public Map<String,Object> addUser(String phone,String password) {
		return userService.addUser(phone, password);
	}
	
	@RequestMapping("/modifyPsw")
	public Map<String,Object> modifyPsw(String phone,String password){
		return userService.modifyPsw(phone, password);
	}
	
	@RequestMapping(value = "/photoupload", method = RequestMethod.POST)
    public void upload(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
        	str[0] = file.getOriginalFilename();
            System.out.println(str[0]);
            try {
            	File nfile = new File("src/main/resources/pics/"+file.getOriginalFilename());
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(nfile));
                out.write(file.getBytes());
                out.flush();
                out.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } 
    }
	
	
	@RequestMapping(value = "/qrcodeupload", method = RequestMethod.POST)
    public void qrcodeupload(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
        	str[1] = file.getOriginalFilename();
            System.out.println(str[1]);
            try {
            	File nfile = new File("src/main/resources/pics/"+file.getOriginalFilename());
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(nfile));
                out.write(file.getBytes());
                out.flush();
                out.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
	
	
	
	/**
	 * 完善个人信息
	 * @param user
	 * @return
	 */
	@PostMapping("/addInfo")
	public boolean addInfo(String phone,Integer age,Float edu,Float fuzhai,
			  String huabei,String jiedaibao,
			  String name,String password,
			  String qq,Integer state,Float zhima,
			  String address) {

		User nuser = new User();
		nuser.setPhone(phone);
		nuser.setAge(age);
		nuser.setEdu(edu);
		nuser.setFuzhai(fuzhai);
		nuser.setHuabei(huabei);
		nuser.setJiedaibao(jiedaibao);
		nuser.setName(name);
		nuser.setPassword(password);
		nuser.setPhoto(phone+str[0]);
		nuser.setQrcode(phone+str[1]);
		nuser.setQq(qq);
		nuser.setState(state);
		nuser.setZhima(zhima);
		nuser.setAddress(address);
		return userService.addInfo(nuser);
	}
}
