import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css'
})
export class DeleteButton {
disabled =input<boolean>();
clickedEvent =output<Event>();

onClick(event :Event){
  this.clickedEvent.emit(event);
}

}
