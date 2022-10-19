import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationsComponent } from 'src/app/utils/loading/locations/locations/locations.component';
import { CreateCheckListComponent } from '../create-check-list/create-check-list.component';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';
import { ChecklistQuestionService } from 'src/app/services/checklistQuestions/checklist-question.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChecklistOptionsService } from 'src/app/services/checklistOptions/checklist-options.service';
import { checklistAssesmentService } from 'src/app/services/checklistAssesmentService/checklistAssesmentService';
//import { CheckListService } from 'src/app/services/checkList/check-list.service';
import * as moment from 'jalali-moment'

@Component({
  selector: 'app-checklist-assesment',
  templateUrl: './checklist-assesment.component.html',
  styleUrls: ['./checklist-assesment.component.css']
})
export class ChecklistAssesmentComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = [];
  displayedColumns = ['number', 'desQuestionHeclq', 'options', 'desExplainQuestionHscha', 'process'];
  edit = false;
  newRowObj: any;
  checklistId: any;
  checklistName: any;
  enable: boolean = true;
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });
  // thirdFormGroup = this._formBuilder.group({
  //   thirdCtrl: ['', Validators.required]
  // });
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('topScrollAnchor') topScroll: ElementRef;
  @ViewChild('dateOfInspection') dateOfInspection: ElementRef;

  dataSource: MatTableDataSource<any>;
  stepperOrientation: Observable<StepperOrientation>;
  locationId: any;
  namLocation: any;
  desChkHecli: any;
  openQuestions = false;
  ListOfcheckListsQuestions: any;
  ListOfcheckListsOptions: any;
  firstLevel = this.fb.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
    forthCtrl: ['']
  });
  secondLevel = this.fb.group({
    radioCtrl: ['', Validators.required],
  });

  ListOfcheckListsAssesment: any;
  namLocationHsrch: any;
  namChkHecli: any;
  Validation = false;
  requestChecklistObject: any;


  department = [
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
  flgChkHecli: any;

  constructor(private fb: FormBuilder,
    public checkListQuestionService: ChecklistQuestionService,
    public checkListOptionsService: ChecklistOptionsService,
    public checkListAssesment: checklistAssesmentService,
    // public checkList:CheckListService,
    private dialog: MatDialog,
    public commonService: CommonService,
    public requestCheckListService: RequestChecklistService,
    breakpointObserver: BreakpointObserver) {

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
    this.openQuestions = false
  }


  ngOnInit(): void {
    this.newRowObj = {}


  }
  selectCheckList() {
    const dialogRef = this.dialog.open(CreateCheckListComponent, {
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

        this.checklistId = data.eCheckListId;
        this.namChkHecli = data.namChkHecli;
        this.flgChkHecli = data.flgChkHecli
        //this.namLocationHsrch = data.namLocationHsrch;
        // this.firstLevel.value.firstCtrl=data.desChkHecli
        this.firstLevel.controls['firstCtrl'].setValue(data.namChkHecli);
        // this.firstLevel = this.fb.group({
        //   firstCtrl: [data.desChkHecli, Validators.required]

        // });
        if (this.flgChkHecli != 1) {
          this.displayedColumns = ['number', 'desQuestionHeclq', 'namScoreHscha', 'desExplainQuestionHscha', 'process'];
        }

      }
    )

  }
  selectLocations() {
    {
      const dialogRef = this.dialog.open(LocationsComponent, {
        width: "80%",
        height: "80%",
        data: {
          // checkListId: row.eCheckListId,
          //  checkListName: row.desChkHecli,
        }
      });
      dialogRef.afterClosed().subscribe(
        (data) => {

          this.locationId = data.locationId;
          this.namLocation = data.namLocation;
          // this.firstLevel.value.secondCtrl=data.namLocation
          this.firstLevel.controls['secondCtrl'].setValue(data.namLocation);

          // this.firstLevel = this.fb.group({
          //   secondCtrl: [data.namLocation, Validators.required]
          // });
        }
      )
    }
  }
  addRequestChecklist() {
    // const chklist = this.firstLevel.get('firstCtrl').validator({} as AbstractControl);
    // const loc = this.firstLevel.get('secondCtrl').validator({} as AbstractControl);
    // const assesor = this.firstLevel.get('thirdCtrl').validator({} as AbstractControl);
    // if (chklist && chklist.required && chklist && chklist.required && assesor && assesor.required) {
    //   return true;
    // }

    if (!this.firstLevel.valid) {
      this.commonService.showEventMessage("لطفا همه ی فیلد های ستاره دار را تکمیل کنید.", 5000, "green")
      this.openQuestions = false
      return;

    }
    else {

      this.getChecklistOptions()
      let start = moment(this.dateOfInspection.nativeElement.value, 'jYYYY/jM/jD HH:mm:ss');
      let dateOfInspection = start.locale('en').format('YYYY/M/D HH:mm:ss');

      this.getChecklistOptions()

      this.openQuestions = true
      this.requestChecklistObject = {
        "locationIdHsrch": this.locationId,
        "namLocationHsrch": this.namLocation,
        "hecliECheckListId": this.checklistId,
        "assessorIdHsrch": this.commonService.activeUser.id,
        "namAssessorHsrch": this.commonService.activeUser.firstname + ' ' + this.commonService.activeUser.lastname,
        "requestDescriptionHsrch": this.firstLevel.value.forthCtrl,
        "namEvaluationAreaHsrch": this.firstLevel.value.thirdCtrl,
        "requestDateHsrch": new Date(dateOfInspection),
        "createDate": new Date()
      }
      console.log('addRequestChecklist', this.requestChecklistObject)


    }
  }

  public getChecklistQuestions() {
    this.commonService.loading = true;

    this.checkListQuestionService.selectListOfQuestionsOfCheckList(this.checklistId).subscribe((success) => {
      this.ListOfcheckListsQuestions = success;
      this.ListOfcheckListsOptions.forEach(eachListOfcheckListsOptions => {
       if(eachListOfcheckListsOptions.desOptionHeclo == "مطلوب") {
        let defaltOption = this.ListOfcheckListsOptions.filter(x => x.desOptionHeclo == "مطلوب")[0].eOptionId;
        this.ListOfcheckListsQuestions.forEach(eachQuestion => {
          eachQuestion['SelectedOptionId'] = defaltOption
        })
       }
      });
     
      console.log('ListOfcheckListsQuestions', this.ListOfcheckListsQuestions)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListsQuestions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {

    let object = {
      "desQuestionHeclq": this.newRowObj['desQuestionHeclq'],
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

  public getChecklistOptions() {
    this.commonService.loading = true;
    this.checkListOptionsService.selectListOfOptionsOfCheckList(this.checklistId).subscribe((success) => {
      this.getChecklistQuestions();
      this.ListOfcheckListsOptions = success;
      console.log('ListOfcheckListsOptions', this.ListOfcheckListsOptions)
      let OptionsArray = [];
      // this.ListOfcheckListsOptions.forEach(eachCheckListOption => {
      //   OptionsArray.push[eachCheckListOption['desOptionHeclo']] 
      // });
      // console.log('OptionsArray', OptionsArray)

    });
  }

  gotoStep3() {


    this.ListOfcheckListsQuestions.forEach(eachQuestion => {
      debugger
      if (eachQuestion['SelectedOptionId'] == undefined && this.flgChkHecli == 1) {
        this.commonService.showEventMessage("لطفا همه گزینه ها را تکمیل کنید", 3000, "green")
        this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.Validation = false;
      }
      else {
        this.Validation = true;
      }
    })
    if (this.Validation != false) {
      this.requestCheckListService.insertListOfRequestCheckLists(this.requestChecklistObject).subscribe((success) => {
        console.log('updateListOfcheckLists', success)
        let ResponseRequest = success
        this.ListOfcheckListsQuestions.forEach(eachQuestion => {


          let checklistAssesmentObject = {
            "hecliECheckListId": this.checklistId,
            "heclqEQuestionId": eachQuestion['eQuestionId'],
            "hecloEOptionId": eachQuestion['SelectedOptionId'],
            "hsrchERequestId": ResponseRequest['eRequestId'],
            "desExplainQuestionHscha": eachQuestion['desExplainQuestionHscha'],
            "namScoreHscha": eachQuestion['namScoreHscha'],
            "createDate": new Date()
          }


          this.checkListAssesment.insertListOfChecklistAssesment(checklistAssesmentObject).subscribe((success) => {
            this.ListOfcheckListsAssesment = success;
            console.log('ListOfcheckListsQuestions', this.ListOfcheckListsAssesment)
            // this.dataSource = new MatTableDataSource(this.ListOfcheckListsQuestions);
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
            this.commonService.loading = false;
            this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")

          });
        });



      },
        (error) => {
          this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")

        }
      )




      console.log('ListOfcheckListsOptions', this.ListOfcheckListsOptions)
      console.log('ListOfcheckListsOptions', this.ListOfcheckListsQuestions)


    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
