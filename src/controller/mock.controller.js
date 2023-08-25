import EErros from '../services/errors/enums.js';
import { genereteUserErrorInfo } from '../services/errors/info.js';
import { mockProducts } from '../services/mock.service.js';

class MockController {
  getMockingProducts = (req, res) => {
    const response = mockProducts.getAllProducts();
    res.status(response.status).json(response.result);
  };

  addMockgingProduct = (req, res) => {
    const product = req.body;

    if (!product.title || !product.description || !product.price) {
      customError.createError({
        name: 'MissingDataError',
        cause: genereteUserErrorInfo(product),
        message: 'Missing data',
        code: EErros.PRODUCTS_ERROR,
      });
    }

    product.push(product);
    res.send({ status: 'ok', payload: product });
  };
}

export const mockController = new MockController();
