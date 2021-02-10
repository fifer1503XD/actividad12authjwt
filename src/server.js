import app from "./index";
import dotenv from "dotenv";
const authRoute=require("./routes/auth");


dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});