package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BorderDao;
import com.example.demo.model.Border;

@Service
public class BorderService {
	
	@Autowired
	BorderDao borderDao;
	
	public Map<String ,Object> findCount() {
		Map<String ,Object> map = new HashMap<>();
		List<Border> border = borderDao.findByState(2);
		map.put("allcount", border.size());
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		List<Border> border2 = borderDao.findByDate(df.format(new Date()));
		
		map.put("nowcount",border2.size());
		return map;
	}
}
