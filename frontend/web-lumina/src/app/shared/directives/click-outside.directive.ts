import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: EventTarget | null): void {
    // 1. Verificamos que sea un elemento HTML
    // 2. Verificamos que el click ocurrió fuera del elemento referenciado
    if (target instanceof HTMLElement && !this.elementRef.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}