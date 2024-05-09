import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isShown = true;
  @Output() modalClosed = new EventEmitter<{
    isShown: boolean;
    isProceeded: boolean;
  }>();
  isProceeded: boolean = false;

  modalShowResults(action: string) {
    if (action === 'remove') {
      this.isProceeded = true;
    } else {
      this.isProceeded = false;
    }
    console.log(this.isProceeded);
    this.isShown = false;
    console.log(`isShown ${this.isShown}`);
    this.modalClosed.emit({
      isShown: this.isShown,
      isProceeded: this.isProceeded,
    }); // Emitting both values
    return this.isProceeded;
  }

  modalShowIsProceeded() {
    return this.isProceeded;
  }
}
