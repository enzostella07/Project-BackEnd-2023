import { connect } from "mongoose";
import env from "../config/config.js";

export async function connectMongo() {
  const url = env.MONGO_URL;
  try {
    await connect(url);
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log(e);
    throw "Falló la conexion";
  }
}
