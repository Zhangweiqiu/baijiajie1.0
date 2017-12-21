package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Business;

public interface BusinessDao extends CrudRepository<Business,Long>{
	@Modifying
	@Query(nativeQuery=true,value="SELECT * FROM business ORDER By amount DESC")
	public List<Business> selectOrderByAmount();
	
	
	@Modifying
	@Query(nativeQuery=true,value="SELECT * FROM business ORDER By amount ")
	public List<Business> selectOrderByAmountg();

	@Modifying
	@Query(nativeQuery=true,value="SELECT * FROM business ORDER By period DESC")
	public List<Business> selectOrderByPeriod();
}
