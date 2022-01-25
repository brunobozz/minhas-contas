import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-page-bills-month',
  templateUrl: './page-bills-month.component.html',
  styleUrls: ['./page-bills-month.component.scss'],
})
export class PageBillsMonthComponent implements OnInit {
  public billsList: any = [];
  public bills: any = [];
  public billsMonth: any = [];
  public billNumber = 0;
  public monthEdit = true;

  public total = 0;

  constructor(
    private apiService: ServMovkApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBillsList();
    this.getBills();
  }

  private getBillsList() {
    this.apiService.getData('bills-list/').subscribe((res: any) => {
      this.billsList = res;
    });
  }

  private getBills() {
    this.apiService.getData('bills/').subscribe((res: any) => {
      this.bills = res;
      this.getBillMonth();
    });
  }

  private getBillMonth() {
    this.billsMonth = this.bills[this.billNumber];
    if (this.billsMonth.data) {
      let i = 0;
      this.billsMonth.data.map((res: any) => {
        let item = this.billsList.find(
          (element: any) => element.id == res.billId
        );
        if (item) {
          this.billsMonth.data[i].name = item.name;
        }
        i++;
      });
    }
    this.totalCalculate();
  }

  private totalCalculate() {
    this.total = 0;
    if (this.billsMonth.data) {
      this.billsMonth.data.map((bill: any) => {
        this.total = this.total + bill.value;
      });
    }
  }

  public addMonth() {
    let newDate = new Date();
    let dateString =
      newDate.getFullYear() +
      '-' +
      newDate.getMonth() +
      1 +
      '-' +
      newDate.getDate();

    console.log(dateString);
    let dataMonth = {
      date: dateString,
      data: [],
    };
    this.apiService.postData('bills', dataMonth).subscribe(() => {
      this.toastr.success('Novo mês criado!', 'Feito!!');
      this.getBills();
    });
  }

  public removeMonth(id: number, month: string) {
    if (confirm('Tem certeza que deseja apagar o mês ' + month + '?')) {
      this.apiService.deleteData('bills', id).subscribe(() => {
        this.toastr.error('Mês removido!', 'Feito!!');
        this.getBills();
        this.changeMonthTo(id - 1);
      });
    }
  }

  public saveMonth(value: any) {
    this.billsMonth.date = value;
    this.saveList();
  }

  public changeMonthTo(id: number) {
    this.billNumber = id;
    this.getBillMonth();
  }

  public changeMonthPrev() {
    if (this.billNumber > 0) {
      this.billNumber--;
    } else {
      this.billNumber = this.bills.length - 1;
    }
    this.getBillMonth();
  }

  public changeMonthNext() {
    if (this.billNumber + 1 < this.bills.length) {
      this.billNumber++;
    } else {
      this.billNumber = 0;
    }
    this.getBillMonth();
  }

  public addBill() {
    let newId = 0;
    this.billsMonth.data.map((res: any) => {
      if (res.id >= newId) {
        newId = res.id + 1;
      }
    });
    let val = { billId: null, value: '0', id: newId };
    this.billsMonth.data.push(val);
  }

  public changeBill(event: any, id: number) {
    this.billsMonth.data.find((item: any) => item.id == id).billId =
      event.target.value;
    this.saveList();
  }

  public changeValue(event: any, id: number) {
    let newVal = event.target.value;
    newVal = newVal.replace('R$', '').replace(',', '');
    newVal = parseFloat(newVal);

    if (
      this.billsMonth.data.find((item: any) => item.id == id).value !== newVal
    ) {
      this.billsMonth.data.find((item: any) => item.id == id).value = newVal;
      this.saveList();
    }
  }

  private saveList() {
    this.apiService
      .patchData('bills/', this.billNumber, this.billsMonth)
      .subscribe(() => {
        this.toastr.success('Lista atualizada!', 'Feito!!');
        this.getBills();
      });
  }

  public deleteItem(id: number, name: string) {
    if (confirm('Tem certeza que deseja apagar a despesa ' + name + '?')) {
      this.billsMonth.data = this.billsMonth.data.filter(
        (item: any) => item.id !== id
      );
      this.saveList();
    }
  }
}
