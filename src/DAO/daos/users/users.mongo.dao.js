import { UserSchema } from '../../schemas/users.schema.js';

class UserDAO {
  async find(filters, options) {
    const user = await UserSchema.findOne({ filters, options });
    return user || false;
  }

  async findByEmail(filters, options) {
    const user = await UserSchema.findOne({ filters, options });
    return user || false;
  }

  async get(options) {
    const users = await UserSchema.find({}, { options });
    return users;
  }

  async create(options) {
    const userCreated = await UserSchema.create(options);
    return userCreated;
  }

  async update({ filters, options }) {
    const userUptaded = await UserSchema.updateOne(
      { filters, options },
    );
    return userUptaded;
  }

  async delete(_id) {
    const result = await UserSchema.deleteOne({ _id: _id });
    return result;
  }
}
export const userDAO = new UserDAO();
