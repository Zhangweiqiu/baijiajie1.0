package com.example.demo.others;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class CheckUtil {
	public static String sha1(String str) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			digest.update(str.getBytes());
			byte messageDigest[] = digest.digest();
			StringBuffer hexString = new StringBuffer();
			//字节数组转换为十六进制数
			for (int i = 0; i < messageDigest.length; i++) {
	            String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
	            if (shaHex.length() < 2) {
	               hexString.append(0);
	            }
	            hexString.append(shaHex);
	        }
			return hexString.toString();
		}catch(NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public static String sort(String token, String timestamp, String nonce) {
		String[] strArray = {token,timestamp,nonce};
		Arrays.sort(strArray);
		StringBuilder sb = new StringBuilder();
		for(String str : strArray) {
			sb.append(str);
		}
		return sb.toString();
	}
}
