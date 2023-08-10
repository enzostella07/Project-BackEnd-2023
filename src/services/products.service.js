import { productsDAO } from "../DAO/daos/products/products.mongo.dao.js";

class ProductService {
  async getAll() {
    const products = await productsDAO.get({});
    return products;
  }

  async getAllCount() {
    try {
      const count = await productsDAO.getAll({});
      return count;
    } catch (error) {
      throw new Error("Error al obtener el número total de productos");
    }
  }
  
  async getAllWithPagination(limit, pagina, category, orderBy) {
    const query = {};
    if (category) {
      query.category = category;
    }

    const sortOptions = {};
    if (orderBy === "asc") {
      sortOptions.price = 1;
    } else if (orderBy === "desc") {
      sortOptions.price = -1;
    }

    const queryResult = await productsDAO.getAllWithPag(query, {
      page: pagina || 1,
      limit: limit || 5,
      sort: sortOptions,
    });

    return queryResult;
  }

  async getProductById(_id) {
    try {
      const productById = await productsDAO.getById(_id);
      return productById;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRendering() {
    const products = await productsDAO.getRendering(
      {},
      {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        thumbnail: 1,
        code: 1,
        stock: 1,
      }
    );
    return products;
  }

  async createOne({ title, description, price, thumbnail, code, stock }) {
    const ProductCreated = await productsDAO.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    return ProductCreated;
  }

  async updateOne({ _id, title, description, price, thumbnail, code, stock }) {
    const productUpdated = await productsDAO.update(
      { _id: _id },
      { title, description, price, thumbnail, code, stock }
    );
    return productUpdated;
  }

  async deleteOne(id) {
    const result = await productsDAO.delete(id);
    return result;
  }
}

export const productService = new ProductService();
