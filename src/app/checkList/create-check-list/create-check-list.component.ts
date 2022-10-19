import { Component, OnInit, ViewChild, OnChanges, Inject, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistQuestionsComponent } from '../checklist-questions/checklist-questions.component';
import { ChecklistOptionsComponent } from '../checklist-options/checklist-options.component';



@Component({
  selector: 'app-create-check-list',
  templateUrl: './create-check-list.component.html',
  styleUrls: ['./create-check-list.component.css']
})

export class CreateCheckListComponent implements OnInit {
  mhd;
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  ListOfcheckLists: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  displayedColumns: string[];

  constructor(

    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public checkListService: CheckListService,
    public commonService: CommonService,
    private dialog: MatDialog,

  ) {
    this.getChecklists();
    this.fillDropDowns();
    this.commonService.loading=false;


  }
  ngAfterViewInit() {

  }
  fillDropDowns() {

    this.unit = [
      // { value: 1, viewValue: 'بهداشت محيط ' },
      { value: 1, viewValue: 'ايمني' },
      { value: 2, viewValue: 'محیط زیست' },
      { value: 3, viewValue: 'بهداشت حرفه ای ' },
    ];

    this.department = [
      { value: 1, viewValue: 'آهن سازی' },
      { value: 2, viewValue: 'فولاد سازی' },
      { value: 3, viewValue: 'نورد گرم' },
      { value: 4, viewValue: 'نورد سرد' },
      { value: 5, viewValue: 'انرژی سیالات' },
      { value: 6, viewValue: 'مدیریت شهری' },
      { value: 7, viewValue: 'تعمیرگاه مرکزی' },
      { value: 8, viewValue: 'حمل و نقل' },
      { value: 9, viewValue: 'کنترل مواد' },
      { value: 10, viewValue: 'تعميرات مرکزي' },
      { value: 11, viewValue: 'ستادي' },
      { value: 12, viewValue: 'خدمات عمومی' },
      { value: 13, viewValue: 'خارج از فولاد' },
    ];
  }
  ngOnInit() {
    this.newRowObj = {}
    if (this.commonService.activeUser.accessLevel == "مدیر") {
      this.displayedColumns = ['number', 'namChkHecli', 'unitCehckListsHecli', 'namDepartmentHecli', 'flgChkHecli', 'process'];
    }
    else {
      this.displayedColumns = ['number', 'namChkHecli', 'unitCehckListsHecli', 'namDepartmentHecli', 'flgChkHecli'];

    }
  }

  public getChecklists() {
    this.commonService.loading = true;
    this.checkListService.selectListOfcheckLists().subscribe((success) => {
      this.ListOfcheckLists = success
      let filteredcheckList = []
      if (this.commonService.activeUser.accessLevel != "مدیر") {

        this.ListOfcheckLists.forEach(eachcheckLists => {
          if ((eachcheckLists.unitCehckListsHecli).replace(/\s/g, "") == (this.commonService.activeUser.section).replace(/\s/g, "")) {
            filteredcheckList.push(eachcheckLists)
          }
        });
        this.ListOfcheckLists = filteredcheckList;
      }


      this.commonService.loading = false;
      console.log('ListOfcheckLists', this.ListOfcheckLists)
      this.dataSource = new MatTableDataSource(this.ListOfcheckLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.repeatGetChecklist = false

    });

  }

  public addRow() {

    let object = {
      "namChkHecli": this.newRowObj.namChkHecli,
      "unitCehckListsHecli": this.newRowObj.unitCehckListsHecli,
      "namDepartmentHecli": this.newRowObj.namDepartmentHecli,
      "flgChkHecli":Number(this.newRowObj.flgChkHecli),
      "createDate": new Date()
    }

    this.checkListService.insertListOfcheckLists(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklists();
      console.log('updateListOfcheckLists', success)
      this.newRowObj = {};
    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }
  public editRow(row) {
    row.updateDate = new Date()
    this.edit = !this.edit;
    row['editable'] = true;


  }

  public updateRow(row) {
    if(row.flgChkHecli==false){
      row.flgChkHecli=0
    }
    if(row.flgChkHecli==true){
      row.flgChkHecli=1
    }
    this.edit = !this.edit;
    this.checkListService.updateListOfcheckLists(row['eCheckListId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklists();
      console.log('updateListOfcheckLists', success)
        ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.checkListService.deleteListOfcheckLists(row['eCheckListId']).subscribe(
      (success) => {

        this.getChecklists();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

  public addQuestions(row) {
    const dialogRef = this.dialog.open(ChecklistQuestionsComponent, {
      width: "85%",
      height: "85%",
      data: {
        checkListId: row.eCheckListId,
        checkListName: row.namChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

      }
    )
  }
  public addOptions(row) {
    const dialogRef = this.dialog.open(ChecklistOptionsComponent, {
      width: "85%",
      height: "85%",
      data: {
        checkListId: row.eCheckListId,
        checkListName: row.namChkHecli,


      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row) {
    console.log(row)
    if (!this.edit) {
      this.dialogRef.close(row)
    }
  }

}