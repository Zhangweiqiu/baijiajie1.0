package com.example.demo.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Border;

public interface BorderDao extends CrudRepository<Border,Long>{
	List<Border> findByState(Integer state);
	
	List<Border> findByDate(String date);
}
