const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const invRouter = require("./routes/inventoryRouter.js");


app.set("view engine", "ejs");
app.use(expressLayouts);

app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", invRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
