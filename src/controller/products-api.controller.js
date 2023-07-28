import { productService } from "../services/products.service.js";

class productApiController{
  getAllWithPagination = async (req, res) => {
    try {
      const { limit, pagina, category, orderBy } = req.query;
      const data = await productService.getAllWithPagination(
        limit,
        pagina,
        category,
        orderBy
      );
      const {
        totalDocs,
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = data;
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${data.docs.length} productos`,
        payload: data.docs,
        totalDocs: totalDocs,
        totalPages: totalPages,
        prevPage: hasPrevPage ? prevPage : null,
        nextPage: hasNextPage ? nextPage : null,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${data.limit}&pagina=${prevPage}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${data.limit}&pagina=${nextPage}`
          : null,
      });
    } catch (e) {
      console.log(e);
      return res.status(501).render("error", { error: "Error en el servidor" });
    }
  };
  
  createProduct = async (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Por favor completa todos los campos");
        return res
          .status(400)
          .render("error", { error: "Por favor completa todos los campos" });
      }
      const ProductCreated = await productService.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      return res.status(201).json({
        status: "success",
        msg: "Producto Creado",
        payload: {
          _id: ProductCreated._id,
          title: ProductCreated.title,
          description: ProductCreated.description,
          price: ProductCreated.price,
          thumbnail: ProductCreated.thumbnail,
          code: ProductCreated.code,
          stock: ProductCreated.stock,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).render("error", { error: "Error en el servidor" });
    }
  };
  
  updateProduct = async (req, res) => {
    try {
      const { _id } = req.params;
      const { title, description, price, thumbnail, code, stock } = req.body;
      if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        !stock ||
        !_id
      ) {
        console.log("Por favor completa todos los campos");
        return res
          .status(400)
          .render("error", { error: "Por favor completa todos los campos" });
      }
      try {
        const productUpdated = await productService.update({
          _id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
        if (productUpdated.matchedCount > 0) {
          return res.status(201).json({
            status: "success",
            msg: "product uptaded",
            payload: `Has actualizado el producto con ID ${_id}`,
          });
        } else {
          return res.status(404).json({
            status: "error",
            msg: "product not found",
            payload: {},
          });
        }
      } catch (e) {
        return res
          .status(500)
          .render("error", { error: "Error al actualizar el producto" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).render("error", { error: "Error en el servidor" });
    }
  }
  
  delete = async (req, res) => {
    try {
      const { _id } = req.params;
  
      const result = await productService.delete(_id);
  
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "Producto Eliminado",
          payload: `Has eliminado el producto con ID ${_id}`,
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "El producto no existe",
          payload: {},
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).render("error", { error: "Error en el servidor" });
    }
  }
}

export default new productApiController()
