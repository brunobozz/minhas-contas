import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMonthResumeComponent } from './comp-month-resume.component';

describe('CompMonthResumeComponent', () => {
  let component: CompMonthResumeComponent;
  let fixture: ComponentFixture<CompMonthResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompMonthResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMonthResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
