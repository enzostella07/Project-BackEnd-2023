import { Server } from "socket.io";
import { MsgModel } from "../DAO/schemas/msgs.schema.js";
import { ProductsSchema } from "../DAO/schemas/products.schema.js";

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    console.log(`Nuevo usuario conectado a traves de ${socket.id}`);

    try {
      const allProducts = await ProductsSchema.find({});
      socket.emit("products", allProducts);
    } catch (e) {
      console.log(e);
    }

    socket.on("new-product", async (newProd) => {
      try {
        await ProductsSchema.create(newProd);
        const prods = await ProductsSchema.find({});
        socketServer.emit("products", prods);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("productModified", async (id, newProd) => {
      try {
        console.log("id"+id);
        console.log("new"+newProd);
        await ProductsSchema.findOneAndUpdate({ _id: id }, newProd);
        const prod = await ProductsSchema.find({});
        socketServer.emit("products", prod);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("delete-product", async (idProd) => {
      try {
        await ProductsSchema.deleteOne({ _id: idProd });
        const prods = await ProductsSchema.find({});
        socketServer.emit("products", prods);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("msg_front_to_back", async (msg) => {
      try {
        await MsgModel.create(msg);
      } catch (e) {
        console.log(e);
      }
      try {
        const msgs = await MsgModel.find({});
        socketServer.emit("listado_de_msgs", msgs);
      } catch (e) {
        console.log(e);
      }
    });
  });
}
