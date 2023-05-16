interface IPlayer {
  name: string;
  type: string;
  health: number;
  img: string;
}

export class Player implements IPlayer {
  public name;
  public type;
  public health;
  public img;

  constructor(name: string, type: string, img: string) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.img = `../../assets/images/${img}`;
  }

  public takeHit() {
    if (this.health > 0) this.health = this.health - 20; // just testing
  }
}
