package com.example.demo.dao.weixin;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.weixinmodel.UserInfo;

public interface UserInfoDao extends CrudRepository<UserInfo,String>{

}
