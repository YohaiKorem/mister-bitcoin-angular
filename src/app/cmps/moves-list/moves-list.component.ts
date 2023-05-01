import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss'],
})
export class MovesListComponent implements OnInit {
  @Input() title!: string;
  @Input() moves!: Move[];
  @Input() isDetailsCmp!: boolean;
  sortedMoves = this.moves;

  ngOnInit() {
    this.setSortCriteria('date');
  }

  setSortCriteria(str: string) {
    console.log(this.sortedMoves);

    if (this.moves) {
      if (str === 'date') {
        this.sortedMoves = this.moves.sort((a, b) => b.at - a.at);
      } else
        this.sortedMoves = this.moves.sort((a, b) => {
          return b.amount! - a.amount!;
        });
    }
  }

  getFormattedDate(date: number): string {
    return new Date(date).toLocaleString();
  }
}
