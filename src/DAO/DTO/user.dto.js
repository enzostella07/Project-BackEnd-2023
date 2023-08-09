export class userDTO {
  constructor(user) {
    this.name = user.firstname;
    this.last_name = user.lastname;
    this.email = user.email;
    this.role = user.rol;
    this.cart = user.cart;
  }
}
