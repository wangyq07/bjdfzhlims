package com.bjdfzh.userprivilage.entity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject; 
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class HttpClientUtil { 
	static RestTemplate rt=new RestTemplate();
	 public static  JSONObject PostDataBody(JSONObject body,String token,String URL)
	 {
		 String jsonData = JSON.toJSONString(body);
		 HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.add("Authorization", token);
	        HttpEntity<String> request = new HttpEntity<>(jsonData, headers);
		 UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(URL);
		 ResponseEntity<JSONObject> entity= rt.postForEntity(builder.toUriString(), request, JSONObject.class);
		 if(entity !=null)
			 return entity.getBody();
		 return null;
	 }
	 public static  JSONObject PostDataParam(Map<String,List<String>> Params,String token,String URL)
	 {
		  MultiValueMap<String,String> mvalues=new LinkedMultiValueMap<String,String>();
		  for(String key:Params.keySet())
		  {
			  mvalues.put(key, Params.get(key));
		  }
		 HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.add("Authorization", token);
	        HttpEntity<String> request = new HttpEntity<>(null, headers);
		 UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(URL).queryParams(mvalues);
		 ResponseEntity<JSONObject> entity= rt.postForEntity(builder.toUriString(), request, JSONObject.class);
		 if(entity !=null)
			 return entity.getBody();
		 return null;
	 }
	 public static  void put(JSONObject body,String token,String URL)
	 {
		 String jsonData = JSON.toJSONString(body);
		 HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.add("Authorization", token);
	        HttpEntity<String> request = new HttpEntity<>(jsonData, headers);
		 UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(URL);
		   rt.put(builder.toUriString(), request);
	 }
	 public static  void delete(JSONObject body,String token,String URL)
	 {
		 String jsonData = JSON.toJSONString(body);
		 HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.add("Authorization", token);
	        HttpEntity<String> request = new HttpEntity<>(jsonData, headers); 
		   rt.exchange(URL, HttpMethod.DELETE, request, String.class);
	 }
	 public static  void delete(String id,String token,String URL)
	 {
		 HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.add("Authorization", token);
	        HttpEntity<String> request = new HttpEntity<>(null, headers); 
		   rt.exchange(String.format("%s?id={id}", URL), HttpMethod.DELETE, request, String.class,id);
	 }
	    
}
