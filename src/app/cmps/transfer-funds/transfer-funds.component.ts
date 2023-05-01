import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss'],
})
export class TransferFundsComponent {
  @Output() transferFunds = new EventEmitter<number>();
  transferAmount: number = 0;
  handleSubmit() {
    if (isNaN(this.transferAmount)) return;
    this.transferFunds.emit(this.transferAmount);
  }
}
