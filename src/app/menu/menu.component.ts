import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CheckListService } from '../services/checkList/check-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navBarItem: { label: string; path: string; icon: string; }[];
  rightMenu: { label: string; path: string; icon: string; }[];
  adminMenu: { label: string; path: string; icon: string; }[];
  evaluationDiscrepanciesReport: { label: string; path: string; icon: string; }[];
  foodInspection: { label: string; path: string; icon: string; }[];


  constructor(private auth: AuthenticationService,
    public commonService: CommonService,
    public checkListService: CheckListService,
    private myRoute: Router) {
    //this.onlineUser = this.commonService.activeUser[0].type
  }
  

  ngOnInit() {
    //this.myRoute.navigate(['fileUpload']);
    this.navBarItem = [
      // { label: ' صفحه اصلی', path: "/home", icon: "fa fa-home" },
      { label: 'آپلود و دانلود فایل', path: "/fileUpload", icon: "fa fa-pencil" },
      //{ label: 'دانلود فایل ', path: "/checklistAssesment", icon: "fa fa-print" },
      // { label: 'چاپ گزارش', path: "/checklistReport", icon: "fa fa-newspaper-o" },
      // { label: 'برنامه زمانبندی', path: "/scheduling", icon: "fa fa-calendar" },
      { label: 'خروج', path: "/login", icon: "fa fa-sign-out" },

    ];

  }
  logout() {
    this.auth.wasLoggedOut();
    this.myRoute.navigate(['login']);
  }

  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.address = '';
  }
  uploadFinished = (event) => { 
    this.response = event; 
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:5001/${serverPath}`; 
  }
  isCreate: boolean;
  name: string;
  address: string;
  response: any;




}