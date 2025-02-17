import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import MicroModal from 'micromodal';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements AfterViewInit {
  @Input() modalTitle: string = '';
  @Input() modalContent: string = '';
  @Output() closeModalEvent = new EventEmitter<void>();

  ngAfterViewInit(): void {}

  private lockScroll(): void {
    document.body.classList.add('no-scroll');
  }

  private unlockScroll(): void {
    document.body.classList.remove('no-scroll');
  }

  openModal(): void {
    MicroModal.show('modal-1');
    this.lockScroll();
  }

  closeModal(): void {
    MicroModal.close('modal-1');
    this.unlockScroll();
  }
}
