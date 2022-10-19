import { Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'jalali-moment'
import { CommonService } from 'src/app/services/common.service';
import { evaluationDiscrepanciesReportsService } from 'src/app/services/evaluationDiscrepanciesReports/evaluationDiscrepanciesReports.service';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { UsersComponent } from 'src/app/users/users.component';
import { LocationsComponent } from 'src/app/utils/loading/locations/locations/locations.component';

@Component({
  selector: 'app-evaluationDiscrepanciesReport',
  templateUrl: './evaluationDiscrepanciesReportByLocation.component.html',
  styleUrls: ['./evaluationDiscrepanciesReportByLocation.component.css']
})
export class EvaluationDiscrepanciesReportByLocationComponent implements OnInit {

  unit = [
    { value: 1, viewValue: 'هفتگی' },
    { value: 2, viewValue: 'ماهانه' },
    { value: 3, viewValue: 'سالانه' },
    { value: 4, viewValue: 'روزانه' }
  ]

  displayedColumns = ['number', 'NAM_LOCATION_HSRCH', 'PreviouslyEvaluated', 'NumberOfDuties', 'NAM_PERIOD_HSRCH'];
  listOfAllSchedulings: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  newRowObj: any;
  edit = false;
  enable: boolean = true;
  requests: any;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  schedules: any;
  period: { value: number; viewValue: string; }[];
  selectedPeriod;
  dateMinusYear: moment.Moment;
  dateMinusMonth: moment.Moment;
  dateMinusWeek: Date;



  constructor(public commonService: CommonService,
    public evaluationDiscrepancies: evaluationDiscrepanciesReportsService,
    private dialog: MatDialog,
    public requestChecklist: RequestChecklistService,
    public SchedulingService: SchedulingService,

  ) { }

  ngOnInit(): void {
    this.newRowObj = {}

    this.period = [
      { value: 1, viewValue: 'هفتگی' },
      { value: 2, viewValue: 'ماهانه' },
      { value: 3, viewValue: 'سالانه' },
      { value: 4, viewValue: 'تاریخ انتخابی' },
    ];


  }
  getAllSchedules() {

    if (this.selectedPeriod != 4) {
      this.commonService.loading = true;
      let body = {
        "period": this.selectedPeriod.toString(),
      }
      // this.evaluationDiscrepancies.selectEvaluationDiscrepanciesReports(this.selectedPeriod).subscribe(
      this.evaluationDiscrepancies.filterEvaluationDiscrepanciesReportsByLocation(body).subscribe(

        (success) => {
          this.dataSource = new MatTableDataSource(success);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.commonService.loading = false;

        })
    }
    else {

      debugger

      let start = moment(this.startDate.nativeElement.value, 'jYYYY/jM/jD');
      let startDate = start.locale('en').format('YYYY/M/D');
      let end = moment(this.endDate.nativeElement.value, 'jYYYY/jM/jD');
      let endDate = end.locale('en').format('YYYY/M/D');
      this.commonService.loading = true;
      let body = {
        "fromDate": (this.startDate.nativeElement.value).toString(),
        "toDate": (this.endDate.nativeElement.value).toString(),
        "period": this.selectedPeriod.toString(),
      }
      // this.evaluationDiscrepancies.selectEvaluationDiscrepanciesReportsByDate((this.startDate.nativeElement.value).toString(), (this.endDate.nativeElement.value).toString(), this.selectedPeriod).subscribe(
      this.evaluationDiscrepancies.filterEvaluationDiscrepanciesReportsByLocation(body).subscribe(

        (success) => {

          this.dataSource = new MatTableDataSource(success);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.commonService.loading = false;

        })
    }

    // this.dateMinusWeek=  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    //   this.dateMinusMonth = moment(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');
    // this.dateMinusYear = moment(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');

    //     switch (this.selectedPeriod) {
    //       case 1:
    //         this.evaluationDiscrepancies.selectEvaluationDiscrepanciesReports(Date.now(), this.selectedPeriod).subscribe(
    //         // this.evaluationDiscrepancies.selectEvaluationDiscrepanciesReports(moment(time.toString()), this.selectedPeriod).subscribe(

    //           (success) => { 


    //           })
    //         break;
    //       case 2:
    //         this.evaluationDiscrepancies.selectEvaluationDiscrepanciesReports(this.dateMinusWeek, this.selectedPeriod).subscribe(

    //           (success) => { 
    // console.log('ggggg',success)

    //           })
    //         break;
    //       case 3:

    //         break;
    //       case 4:
    //         let start = moment(this.startDate.nativeElement.value, 'jYYYY/jMM/jDD');
    //         let end = moment(this.endDate.nativeElement.value, 'jYYYY/jMM/jDD');

    //         break;

    //       default:


    //         break;

    //     }

  }

  // public oldGetAllSchedules() {
  //   console.log('getAllSchedules')

  //   let assessmentDid = []
  //   let filteredRequests = []
  //   let obj = []
  //   this.commonService.loading = true;
  //   this.requestChecklist.selectAllListOfRequestCheckLists().subscribe((success) => {
  //     this.requests = success;
  //     this.evaluationDiscrepancies.selectEvaluationDiscrepanciesReports('2022-04-02').subscribe((success) => {
  //       this.schedules = success
  //       this.schedules.forEach(item1 => {

  //         this.requests.forEach(item2 => {

  //           let requestDateHsrch = moment(item2.requestDateHsrch, 'YYYY/MM/DD');
  //           let dateMinusWeek = moment(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');
  //           let dateMinusMonth = moment(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');
  //           let dateMinusYear = moment(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');

  //           switch (this.selectedPeriod) {
  //             case 1:
  //               if (requestDateHsrch > dateMinusWeek) {
  //                 filteredRequests.push(item2)
  //                 this.requests = filteredRequests
  //                 if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
  //                   this.requests = this.requests.filter((value, index, self) =>
  //                     index === self.findIndex((t) => (
  //                       t.eRequestId === value.eRequestId
  //                     ))
  //                   )

  //                   assessmentDid = [...assessmentDid, ...this.requests];

  //                   assessmentDid = assessmentDid.filter((value, index, self) =>
  //                   index === self.findIndex((t) => (
  //                     t.eRequestId === value.eRequestId
  //                   ))
  //                 )
  //                 }

  //               }

  //               break;
  //             case 2:
  //               if (requestDateHsrch > dateMinusMonth) {
  //                 filteredRequests.push(item2)
  //                 this.requests = filteredRequests
  //                 if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
  //                   this.requests = this.requests.filter((value, index, self) =>
  //                     index === self.findIndex((t) => (
  //                       t.eRequestId === value.eRequestId
  //                     ))
  //                   )
  //                   assessmentDid = [...assessmentDid, ...this.requests];


  //                 }

  //               }
  //               break;
  //             case 3:
  //               if (requestDateHsrch > dateMinusYear) {
  //                 filteredRequests.push(item2)
  //                 this.requests = filteredRequests
  //                 if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
  //                   this.requests = this.requests.filter((value, index, self) =>
  //                     index === self.findIndex((t) => (
  //                       t.eRequestId === value.eRequestId
  //                     ))
  //                   )
  //                   assessmentDid.push(this.requests)
  //                 }

  //               }
  //               break;
  //             case 4:
  //               let start = moment(this.startDate.nativeElement.value, 'jYYYY/jMM/jDD');
  //               let end = moment(this.endDate.nativeElement.value, 'jYYYY/jMM/jDD');
  //               if (requestDateHsrch >= start && requestDateHsrch <= end) {
  //                 filteredRequests.push(item2)
  //                 this.requests = filteredRequests
  //                 if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
  //                   this.requests = this.requests.filter((value, index, self) =>
  //                     index === self.findIndex((t) => (
  //                       t.eRequestId === value.eRequestId
  //                     ))
  //                   )
  //                   assessmentDid.push(this.requests)
  //                 }

  //               }
  //               break;

  //             default:


  //               break;

  //           }

  //         });
  //         assessmentDid = assessmentDid.filter((value, index, self) =>
  //                   index === self.findIndex((t) => (
  //                     t.eRequestId === value.eRequestId
  //                   ))
  //                 )
  //         if (this.selectedPeriod == item1.numPeriodHsrch && this.selectedPeriod != 4) {
  //           obj.push({
  //             namAssessorHsrch: item1.namAssessorHsrch,
  //             assessmentDid: assessmentDid.length,
  //             numberOfDuties: item1.numberOfDuties,
  //             namPeriodHsrch: item1.namPeriodHsrch

  //           })
  //         }
  //         if (this.selectedPeriod == 4) {
  //           obj.push({
  //             namAssessorHsrch: item1.namAssessorHsrch,
  //             assessmentDid: assessmentDid.length,
  //             numberOfDuties: item1.numberOfDuties,
  //             namPeriodHsrch: item1.namPeriodHsrch

  //           })
  //         }

  //         this.dataSource = new MatTableDataSource(obj);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         this.commonService.loading = false;
  //       });
  //     })
  //   })
  // }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAssessor() {

    const dialogRef = this.dialog.open(UsersComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
        // checkListId: row.eCheckListId,
        //  checkListName: row.desChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        this.newRowObj.assessorId = data.id;
        this.newRowObj.namAssessorHsrch = data.firstname + ' ' + data.lastname;
        // this.firstLevel.controls['firstCtrl'].setValue(data.namChkHecli);
      }
    )

  }



}
