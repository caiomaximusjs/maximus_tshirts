const routes = require("express").Router();
const TshirtController = require("../controllers/TshirtControllers");


//Principal
routes.get("/", TshirtController.getAll);
//Detalhes
routes.get("/tshirt/:id", TshirtController.getById);
routes.get("/criar", TshirtController.criar);
routes.post("/create", TshirtController.create);
routes.get("/updater/:id", TshirtController.updater);
routes.post("/update/:id", TshirtController.update);
routes.get("/deletar/:id", TshirtController.deletar);
routes.post("/pesquisa", TshirtController.pesquisaProduto)

module.exports = routes;