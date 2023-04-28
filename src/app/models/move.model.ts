import { Contact } from './contact.model';

export class Move {
  constructor(
    public id?: string,
    public amount?: number,
    public to?: Contact,
    public at: number = Date.now()
  ) {}
}
