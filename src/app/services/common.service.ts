import { Injectable, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from "xlsx";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  teachers: any[];
  @Output() saveTotalMainGrid = new EventEmitter();

  // public saveTotalMainGrid: Subject<any> = new Subject<any>();
  public showSaveBtn: boolean;
  public showSaveBtnTotal: boolean;
  public rollback: Subject<any> = new Subject<any>();
  loading: boolean;
  coursesList;
  teacherList;
  usersList;
  categoryList;
  reportUserId: any;
  termId;
  usersWithCourse;
  onlineUserDepartmentId;
  showTotalValueTable = true;
  activeUser: any;
  termName: any;
  allPersonsList;
  nameOfSelectedTeacher: any;
  userDetails: any;
  userDetailInfo: any;
  reportUserName: any;
  ListOfcheckLists: any;
  selctedDateForWorkBook;
  repeatGetChecklist: boolean;
  fullName="محمد نقش"
  selectedZoneObj: any;
  constructor(private snackBar: MatSnackBar,) { }
  showEventMessage(message, duration = 3000, type?) {

    this.snackBar.open(message, '', {
      direction: 'rtl',
      duration: duration,
      panelClass: type ? type : 'background-color:red!important'
    });
  }
  exportToExcel(tableId: string, name?: string) {
    let myDate = new Date().toLocaleDateString('fa-IR');
    //let timeSpan = new Date().toISOString();
    let prefix = name || "گزارش چک لیست ";
    let fileName = `${prefix}-${myDate}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  exportTable() {
    this.exportToExcel("mainTable");
  }
  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById('print-section').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>پرینت قرارداد </title>
  //         <style>
  //         *{
  //            direction:rtl;
  //            font-family: 'b mitra'!important; 
  //            text-align: right;
  //          }
  //          td{
               
  //            border: 0px solid gray;
  //            border-left: 1px solid gray;
  //            border-bottom: 1px solid gray;
  //            font-size: medium;
            
  //          }
         
  //          .table-striped tbody tr:nth-of-type(odd) {
  //            background-color: rgba(0,0,0,.05);
  //        }
  //       .headerGridTotal{
  //        font-size: medium !important;
  //       }
  //       .gridTotal{
  //        width:100%;
  //       }
          
  //          .mat-sort-header-button{
  //            border-bottom: 1px solid gray;
  //            font-size: medium;
  //            background-color: white;
  //            border: 0px solid gray;
  //            text-align: center;
  //          }
          
  //        //........Customized style.......
  //        </style>
  //       </head>
  //   <body onload="window.print();window.close()">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();
  // }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>کارنامه محیط زیست</title>
            <style>
            *{
               direction:rtl;
               font-family: 'b mitra'!important; 
               text-align: right;
             }
        th{
          background-color:#4285f4;
          border: 0px solid gray;
          border: 1px solid gray;
          border: 1px solid gray;
          font-size: medium;
      
        }
        
        .titleOfWorkBook{
          background-color:#ea4335;
          color:white;          
      }
             td{
                 
               border: 0px solid gray;
               border: 1px solid gray;
               border: 1px solid gray;
               font-size: medium;
              
             }
           
             .table-striped tbody tr:nth-of-type(odd) {
               background-color: rgba(0,0,0,.05);
           }
  
          .headerGridTotal{
           font-size: medium !important;
          }
          .gridTotal{
           width:100%;
          }
            
             .mat-sort-header-button{
               border-bottom: 1px solid gray;
               font-size: medium;
               background-color: white;
               border: 0px solid gray;
               text-align: center;
             }
            
           //........Customized style.......
           </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();
  }
}
