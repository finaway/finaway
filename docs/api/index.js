const express = require("express");
const swaggerUi = require("swagger-ui-express");
const apiSpec = require("./swagger/api-spec.json");

const PORT = process.env.PORT || 3000

const app = express();

app.use("/", swaggerUi.serve, swaggerUi.setup(apiSpec));

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
