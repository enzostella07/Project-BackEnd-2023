import { userService } from "../services/users.service.js";

class userApiController{

  getAll = async (req, res) => {
    try {
      const users = await userService.getAll();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        payload: users,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).render("error", { error: "something went wrong en user" });
    }
  }

  createUser = async (req, res) => {
    try {
      const { email, first_name, password, rol } = req.body;
      if (!email || !first_name || !password || !rol) {
        console.log(
          "validation error: please complete email, firstName, password and rol."
        );
        return res.status(400).render("error", { error: "please complete email, firstName, password and rol." });
      }
      const userCreated = await userService.createOne({
        email,
        first_name,
        password,
        rol,
      });
      return res.status(201).json({
        status: "success",
        msg: "user created",
        payload: {
          _id: userCreated._id,
          email: userCreated.email,
          firstName: userCreated.first_name,
          password: userCreated.password,
          rol: userCreated.rol,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }

  updateUser = async (req, res) => {
    try {
      const { _id } = req.params;
      const { email, first_name, password, rol } = req.body;
      if (!email || !first_name || !password || !rol || !_id) {
        console.log(
          "validation error: please complete email, firstName, password and rol."
        );
        return res.status(400).render("error", { error: "please complete email, firstName, password and rol." });
      }
      try {
        const userUptaded = await userService.updateOne({
          _id,
          email,
          first_name,
          password,
          rol,
        });
        console.log("user"+userUptaded);
        if (userUptaded.matchedCount > 0) {
          return res.status(201).json({
            status: "success",
            msg: "user uptaded",
            payload: {},
          });
        } else {
          return res.status(404).render("error", { error: "user not found" });
        }
      } catch (e) {
        return res.status(500).render("error", { error: "db server error while updating user" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).render("error", { error: "db server error while updating user" });
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { _id } = req.params;
  
      const result = await userService.deleteOne(_id);
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "user deleted",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }
}

export default new userApiController()
