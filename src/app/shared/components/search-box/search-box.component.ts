import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, input } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>(); //cuando se presiona Enter

  @Output()
  public onDebounce = new EventEmitter<string>(); //cuando se deja de escribir en el teclado

  ngOnInit(): void {
      this.debouncerSuscription = this.debouncer.pipe( debounceTime(500) ).subscribe( value => {
          this.onDebounce.emit( value );
      });
  }

  ngOnDestroy(): void {
    // console.log('destruido');
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string):void{
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm);
  }


}
