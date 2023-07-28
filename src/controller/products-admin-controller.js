import { productService } from "../services/products.service.js";

class productsAdminController{
  getAll = async (req, res) => {
    try {
      const data = await productService.getAll({});
      const dataParse = data.map((prod) => {
        return {
          id: prod._id,
          title: prod.title,
          description: prod.description,
          price: prod.price,
          thumbnail: prod.thumbnail,
          code: prod.code,
          stock: prod.stock,
        };
      });
      const title = "Administrador de Productos";
      return res.status(200).render("products-admin", { dataParse, title });
    } catch (err) {
      console.log(err);
      return res.status(501).render("error", { error: "Error en el servidor" });
    }
  };
}

export default new productsAdminController()
