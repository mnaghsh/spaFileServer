import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { now } from 'jalali-moment';
import { CommonService } from 'src/app/services/common.service';
import { SendSpechializedErgonomiToAssessorService } from 'src/app/services/sendSpechializedErgonomiToAssessor/send-spechialized-ergonomi-to-assessor.service';
import { UsersComponent } from 'src/app/users/users.component';

@Component({
  selector: 'app-send-spechialized-ergonomi-to-assessor',
  templateUrl: './send-spechialized-ergonomi-to-assessor.component.html',
  styleUrls: ['./send-spechialized-ergonomi-to-assessor.component.css']
})
export class SendSpechializedErgonomiToAssessorComponent implements OnInit {
  spechializedAssessor: any;
  textOfMessage: string;
  phoneNumberOfAssessor: any;
  constructor(private dialog: MatDialog,
    public commonService: CommonService,
    public sendSpechializedErgonomiToAssessorService: SendSpechializedErgonomiToAssessorService,
  ) { }

  ngOnInit(): void {
  }
  selectAssessor() {
    {
      const dialogRef = this.dialog.open(UsersComponent, {
        width: "70%",
        height: "70%",
        direction: "rtl",
        data: {

        }
      });
      dialogRef.afterClosed().subscribe(
        (data) => {
          this.spechializedAssessor = data.firstname + " " + data.lastname
          this.phoneNumberOfAssessor = data.mobile;
        }
      )
    }
  }
  saveAndSendMessage() {
    debugger
    let body = {
      "namAssessorHsspe": this.spechializedAssessor,
      "numAssessorMobileHsspe": this.phoneNumberOfAssessor,
      "desTextMessageHsspe": this.textOfMessage,
      "createDate":new Date(),
      "createInfo": this.commonService.activeUser.firstname + " " + this.commonService.activeUser.lastname,
    }
    this.sendSpechializedErgonomiToAssessorService.insertSpechializedErgonomis(body).subscribe(
      (success) => {
        this.commonService.showEventMessage("پیامک با موفقیت ارسال شد", 3000, "green")

      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده است و یا ارتباط با سرور پیامکی قطع می باشد.", 5000, "green")

      }
    )
  }
}

