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



@Component({
  selector: 'app-checklist-questions',
  templateUrl: './checklist-questions.component.html',
  styleUrls: ['./checklist-questions.component.css']
})

export class ChecklistQuestionsComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'desQuestionHeclq', 'process'];
  ListOfcheckListsQuestions: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  checklistId: any;
  checklistName: any;
 
  constructor(
    public checkListQuestionService: ChecklistQuestionService,
    public commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public recievedData
  ) {
    this.checklistId = recievedData.checkListId
    this.checklistName = recievedData.checkListName
    this.getChecklistQuestions();
 
  }

  ngOnInit() {
    this.newRowObj = {}
  }


  public getChecklistQuestions() {
    this.commonService.repeatGetChecklist = true
    this.commonService.loading = true;
    this.checkListQuestionService.selectListOfQuestionsOfCheckList(this.checklistId).subscribe((success) => {
      this.ListOfcheckListsQuestions = success;
      console.log('ListOfcheckListsQuestions', this.ListOfcheckListsQuestions)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListsQuestions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {

    let object = {
      "desQuestionHeclq": this.newRowObj.desQuestionHeclq,
      "hecliECheckListId": this.checklistId,
      "createDate": new Date()
    }

    this.checkListQuestionService.insertListOfcheckListsQuestions(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklistQuestions();
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
    this.checkListQuestionService.updateListOfcheckListsQuestions(row['eQuestionId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklistQuestions();
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
    this.checkListQuestionService.deleteListOfcheckListsQuestions(row['eQuestionId']).subscribe(
      (success) => {

        this.getChecklistQuestions();
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