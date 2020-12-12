package com.bjdfzh.userprivilage.dao;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.userprivilage.entity.AuthUser;
import com.bjdfzh.userprivilage.entity.Menu;
import com.bjdfzh.userprivilage.entity.Organization;
import com.bjdfzh.userprivilage.entity.RelationId;
import com.bjdfzh.userprivilage.entity.Role;
import com.bjdfzh.userprivilage.entity.User;
import com.bjdfzh.util.JWTEntity;
import com.bjdfzh.util.JwtUtil;

@Service
public class HandleAuth {
	 static final String token="8AAFC614-953F-475B-A5D5-B26BF4F0FB58";
	@Autowired
    private  AuthUserMapper authmapper;
	@Autowired
	private MenuMapper menumapper;
	@Autowired
	private UserMapper usermapper;
	public void updateUser(AuthUser user)
	{
		User u=getUserFromAuthuser(user);
		usermapper.update(u);
		authmapper.deleteUserOrg(u.getId());
		authmapper.deleteUserRole(u.getId());
		this.addmapuser(user);
	}
	public void deleteUser(String UserId)
	{
		 usermapper.detete(UserId);
		 authmapper.deleteUserOrg(UserId);
		 authmapper.deleteUserRole(UserId);
	}

	/*
	 * public static void main(String[] args) { String at=encryption("123qwe"),
	 * at2=args[0]; if(at.contentEquals(at2)) System.out.println("瀵逛簡"); else
	 * System.out.println("閿?); }
	 */
	/**
    *
    * @param plainText
    *            鏄庢枃
    * @return 32浣嶅瘑鏂?
    */
    static String encryption(String plainText) {
       String re_md5 = new String();
       try {
    	   plainText= token+plainText;
           MessageDigest md = MessageDigest.getInstance("MD5");
           md.update(plainText.getBytes());
           byte b[] = md.digest();

           int i;

           StringBuffer buf = new StringBuffer("");
           for (int offset = 0; offset < b.length; offset++) {
               i = b[offset];
               if (i < 0)
                   i += 256;
               if (i < 16)
                   buf.append("0");
               buf.append(Integer.toHexString(i));
           }

           re_md5 = buf.toString();

       } catch (NoSuchAlgorithmException e) {
           e.printStackTrace();
       }
       return re_md5;
   }
 
	private User getUserFromAuthuser(AuthUser user)
	{
		User u=new User();
		u.setAccount(user.getAccount());
		u.setId(user.getId());
		u.setEmail(user.getEmail());
		u.setName(user.getName());
		u.setPassword(user.getPassword());
		u.setPhone(user.getPhone());
		return u;
	}
	public void addUser(AuthUser user)
	{
		User u=getUserFromAuthuser(user);
		usermapper.addUser(u);
		addmapuser(user);
	}
	private void addmapuser(AuthUser user)
	{
		List<RelationId> userorganizaitons=new ArrayList<RelationId>();
		for(Organization org : user.getOrganizations())
		{
			userorganizaitons.add(new RelationId(user.getId(),org.getId()));
		}
		if(userorganizaitons.size()>0)
		authmapper.addUserOrg(userorganizaitons);
		List<RelationId> roles=new ArrayList<RelationId>();
		for(Role role : user.getRoles())
		{
			roles.add(new RelationId(user.getId(),role.getId()));
		}
		if(roles.size()>0)
		authmapper.addUserRole(roles);
	}
	public static Long jwtMaxAge = 600L * 60L * 1000L;
	ConcurrentHashMap<String,Menu> cuurentUserMenu=new ConcurrentHashMap<String,Menu>();
	public JSONObject getalluserbyid(String id)
	{ 
		JSONObject jo=new JSONObject();
		if(id !=null&&!id.equals(""))
		{
			AuthUser u=authmapper.getauthbyid(id); 
            jo.put("id",u.getId());
            jo.put("name",u.getName());
            jo.put("account",u.getAccount());
            jo.put("password",u.getPassword());
            jo.put("email",u.getEmail());
            jo.put("phone",u.getPhone());
            jo.put("roles",u.getRoles());
		    jo.put("organizations", u.getOrganizations()); 
		      
		}
		 
		return jo;
	}
	public JSONArray getalluser(String OrgId)
	{
		JSONArray ja=new JSONArray();
		List<AuthUser> auths=null;
		if(OrgId !=null&&!OrgId.equals(""))
		{
			auths=authmapper.getuserbyorgnization(OrgId);
		}
		else
		{
			auths=authmapper.getallUserOrg();
		}
		JSONObject jo=null;
		for(AuthUser u:auths)
		{
            jo=new JSONObject();
            jo.put("id",u.getId());
            jo.put("name",u.getName());
            jo.put("account",u.getAccount());
            jo.put("password",u.getPassword());
            jo.put("email",u.getEmail());
            jo.put("phone",u.getPhone()); 
		    ja.add(jo);
		} 
		return ja;
	}
	
	public JSONObject getauth(String account,String password)
	{
		AuthUser auser= authmapper.getauth(account);
		JSONObject json=new JSONObject(); 
		if(auser ==null)
		{
			json.put("MSG", "没有这个用户，请注册");
			return json;
		}
		else if(!auser.getPassword().equals(password))
		{
			json.put("MSG", "用户密码错误");
			return json;
		}
		JWTEntity jwtentity=new JWTEntity();
		jwtentity.setUserId(auser.getId());
		jwtentity.setPassword(auser.getPassword());
		jwtentity.setLoginDate(new Date());
		jwtentity.setUserName(auser.getName());
		jwtentity.setMaxege(jwtMaxAge);
		String token=JwtUtil.sign(jwtentity, jwtMaxAge);
		json.put("name", auser.getName());
		
		json.put("token",  token);
		json.put("roles", auser.getRoles());
		json.put("id", auser.getId());   
		json.put("email",auser.getEmail());
		json.put("phone",auser.getPhone()); 
		json.put("permissions",new JSONObject() );
		json.put("organizations", auser.getOrganizations());
		json.getJSONObject("permissions").put("actions", auser.getActions());
		List<Menu> currentusermenus=auser.getMenus();
		List<Menu> menus=menumapper.getmenus();
		List<Menu> usermenu=currentusermenus.parallelStream().filter(c->c.getPid()!=null).collect(Collectors.toList());
		
		for(Menu m:usermenu)
		{
			recursemenu(m.getPid(),menus,currentusermenus);
		}
		currentusermenus.sort((Menu m1,Menu m2)->{
			                                         String com1=m1.getPid()==null?"0":m1.getPid(),
			                                             com2=m2.getPid()==null?"0":m2.getPid();
			                                         if(!com1.equals(com2))
			                                         {
			                                        	 return com1.compareTo(com2);
			                                         }
			                                           return m1.getSort().compareTo(m2.getSort());
				                                    });
		json.getJSONObject("permissions").put("menus", currentusermenus);
		
		return json;
	}
	void recursemenu(String pid,List<Menu> allmenus,List<Menu> returnmenus)
	{
		 if(pid ==null)
			 return;
		Optional<Menu> parentstream=allmenus.parallelStream().filter(c->c.getId().contentEquals(pid)).findFirst();
		if(parentstream.isPresent())
		{
			Menu m=parentstream.get();
			if(!returnmenus.parallelStream().anyMatch(c->c.getId().contentEquals(m.getId())))
				returnmenus.add(m);
			recursemenu(m.getPid(),allmenus,returnmenus);
		}
	}
}
