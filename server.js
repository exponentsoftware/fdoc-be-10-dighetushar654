const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;


const db = require("./models");
db.sequelize.sync({force: false});


const todoRoutes = require("./routes/todo.routes");
const userRoutes = require("./routes/user.routes");
const comentRoutes = require("./routes/coment.routes");
const tagRoutes = require("./routes/tag.routes");
const excelRoutes = require("./routes/exelFile.routes");
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);
app.use("/coment", comentRoutes);
app.use("/tag", tagRoutes);
app.use("/getExcelFile", excelRoutes);



app.listen(PORT, () => {
    console.log(`server is runing on port no -- ${PORT}`);
});