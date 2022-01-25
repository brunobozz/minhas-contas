import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-page-bills-list',
  templateUrl: './page-bills-list.component.html',
  styleUrls: ['./page-bills-list.component.scss'],
})
export class PageBillsListComponent implements OnInit {
  public billsList: any = [];

  constructor(
    private apiService: ServMovkApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBillsList();
  }

  private getBillsList() {
    this.apiService.getData('bills-list/').subscribe((res: any) => {
      this.billsList = res;
    });
  }

  public addBill() {
    let val = { name: 'NOVA DESPESA' };
    this.apiService.postData('bills-list', val).subscribe(() => {
      this.toastr.success('Novo item adicionado!', 'Feito!!');
      this.getBillsList();
    });
  }

  public deleteItem(id: number, name: string) {
    if (confirm('Tem certeza que deseja apagar a conta ' + name + '?')) {
      this.apiService.deleteData('bills-list', id).subscribe(() => {
        this.toastr.error('Item apagado!', 'Se foi!!');
        this.getBillsList();
      });
    }
  }

  public saveList(event: any, id: number) {
    let item = this.billsList.find((elem: any) => elem.id == id);

    if (item.name !== event.target.value) {
      let value = {
        name: event.target.value,
      };

      this.apiService.patchData('bills-list', id, value).subscribe(() => {
        this.toastr.success('Lista atualizada!', 'Feito!!');
        this.getBillsList();
      });
    }
  }
}
