import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false

  @HostListener('click') toggleOpen() {   //Listening to a click event
    this.isOpen = !this.isOpen;
  }
}

