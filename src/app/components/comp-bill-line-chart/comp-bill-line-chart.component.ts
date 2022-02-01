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
  public billsValues: any = [];
  public billSelected: any = [];
  public total: number = 0;

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
          console.log(this.billSelected);
          this.billsValues.push(bill.value);
        }
      });
    });
    this.calcPositions();
    this.calcTotal();
  }

  private calcPositions() {
    let posSeparator = 100 / this.billSelected.length;
    let positionX = 0;
    let valMaxOf = Math.max.apply(null, this.billsValues);

    let newBills: any = [];
    this.billSelected.map((bill: any) => {
      let itemChart = {
        date: bill.date,
        value: bill.value,
        posX: positionX,
        posY: 100 - (bill.value * 100) / valMaxOf,
      };
      newBills.push(itemChart);
      //esse (5 / this.billSelected.length) ajuda a preencher melhor
      positionX = positionX + posSeparator + 5 / this.billSelected.length;
    });

    this.billSelected = newBills;
  }

  private calcTotal() {
    this.total = 0;
    this.billsValues.map((res: any) => {
      this.total = this.total + res;
    });
  }

  public changeBill(event: any) {
    this.billSelected = [];
    this.billsValues = [];
    this.selectBill(event.target.value);
  }
}
