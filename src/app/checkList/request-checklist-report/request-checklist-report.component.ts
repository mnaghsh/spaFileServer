import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';
import { UsersService } from 'src/app/services/users/users.service';
import { SendSpechializedErgonomiToAssessorComponent } from 'src/app/specializedErgonmi/send-spechialized-ergonomi-to-assessor/send-spechialized-ergonomi-to-assessor.component';
import { UsersComponent } from 'src/app/users/users.component';
import { ChecklistReportComponent } from '../checklist-report/checklist-report.component';

@Component({
  selector: 'app-request-checklist-report',
  templateUrl: './request-checklist-report.component.html',
  styleUrls: ['./request-checklist-report.component.css']
})
export class RequestChecklistReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  displayedColumns = ['number', 'namChkHecli', 'namAssessorHsrch', 'requestDateHsrch', 'namLocationHsrch', 'namEvaluationAreaHsrch','process'];
  ListOfRequestcheckList: any;
  listAllUsers: any;
  constructor(public commonService: CommonService,
    public requestChecklistService: RequestChecklistService,
    public usersService: UsersService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getRequestChecklistQuestions()
  }
  public getRequestChecklistQuestions() {
    let usersAssignToMe = [];
    let requestsAssignToMe = []
    this.commonService.loading = true;
    this.requestChecklistService.selectAllListOfRequestCheckListsReport().subscribe((success) => {
      this.ListOfRequestcheckList = success;
      this.usersService.selectAllUsers().subscribe(
        (result) => {
          this.listAllUsers = result;

          this.listAllUsers.forEach(eachUser => {
            if (eachUser.higherPerson) {
              if ((this.commonService.activeUser.firstname + this.commonService.activeUser.lastname).replace(/\s/g, "") == (eachUser.higherPerson).replace(/\s/g, "")) {
                usersAssignToMe.push(eachUser)
              }
            }
          });
          this.ListOfRequestcheckList.forEach(eachRequestCheckList => {
            usersAssignToMe.forEach(eachUserOfMe => {
              if ((eachUserOfMe.firstname + eachUserOfMe.lastname).replace(/\s/g, "") == (eachRequestCheckList.namAssessorHsrch).replace(/\s/g, "")) {
                requestsAssignToMe.push(eachRequestCheckList)
              }
            });


          });




          console.log('usersAssignToMe', usersAssignToMe);
          console.log('requestsAssignToMe', requestsAssignToMe);
          this.ListOfRequestcheckList = requestsAssignToMe;
          this.dataSource = new MatTableDataSource(this.ListOfRequestcheckList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.commonService.loading = false;
        }

      )
      //console.log(' this.ListOfcheckListAssesment', this.ListOfRequestcheckList)

    });


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAssesment(row) {

    const dialogRef = this.dialog.open(ChecklistReportComponent, {
      width: "70%",
      height: "70%",
      direction: "rtl",
      data: {
        itsPopup: true,
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        //this.checklistId = data.eCheckListId;
        // this.namChkHecli = data.namChkHecli;
        //this.namLocationHsrch = data.namLocationHsrch;
        // this.firstLevel.value.firstCtrl=data.desChkHecli
        // this.firstLevel.controls['firstCtrl'].setValue(data.namChkHecli);
        // this.firstLevel = this.fb.group({
        //   firstCtrl: [data.desChkHecli, Validators.required]

        // });

      }
    )

  }

  sendForSpecializedErgonomics(){
    const dialogRef = this.dialog.open(SendSpechializedErgonomiToAssessorComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
       
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        //this.checklistId = data.eCheckListId;
        // this.namChkHecli = data.namChkHecli;
        //this.namLocationHsrch = data.namLocationHsrch;
        // this.firstLevel.value.firstCtrl=data.desChkHecli
        // this.firstLevel.controls['firstCtrl'].setValue(data.namChkHecli);
        // this.firstLevel = this.fb.group({
        //   firstCtrl: [data.desChkHecli, Validators.required]

        // });

      }
    )
  }


}
