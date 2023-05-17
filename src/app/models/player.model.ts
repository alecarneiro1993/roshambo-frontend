import { PlayerOptions } from './enums.model';

interface IPlayer {
  name: string;
  type: string;
  health: number;
  img: string;
}

export class Player implements IPlayer {
  private _choice: string;
  public name;
  public type;
  public health;
  public img;

  constructor(name: string, type: string, img: string) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.img = `../../assets/images/${img}`;
    this._choice = '';
  }

  public get choice(): string {
    return this._choice;
  }

  public set choice(value: string) {
    const isValid = Object.keys(PlayerOptions).includes(value);
    if (!isValid && value !== '')
      throw new Error('Invalid type of Player choice');

    this._choice = value;
  }

  public takeHit(dmgAmount: string) {
    if (this.health > 0) this.health = this.health - Number(dmgAmount);
  }
}
