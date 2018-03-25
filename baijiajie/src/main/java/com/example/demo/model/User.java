package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	private String phone;
	
	private String name;
	
	private Integer age;
	
	public User() {
		super();
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Float getZhima() {
		return zhima;
	}

	public void setZhima(Float zhima) {
		this.zhima = zhima;
	}

	public String getHuabei() {
		return huabei;
	}

	public void setHuabei(String huabei) {
		this.huabei = huabei;
	}

	public String getJiedaibao() {
		return jiedaibao;
	}

	public void setJiedaibao(String jiedaibao) {
		this.jiedaibao = jiedaibao;
	}

	public Float getFuzhai() {
		return fuzhai;
	}

	public void setFuzhai(Float fuzhai) {
		this.fuzhai = fuzhai;
	}

	public Float getEdu() {
		return edu;
	}

	public void setEdu(Float edu) {
		this.edu = edu;
	}

	public String getQrcode() {
		return qrcode;
	}

	public void setQrcode(String qrcode) {
		this.qrcode = qrcode;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	private String password;
	
	private String qq;
	
	private String photo;
	
	private String address;
	
	private Float zhima;
	
	private String huabei;
	
	private String jiedaibao;
	
	private Float fuzhai;
	
	private Float edu;
	
	private String qrcode;
	
	private Integer state;
	
	private String shenqingshijian;
	
	private String source;
	
	private String wxnumber;
	
	private String idcard;
	
	public String getShenqingshijian() {
		return shenqingshijian;
	}

	public void setShenqingshijian(String shenqingshijian) {
		this.shenqingshijian = shenqingshijian;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getWxnumber() {
		return wxnumber;
	}

	public void setWxnumber(String wxnumber) {
		this.wxnumber = wxnumber;
	}

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	private String money;
}
