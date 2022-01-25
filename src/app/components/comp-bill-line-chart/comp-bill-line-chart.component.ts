import { Component, OnInit } from '@angular/core';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-comp-bill-line-chart',
  templateUrl: './comp-bill-line-chart.component.html',
  styleUrls: ['./comp-bill-line-chart.component.scss'],
})
export class CompBillLineChartComponent implements OnInit {
  public billsList: any = [];
  public bills: any = [];
  public billSelected: any = [];

  constructor(private apiService: ServMovkApiService) {}

  ngOnInit(): void {
    this.getBills();
  }

  private getBills() {
    this.apiService.getData('bills/').subscribe((res: any) => {
      this.bills = res;
      this.getBillsList();
    });
  }

  private getBillsList() {
    this.apiService.getData('bills-list/').subscribe((res: any) => {
      this.billsList = res;
      this.selectBill(res[0].id);
    });
  }

  private selectBill(id: number) {
    this.bills.map((month: any) => {
      month.data.map((bill: any) => {
        if (bill.billId == id) {
          let itemChart = {
            date: month.date,
            value: bill.value,
          };
          this.billSelected.push(itemChart);
        }
      });
    });
  }

  public changeBill(event: any) {
    this.billSelected = [];
    this.selectBill(event.target.value);
  }
}
