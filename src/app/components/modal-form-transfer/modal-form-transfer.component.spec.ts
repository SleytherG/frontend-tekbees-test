import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormTransferComponent } from './modal-form-transfer.component';

describe('ModalFormTransferComponent', () => {
  let component: ModalFormTransferComponent;
  let fixture: ComponentFixture<ModalFormTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormTransferComponent]
    });
    fixture = TestBed.createComponent(ModalFormTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
