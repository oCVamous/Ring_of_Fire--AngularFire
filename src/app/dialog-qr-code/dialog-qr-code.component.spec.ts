import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQRCodeComponent } from './dialog-qr-code.component';

describe('DialogQRCodeComponent', () => {
  let component: DialogQRCodeComponent;
  let fixture: ComponentFixture<DialogQRCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQRCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
