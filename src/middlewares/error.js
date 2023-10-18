import EErros from '../services/errors/enums.js';

export default (error, req, res, next) => {
  console.log(error.cause);
  
  switch (error.code) {
    case EErros.CART_EMPTY:
      res.status(400).send({ status: 'error', error: error.name, cause: error.cause });
      break;
      case EErros.PRODUCTS_ERROR:
        res.status(400).send({ status: 'error', error: error.name, cause: error.cause });
        break;
    default:
      res.status(500).send({ error });
      break;
  }
};
