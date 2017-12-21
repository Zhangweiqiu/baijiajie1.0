package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Business {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long bid;

	private String name;

	private Float amount; //最高额度

	private Integer period; //周期

	private String qualification; //资格

	private String materials; //材料

	private String matters;//注意事项
	
	private String qq;
	
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public Long getBid() {
		return bid;
	}
	public void setBid(Long bid) {
		this.bid = bid;
	}
	public Business() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Float getAmount() {
		return amount;
	}
	public void setAmount(Float amount) {
		this.amount = amount;
	}
	public Integer getPeriod() {
		return period;
	}
	public void setPeriod(Integer period) {
		this.period = period;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getMaterials() {
		return materials;
	}
	public void setMaterials(String materials) {
		this.materials = materials;
	}
	public String getMatters() {
		return matters;
	}
	public void setMatters(String matters) {
		this.matters = matters;
	}
}
