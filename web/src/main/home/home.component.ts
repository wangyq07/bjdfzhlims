import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import{GlobalSaveService, testobj} from'src/services/global.storege.service';
import{transformService} from'src/services/transform.data.service';
/**
 * 首页
 *
 * @export
 * @class HomeComponent
 */
@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styleUrls:['home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements  OnInit,AfterViewInit {
  value: any;
  type:string;
  greeting:string;
  name:string;
 data=['是','否'];
    model="是";
  constructor(private router: Router,private activatedRoute: ActivatedRoute
    ,private globalservice:GlobalSaveService,private transserve:transformService) {
     
  }
  _data:any;
  ngAfterViewInit(): void {
    const $qus = this.activatedRoute.params.subscribe(q => {
      const key = q.key;
      if (key) {
      this._data = this.globalservice.getObject(key) ;
      this.globalservice.setObject(key,null);
      setTimeout(() => {
       window.print();
       history.go(-1);
      }, 1000);
      }
     });
  }
  ngOnInit(): void {
    //this.transserve.currentMessage.subscribe(this.customerchange);
  }
  customerchange(msg:testobj)
  {
    //console.log(msg);
  }
  ch_click(parentobject:string,checkobject:string)
  {
   var parentobj= document.getElementById(parentobject); 
    var checkobj=document.getElementById(checkobject) as HTMLInputElement; 
    if(parentobj!=null&&checkobj!=null
        &&checkobj.checked
       //&&checkobj.getAttribute("checked")=="checked"
    )
    {
      for(var i=0;i<parentobj.childNodes.length;i++)
      this.recurseinputnode(parentobj.childNodes[i] as HTMLElement,checkobject);
      
    }
  }
  recurseinputnode(obj:HTMLElement,currentid:string)
  {
    if(obj !=null)
    {
      var pandingobj=  obj as HTMLInputElement;
       if(pandingobj !=null
          &&pandingobj.type=="checkbox"
          &&pandingobj.checked
          &&pandingobj.id !=currentid
          )
       {
         pandingobj.checked=false;
       }  
        
         for(var i=0;i<obj.childNodes.length;i++)
         this.recurseinputnode(obj.childNodes[i] as HTMLElement,currentid);
      }
  }
  selchange(obj:any)
  {
    //console.log(obj);
  }
     
  print(selprintobj:string)
  {
   
      const obj = document.getElementById(selprintobj) as HTMLDivElement; 
      /*this.globalservice.set(key,obj.innerHTML);
        var key=this.JsNewGuid();
      this.router.navigate( [`./${key}`],{relativeTo: this.activatedRoute});*/
      
      var oldelements=obj.getElementsByTagName("input");
      var datej=document.getElementById("seldate") as HTMLInputElement;
      var newWindow=window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0') as Window;
      var docStr = obj.innerHTML;
       ////console.log(document.getElementsByTagName("style"));
      
      newWindow.document.write(docStr);
      //newWindow.document.head.innerHTML=document.head.innerHTML;
       newWindow.document.body.className=document.body.className;
      var newelements= newWindow.document.getElementsByTagName("input");
      var dateobjs=newWindow.document.getElementsByTagName("x-date-picker");
      for(var i=0;i<oldelements.length;i++)
      {
        newelements[i].style.borderWidth="0";
        if(oldelements[i].type=="text")
        newelements[i].value=oldelements[i].value;
        else if(oldelements[i].type=="checkbox")
        {
          newelements[i].checked=oldelements[i].checked;
        }
      }
    
        if(dateobjs !=null)
        {
        for(var j=0;j<dateobjs.length;j++)
        {
        var dateobj=dateobjs[j];
        if(dateobj !=null)
        {
        var icons=dateobj.getElementsByTagName("x-icon");
         
        for(var i=0;i<icons.length;i++)
        { 
             var disp=icons[i] as HTMLElement;
               if(disp !=null)
                disp.style.display="none";
        }
      }
      }
      }
      
        
      newWindow.document.close();
      
		  newWindow.print();
		  newWindow.close();
  }
  weituoclick(type:string)
  { 
    var id=this.JsNewGuid(); 
    this.router.navigate([`./${type}/${id}`],{relativeTo: this.activatedRoute});  
  }
  JsNewGuid() {
    var curguid = "";
    for (var i = 1; i <= 32; i++) {
        var id = Math.floor(Math.random() * 16.0).toString(16);
        curguid += id;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            curguid += "-";
    }
    return curguid;
}
 
}
