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
	
	public String getHeadimgurl() {
		return headimgurl;
	}

	public void setHeadimgurl(String headimgurl) {
		this.headimgurl = headimgurl;
	}

	public String getFather() {
		return father;
	}

	public void setFather(String father) {
		this.father = father;
	}

	public String getGfather() {
		return gfather;
	}

	public void setGfather(String gfather) {
		this.gfather = gfather;
	}

	public Float getMoney() {
		return money;
	}

	public void setMoney(Float money) {
		this.money = money;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public Integer getFirst() {
		return first;
	}

	public void setFirst(Integer first) {
		this.first = first;
	}

	private String nickname;
	
	private String headimgurl ;
	
	private String father;
	
	private String gfather;
	
	
	private Float money;
	
	private Integer number;
	
	private Integer first;
	
	private String phone;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
