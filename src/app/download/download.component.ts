import { Component, OnInit, ViewChild, OnChanges, Inject, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadService } from '../services/download/download.service';
import { stringify } from 'querystring';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})

export class DownloadComponent implements OnInit {
  mhd;
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  ListOfFiles: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  displayedColumns: string[];
  listOfFiles: any;

  constructor(

    public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    //public Fileservice: Fileservice,
    public downloadService: DownloadService,
    public commonService: CommonService,
    private dialog: MatDialog,

  ) {
    this.getList();
    //this.fillDropDowns();
  //  this.commonService.loading = false;


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

    this.displayedColumns = ['number', 'name', 'size', 'process'];

  }

  public getList() {
    this.commonService.loading = true;
    this.downloadService.getListOfFilesWithUserId(this.commonService.userId).subscribe((success) => {
      this.ListOfFiles = success
     this.commonService.loading = false;
      console.log('ListOfFiles', this.ListOfFiles)

      this.dataSource = new MatTableDataSource(this.ListOfFiles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.repeatGetChecklist = false

    });

  }
  downloadFile(row) {
this.downloadService.downloadFileWithUserIdAndFilename(row.name, this.commonService.userId.toString()).subscribe(success => {
  debugger;
  const a = document.createElement('a')
  const objectUrl = URL.createObjectURL(success)
  a.href = objectUrl
  a.download = row.name;
  a.click();
  URL.revokeObjectURL(objectUrl);
  this.commonService.loading = false
},(blob)=>{
  debugger;
  const a = document.createElement('a')
  const objectUrl = URL.createObjectURL(blob)
  a.href = objectUrl
  a.download = row.name;
  a.click();
  URL.revokeObjectURL(objectUrl);
  this.commonService.loading = false
}

)
  }




  public addRow() {

    let object = {
      "namChkHecli": this.newRowObj.namChkHecli,
      "unitCehckListsHecli": this.newRowObj.unitCehckListsHecli,
      "namDepartmentHecli": this.newRowObj.namDepartmentHecli,
      "flgChkHecli": Number(this.newRowObj.flgChkHecli),
      "createDate": new Date()
    }

    this.downloadService.getListOfFilesWithUserId(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getList();
      console.log('updateListOfFiles', success)
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
    if (row.flgChkHecli == false) {
      row.flgChkHecli = 0
    }
    if (row.flgChkHecli == true) {
      row.flgChkHecli = 1
    }
    this.edit = !this.edit;
    this.downloadService.getListOfFilesWithUserId(row['eCheckListId']).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getList();
      console.log('updateListOfFiles', success)
        ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {
debugger
    console.log('del', row)
    this.downloadService.deleteFileWithUserIdAndFilename(row.name, this.commonService.userId.toString()).subscribe(
      (success) => {

        this.getList();
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
  }
  public addOptions(row) {
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