import { ProductsSchema } from '../../schemas/products.schema.js';

class ProductsDAO {
  async get() {
    try {
      const products = await ProductsSchema.find({});
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const count = await ProductsSchema.countDocuments();
      return count;
    } catch (error) {
      throw new Error('Error al obtener el número total de productos');
    }
  }
  async getAllWithPag(filter, option) {
    try {
      const queryResult = await ProductsSchema.paginate(filter, option);
      return queryResult;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(_id) {
    try {
      const productById = await ProductsSchema.findOne({ _id: _id });
      return productById;
    } catch (error) {
      console.log(error);
    }
  }

  async getRendering({ options }) {
    const products = await ProductsSchema.find({}, options).lean();
    return products;
  }

  async create(options) {
    const ProductCreated = await ProductsSchema.create({ options });
    return ProductCreated;
  }

  async update({ _id, options }) {
    const productUpdated = await ProductsSchema.updateOne({ _id: _id }, { options });
    return productUpdated;
  }

  async delete(id) {
    const result = await ProductsSchema.deleteOne({ _id: id });
    return result;
  }
}

export const productsDAO = new ProductsDAO();
