import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  public bills: any = [];
  public total = 0;

  constructor(
    private apiService: ServMovkApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBills();
  }

  private getBills() {
    this.apiService.getData('bills/').subscribe(
      (res: any) => {
        this.bills = res;
        this.bills.map((bill: any) => {
          this.total = this.total + bill.value;
        });
      },
      (err) => {
        this.toastr.error(err.statusText, 'Error: ' + err.status);
      }
    );
  }
}
