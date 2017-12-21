package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BusinessService;

@RestController
public class BusinessController {
	@Autowired
	BusinessService businessService;
	
	@RequestMapping("/addBInfoByAmount")
	public Map<String,Object> addInfoByAmount(){
		System.out.println("1-2-3-4-5-6");
		return businessService.addBInfoByAmount();
	}
	
	@RequestMapping("/addBInfoByPeriod")
	public Map<String,Object> addBInfoByPeriod(){
		System.out.println("1-2-3-4-5-6");
		return businessService.addBInfoByPeriod();
	}
	
	@RequestMapping("/countbusiness")
	public Map<String,Object> countbusiness(){
		System.out.println("2");
		return businessService.countbusiness();
	}
	
	@RequestMapping("/selectlowByAmountg")
	public Map<String,Object> selectlowByAmountg(){
		System.out.println("3");
		return businessService.selectlowByAmountg();
	}
	
	
}
