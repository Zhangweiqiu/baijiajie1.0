package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BusinessDao;
import com.example.demo.model.Business;

@Service
public class BusinessService {
	
	@Autowired
	BusinessDao businessDao;
	
	public Map<String,Object> addBInfoByAmount(){
		Map<String,Object> map = new HashMap<>();
		List<Business> business = businessDao.selectOrderByAmount();
		if(business != null) {
			map.put("state", true);
			map.put("amount", business);
		}else
			map.put("state", false);
		return map;
	}
	
	public Map<String,Object> countbusiness() {
		Map<String,Object> map = new HashMap<>();
		List<Business> lbusiness = (List<Business>) businessDao.findAll();
		System.out.println(lbusiness.size());
		map.put("state", true);
		map.put("bnum", lbusiness);
		return map;
	}
	
	public Map<String,Object> selectlowByAmountg(){
		Map<String,Object> map = new HashMap<>();
		List<Business> business = businessDao.selectOrderByAmountg();	
		if(business != null) {
			Float lowAmount = business.get(0).getAmount();
			map.put("state", true);
			map.put("lowAmount", lowAmount);
		}else
			map.put("state", false);
		return map;
	}

	public Map<String, Object> addBInfoByPeriod() {
		Map<String,Object> map = new HashMap<>();
		List<Business> business = businessDao.selectOrderByPeriod();
		if(business != null) {
			map.put("state", true);
			map.put("amount", business);
		}else
			map.put("state", false);
		return map;
	}
	
}
