import { productsDAO } from "../DAO/daos/products/products.mongo.dao.js";

class ProductService {
  async getAll() {
    const products = await ProductsSchema.find({});
    return products;
  }
  async getAllCount() {
    try {
      const count = await ProductsSchema.countDocuments();
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

    const queryResult = await ProductsSchema.paginate(query, {
      page: pagina || 1,
      limit: limit || 5,
      sort: sortOptions,
    });

    return queryResult;
  }

  async getProductById(_id) {
    const productById = await ProdModel.findOne({ _id: _id });
    return productById;
  }

  async getAllRendering() {
    const products = await ProductsSchema.find(
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
    ).lean();
    return products;
  }

  async createOne({ title, description, price, thumbnail, code, stock }) {
    const ProductCreated = await ProductsSchema.create({
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
    const productUpdated = await ProductsSchema.updateOne(
      { _id: _id },
      { title, description, price, thumbnail, code, stock }
    );
    return productUpdated;
  }

  async deleteOne(id) {
    const result = await ProductsSchema.deleteOne({ _id: id });
    return result;
  }
}

export const productService = new ProductService();