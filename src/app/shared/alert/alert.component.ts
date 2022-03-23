import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string; //To add alert message:: add @Input to make this message settable from outside -> usable in the alert html file
  @Output() close = new EventEmitter<void>();  //To close the alert box: emit an event & make it listenable from outside w/ @Output => will hold a new event emitter w/ void to not emit any data

  onClose() {   //method triggered whenever user clicks close button or the backdrop
    this.close.emit();  //use above close event created and manually emit it to close the popup
  }

}
