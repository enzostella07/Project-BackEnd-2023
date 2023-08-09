import { productService } from "../services/products.service.js";

class productsController{
  getAllWithPagination = async (req, res) => {
    try {
      const { limit, pagina, category, orderBy } = req.query;
      const data = await productService.getAllWithPagination(
        limit,
        pagina,
        category,
        orderBy
      );
      const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
        data;
      const plainProducts = data.docs.map((doc) => doc.toObject());
  
      const firstname = req.session.user.firstname;
      const lastname = req.session.user.lastname;
      const rol = req.session.user.rol;
      const cart = req.session.user.cart;
      // const title = "Listado de Productos";
      return res.status(200).render("products", {
        // title,
        firstname,
        lastname,
        rol,
        cart,
        plainProducts,
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).render("error", { error: "Error en el servidor" });
    }
  }
}
export default new productsController()
