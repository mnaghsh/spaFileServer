import { Component, OnInit, ViewChild, OnChanges, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistQuestionService } from 'src/app/services/checklistQuestions/checklist-question.service';
import { ChecklistOptionsService } from 'src/app/services/checklistOptions/checklist-options.service';



@Component({
  selector: 'app-checklist-options',
  templateUrl: './checklist-options.component.html',
  styleUrls: ['./checklist-options.component.css']
})

export class ChecklistOptionsComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'desOptionHeclo', 'process'];
  ListOfcheckListsOptions: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  checklistId: any;
  checklistName: any;

  constructor(
    public checkListOptionsService: ChecklistOptionsService,
    public commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public recievedData
  ) {
    this.checklistId = recievedData.checkListId
    this.checklistName = recievedData.checkListName
    this.getChecklistOptions();

  }

  ngOnInit() {
    this.newRowObj = {}
  }

  public getChecklistOptions() {
    this.commonService.loading = true;
    this.checkListOptionsService.selectListOfOptionsOfCheckList(this.checklistId).subscribe((success) => {
      this.ListOfcheckListsOptions = success;
      console.log('ListOfcheckListsOptions', this.ListOfcheckListsOptions)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListsOptions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {
    
    let object = {
      "desOptionHeclo": this.newRowObj.desOptionHeclo,
      "hecliECheckListId": this.checklistId,
      "createDate": new Date()
    }

    this.checkListOptionsService.insertListOfcheckListsOptions(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklistOptions();
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
    this.edit = !this.edit;
    this.checkListOptionsService.updateListOfcheckListsOptions(row['eOptionId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklistOptions();
      console.log('updateListOfcheckListsQuestions', success)
        ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.checkListOptionsService.deleteListOfcheckListsOptions(row['eOptionId']).subscribe(
      (success) => {

        this.getChecklistOptions();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
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
}