package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BorderService;

@RestController
public class BorderController {
	
	@Autowired
	BorderService borderService;
	
	@RequestMapping("/count")
	public Map<String,Object> findCount() {
		return borderService.findCount();
	}
}
