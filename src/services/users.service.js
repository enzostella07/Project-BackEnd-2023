import { createHash } from "../utils/bcrypt.js";
import { userDAO } from "../DAO/daos/users/users.mongo.dao.js";

class UserService {
  async findUser(email, password) {
    const user = await userDAO.find(
      { email: email, password: password },
      {
        _id: true,
        email: true,
        first_name: true,
        password: true,
        rol: true,
      }
    );
    return user || false;
  }

  async findUserByEmail(email) {
    const user = await userDAO.findByEmail(
      { email: email },
      {
        _id: true,
        email: true,
        firstName: true,
        password: true,
        rol: true,
      }
    );
    return user || false;
  }

  async getAll() {
    const users = await userDAO.get(
      {},
      {
        _id: true,
        email: true,
        first_name: true,
        password: true,
        rol: true,
      }
    );
    return users;
  }

  async createOne(user) {
    user.password = createHash(user.password);
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      return false;
    }
    const userCreated = await userDAO.create(user);
    return userCreated;
  }

  async updateOne({ _id, email, first_name, password, rol }) {
    const userUptaded = await userDAO.update(
      {
        _id: _id,
      },
      {
        email,
        first_name,
        password,
        rol,
      }
    );
    return userUptaded;
  }

  async deleteOne(_id) {
    const result = await userDAO.delete( _id );
    return result;
  }
}
export const userService = new UserService();
