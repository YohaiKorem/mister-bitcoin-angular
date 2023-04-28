import { Component, Input } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss'],
})
export class MovesListComponent {
  @Input() title!: string;
  @Input() moves!: Move[];
  isDetailsCmp!: boolean;
  sortedMoves = this.moves;
  setSortCriteria(str: string) {
    console.log(str);
    console.log(this.moves);
  }

  getFormattedDate(date: number): string {
    return new Date(date).toLocaleString();
  }
}
