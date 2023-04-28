import { Move } from './move.model';
export class User {
  constructor(
    public _id: string,
    public name: string,
    public coins: number = 100,
    public moves: Move[]
  ) {}
}
