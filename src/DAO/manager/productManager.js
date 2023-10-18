import fs from "fs";
import { __dirname } from "../../config.js";
const productPath = `${__dirname}/data/products.JSON`;
export default class ProductManager {
  constructor() {
    this.path = productPath;
    this.products = [];
  }
  addProduct(prod) {
    let data = fs.readFileSync(this.path, "UTF-8");
    let dataParse = JSON.parse(data);
    const productExist = dataParse.find(
      (producto) => producto.code === prod.code
    );

    if (productExist) {
      console.log("El codigo del producto ya está en uso");
      return null;
    }
    let idMax = 0;
    dataParse.forEach((prod) => {
      if (prod.id > idMax) {
        idMax = prod.id;
      }
    });
    idMax++;
    const product = {
      id: idMax,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      thumbnail: prod.thumbnail,
      code: prod.code,
      stock: prod.stock,
    };
    dataParse.push(product);
    let productsStrings = JSON.stringify(dataParse);
    fs.writeFileSync(this.path, productsStrings);
    return product;
  }

  getProducts() {
    let data = fs.readFileSync(this.path, "UTF-8");
    return JSON.parse(data);
  }

  getProductsById(id) {
    let data = fs.readFileSync(this.path, "UTF-8");
    let dataParse = JSON.parse(data);
    let productFound = dataParse.find((prod) => +prod.id === +id);
    if (productFound) {
      return productFound;
    } else {
      return console.log("Not Found");
    }
  }

  updateProduct(id, updatedProduct) {
    let data = fs.readFileSync(this.path, "UTF-8");
    let dataParse = JSON.parse(data);
    const productIndex = dataParse.findIndex((product) => product.id == id);
    if (productIndex !== -1) {
      dataParse[productIndex] = {
        ...dataParse[productIndex],
        ...updatedProduct,
        id: dataParse[productIndex].id,
      };
    }
    let productsStrings = JSON.stringify(dataParse);
    fs.writeFileSync(this.path, productsStrings);
    return null;
  }

  deleteProduct(id) {
    let data = fs.readFileSync(this.path, "UTF-8");
    let dataParse = JSON.parse(data);
    let index = dataParse.findIndex((product) => +product.id === +id);
    if (index === -1) {
      console.log("product not found");
    } else {
      dataParse.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(dataParse));
      console.log("Product was deleted");
    }
  }
}