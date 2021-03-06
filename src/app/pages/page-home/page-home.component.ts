import { Component, OnInit } from '@angular/core';
import { ServMovkApiService } from 'src/app/services/serv-mock/serv-mock.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  public bills: any;

  constructor(private apiService: ServMovkApiService) {}

  ngOnInit(): void {
    this.getBills();
  }

  private getBills() {
    this.apiService.getData('bills/').subscribe((res: any) => {
      this.bills = res;
    });
  }
}
