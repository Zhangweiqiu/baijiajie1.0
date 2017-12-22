package com.example.demo.model.weixinmodel;

import javax.persistence.*;

@Entity
public class UserInfo {
	
	@Id
	private String openid;
	
	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getheadimgurl() {
		return headimgurl;
	}

	public void setheadimgurl(String headimgurl) {
		this.headimgurl = headimgurl;
	}

	private String nickname;
	
	private String headimgurl ;
	
}
