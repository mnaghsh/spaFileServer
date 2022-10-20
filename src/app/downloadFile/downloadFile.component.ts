import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DownloadFileService } from 'src/app/services/downloadFile/downloadFileService';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from '../services/config.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-downloadFile',
  templateUrl: './downloadFile.component.html',
  styleUrls: ['./downloadFile.component.scss']
})
export class DownloadFileComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  SERVER_URL = this.configService.baseUrl + "/downloadFile";
  fullName = "انتخاب استاد"
  userDetails: any;
  userId: any;
  firstName: any;
  lastName: any;
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<any>; columns: any[];
  showCourseValueTable: boolean;
  saateTashkilNashode: any;
  listOfFiles: any;
  reRenderTotalGridReadOnly: any;



  constructor(
    private configService: ConfigService,
    public commonService: CommonService,
    //public teacherService: TeacherService,
    public DownloadFileService: DownloadFileService,
   // public teacherDetail: TeacherDetailService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    //debugger
    this.userId = data.userId
    this.fullName = data.fullName

  }
  ngOnInit() {
    //debugger
  //  this.onSubmit("emza.jpeg")
    this.getListOfFiles()
  }


  public btnChooseTeacher() {


    //this.newRowObj = {};
    this.reRenderTotalGridReadOnly = false
    // const dialogRef = this.dialog.open(TeacherComponent, {
    //   width: "85%",
    //   height: "85%",
    //   data: {
    //     //field: field,
    //   }
    // });
    // dialogRef.afterClosed().subscribe(
    //   (data) => {
    //     if (data) {
    //       this.reRenderTotalGridReadOnly = true;
    //       console.log('userDetails', data)
    //       this.userDetails = undefined;
    //       this.userDetails = data;
    //       this.userId = data.id;
    //       this.fullName = data.fullName;
    //       this.firstName = data.firstName;
    //       this.lastName = data.lastName;
    //       this.getListOfFiles()
    //       this.dataSource = null;
    //       this.columns = [];
    //       this.showCourseValueTable = true
    //       this.commonService.reportUserId = this.userId;
    //     }
    //   }
    // )
  }

  public getListOfFiles() {
    this.DownloadFileService.getList(this.userId).subscribe(
      (success) => {
        console.log('this.listOfFiles1', this.listOfFiles);

        this.listOfFiles = JSON.parse(success)
        console.log('this.listOfFiles2', this.listOfFiles);

        this.listOfFiles = this.listOfFiles.map((value, index) => {
          return {
            id: index + 1,
            name: value
          };
        })

        console.log('this.listOfFiles3', this.listOfFiles);
        let result = this.listOfFiles
        this.dataSource = new MatTableDataSource(this.listOfFiles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    )
  }


  onSubmit(selectedFileName) {
    let body = {
      userId: this.userId,
      fileName: selectedFileName
    }
    this.commonService.loading = true
    this.DownloadFileService
      .download('downloadFile', body)
      .subscribe(blob => {
        //debugger;
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = selectedFileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.commonService.loading = false
      })

  }



 




}
