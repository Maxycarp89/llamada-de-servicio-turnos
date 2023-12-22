process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import "dotenv/config";
import routes from "./routes/index.mjs";
import initConfig from "./config/index.mjs";
import  { connect } from 'mongoose';



const app = express();
initConfig(app);

app.use("/api/v1", routes);

app.listen(process.env.PORT_TEST, () => {
  console.log(`Listening on localhost:${process.env.PORT_TEST}`);
});




connect(
    "mongodb+srv://pablods267:fJvyd1GOunnROcJM@cluster0.adgnf.mongodb.net/DBTurnos"
  )
  .then(() => {
    console.log("mongodb conection ok");
  })
  .catch((err) => {
    console.log(err);
  })

