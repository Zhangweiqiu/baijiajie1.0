package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Border {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long oid;
	

	private String phone;

	private Long bid;
	
	private String bname;

	private Integer state;

	private String date;
	
	public Border() {
		super();
	}
	public Long getOid() {
		return oid;
	}
	public void setOid(Long oid) {
		this.oid = oid;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Long getBid() {
		return bid;
	}
	public void setBid(Long bid) {
		this.bid = bid;
	}
	public String getBname() {
		return bname;
	}
	public void setBname(String bname) {
		this.bname = bname;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
}
