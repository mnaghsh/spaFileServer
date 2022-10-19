
import * as moment from 'jalali-moment'
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { workbookReportService } from '../services/workbookReport/workbookReportService';
import { ZonesComponent } from '../utils/zones/zones.component';
import { LocationsOfZonesService } from '../services/locationsOfZones/locationsOfZonesService';
import { checklistAssesmentService } from '../services/checklistAssesmentService/checklistAssesmentService';
import { JalaliPipe } from 'src/pipes/jalali.pipe';
import { LocationsComponent } from '../utils/loading/locations/locations/locations.component';
import { Observable, Subject } from 'rxjs';
import { ZonesService } from '../services/zones/zones.service';

@Component({
  selector: 'app-workbook-report',
  templateUrl: './workbook-report.component.html',
  styleUrls: ['./workbook-report.component.css']
})
export class WorkbookReportComponent implements OnInit {

  displayedColumns = ['number', 'des_lkp_typ_exit',
    'des_lkp_typ_exam', 'des_request_hemre', 'num_request_hemre', 'dat_request_hemre_jalali',
    'nam_location_hsloc', 's_location_id', 'nam_param_hemop', 'nam_measur_hemrp', 'nam_real_measur_hemrp', 'flg_abssence'];
  displayedColumnsMeasurement = ['number', 'des_lkp_typ_exit',
    'des_lkp_typ_exam', 'des_request_hemre', 'num_request_hemre', 'dat_request_hemre_jalali',
    'nam_location_hsloc', 's_location_id', 'nam_param_hemop', 'nam_measur_hemrp', 'nam_real_measur_hemrp', 'flg_abssence'];
  displayedColumnsReportindustrialWastePerUnit = ['number', 'ratio', 'nam_location_hsloc', 'average', 'score'
    , 'coefficientCalculation'];
  displayedColumnsCheckListReportPerUnit = ['number', 'ratio', 'nam_location_hsloc', 'average', 'score'
    , 'coefficientCalculation'];
  displayedColumnsAverageMonthlyUnit = ['number', 'loc', 'value'];
  displayedColumnsChecklistReport = ['number', 'namChkHecli', 'requestDescriptionHsrch',
    'desQuestionHeclq', 'desOptionHeclo', 'desExplainQuestionHscha', 'requestDateJalaliHsrch',
    'namAssessorHsrch', 'namLocationHsrch', 'unitCehckListsHecli', 'namDepartmentHecli', 'namEvaluationAreaHsrch'];
  displayedColumnsZoneWithoutMeasurement = ['type', 'ratio', 'percentAvg', 'scoreZone', 'coefficientCalculationZone'];
  displayedColumnsConfilicts = ['number', 'entityNumber', 'dat_Date', 'receiverName', 'contradiction1', 'contradiction2', 'ustr_KomiteName', 'str_MoghayeratDescA'];
  displayedNrtReport = ['number', 'nam_sample', 'dat', 'nam_farsi_test', 'nam_latin_test', 'res', 'lo', 'hi', 'in_range'];
  displayedColumnsWasteReport = ['number', 'dat_request_hemre_jalali', 'nam_measur_hemrp', 's_location_id', 'nam_location_hsloc'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>
  dataSourceReportindustrialWastePerUnit: MatTableDataSource<any>
  dataSourceChecklistReportPerUnit: MatTableDataSource<any>
  dataSourceChecklistReport: MatTableDataSource<any>
  selectedDate: any
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  listOfWorkbookReport: any;
  filterZoneId: any;
  listLocationsOfZones: any;
  fullListOfWorkbookReport: any;
  counts: any;
  percentage: any;
  buildAvgOfUnits: any;
  listOfcheckListReport: any;
  fullListOfcheckListReport: any;
  department = [
    { value: "01", viewValue: 'فروردین' },
    { value: "02", viewValue: 'اردیبهشت' },
    { value: "03", viewValue: 'خرداد' },
    { value: "04", viewValue: 'تیر' },
    { value: "05", viewValue: 'مرداد' },
    { value: "06", viewValue: 'شهریور' },
    { value: "07", viewValue: 'مهر' },
    { value: "08", viewValue: 'آبان' },
    { value: "09", viewValue: 'آذر' },
    { value: "10", viewValue: 'دي' },
    { value: "11", viewValue: 'بهمن' },
    { value: "12", viewValue: 'اسفند' },
  ];
  m: moment.Moment;
  selectedZoneName: any;
  averagesOfNam_measur_hemrp: any;
  averagesOfCheckListReport: any;
  averageMonthlyUnit: any;
  dataSourceAverageMonthlyUnit: MatTableDataSource<unknown>;
  zoneWithoutMeasurement: any;
  zoneWithoutMeasurementIndustrialWaste: any;
  zoneWithoutMeasurementIndustrialCleaning: any[];
  dataSourceZoneWithoutMeasurement: MatTableDataSource<unknown>;
  listOfConfilicts: any;
  dataSourceConfilicts: MatTableDataSource<unknown>;
  selectedZoneCharacteristic: any;
  countAllOfConfilicts: any;
  AllOfConfilictsOfThisZone: any;
  zoneWithoutMeasurementConfilicts: any;
  weakPoint = "";
  fullListOfMeasurement: any[] = [];
  dataSourceReportMeasurement: MatTableDataSource<unknown>;
  locationId: any;
  zoneWithMeasurement: any;
  zoneLocationCharacteristic: any;
  listOfGasMeasurement: any;
  listOfDustMeasurement: any;
  listOfWaterMeasurement: any;
  fullListOfNrtReport: any;
  dataSourceNrtReport: MatTableDataSource<any>;
  nrtResult: number;
  measurementResult: number;
  measurementLength: number;
  measurementPercentAvg: number;
  measurmentRatio: number;
  ZoneId: any;
  countsStarNrt: any;
  countsEmptyNrt: any;
  countsStarMeasurement: any;
  countsEmptyMeasurement: any;
  listOfWasteReport: any;
  fullListOfWasteReport: any;
  wasteReportAverage: any[];
  dataSourceWasteReport: MatTableDataSource<unknown>;

  constructor(public commonService: CommonService,
    public workbokReport: workbookReportService,
    public jalaliPipe: JalaliPipe,
    public locationsOfZonesService: LocationsOfZonesService,
    public checklistAssesmentService: checklistAssesmentService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public recievedData

  ) {

  }
  ngOnInit(): void {
    //if(this.selectedZoneName!="حمل و نقل و پشتيباني"){
    this.m = moment();
    this.m.locale('fa');
    this.cleaningForm();
    // }
  }
  selectZones(row?) {
    this.fullListOfcheckListReport = []
    const dialogRef = this.dialog.open(ZonesComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        this.commonService.selctedDateForWorkBook = this.selectedDate;
        this.commonService.selectedZoneObj = data;
        this.cleaningForm();

        if (data) {
          // this.selectedZoneName = data.namLocation;
          this.selectedZoneName = data.namZone;
          // this.zoneLocationCharacteristic = data.zoneCharacteristic
          this.zoneLocationCharacteristic = data.zoneCharacteristic
          // this.locationId = data.zoneId
          this.ZoneId = data.zoneId;
        }
        // ////debugger
        this.getConfilicts().subscribe((success) => {
          this.commonService.loading = true;
          if (this.selectedZoneName == "حمل و نقل") {
            this.commonService.loading = true;
            this.WasteReport().subscribe((success) => {

            })
          }
          this.industrialReport().subscribe(
            (success) => {

              this.getCheckLists().subscribe(
                (success) => {
                  this.getMeasurement().subscribe((success) => {
                    // //debugger
                    if (this.selectedZoneName == "انرژی و سیالات") {
                      // this.commonService.loading=true;
                      this.getNrtReport().subscribe((success) => {
                        this.mergeWateAndCleaning();
                        this.commonService.loading = false;
                      })
                    }



                    else {
                      this.mergeWateAndCleaning();
                      this.commonService.loading = false;
                    }
                  })

                })


            }
          )
        })

      }
    )
  }
  industrialReport(): Observable<any> {
    let counter = 0;
    let sub = new Subject<any>();
    //let s_location_id = this.locationId
    this.fullListOfWorkbookReport = [];
    if (!this.selectedDate) {
      this.commonService.showEventMessage("ماه را انتخاب کنید")
      // // this.commonService.loading=false;
      return
    }


    let bodyLocationsOfZone = {
      zoneId: this.ZoneId,
    }
    // this.commonService.loading=true;
    this.locationsOfZonesService.FilterListLocationsOfZone(bodyLocationsOfZone).subscribe(
      (success) => {
        let listLocationsOfZone = success;
        success.forEach(eachLocationOfZone => {

          let body = {
            s_location_id: eachLocationOfZone.locationId,
            dat_request_hemre_jalali: (Number(this.m.format('YYYY'))) + this.selectedDate,
            LKP_TYP_EXIT: 6,
            lkp_typ_exam: 13
          }


          ////debugger
          if (body.s_location_id) {

            this.workbokReport.getReport(body).subscribe((success) => {
              counter += 1;
              this.listOfWorkbookReport = success;
              this.percentageOfScore(this.listOfWorkbookReport)
              this.listOfWorkbookReport.forEach(eachWorkbookReportOfUnit => {
                this.fullListOfWorkbookReport.push(eachWorkbookReportOfUnit);
              });
              this.dataSourceReportindustrialWastePerUnit = new MatTableDataSource(this.averagesOfNam_measur_hemrp);
              this.dataSource = new MatTableDataSource(this.fullListOfWorkbookReport);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              //debugger
              if (counter == listLocationsOfZone.length) {
                sub.next()
              }
            });
          }
          ////debugger
          //this.getReportOfChecklists((eachLocationOfZone.locationId).trim())
        });

      },
      (error) => {

        this.commonService.showEventMessage("خطا در دریافت مکان های ناحیه از سرور")

      }
    )
    return sub;
  }

  getCheckLists(): Observable<any> {
    let counter = 0
    let sub = new Subject<any>();
    let bodyLocationsOfZone = {
      zoneId: this.ZoneId,
    }
    this.locationsOfZonesService.FilterListLocationsOfZone(bodyLocationsOfZone).subscribe(
      (success) => {

        success.forEach(eachLocationOfZone => {
          let body = {
            s_location_id: eachLocationOfZone.locationId,
            dat_request_hemre_jalali: (Number(this.m.format('YYYY'))) + this.selectedDate,
            LKP_TYP_EXIT: 6,
            lkp_typ_exam: 13
          }
          counter += 1
          this.getReportOfChecklists((eachLocationOfZone.locationId))
          if (counter == success.length) {
            sub.next();
          }

        })

      })
    return sub;
  }

  percentageOfScore(WorkbookReportOfUnit) {
    const grouped = this.groupBy(WorkbookReportOfUnit, item => item.e_monitor_request_id);
    //console.log('grouped22', grouped);
    let ratio = 2;
    let totalPercent = 0;
    let average;
    let length;
    WorkbookReportOfUnit.forEach(item => {
      if (item.des_lkp_typ_exam) {
        let groupedIndustrialWaste = grouped.get(item.e_monitor_request_id)
        groupedIndustrialWaste.forEach(items => {
          totalPercent += Number(items.nam_measur_hemrp)
          length = groupedIndustrialWaste.length;
        });
        average = (totalPercent / (length - 1))
        this.averagesOfNam_measur_hemrp.push({
          score: ((average) * 20) / 100,
          ratio: ratio, nam_location_hsloc: item.nam_location_hsloc,
          nam_measur_hemrp: item.e_monitor_request_id,
          average: average,
          coefficientCalculation: ratio * Number(((average) * 20) / 100)
        })
        totalPercent = 0
      }
    });

    debugger;
    if (WorkbookReportOfUnit.length > 0) {
      let summ = 0

      this.averagesOfNam_measur_hemrp.forEach(eachAvegargesOfUnit => {
        summ = eachAvegargesOfUnit.average + summ
        this.zoneWithoutMeasurementIndustrialWaste = [];
        this.zoneWithoutMeasurementIndustrialWaste.push({
          coefficientCalculationZone: (((summ / this.averagesOfNam_measur_hemrp.length) * 20) / 100) * ratio,
          scoreZone: (((summ / this.averagesOfNam_measur_hemrp.length) * 20) / 100),
          ratio: ratio, type: "ضایعات صنعتی", percentAvg: (summ / this.averagesOfNam_measur_hemrp.length)
        })
      });

    }
    ///// this.mergeWateAndCleaning()
  }
  getReportOfChecklists(locationId) {

    switch (this.selectedDate) {
      case "01":
      case "02":
      case "03":
      case "04":
      case "05":
      case "06":
        {
          const body = {
            namChkHecli: "",
            namDepartmentHecli: "",
            namAssessorHsrch: "",
            //namLocationHsrch: namLocation,
            locationIdHsrch: locationId,
            desQuestionHeclq: "",
            desOptionHeclo: "",
            namEvaluationAreaHsrch: "",
            startdateHsrch: moment((Number(this.m.format('YYYY'))) + this.selectedDate + "01", 'jYYYY/jM/jD'),
            enddateHsrch: moment((Number(this.m.format('YYYY'))) + this.selectedDate + "31", 'jYYYY/jM/jD')
          }
          this.serverFilter(body)
          break
        }
      case "07":
      case "08":
      case "09":
      case "10":
      case "11":
        {
          const body = {
            namChkHecli: "",
            namDepartmentHecli: "",
            namAssessorHsrch: "",
            //namLocationHsrch: namLocation,
            locationIdHsrch: locationId,
            // locationIdHsrch: namLocation,
            desQuestionHeclq: "",
            desOptionHeclo: "",
            namEvaluationAreaHsrch: "",
            startdateHsrch: moment((Number(this.m.format('YYYY'))) + this.selectedDate + "01", 'jYYYY/jM/jD'),
            enddateHsrch: moment((Number(this.m.format('YYYY'))) + this.selectedDate + "30", 'jYYYY/jM/jD')
          }
          this.serverFilter(body)
          break;
        }
      case "12": {
        const body = {
          namChkHecli: "",
          namDepartmentHecli: "",
          namAssessorHsrch: "",
          // namLocationHsrch: namLocation,
          locationIdHsrch: locationId,
          desQuestionHeclq: "",
          desOptionHeclo: "",
          namEvaluationAreaHsrch: "",
          startdateHsrch: moment((Number(this.m.format('YYYY'))) + this.selectedDate + "01", 'jYYYY/jM/jD'),
          enddateHsrch: moment((Number(this.m.format('YYYY'))) + this.selectedDate + "29", 'jYYYY/jM/jD')
        }
        this.serverFilter(body)
        break;
      }
        break;

    }


  }
  serverFilter(body): Observable<any> {
    let sub = new Subject<any>();
    // this.commonService.loading=true;
    this.checklistAssesmentService.filterListOfChecklistReportByLocationId(body).subscribe((success) => {
      sub.next();
      //console.log('success', success)
      this.listOfcheckListReport = success;
      //debugger
      this.PercentageOfOptions(this.listOfcheckListReport)
      this.listOfcheckListReport.forEach(eachCheckListReportOfUnit => {
        this.fullListOfcheckListReport.push(eachCheckListReportOfUnit);
        if (eachCheckListReportOfUnit.desExplainQuestionHscha) {
          this.weakPoint += " - " + eachCheckListReportOfUnit.desExplainQuestionHscha
        }
      });
      //console.log('MhdfullListOfcheckListReport', this.fullListOfcheckListReport)
      this.dataSourceChecklistReport = new MatTableDataSource(this.fullListOfcheckListReport);

    })
    return sub;
  }
  PercentageOfOptions(data) {
    // //
    if (data.length > 0) {
      let optionsText = [];
      let ratio = 2

      data.forEach(eachRowOfReport => {
        optionsText.push(eachRowOfReport['desOptionHeclo'])

      }); //console.log('optionsText', optionsText)

      var counts = {};

      for (var i = 0; i < optionsText.length; i++) {
        if (!counts.hasOwnProperty(optionsText[i] = optionsText[i])) {
          counts[optionsText[i]] = 1;
        }
        else {
          counts[optionsText[i]]++;
        }
      }
      //console.log('counts', counts);
      this.counts = JSON.stringify(counts)
      let sum = Object.keys(counts).reduce((s, k) => s += counts[k], 0);
      this.percentage = Object.keys(counts).map(k => ({ [k]: + (counts[k] / sum * 100).toFixed(2) }));
      //console.log('nini', this.percentage);
      if (data[0]) {

        this.averagesOfCheckListReport.push({
          average: (counts['مطلوب'] / optionsText.length) * 100,
          nam_location_hsloc: data[0]['namLocationHsrch'],
          nam_measur_hemrp: 0,
          score: (((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100,
          ratio: ratio,
          coefficientCalculation: ratio * Number((((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100)
        })



        this.averagesOfCheckListReport.forEach(eachRow => {

          var num = eachRow['average']
          var roundedString = num.toFixed(2);
          var rounded = Number(roundedString);
          eachRow['average'] = rounded

          var num = eachRow['score']
          var roundedString = num.toFixed(2);
          var rounded = Number(roundedString);
          eachRow['score'] = rounded

          var num = eachRow['coefficientCalculation']
          var roundedString = num.toFixed(2);
          var rounded = Number(roundedString);
          eachRow['coefficientCalculation'] = rounded


        });
        this.dataSourceChecklistReportPerUnit = new MatTableDataSource(this.averagesOfCheckListReport);
        this.calcAvgOfUnitsWithWasteAndClean()
      }
      //پیدا کردن میانگین در صدها برای در آوردن نمره ناحیه
      let summ = 0
      this.averagesOfCheckListReport.forEach(eachAvegargesOfUnit => {
        summ = eachAvegargesOfUnit.average + summ
        this.zoneWithoutMeasurementIndustrialCleaning = [];
        this.zoneWithoutMeasurementIndustrialCleaning.push({
          coefficientCalculationZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100) * ratio,
          scoreZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100),
          ratio: ratio, type: "نظافت صنعتی", percentAvg: (summ / this.averagesOfCheckListReport.length)
        })
      });
      ///// this.mergeWateAndCleaning()
    }
  }
  ////1
  getConfilicts(): Observable<any> {
    let sub = new Subject<any>();
    this.selectedDate
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    let date = (now.toISOString().slice(0, 10));

    //  let thisMonthMinesOneYear = moment(date).locale('en').format('YYYY-MM') + "-01"

    let body = {
      "dat_Date": date
    }
    ////debugger
    this.selectedZoneCharacteristic = this.zoneLocationCharacteristic
    // this.commonService.loading=true;
    this.workbokReport.getConfilicts(body).subscribe((success) => {
      sub.next();
      success.forEach(eachConfilict => {


        if ((this.selectedZoneCharacteristic == "SMC") &&
          (eachConfilict['ustr_KomiteCode'] == "SMC" ||
            eachConfilict['ustr_KomiteCode'] == "CCA" ||
            eachConfilict['ustr_KomiteCode'] == "DAD" ||
            eachConfilict['ustr_KomiteCode'] == "SPR" ||
            eachConfilict['ustr_KomiteCode'] == "PRO")) {
          this.AllOfConfilictsOfThisZone.push(eachConfilict)
        }
        else {
          if (this.selectedZoneCharacteristic == eachConfilict['ustr_KomiteCode']) {
            this.AllOfConfilictsOfThisZone.push(eachConfilict)
          }
        }
      });

      this.AllOfConfilictsOfThisZone.forEach(eachConfilict => {


        eachConfilict.dat_Date = moment(eachConfilict.dat_Date).locale('fa').format('YYYY/MM/DD');

        if (


          ((eachConfilict['contradiction1'] == "باز است" &&
            eachConfilict['contradiction2'] == null) ||
            ////////////////
            (eachConfilict['contradiction1'] == "باز است" &&
              eachConfilict['contradiction2'] == "باز است") ||
            ///////////////////
            (eachConfilict['contradiction1'] == null &&
              eachConfilict['contradiction2'] == null)
            ////////////////////
          )
        ) {
          this.listOfConfilicts.push(eachConfilict)
        }

      });
      console.log('salaam', this.AllOfConfilictsOfThisZone)

      this.countAllOfConfilicts = this.AllOfConfilictsOfThisZone.length;
      let ratio
      //ugger
      if (this.zoneWithMeasurement.length > 0) {
        ratio = 7;
      }
      else {
        ratio = 4;
      }

      this.zoneWithoutMeasurementConfilicts = [];
      this.zoneWithoutMeasurementConfilicts.push({
        coefficientCalculationZone: ((((this.countAllOfConfilicts - this.listOfConfilicts.length) / this.countAllOfConfilicts) * 100 * 20) / 100) * ratio,
        scoreZone: ((((this.countAllOfConfilicts - this.listOfConfilicts.length) / this.countAllOfConfilicts) * 100 * 20) / 100),
        ratio: ratio, type: "اقدامات اصلاحی", percentAvg: ((this.countAllOfConfilicts - this.listOfConfilicts.length) / this.countAllOfConfilicts) * 100
      })


      this.dataSourceConfilicts = new MatTableDataSource(this.listOfConfilicts);
      // // // this.commonService.loading=false;

      //console.log('countAllOfConfilicts', this.countAllOfConfilicts)
      //console.log('listOfConfilicts', this.listOfConfilicts)
    })
    return sub;
  }
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
             table{
               width:100% !important;
             }
        th{
          background-color:#4285f4;
          border: 0px solid gray;
          border: 1px solid gray;
          border: 1px solid gray;
          font-size: medium;
      
        }
        
        .titleOfWorkBook{
          background-color:#ff4081;
          color:white;          
      }
             td{
                 
               border: 0px solid gray;
               border: 1px solid gray;
               border: 1px solid gray;
               font-size: medium;
              
             }
           
             .table-striped tbody tr:nth-of-type(odd) {
               background-color: rgba(0,0,0,.1);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  mergeWateAndCleaning() {
    //debugger
    var arr1 = this.zoneWithoutMeasurementIndustrialWaste;
    var arr2 = this.zoneWithoutMeasurementIndustrialCleaning;

    if (arr1 == undefined) {
      arr1 = []
      this.commonService.showEventMessage("اطلاعات ضایعات صنعتی برای ماه و ناحیه انتخابی در پایگاه های داده ای موجود نیست")
    }
    if (arr2 == undefined) {
      arr2 = []
      this.commonService.showEventMessage("اطلاعات نظافت صنعتی برای ماه و ناحیه انتخابی در پایگاه های داده ای موجود نیست")

    }
    if (this.zoneWithoutMeasurementConfilicts == undefined) {
      arr2 = []
      this.commonService.showEventMessage("اطلاعات نظافت صنعتی برای ماه و ناحیه انتخابی در پایگاه های داده ای موجود نیست")

    }
    if (!this.zoneWithMeasurement || this.zoneWithMeasurement.length == 0) {
      this.zoneWithoutMeasurementConfilicts[0].ratio = 4
      this.zoneWithoutMeasurement = [...arr1, ...arr2, ...this.wasteReportAverage, ...this.zoneWithoutMeasurementConfilicts];
    }
    else {


      this.zoneWithoutMeasurementConfilicts[0].ratio = 7;
      this.zoneWithoutMeasurementConfilicts[0].coefficientCalculationZone = (((this.zoneWithoutMeasurementConfilicts[0].coefficientCalculationZone) / 4) * 7)
      this.zoneWithoutMeasurement = [...arr1, ...arr2, ...this.wasteReportAverage, ...this.zoneWithoutMeasurementConfilicts, ...this.zoneWithMeasurement];

    }

    let sumOfRatio = 0
    let SumOfCoefficientCalculationZone = 0
    this.zoneWithoutMeasurement.forEach(eachParamOfUnit => {
      sumOfRatio = eachParamOfUnit.ratio + sumOfRatio;
      SumOfCoefficientCalculationZone += eachParamOfUnit.coefficientCalculationZone
    });

    this.zoneWithoutMeasurement.push({
      coefficientCalculationZone: SumOfCoefficientCalculationZone,
      scoreZone: "",
      ratio: sumOfRatio, type: "جمع کل", percentAvg: ""
    },
      {
        coefficientCalculationZone: SumOfCoefficientCalculationZone / sumOfRatio,
        scoreZone: "",
        ratio: "", type: "معدل ماه", percentAvg: ""
      }
    )

    //console.log('sumOfRatio', sumOfRatio)
    //console.log('SumOfCoefficientCalculationZone', SumOfCoefficientCalculationZone)
    //console.log(' this.zoneWithoutMeasurement', this.zoneWithoutMeasurement)
    this.zoneWithoutMeasurement.forEach(eachRow => {

      var num = eachRow['coefficientCalculationZone']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['coefficientCalculationZone'] = rounded
      if (eachRow['percentAvg']) {
        var num = eachRow['percentAvg']
        var roundedString = num.toFixed(2);
        var rounded = Number(roundedString);
        eachRow['percentAvg'] = rounded
      }
      if (eachRow['scoreZone']) {
        var num = eachRow['scoreZone']
        var roundedString = num.toFixed(2);
        var rounded = Number(roundedString);
        eachRow['scoreZone'] = rounded
      }

    });
    this.dataSourceZoneWithoutMeasurement = new MatTableDataSource(this.zoneWithoutMeasurement);
  }
  calcAvgOfUnitsWithWasteAndClean() {

    this.averagesOfNam_measur_hemrp.forEach(rowOfFirstTable => {
      this.averagesOfCheckListReport.forEach(rowOf2ndTable => {
        if ((rowOfFirstTable.nam_location_hsloc).trim() == (rowOf2ndTable.nam_location_hsloc).trim()) {
          this.averageMonthlyUnit.forEach(items => {

          });
          this.averageMonthlyUnit.push({ loc: rowOf2ndTable.nam_location_hsloc, value: (rowOfFirstTable.coefficientCalculation + rowOf2ndTable.coefficientCalculation) / 4 })
        }
      });
    });

    //   this.averageMonthlyUnit.forEach((item, index) => {
    //     if (index !== this.averageMonthlyUnit.findIndex(i => i.loc == item.loc)) 
    //     {
    //         this.averageMonthlyUnit.splice(index, 1);
    //     }

    // });


    this.averageMonthlyUnit = this.averageMonthlyUnit.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.loc === value.loc
        //&& t.value === value.value
      ))
    )

    //this.averageMonthlyUnit=    this.averageMonthlyUnit.filter((v,i,a)=>a.findIndex(v2=>(JSON.stringify(v2) === JSON.stringify(v)))===i)




    this.dataSourceAverageMonthlyUnit = new MatTableDataSource(this.averageMonthlyUnit);

    this.averageMonthlyUnit.forEach(eachRow => {

      var num = eachRow['value']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['value'] = rounded


    });


  }
  getMeasurement(): Observable<any> {
    // let s_location_id = this.locationId
    let sub = new Subject<any>();
    let bodyLocationsOfZone = {
      zoneId: this.ZoneId,
    }
    // this.commonService.loading=true;
    this.locationsOfZonesService.FilterListLocationsOfZone(bodyLocationsOfZone).subscribe(
      (success) => {
        let locationZones = success
        let counter = 0
        success.forEach(eachLocationOfZone => {
          this.fullListOfMeasurement = [];
          let bodyGas = {
            s_location_id: eachLocationOfZone.locationId,
            dat_request_hemre_jalali: (Number(this.m.format('YYYY'))) + this.selectedDate,
            LKP_TYP_EXIT: 1,//گاز
            lkp_typ_exam: 9//گاز خروجی

          }
          let bodyDust = {
            s_location_id: eachLocationOfZone.locationId,
            dat_request_hemre_jalali: (Number(this.m.format('YYYY'))) + this.selectedDate,
            LKP_TYP_EXIT: 4,//گردغبار
            lkp_typ_exam: 7//گردغبار
          }

          let bodyWater = {
            s_location_id: eachLocationOfZone.locationId,
            //dat_request_hemre_jalali: (Number(this.m.format('YYYY')) - 1) + this.selectedDate,
            dat_request_hemre_jalali: (Number(this.m.format('YYYY'))) + this.selectedDate,
            LKP_TYP_EXIT: 2,//آب
            lkp_typ_exam: 6//کلرباقیمانده
          }

          // this.commonService.loading=true;
          this.workbokReport.getReport(bodyGas).subscribe((success) => {
            this.listOfGasMeasurement = success;
            // this.PercentageOfMeasurement(this.listOfGasMeasurement)
            this.listOfGasMeasurement.forEach(items => {
              this.fullListOfMeasurement.push(items);
            });
            this.workbokReport.getReport(bodyDust).subscribe((success) => {
              this.listOfDustMeasurement = success;
              //this.PercentageOfMeasurement(this.listOfDustMeasurement)
              this.listOfDustMeasurement.forEach(items => {
                this.fullListOfMeasurement.push(items);
              });

              this.workbokReport.getReport(bodyWater).subscribe((success) => {
                counter += 1

                this.listOfWaterMeasurement = success;

                this.listOfWaterMeasurement.forEach(items => {
                  this.fullListOfMeasurement.push(items);
                });
                this.PercentageOfMeasurement(this.fullListOfMeasurement)
                if (counter == locationZones.length) {
                  //debugger
                  sub.next();
                }
                this.dataSourceReportMeasurement = new MatTableDataSource(this.fullListOfMeasurement);

                // // this.commonService.loading=false;
              });

            });


          });
        })
        //چون فراخوانی آزمایشگاه های غیر روتین در حلقه است این شرط نوشته شده که فقط بار آخر که اندازه گیری کال شد آزمایشگاه غیر روتیم کال شود و فقط یکبار

      },
      (error) => {

      }
    )



    return sub;
  }
  PercentageOfMeasurement(data) {

    data.forEach(element => {
      if (element['flg_abssence'] == null) {
        element['flg_abssence'] = ""
      }
    });
    if (data.length > 0) {
      let optionsText = [];
      let ratio = 3

      data.forEach(eachRowOfReport => {
        optionsText.push(eachRowOfReport['flg_abssence'])

      }); //console.log('optionsText', optionsText)

      var counts = {};

      for (var i = 0; i < optionsText.length; i++) {
        if (!counts.hasOwnProperty(optionsText[i] = optionsText[i])) {
          counts[optionsText[i]] = 1;
        }
        else {
          counts[optionsText[i]]++;
        }
      }

      if (counts[""] == undefined) counts[""] = 0
      if (counts["*"] == undefined) counts["*"] = 0
      this.measurementResult = (counts[""] / (counts['*'] + counts[""]))
      this.countsStarMeasurement = counts['*']
      this.countsEmptyMeasurement = counts[""]
      //console.log('counts', counts);
      this.counts = JSON.stringify(counts)
      let sum = Object.keys(counts).reduce((s, k) => s += counts[k], 0);
      this.percentage = Object.keys(counts).map(k => ({ [k]: + (counts[k] / sum * 100).toFixed(2) }));


      //console.log('open', this.percentage);
      //this.mergeWateAndCleaning()
      //debugger
      if (data[0]) {

        optionsText.length += this.fullListOfNrtReport.length
        this.zoneWithMeasurement = [];
        this.zoneWithMeasurement.push({
          coefficientCalculationZone: ratio * Number(((counts[""] / optionsText.length) * 100 * 20) / 100),
          scoreZone: ((counts[""] / optionsText.length) * 100) * 20 / 100,
          ratio: ratio, type: "اندازه گیری", percentAvg: (counts[""] / optionsText.length) * 100,
        })
        // this.measurementLength=optionsText.length
        //this.measurementPercentAvg=(counts[""] / optionsText.length) * 100
        //this.measurmentRatio=ratio

        /////  this.mergeWateAndCleaning()
        //       this.averagesOfCheckListReport.push({
        //         average: (counts['مطلوب'] / optionsText.length) * 100,
        //         nam_location_hsloc: data[0]['namLocationHsrch'],
        //         nam_measur_hemrp: 0,
        //         score: (((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100,
        //         ratio: ratio,
        //         coefficientCalculation: ratio * Number((((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100)
        //       })
        //       this.dataSourceChecklistReportPerUnit = new MatTableDataSource(this.averagesOfCheckListReport);
        //       this.calcAvgOfUnitsWithWasteAndClean()
        //     }
        //     //پیدا کردن میانگین در صدها برای در آوردن نمره ناحیه
        //     let summ = 0
        //     this.averagesOfCheckListReport.forEach(eachAvegargesOfUnit => {
        //       summ = eachAvegargesOfUnit.average + summ
        //       this.zoneWithoutMeasurementIndustrialCleaning = [];
        //       this.zoneWithoutMeasurementIndustrialCleaning.push({
        //         coefficientCalculationZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100) * ratio,
        //         scoreZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100),
        //         ratio: ratio, type: "نظافت صنعتی", percentAvg: (summ / this.averagesOfCheckListReport.length)
        //       })
        //     });
        //
      }     //
    }
  }
  cleaningForm() {
    this.zoneWithoutMeasurementIndustrialWaste = [];
    this.dataSource = undefined
    this.dataSourceAverageMonthlyUnit = undefined;
    this.dataSourceChecklistReportPerUnit = undefined;
    this.dataSourceReportMeasurement = undefined;
    this.dataSourceChecklistReport = undefined
    this.dataSourceZoneWithoutMeasurement = undefined
    this.dataSourceNrtReport = undefined
    this.zoneWithoutMeasurementIndustrialCleaning = []
    this.fullListOfNrtReport = []
    this.fullListOfWorkbookReport = [];
    this.averagesOfNam_measur_hemrp = [];
    this.averagesOfCheckListReport = [];
    this.averageMonthlyUnit = [];
    this.zoneWithoutMeasurement = [];
    this.zoneWithMeasurement = [];
    this.AllOfConfilictsOfThisZone = [];
    this.weakPoint = "";
    this.selectedZoneName = "";
    this.nrtResult = undefined;
    this.measurementResult = undefined;
    this.fullListOfcheckListReport = [];
    this.zoneWithoutMeasurementConfilicts = [];
    this.fullListOfWorkbookReport = [];
    this.averagesOfNam_measur_hemrp = [];
    this.averagesOfCheckListReport = [];
    this.averageMonthlyUnit = [];
    this.zoneWithoutMeasurement = [];
    this.zoneWithMeasurement = [];
    this.listOfConfilicts = [];
    this.countsEmptyMeasurement = 0
    this.countsEmptyNrt = 0
    this.countsStarMeasurement = 0
    this.countsStarNrt = 0
    this.fullListOfWasteReport = [];
    this.wasteReportAverage = [];

  }
  getNrtReport(): Observable<any> {
    let sub = new Subject<any>();
    let body = {
      dat: (Number(this.m.format('YYYY'))) + this.selectedDate,
    }
    // this.commonService.loading=true;
    this.workbokReport.getNrt(body).subscribe((success) => {

      this.fullListOfNrtReport = success;
      this.fullListOfNrtReport.forEach(eachNrtItem => {
        eachNrtItem.dat = moment(eachNrtItem.dat).locale('fa').format('YYYY/MM/DD - HH:MM');
        if (eachNrtItem.in_range == 0) {
          eachNrtItem.in_range = "*"
        }
        else {
          eachNrtItem.in_range = ""
        }
      });


      this.dataSourceNrtReport = new MatTableDataSource(this.fullListOfNrtReport);
      // // this.commonService.loading=false;
      //console.log("nrt", success)
      this.PercentageOfNrt(success)
      sub.next();
    })
      , (error) => {
        // // this.commonService.loading=false;
        this.commonService.showEventMessage("وب سرویس آزمایشگاه های غیر روتین پاسخگو نیست")
      };

    return sub;
  }
  PercentageOfNrt(data) {
    // //
    if (data.length > 0) {
      let optionsText = [];
      // let ratio = 2

      data.forEach(eachRowOfReport => {
        optionsText.push(eachRowOfReport['in_range'])

      }); //console.log('optionsText', optionsText)

      var counts = {};

      for (var i = 0; i < optionsText.length; i++) {
        if (!counts.hasOwnProperty(optionsText[i] = optionsText[i])) {
          counts[optionsText[i]] = 1;
        }
        else {
          counts[optionsText[i]]++;
        }
      }
      //let sumCounts=counts+
      //console.log('countsNrt', counts);
      //this.counts = JSON.stringify(counts)
      this.countsStarNrt = counts['*']
      this.countsEmptyNrt = counts[""]
      this.nrtResult = (counts[""] / (counts['*'] + counts[""]))

      //console.log('nrtResult', this.nrtResult);

      this.measurementLength = 0;
      this.measurementLength = (Number(this.fullListOfNrtReport.length) + Number(this.fullListOfMeasurement.length)) + this.measurementLength
      //this.measurementPercentAvg = (((this.nrtResult) * 100 + (this.measurementResult) * 100) / this.measurementLength) * 100
      this.measurementPercentAvg = (((this.measurementLength - (this.countsStarMeasurement + this.countsStarNrt))) / this.measurementLength) * 100
      let ratio = 3
      //console.log('measurementLength', this.measurementLength);
      debugger
      if (this.measurementPercentAvg >= 0) {
        this.zoneWithMeasurement[0].percentAvg = this.measurementPercentAvg
        this.zoneWithMeasurement[0].scoreZone = (this.measurementPercentAvg) * 20 / 100
        this.zoneWithMeasurement[0].coefficientCalculationZone = (this.measurementPercentAvg) * 20 / 100 * ratio
      }
      else {
        this.zoneWithMeasurement.push({
          coefficientCalculationZone: ratio * Number(((counts[""] / optionsText.length) * 100 * 20) / 100),
          scoreZone: ((counts[""] / optionsText.length) * 100) * 20 / 100,
          ratio: ratio, type: "اندازه گیری", percentAvg: (counts[""] / optionsText.length) * 100,
        })
      }
      // this.mergeWateAndCleaning()

      // if (data[0]) {

      //   this.averagesOfCheckListReport.push({
      //     average: (counts[1] / optionsText.length) * 100,
      //     nam_location_hsloc: data[0]['namLocationHsrch'],
      //     nam_measur_hemrp: 0,
      //     score: (((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100,
      //     ratio: ratio,
      //     coefficientCalculation: ratio * Number((((counts['مطلوب'] / optionsText.length) * 100) * 20) / 100)
      //   })
      //   this.dataSourceChecklistReportPerUnit = new MatTableDataSource(this.averagesOfCheckListReport);
      //   this.calcAvgOfUnitsWithWasteAndClean()
      // }
      // //پیدا کردن میانگین در صدها برای در آوردن نمره ناحیه
      // // let summ = 0
      // this.percentage.forEach(eachAvegargesOfUnit => {
      //   summ = eachAvegargesOfUnit.average + summ
      //   this.zoneWithoutMeasurementIndustrialCleaning = [];
      //   this.zoneWithoutMeasurementIndustrialCleaning.push({
      //     coefficientCalculationZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100) * ratio,
      //     scoreZone: (((summ / this.averagesOfCheckListReport.length) * 20) / 100),
      //     ratio: ratio, type: "نظافت صنعتی", percentAvg: (summ / this.averagesOfCheckListReport.length)
      //   })
      // });
      // this.mergeWateAndCleaning()
    }
  }
  WasteReport(): Observable<any> {
    let sub = new Subject<any>();
    // debugger
    // this.commonService.loading=true;
    this.fullListOfWorkbookReport = [];
    this.selectedDate = this.commonService.selctedDateForWorkBook
    if (!this.selectedDate) {
      this.commonService.showEventMessage("ماه را انتخاب کنید")
      // // this.commonService.loading=false;
      return
    }
    let body = {
      s_location_id: 1,
      dat_request_hemre_jalali: this.m.format('YYYY') + this.selectedDate,
      LKP_TYP_EXIT: 6,
      lkp_typ_exam: 13
    }
    let sumOfNam_measur_hemrp: number = 0
    let avrageOfNam_measur_hemrp: number = 0
    // this.commonService.loading=true;
    this.workbokReport.getReport(body).subscribe((success) => {
      sub.next();
      this.listOfWasteReport = success;

      //this.percentageOfScore(this.listOfWasteReport)
      success.forEach(eachWorkbookReportOfUnit => {
        if (eachWorkbookReportOfUnit.nam_param_hemop == "حمل به موقع ضایعات") {
          this.fullListOfWasteReport.push(eachWorkbookReportOfUnit);
          sumOfNam_measur_hemrp += Number(eachWorkbookReportOfUnit.nam_measur_hemrp)
        }
      });
      avrageOfNam_measur_hemrp = (sumOfNam_measur_hemrp) / (this.fullListOfWasteReport.length);
      //console.log('sumOfNam_measur_hemrp', sumOfNam_measur_hemrp);
      //console.log('avrageOfNam_measur_hemrp', avrageOfNam_measur_hemrp);
      //console.log('this.listOfWasteReport.length', this.fullListOfWasteReport.length);
      //برای پیدا کردن نام مکان ها
      this.fullListOfWasteReport.forEach(eachWasteReport => {
        this.listOfWasteReport.forEach(item => {
          if (item.s_location_id == eachWasteReport.s_location_id) {
            if (item.nam_location_hsloc != null) {
              eachWasteReport.nam_location_hsloc = item.nam_location_hsloc

              ////console.log('fullListOfWasteReport2', this.fullListOfWasteReport);
            }
          }
        });
      });

      this.wasteReportAverage.push({
        coefficientCalculationZone: (((avrageOfNam_measur_hemrp) * 20) / 100) * 2,
        scoreZone: (((avrageOfNam_measur_hemrp) * 20) / 100),
        ratio: 2, type: "حمل ضایعات", percentAvg: avrageOfNam_measur_hemrp,

      }
      )

      //this.mergeWateAndCleaning()
      this.dataSourceWasteReport = new MatTableDataSource(this.fullListOfWasteReport);
      // // this.commonService.loading=false;

    });

    return sub;
  }
 
}

