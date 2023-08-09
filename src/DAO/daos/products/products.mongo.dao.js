import { ProductsSchema } from "../../schemas/products.schema.js";

class ProductsDAO {
  async get() {
    const products = await ProductsSchema.find({});
    return products;
  }
  async getAll() {
    try {
      const count = await ProductsSchema.countDocuments();
      return count;
    } catch (error) {
      throw new Error("Error al obtener el número total de productos");
    }
  }
  async getAllWithPag(limit, pagina, category, orderBy) {
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

  async getById(_id) {
    const productById = await ProdModel.findOne({ _id: _id });
    return productById;
  }

  async getRendering() {
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

  async create({ title, description, price, thumbnail, code, stock }) {
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

  async update({ _id, title, description, price, thumbnail, code, stock }) {
    const productUpdated = await ProductsSchema.updateOne(
      { _id: _id },
      { title, description, price, thumbnail, code, stock }
    );
    return productUpdated;
  }

  async delete(id) {
    const result = await ProductsSchema.deleteOne({ _id: id });
    return result;
  }
}

export const productsDAO = new ProductsDAO();
