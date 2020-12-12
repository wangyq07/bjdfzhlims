import { Component, DoCheck, OnInit,OnChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, KeyValueDiffers } from '@angular/core';
import { XFormComponent, XControl } from '@ng-nest/ui/form';
import { SettingService } from 'src/services/setting.service';
import {  Action,ActionsService, Menu } from '../menus.service';
import { NavService } from 'src/services/nav.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { XMessageService } from '@ng-nest/ui/message';
import { Observable } from 'rxjs';
 
import { style } from '@angular/animations';

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrls:['./action-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionDetailComponent implements OnInit,DoCheck {
  id: string | null;
  type: string | null;
  menuId: string | null;
  editactions = ['查看','新增','修改','删除'];
   selectchange(selid:string)
   {
       //console.log(document.getElementById(selid));
      /*var obj= document.getElementById(selid) as HTMLSelectElement;
      if(obj !=null&&obj.selectedIndex !=-1)
      {
        alert(obj.selectedOptions[obj.selectedIndex].value);
      }*/
   }
   currenteditactions= new EditAction() ;
  model:any;
  oldmodel:any;
  controls: XControl[] = [
    { control: 'input', id: 'name', label: '名称', required: true },
    { control: 'input', id: 'code', label: '编码', required: true },
    { control: 'input', id: 'icon', label: '图标' },
    { control: 'input', id: 'sort', label: '顺序' },
    { control: 'input', id: 'id', hidden: true, value: this.setting.guid() },
    { control: 'input', id: 'menuId', hidden: true }
  ];

  @ViewChild('form') form: XFormComponent;

  get formInvalid() {
    return this.form?.formGroup?.invalid;
  }

  get disabled() {
    return this.type === 'info';
  }
   issel:boolean;
  constructor(
    private service: ActionsService,
    private setting: SettingService,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private nav: NavService,
    private cdr: ChangeDetectorRef 
  ) {
    this.activatedRoute.paramMap.subscribe((x: ParamMap) => {
      //console.log(x);
      this.id = x.get('id');
      this.type = x.get('type');
      this.menuId = x.get('menuId');
      if (this.menuId) {
        (this.controls.find((x) => x.id === 'menuId') as XControl).value = this.menuId;
      }
    });
    
  }
  ngDoCheck(): void {
      if(this.model!=this.oldmodel)
      {

        ////console.log(this.model);
        this.oldmodel=this.model;
        this.modelchange();
      }
  }
   modelchange()
   {
       if(this.issel)
       {
          var ee= this.currenteditactions.getactionbykey(this.model);
          ee.menuId=this.menuId||"";
          this.form.formGroup.patchValue(ee);
       } 
   }

  ngOnInit() {
     this.action(this.type);
     
    
  }

  ngAfterViewInit() {
    var selectobj= document.getElementById("seldata") as HTMLElement ;
    this.issel=false; 
    if(this.type=="add")
     {
        selectobj.style.display="block";
        selectobj.style.width="130px";
       this.issel=true;
     }
    this.cdr.detectChanges(); 
  }
  
  action(type: string | null) {
    switch (type) {
      case 'info':
        this.service.get(this.id as string).subscribe((x) => {
          this.form.formGroup.patchValue(x);
        });
        break;
      case 'edit':
        this.action('info');
        break;
      case 'save':
        if (this.type === 'add') {
          this.service.post(this.setForm(this.form.formGroup.value)).subscribe((x) => {
            this.message.success('新增成功！');
            this.nav.back(true);
          });
        } else if (this.type === 'edit') {
          this.service.put(this.setForm(this.form.formGroup.value)).subscribe((x) => {
            this.message.success('修改成功！');
            this.nav.back(true);
          });
        }
        break;
      case 'cancel':
        this.nav.back();
        break;
    }
  }

  setForm(value: any) {
    return value;
  }
}
export class EditAction
{
   
  getactionbykey(key:string): Action
  {
         var e={};
         switch(key)
         {
           case "查看":
            e= {name:"查看",
              sort:"1",
              code:"info",
              icon:"fto-eye"
         }
             break;
             case "新增":
              e= {name:"新增",
              sort:"2",
              code:"add",
              icon:"fto-plus"
              } 
             break;
             case "修改":
              e= {name:"修改",
              sort:"3",
              code:"edit",
              icon:"fto-edit"
              } 
             break;
             case "删除":
              e= {name:"删除",
              sort:"4",
              code:"delete",
              icon:"fto-trash-2"
              } 
             break;
             default:
               break;
         }
         return e;    
  }
   
     
}
