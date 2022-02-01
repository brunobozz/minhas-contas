import { Component, Input, OnInit } from '@angular/core';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-comp-bigest-bill',
  templateUrl: './comp-bigest-bill.component.html',
  styleUrls: ['./comp-bigest-bill.component.scss'],
})
export class CompBigestBillComponent implements OnInit {
  public billsList: any = [];
  @Input() bills: any = [];
  public bigestBill: any = {
    name: '46543',
    date: '',
    value: 0,
  };

  constructor(private apiService: ServMovkApiService) {}

  ngOnInit(): void {
    this.getBillsList();
  }

  async getBillsList() {
    this.apiService.getData('bills-list/').subscribe((res: any) => {
      this.billsList = res;
      this.findBigest();
    });
  }

  async findBigest() {
    if (this.bills.length > 0) {
      this.bills.map((month: any) => {
        month.data.map((bill: any) => {
          if (bill.value > this.bigestBill.value) {
            this.bigestBill = {
              name: this.billsList.find((i: any) => i.id == bill.billId).name,
              date: month.date,
              value: bill.value,
            };
          }
        });
      });
    }
  }
}
