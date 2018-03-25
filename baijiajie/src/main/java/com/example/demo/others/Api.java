package com.example.demo.others;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class Api {
	
	private static String send_url = "https://sms.yunpian.com/v2/sms/single_send.json";
	
	private  static String apikey = "f6b2714d216c2113b9f23a9deae4ab14"; 
	
	private static String ENCODING = "UTF-8";

	
	public static String Sendinfo(String mobile,int number) {
		Map<String,String> map = new HashMap<>();
		String text = "【云片网】您的验证码是"+ number;
		map.put("apikey", apikey);
		map.put("text", text);
		map.put("mobile", mobile);
		return post(send_url, map);
	}
	
    public static String post(String url, Map < String, String > paramsMap) {
        CloseableHttpClient client = HttpClients.createDefault();
        String responseText = "";
        CloseableHttpResponse response = null;
        try {
            HttpPost method = new HttpPost(url);
            if (paramsMap != null) {
                List < NameValuePair > paramList = new ArrayList <
                    NameValuePair > ();
                for (Map.Entry < String, String > param: paramsMap.entrySet()) {
                    NameValuePair pair = new BasicNameValuePair(param.getKey(),
                        param.getValue());
                    paramList.add(pair);
                }
                method.setEntity(new UrlEncodedFormEntity(paramList,
                    ENCODING));
            }
            response = client.execute(method);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                responseText = EntityUtils.toString(entity, ENCODING);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return responseText;
    }
}
