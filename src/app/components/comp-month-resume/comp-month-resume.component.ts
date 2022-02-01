import { Component, OnInit } from '@angular/core';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-comp-month-resume',
  templateUrl: './comp-month-resume.component.html',
  styleUrls: ['./comp-month-resume.component.scss'],
})
export class CompMonthResumeComponent implements OnInit {
  public today: any = new Date();
  public date: string = '';
  public billsMonth: any = [];
  public total: number = 0;

  constructor(private apiService: ServMovkApiService) {}

  ngOnInit(): void {
    this.date = this.today.getMonth();
    this.getBillsList();
  }

  async getBillsList() {
    this.apiService.getData('bills/').subscribe((res: any) => {
      this.billsMonth = res.find((val: any) => val.date == '2022/1').data;
      this.monthTotal();
    });
  }

  private monthTotal() {
    this.total = 0;
    if (this.billsMonth) {
      this.billsMonth.map((bill: any) => {
        this.total = this.total + bill.value;
      });
    }
  }
}
