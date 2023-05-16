interface IPlayer {
  name: string;
  type: string;
  health: number;
  img: string;
  choice: string;
}

export class Player implements IPlayer {
  public name;
  public type;
  public health;
  public choice;
  public img;

  constructor(name: string, type: string, img: string) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.choice = '';
    this.img = `../../assets/images/${img}`;
  }
}
