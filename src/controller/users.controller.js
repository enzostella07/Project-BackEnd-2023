import express from 'express';
import { userService } from '../services/users.service.js';
export const usersRouter = express.Router();
class userController {
  getAll = async (req, res) => {
    try {
      const data = await userService.getAll({});
      const dataParse = data.map((user) => {
        return {
          id: user._id,
          email: user.email,
          firstname: user.first_name,
          password: user.password,
          rol: user.rol,
        };
      });
      const title = 'Enzos eShop - Users';
      return res.status(200).render('users', { dataParse, title });
    } catch (err) {
      console.log(err);
      return res.status(501).render('error', { error: 'Error en el servidor' });
    }
  };
}

export default new userController()
