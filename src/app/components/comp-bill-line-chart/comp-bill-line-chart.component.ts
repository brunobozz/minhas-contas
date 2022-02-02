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
  public chartLines: any = [];

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
      this.selectBill(res[2].id);
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
        posY: (bill.value * 100) / valMaxOf,
        posTop: posSeparator,
      };
      newBills.push(itemChart);
      positionX = positionX + posSeparator;
    });
    this.billSelected = newBills;

    this.chartLines = [];
    // this.calcLines();
  }

  // private calcLines() {
  //   let i = 0;
  //   let valMax = Math.max.apply(null, this.billsValues);
  //   for (let res of this.billSelected) {
  //     let max = Math.max(res.posY, this.billSelected[i + 1].posY);
  //     let min = Math.min(res.posY, this.billSelected[i + 1].posY);
  //     let newLine = {
  //       top: (max - min) / 2 + min,
  //       left: res.posX,
  //       width: 100 / this.billSelected.length,
  //       rotate: this.calcLineDeg(
  //         res.posY,
  //         this.billSelected[i + 1].posY,
  //         valMax
  //       ),
  //     };
  //     i++;
  //     this.chartLines.push(newLine);
  //   }
  //   console.log(this.chartLines);
  // }

  // private calcLineDeg(val1: number, val2: number, valMax: number) {
  //   let CA = 100 / this.billSelected.length;
  //   console.log('max ' + Math.max(val1, val2));
  //   return 0;
  // }

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
