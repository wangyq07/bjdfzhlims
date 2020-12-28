package com.bjdfzh.businessprocess.util;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.bjdfzh.businessprocess.dao.PriceProductMapper;
import com.bjdfzh.businessprocess.dao.ProductMapper;
import com.bjdfzh.businessprocess.dao.QualificationCompanyMapper;
import com.bjdfzh.businessprocess.dao.QualificationMapper;
import com.bjdfzh.businessprocess.dao.TestMethodMapper;
import com.bjdfzh.businessprocess.dao.TestProjectMapper;
import com.bjdfzh.businessprocess.dao.TestStandardMapper;
import com.bjdfzh.businessprocess.entity.ContactTestProject;
import com.bjdfzh.businessprocess.entity.PriceProduct;
import com.bjdfzh.businessprocess.entity.PriceQualification;
import com.bjdfzh.businessprocess.entity.Product;
import com.bjdfzh.businessprocess.entity.ProductQualification;
import com.bjdfzh.businessprocess.entity.Qualification;
import com.bjdfzh.businessprocess.entity.QualificationCompany;
import com.bjdfzh.businessprocess.entity.TestMethod;
import com.bjdfzh.businessprocess.entity.TestProject;
import com.bjdfzh.businessprocess.entity.TestStandard;
import com.bjdfzh.businessprocess.entity.TestMethod;
import com.bjdfzh.util.EhCacheUtil;
@Service
public class CacheGetBusinessModel {
	@Autowired
	PriceProductMapper priceProductService;
	@Autowired
	QualificationMapper qualiService;
	@Autowired
	QualificationCompanyMapper companyquservice;
	@Autowired
	TestProjectMapper tpservice;
	@Autowired
	  TestProjectMapper tpmService;
	@Autowired
	  TestMethodMapper tmService;
	@SuppressWarnings("unchecked")
	public Map<String,PriceProduct> getPriceProduct()
	{
		String key="PriceProduct";
	 
		Map<String,PriceProduct> retproduct=(Map<String,PriceProduct>)EhCacheUtil.getValue(key);
		if(retproduct==null)
		{
			retproduct=new ConcurrentHashMap<String,PriceProduct>();
			List<PriceProduct> data=priceProductService.getpriceproduct();
			for(PriceProduct price:data)
			{ 
				retproduct.put(price.getId(),price);
			}
			EhCacheUtil.setValue(key, retproduct);
		}
		return retproduct;
	}
	 
	private Map<String, String > getPriceQualification(Map<String,PriceProduct> mp)
	{
		String key="PriceQualification"; 
		Map<String, String > retproduct=(Map<String, String >)EhCacheUtil.getValue(key);
		if(retproduct==null)
		{
			retproduct=new ConcurrentHashMap<String, String >(); 
			for(String price:mp.keySet())
			{
				addpricequalification(mp.get(price),retproduct); 
			}
			EhCacheUtil.setValue(key, retproduct);
		}
		return retproduct;
	}
	 private void addpricequalification( PriceProduct prod,Map<String, String > mp)
	 {
		 for(PriceQualification qualificaiton:prod.getPrices())
		 {
			 mp.put(qualificaiton.getQualificationid(), prod.getId()); 
		 }
		 
	 }
	 @SuppressWarnings("unchecked")
	public Map<String,TestMethod> getTestMthods()
	 {
		 String key="testmethod";
		 Map<String,TestMethod> mp=(Map<String,TestMethod>)EhCacheUtil.getValue(key);
		 if(mp==null||mp.size()==0)
		 {
			 List<TestMethod> methods=this.tmService.getTestMethods();
			 mp=new ConcurrentHashMap<>();
			 for(TestMethod tm:methods)
			 {
				 mp.put(tm.getMethodname(), tm);
			 }
			 EhCacheUtil.setValue(key, mp);
		 }
		 return mp;
	 }
	 public TestMethod getTestMethodByName(String MethodName)
	 {
		 Map<String,TestMethod> mp=getTestMthods();
		 if(mp !=null&&mp.containsKey(MethodName))
			 return mp.get(MethodName);
		 return null;
	 }
	 @Autowired
	 TestStandardMapper tstandardService;
	 public Map<String,TestStandard> getTestStandards()
	 {
		 String key="teststandard";
		 Map<String,TestStandard> mp=(Map<String,TestStandard>)EhCacheUtil.getValue(key);
		 if(mp==null||mp.size()==0)
		 {
			 List<TestStandard> methods=this.tstandardService.getteststandards();
			 mp=new ConcurrentHashMap<>();
			 for(TestStandard tm:methods)
			 {
				 mp.put(tm.getStandardname(), tm);
			 }
			 EhCacheUtil.setValue(key, mp);
		 }
		 return mp;
	 }
	 public TestStandard getTestStandardByName(String StandardName)
	 {
		 Map<String,TestStandard> mp=getTestStandards();
		 if(mp !=null&&mp.containsKey(StandardName))
			 return mp.get(StandardName);
		 return null;
	 }
	 public TestProject getTestProjectByName(String secondid,String projectname)
	 {
		List<TestProject> testproject= this.gettestprojectbypid(secondid, false);
	   Optional<TestProject> option=	testproject.stream().filter(c->c.getLabel().contentEquals(projectname)).findFirst();
	    if(option.isPresent())
	    	return option.get();
	    return null;
	 }
	public void addPriceProduct(PriceProduct pduct)
	{
		Map<String,PriceProduct> mp=getPriceProduct();
		boolean isadd=false;
		  
			 if(!mp.containsKey(pduct.getId()))
			 {
				 isadd=true;
				 mp.put(pduct.getId(), pduct); 
				 EhCacheUtil.setValue("PriceProduct", mp);
				Map<String,String> p= getPriceQualification(mp);
				addpricequalification(pduct,p);
				EhCacheUtil.setValue("PriceQualification", p);
			 } 
		 priceProductService.addpriceproduct(pduct);
		 priceProductService.addpricequalification(pduct.getPrices());
		
	}
	public void updatePriceProduct(PriceProduct pduct)
	{
		Map<String,PriceProduct> mp=getPriceProduct();
		
		PriceProduct  oldpriceProduct=mp.get(pduct.getId());
	    Map<String,String> qu=getPriceQualification(mp); 
	    removePriceQualification(qu,oldpriceProduct.getPrices());
	    addpricequalification(pduct,qu);
	    mp.put(pduct.getId(), pduct);
	    EhCacheUtil.setValue("PriceProduct", mp);
	    EhCacheUtil.setValue("PriceQualification", qu);
	    priceProductService.updatepriceproduct(pduct);
	    priceProductService.deletepricequalification(pduct.getId());
		priceProductService.addpricequalification(pduct.getPrices());
	}
	public void deletePriceProduct(String id)
	{
		Map<String,PriceProduct> mp=getPriceProduct();
		
		PriceProduct  oldpriceProduct=mp.get(id);
	    Map<String,String> qu=getPriceQualification(mp); 
	    removePriceQualification(qu,oldpriceProduct.getPrices());
	    mp.remove(id);
	    EhCacheUtil.setValue("PriceProduct", mp);
	    EhCacheUtil.setValue("PriceQualification", qu);
	    priceProductService.deletepriceproduct(id);
	    priceProductService.deletepricequalification(id); 
	}
	public JSONObject getCurrentQualificationexists(List<PriceQualification> qualifications)
	{
		JSONObject retobj=new JSONObject();
		Map<String,PriceProduct> mp=getPriceProduct();
		 Map<String,String> qu=getPriceQualification(mp);
		 boolean isexits=false;
		  for(PriceQualification qf:qualifications)
		  {
			  if(qu.containsKey(qf.getQualificationid())&&!qf.getPriceid().contentEquals( qu.get(qf.getQualificationid())))
			  {
				  isexits=true;
				  PriceProduct pd=mp.get(qu.get(qf.getQualificationid()));
				  retobj.put("msg",String.format("%s:%s存在于%s中",qf.getTestprojectname(),qf.getMethodname(),pd.getLabel()));
				  break;
			  }
		  }
		  retobj.put("isexits", isexits);
		  if(!isexits)
		  {
			  retobj.put("msg", "成功");
		  }
		return retobj;
	}
	private void removePriceQualification( Map<String,String> qu,List<PriceQualification> quals)
	{
		for(PriceQualification qf:quals)
		{
			if(qu.containsKey(qf.getQualificationid()))
			{
				qu.remove(qf.getQualificationid());
			}
		}
	}
	@SuppressWarnings("unchecked")
	public List<TestProject> gettestprojectbylevel(int level)
	{
		Map<Integer,List<TestProject>> projects=(Map<Integer,List<TestProject>>)EhCacheUtil.getValue("LevelTestProjects");
		if(projects==null||projects.size()==0)
		{
		  projects= new ConcurrentHashMap<Integer,List<TestProject>>();
		  List<TestProject> allprojects=getAllTestProjects();
		  Supplier<Stream<TestProject>> streamprojects=()->allprojects.parallelStream();
		  for(int setlevel=1;setlevel<=3;setlevel++)
		  {
			  int sellevel=setlevel;
			  List<TestProject> levelproject=streamprojects.get().filter(c->c.getLevel()==sellevel).collect(Collectors.toList());
			  if(levelproject.size()>0)
			  {
				  projects.put(setlevel, levelproject);
			  }
		  }
		  EhCacheUtil.setValue("LevelTestProjects",projects);
		}
      return projects.get(level);  
	}
	@SuppressWarnings("unchecked")
	public List<TestProject> gettestprojectbypid(String pid,boolean iscontainchild)
	{
		Map<String,List<TestProject>> projects=null;
		if(iscontainchild) 
			projects=(Map<String,List<TestProject>>)EhCacheUtil.getValue("pidTestProjectscontain");
		else
			projects=(Map<String,List<TestProject>>)EhCacheUtil.getValue("pidTestProjects");
		if(projects==null||projects.size()==0)
		{
		  projects= new ConcurrentHashMap<String,List<TestProject>>();
		   List<TestProject> rootproject=gettestprojectbylevel(1);
		   List<TestProject> secondproject=gettestprojectbylevel(2);
		   Supplier<Stream<TestProject>> secondstreamprojects=()->secondproject.parallelStream();
		   List<TestProject> thirdproject=gettestprojectbylevel(3);
		   Supplier<Stream<TestProject>> thirdstreamprojects=()->thirdproject.parallelStream();
		   for(TestProject first:rootproject)
		   {
			   if(!projects.containsKey("root"))
			   {
				   projects.put("root", new ArrayList<TestProject>());
			   }
			   projects.get("root").add(first);
			   
			 List<TestProject> filterseconds=  secondstreamprojects.get().filter(c->c.getPid()!=null
					 &&c.getPid().contentEquals( first.getId()) ).collect(Collectors.toList());
		      if(filterseconds.size()>0)
		      {
		    	  projects.put(first.getId(), filterseconds);
		    	  if(iscontainchild)
		    	  {
		    		  projects.get("root").addAll(filterseconds);
		    	  }
		    	  for(TestProject second:filterseconds)
		    	  {
		    		  
		    		  List<TestProject> filterthirds=  thirdstreamprojects.get().filter(c->c.getPid()
		    				                             .contentEquals( second.getId())
		    				                           ).collect(Collectors.toList());
		    		  if(filterthirds.size()>0)
		    		  {
		    			  projects.put(second.getId(), filterthirds);
		    			  if(iscontainchild)
				    	  {
				    		  projects.get("root").addAll(filterthirds);
				    		  projects.get(first.getId()).addAll(filterthirds);
				    	  }
		    		  }
		    	  }
		      }
		   }
		  if(iscontainchild)
		  EhCacheUtil.setValue("pidTestProjectscontain",projects);
		  else
			  EhCacheUtil.setValue("pidTestProjects",projects);
		}
      return projects.get(pid);  
	}
	
	@SuppressWarnings("unchecked")
	public List<TestProject> getAllTestProjects()
	{
		List<TestProject> projects=(List<TestProject>)EhCacheUtil.getValue("TestProjects");
		if(projects==null||projects.size()==0)
		{
		  projects=  tpservice.gettestprojects();
		  EhCacheUtil.setValue("TestProjects",projects);
		}
		return projects;
	}
	@SuppressWarnings("unchecked")
	public Map<Integer,Map<String,List<Qualification>>>  getQualificationByProject()
	{
		String key="qualificationcompanycategory";
		Map<Integer,Map<String,List<Qualification>>> mplev=(Map<Integer,Map<String,List<Qualification>>>) EhCacheUtil.getValue(key);
		if(mplev==null||mplev.size()==0)
		{
		  mplev=new ConcurrentHashMap<Integer,Map<String,List<Qualification>>>();
		  List<QualificationCompany> companys=	companyquservice.getallqualificationcompanys();
		  List<TestProject> projectclass=gettestprojectbylevel(3);
		  for(QualificationCompany company:companys)
		  {
			  mplev.put(company.getId(), new ConcurrentHashMap<String,List<Qualification>>());
			 List<Qualification> companyqualis= getAllQualificationByCompany(company.getId());
			 Supplier<Stream<Qualification>> streams=()->companyqualis.parallelStream();
			  for(TestProject tp:projectclass)
			  {
				  String lab=tp.getLabel();
				  if(!mplev.get(company.getId()).containsKey(lab))
				  {
					  mplev.get(company.getId()).put(lab, new ArrayList<Qualification>());
				  List<Qualification> curstions=streams.get()
						  .filter(c->c.getTestproject().equals(lab))
						  .collect(Collectors.toList());
				  if(curstions.size()>0)
				  mplev.get(company.getId()).get(lab).addAll(curstions);
				  }
			  }
		  }
		  EhCacheUtil.setValue(key, mplev);
		}
		for(int i=1;i<=3;i++)
	    {
	    	System.out.println(String.format("%d:%d", i,mplev.get(i).size()));
	    }
		return mplev;
	}
	 
	@SuppressWarnings("unchecked")
	List<Qualification> getAllQualificationByCompany(Integer CompanyID)
	{
		String key="qualificationcompany"; 
		Map<Integer, List<Qualification>> mplev=(Map<Integer,List<Qualification>>) EhCacheUtil.getValue(key);
		List<Qualification> retqualis=new ArrayList<Qualification>();
	    if(mplev==null|| mplev.size()==0)
	    {
	    	 mplev=new ConcurrentHashMap<Integer, List<Qualification>>();
			  List<QualificationCompany> companys=	companyquservice.getallqualificationcompanys();
			  List<TestProject> projectclass=gettestprojectbylevel(1);
			  for(QualificationCompany company:companys)
			  {
				  List<Qualification> arrays=new ArrayList<Qualification>();
				  //mplev.put(company.getId(), new ArrayList<Qualification>());
				  for(TestProject tp:projectclass)
				  { 
					   
					  arrays.addAll(qualiService.getqualificationsbycompany
					  ( tp.getId(), company.getId()));
				  }
				  mplev.put(company.getId(), arrays);
				  //System.out.println(String.format("%s:%d", company.getLabel(),arrays.size()));
			  }
			  EhCacheUtil.setValue(key, mplev);
	    }
	    if(mplev.containsKey(CompanyID))
	    	retqualis=mplev.get(CompanyID);
	    
		 return retqualis;
	}
	public List<Qualification> getQualificationBySearch(int CompanyId,String searchkey)
	{
		List<Qualification> retlist=new ArrayList<Qualification>();
		 List<TestProject> projectclass=gettestprojectbylevel(3);
		   List<String> searchkeys=new ArrayList<String>();
		   Map<Integer,Map<String,List<Qualification>>> source=this.getQualificationByProject();
		   if(source !=null&&source.size()>0)
		   {
		    if(source.containsKey(CompanyId))
		    {
			   for(TestProject project:projectclass)
			   {
				   if(project.getLabel().contains(searchkey)&&!searchkeys.contains(project.getLabel()))
				   {
					   searchkeys.add(project.getLabel());
				   }
			   }
			   for(String key:searchkeys)
			   {
				   
				   if(source.get(CompanyId).containsKey(key))
				   {
					  List<Qualification> additems= source.get(CompanyId).get(key);
				     retlist.addAll(additems);
				     System.out.print(String.format("%s:%d", key,additems.size()));
				   }
			   }
			   }
		   }
		return retlist;
	}
	/*
	 * 计算标准价格,jsonobject中获取相关公式，把公式中设定n值，然后返回前端使用eval函数计算
	 */
	public JSONObject getStandardPrice(List<ContactTestProject> projects)
	{
	  Supplier<Stream<ContactTestProject>> projectstream=()->projects.parallelStream();//缓存查询对象
	  Map<String,PriceProduct> mp=this.getPriceProduct();//获取价格对象
	  Map<String,String> priceQualificaitons=this.getPriceQualification(mp);//获取价格中的项目
	   Map<String,Product> mproduct=this.getProducts();//获取产品对象
	   Map<String,String> selectedIds=new ConcurrentHashMap<String,String>();//已经处理的测试项目
	   List<JSONObject> formulars=new ArrayList<JSONObject>();//存取公式，当公式中存在最高限价时以最高限价为准
	   double price=0.0;
	   /*计算打包价格*/
	   for(ContactTestProject cp:projects)
	   {
		   if( selectedIds.containsKey(cp.getQualificationid()))
			   continue;//如果已经参与过计算跳出 
			 List<Product>  products= getProductsbyQualification(cp.getQualificationid());//获取
			 if(products.size()>0)
			 {
				 boolean ispackage=false;
				 Product currentproduct=null;
				 for(Product product:products)
				 {
					 boolean flag=true;
					 if(product.getPrice()==0)
						 continue;
					 for(ProductQualification pq:product.getTestprojects())
					 {
						if(! projectstream.get().filter(c->c.getQualificationid()
								 .equals(pq.getQualificationid())).findFirst().isPresent()
								)
						{
							flag=false;
							break;
						}
					 }
					 if(flag)
					 {
						 ispackage=true;
						 currentproduct=product;
						 break;
					 }
				 }
				 if(ispackage)
				 {
					 Map<String,String> ids=currentproduct.getTestprojects().stream()
							 .collect(Collectors.toConcurrentMap(ProductQualification::getQualificationid, ProductQualification::getQualificationid));
					 selectedIds.putAll(ids);
					 price +=currentproduct.getPrice(); 
				 }
			 } 
	   }
	   /*计算阶梯价格*/
	   Map<String,String> tempselectedIds=new ConcurrentHashMap<String,String>();
	   for(ContactTestProject cp:projects)
	   { 
		   if( selectedIds.containsKey(cp.getQualificationid()))
			   continue;//如果已经参与过计算跳出
		   if(priceQualificaitons.containsKey(cp.getQualificationid()))
	       {
			   PriceProduct p= mp.get(priceQualificaitons.get(cp.getQualificationid()));
			   
			   List<ContactTestProject> tempprojects=new ArrayList<ContactTestProject>();
			   tempprojects.add(cp);
			   tempselectedIds=new ConcurrentHashMap<String,String>();
			   tempselectedIds.put(cp.getQualificationid(), cp.getQualificationid());
			   int i=1;//从1开始计数
			   double exceptionprice=0.0;
			    for(PriceQualification qf: p.getPrices())
			    {
			    	if(qf.getQualificationid().contentEquals(cp.getQualificationid()))
			    	{
			    		exceptionprice+=qf.getExceptionprice();
			    		continue; //跳出已经发现的
			    	}
			      Optional<ContactTestProject> opprojects=	projectstream.get().filter(c->c.getQualificationid()
			    			.contentEquals(qf.getQualificationid())).findFirst();
			    	if( 
			    			opprojects.isPresent()
			    		)
			    	{
			    		exceptionprice+=qf.getExceptionprice();
			    		ContactTestProject ccp=opprojects.get();
			    		tempprojects.add(ccp);
			    		 i=i+1; 
			    		 tempselectedIds.put(qf.getQualificationid(), qf.getQualificationid());
			    	}
			    }
			    Optional<ContactTestProject>  tempccpmax= tempprojects.stream().max(Comparator.comparingInt(ContactTestProject::getTestcount));//找出当前最大测试次数值并提取
			    ContactTestProject tempccp=tempccpmax.get();
			    
			    if(p.getPerdecreace()>0)//实现每减少一项减多少钱
			    {
			    	 price +=(p.getLimitprice()*tempccp.getTestcount()-i*p.getPerdecreace());
			    	 selectedIds.putAll(tempselectedIds);
			    }
			    else  if(i>=p.getMincount())//实现公式计算
			    {
			    	JSONObject jo=new JSONObject();
				    jo.put("limitprice", p.getLimitprice()*tempccp.getTestcount());//添加最高限价
			    jo.put("formular", String.format("var n=%d;(%s + %s)*%d", i
			    		      ,p.getFormular(),exceptionprice,tempccp.getTestcount()));//把n代入公式，并把例外加价的项目费用加上
			    formulars.add(jo); 
			    selectedIds.putAll(tempselectedIds);
			    }
	       }
	   }
	   //筛选完之后把未在阶梯价格中的值进行累加
	   for(ContactTestProject cp:projects)
	   {
		   if( !selectedIds.containsKey(cp.getQualificationid()))
		   {
			   price +=cp.getRealprice()*cp.getTestcount();
		   }
	   }
	   JSONObject jo=new JSONObject();
	   jo.put("price", price); 
	   jo.put("formulars", formulars);
	   return jo;
	}
	@Autowired
	 ProductMapper productService;
	public List<Product> getProductList()
	{
		String key="listProducts";
		List<Product> products=(List<Product>)EhCacheUtil.getValue(key);
		if(products==null||products.size()==0)
		{
			products=productService.getproduct();
			 EhCacheUtil.setValue(key, products);
		}
		return products;
	}
	@SuppressWarnings("unchecked")
	public Map<String,Product> getProducts()
	{
		String key="Products"; 
		Map<String,Product> products=(Map<String,Product>)EhCacheUtil.getValue(key);
		if(products==null||products.size()==0)
		{
		   products=new ConcurrentHashMap<>();
		   List<Product> data=getProductList();
		   for(Product product:data)
		   {
			   products.put(product.getId(), product);
		   }
		   EhCacheUtil.setValue(key, products);
		}
		return products;
	}
	public  Map<String,List<Product>> getProductByQualificaitons()
	{
		String key="productqualification";
		Map<String,List<Product>> mp=(Map<String,List<Product>>) EhCacheUtil.getValue(key);
		if(mp ==null||mp.size()==0)
		{
			Map<String,Product> data=getProducts();
			mp=new ConcurrentHashMap<String,List<Product>>();
			for(String productid:data.keySet())
			{
				for(ProductQualification pq:data.get(productid).getTestprojects())
				{
					if(!mp.containsKey(pq.getQualificationid()))
					{
						mp.put(pq.getQualificationid(), new ArrayList<Product>());
					}
					mp.get(pq.getQualificationid()).add(data.get(productid));
				} 
			}
			EhCacheUtil.setValue(key, mp);
		} 
		return mp;
	}
	List<Product> getProductsbyQualification(String qualificationid)
	{
		Map<String,List<Product>> mp=getProductByQualificaitons();
	    if(mp!=null&&mp.containsKey(qualificationid))
		        return mp.get(qualificationid);
	    else
	    {
	    	mp.put(qualificationid, new ArrayList<Product>());
	    	return mp.get(qualificationid); 
	    }
	}
	void addProductsbyQualification( Product product)
	{
		Map<String,List<Product>> mp=getProductByQualificaitons();
		for(ProductQualification pq:product.getTestprojects())
		{
		    if(mp!=null&&mp.containsKey(pq.getQualificationid()))
			    mp.get(pq.getQualificationid()).add(product);
		    else
		    {
		    	mp.put(pq.getQualificationid(), new ArrayList<Product>());
		    	mp.get(pq.getQualificationid()).add(product); 
		    }
		}
		EhCacheUtil.setValue("productqualification", mp);
	}
	public void addProduct(Product product)
	{
		List<Product> list=getProductList();
		list.add(product); 
		Map<String,Product> mp=getProducts();
		mp.put(product.getId(), product);
		 EhCacheUtil.setValue("Products", mp);
		 EhCacheUtil.setValue("listProducts", list);
		 addProductsbyQualification(product); 
		productService.addproduct(product);
		productService.addproductqualification(product.getTestprojects()); 
	}
	public void updateProductQualification(Product product)
	{
		Map<String,List<Product>> mp=getProductByQualificaitons();
		for(ProductQualification pq:product.getTestprojects())
		{
		    if(mp!=null&&mp.containsKey(pq.getQualificationid()))
		    {
		    	mp.get(pq.getQualificationid()).removeIf(c->c.getId().equals(product.getId()));
			    mp.get(pq.getQualificationid()).add(product);
		    } 
		}
		EhCacheUtil.setValue("productqualification", mp);
	}
	public void updateProduct(Product product)
	{
		List<Product> list=getProductList();
		list.removeIf(c->c.getId().contentEquals(product.getId()));
		list.add(product); 
		Map<String,Product> mp=getProducts();
		mp.put(product.getId(), product);
		EhCacheUtil.setValue("Products", mp);
		 EhCacheUtil.setValue("listProducts", list);
		 updateProductQualification(product);
		productService.updateproduct(product);
		productService.deleteproductqualification(product.getId());
		productService.addproductqualification(product.getTestprojects());
	}
	public void deleteProductQualification(String id)
	{
		Map<String,Product> productmp=getProducts();
		Product oldproduct= productmp.get(id);
		Map<String,List<Product>> mp=getProductByQualificaitons();
		for(ProductQualification pq:oldproduct.getTestprojects())
		{
		    if(mp!=null&&mp.containsKey(pq.getQualificationid()))
		    {
		    	mp.get(pq.getQualificationid()).removeIf(c->c.getId().equals(oldproduct.getId())); 
		    } 
		}
		EhCacheUtil.setValue("productqualification", mp);
	}
	public void deleteProduct(String id)
	{
		List<Product> list=getProductList();
		list.removeIf(c->c.getId().contentEquals(id)); 
		Map<String,Product> mp=getProducts();
		 mp.remove(id);
		 EhCacheUtil.setValue("Products", mp);
		 EhCacheUtil.setValue("listProducts", list);
		 deleteProductQualification(id);
		productService.deleteproduct(id); 
		productService.deleteproductqualification(id); 
	}
	public List<Qualification> getQualificationByProductId(String id)
	{
		List<Qualification> quals=new ArrayList<>();
		Map<String,Product> products=getProducts();
		if(products.containsKey(id))
		{
		List<String> ids=products.get(id).getTestprojects().parallelStream().map(ProductQualification::getQualificationid).collect(Collectors.toList());
		StringBuilder sb=new StringBuilder();
		for(int i=0;i<ids.size();i++)
		{
			sb.append(String.format("%s", ids.get(i)));
			if(i !=ids.size()-1)
			{
				sb.append(",");
			}
		}
		String idds=sb.toString();
		quals=this.qualiService.getqualificationsbyids(idds);
		}
		return quals;
	}
	 public void addQualification(TestProject tp,TestMethod tm,TestStandard tstand,Qualification qlf)
	 {
		 setqlf( tp,  tm,  tstand,  qlf);
		   qualiService.addqualification(qlf); 
		   removeQualification();
	 }
	 class Updataprojectmethodstandard
	 {
		 boolean updatastandard;
		 boolean updatatestproject;
		 boolean updatemethod;
		 public Updataprojectmethodstandard( )
		 {
			 updatastandard=true;
			 updatatestproject=true;
			  updatemethod=true;
		 }
		public boolean isUpdatastandard() {
			return updatastandard;
		}
		public void setUpdatastandard(boolean updatastandard) {
			this.updatastandard = updatastandard;
		}
		public boolean isUpdatatestproject() {
			return updatatestproject;
		}
		public void setUpdatatestproject(boolean updatatestproject) {
			this.updatatestproject = updatatestproject;
		}
		public boolean isUpdatemethod() {
			return updatemethod;
		}
		public void setUpdatemethod(boolean updatemethod) {
			this.updatemethod = updatemethod;
		}
	 }
	 private Updataprojectmethodstandard setqlf(TestProject tp,TestMethod tm,TestStandard tstand,Qualification qlf)
	 {
		 Updataprojectmethodstandard updatejudge=new Updataprojectmethodstandard();
		 TestProject tempproject=this.getTestProjectByName(String.format("%s", qlf.getSecondid()), tp.getLabel());
		   if(tempproject ==null)
		   {
		   tpmService.addtestProject(tp);
		   updatejudge.setUpdatatestproject(false);
		   }
		   TestMethod tempmethod=null;
		   if(tm.getMethodname() !=null&&!tm.getMethodname().contentEquals(""))
		   {
			    tempmethod=this.getTestMethodByName(tm.getMethodname());
			   if(tempmethod ==null )
			   {
			    tmService.addTestMethod(tm);
			    updatejudge.setUpdatemethod(false);
			   }
		   }
		   else if(tm.getMethodname() ==null||tm.getMethodname().contentEquals(""))
		   {
			   updatejudge.setUpdatemethod(false);
		   }
		   TestStandard tempstandard=this.getTestStandardByName(tstand.getStandardname());
		   if(tempstandard ==null)
		   {
		     this.tstandardService.addTestStandard(tstand); 
		     updatejudge.setUpdatastandard(false);
		   }
		   if(tempstandard ==null)
		   qlf.setStandardid(tstand.getId());  //插入之后才能得到相关id
		   else
			   qlf.setStandardid(tempstandard.getId()); 
		   if(tempmethod ==null)
		   qlf.setMethodid(tm.getId()); //插入之后才能得到相关id
		   else
			   qlf.setMethodid(tempmethod.getId());
		   qlf.setTestproject(tp.getLabel());//插入之后才能得到相关id
		   qlf.setMethodname(tm.getMethodname());//插入之后才能得到相关id
		   qlf.setStandardname(tstand.getStandardname());
		   if(tempproject ==null)
		   qlf.setTestprojectid( tp.getId());//插入之后才能得到相关id
		   else
			   qlf.setTestprojectid( tempproject.getId());//插入之后才能得到相关id
		   return updatejudge;
	 }
	 public void updateQualification(TestProject tp,TestMethod tm,TestStandard tstand,Qualification qlf)
	 {
		 Updataprojectmethodstandard updatejudge=setqlf( tp,  tm,  tstand,  qlf);
		   if(updatejudge.isUpdatatestproject())
		   tpmService.updatetestproject(tp);
		   if(updatejudge.isUpdatemethod()&&tm.getMethodname() !=null&&!tm.getMethodname().contentEquals(""))
		   tmService.updatetestmethod(tm); 
		   if(updatejudge.isUpdatastandard())
		   this.tstandardService.updateteststandard(tstand);
		   qualiService.updatequalification(qlf);
		   removeQualification();
	 }
	 void removeQualification()
	 {
		   EhCacheUtil.remove("LevelTestProjects");
		   EhCacheUtil.remove("qualificationcompanycategory");
		   EhCacheUtil.remove("qualificationcompany");
		   EhCacheUtil.remove("qualificationcompanycategory");
		   EhCacheUtil.remove("pidTestProjectscontain");
		   EhCacheUtil.remove("pidTestProjects");
		   EhCacheUtil.remove("TestProjects");
		   EhCacheUtil.remove("testmethod");
		   EhCacheUtil.remove("teststandard");
	 }
}

