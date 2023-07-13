import { connect } from "mongoose";

export async function connectMongo() {
  try {
    await connect("mongodb+srv://enzostella07:5CWZTaHh5MDAbiIz@codercluster.ykyflk8.mongodb.net/ecommerce?retryWrites=true&w=majority");
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log(e);
    throw "Falló la conexion";
  }
}
