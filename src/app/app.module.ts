import { transportationWorkbookReportComponent } from './workbook-report/transportation-workbookReport/transportation-workbookReport.component';
import { ZonesComponent } from './utils/zones/zones.component';
import { foodManufacturesComponent } from './food-inspection/food-manufactures/food-manufactures.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './share.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CreateCheckListComponent } from './checkList/create-check-list/create-check-list.component';
import { LoadingComponent } from './utils/loading/loading.component';
import { ChecklistReportComponent } from './checkList/checklist-report/checklist-report.component';
import { ChecklistAssesmentComponent } from './checkList/checklist-assesment/checklist-assesment.component';
import { ChecklistOptionsComponent } from './checkList/checklist-options/checklist-options.component';
import { ChecklistQuestionsComponent } from './checkList/checklist-questions/checklist-questions.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { LocationsComponent } from './utils/loading/locations/locations/locations.component';
import { MessagesComponent } from './utils/messages/messages.component';
import { SchedulingComponent } from './checkList/scheduling/scheduling.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { RequestChecklistReportComponent } from './checkList/request-checklist-report/request-checklist-report.component';
import { EvaluationDiscrepanciesReportByAssessorComponent } from './checkList/evaluationDiscrepanciesReport/evaluationDiscrepanciesReportByAssessor/evaluationDiscrepanciesReportByAssessor.component';
import { EvaluationDiscrepanciesReportByCheckListComponent } from './checkList/evaluationDiscrepanciesReport/evaluationDiscrepanciesReportByChecklist/evaluationDiscrepanciesReportByChecklist.component';
import { EvaluationDiscrepanciesReportByLocationComponent } from './checkList/evaluationDiscrepanciesReport/evaluationDiscrepanciesReportByLocation/evaluationDiscrepanciesReportByLocation.component';
import { LoadingDialogComponent } from './utils/loadingDialog/loadingDialog.component';
import { SendSpechializedErgonomiToAssessorComponent } from './specializedErgonmi/send-spechialized-ergonomi-to-assessor/send-spechialized-ergonomi-to-assessor.component';
import { WorkbookReportComponent } from './workbook-report/workbook-report.component';
import { TypesOfFoodComponent } from './food-inspection/types-of-food/types-of-food.component';
import { FoodInspectionComponent } from './food-inspection/food-inspection/food-inspection.component';
import { JalaliPipe } from 'src/pipes/jalali.pipe';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';



const myRoots: Routes = [
  { path: 'login', component: LoginComponent },

  {
    canActivate: [LoginGuard],
    path: '', component: MenuComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'fileUpload', component: UploadComponent },
      { path: 'download', component: DownloadComponent },
    ]
  }


];

@NgModule({
  declarations: [
    DownloadComponent,
    UploadComponent,
    LoadingComponent,
    LoadingDialogComponent,
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    CreateCheckListComponent,
    ChecklistReportComponent,
    ChecklistAssesmentComponent,
    ChecklistOptionsComponent,
    ChecklistQuestionsComponent,
    LocationsComponent,
    UsersComponent,
    MessagesComponent,
    SchedulingComponent,
    EvaluationDiscrepanciesReportByAssessorComponent,
    EvaluationDiscrepanciesReportByCheckListComponent,
    EvaluationDiscrepanciesReportByLocationComponent,
    RequestChecklistReportComponent,
    SendSpechializedErgonomiToAssessorComponent,
    WorkbookReportComponent,
    TypesOfFoodComponent,
    FoodInspectionComponent,
    foodManufacturesComponent,
    ZonesComponent,
    transportationWorkbookReportComponent
    
  ],
  imports: [      NgPersianDatepickerModule,

    BrowserModule, SharedModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(myRoots,
      { useHash: true }
    ),

    BrowserAnimationsModule,
  ],


  providers: [
    JalaliPipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
