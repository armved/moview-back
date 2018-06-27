class UserDTO {
  constructor(input) {
    if (input) {
      this.username = input.username;
      this.firstName = input.firstName;
      this.lastName = input.lastName;
    }
  }

  toJSON() {
    return {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
    }
  }
}

module.exports = UserDTO;