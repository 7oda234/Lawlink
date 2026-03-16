export class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  display() {
    return `User: ${this.name}`;
  }
}