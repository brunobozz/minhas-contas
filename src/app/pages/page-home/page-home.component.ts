import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  public billsList: any = [];
  public bills: any = [];
  public billNumber = 0;

  public total = 0;

  constructor(
    private apiService: ServMovkApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBills();
  }

  private getBills() {
    this.apiService.getData('bills/').subscribe((res: any) => {
      this.billsList = res;
      this.bills = this.billsList[this.billNumber];
      this.totalCalculate();
    });
  }

  private totalCalculate() {
    this.total = 0;
    this.bills.data.map((bill: any) => {
      this.total = this.total + bill.value;
    });
  }

  public changeMonthPrev() {
    if (this.billNumber > 0) {
      this.billNumber--;
    } else {
      this.billNumber = this.billsList.length - 1;
    }
    this.getBills();
  }

  public changeMonthNext() {
    if (this.billNumber + 1 < this.billsList.length) {
      this.billNumber++;
    } else {
      this.billNumber = 0;
    }
    this.getBills();
  }
}
