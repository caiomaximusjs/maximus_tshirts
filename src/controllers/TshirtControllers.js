const Tshirt = require("../models/Tshirts");
const Op = require("sequelize").Op;
const orderById = { order: [["id", "ASC"]] };
let message = "";
let type = "";

//GetAll
const getAll = async (req, res) => {
  try {
    const tshirts = await Tshirt.findAll(orderById);
    res.render("index", {
      tshirts,
      tshirtsPut: null,
      tshirtsDel: null,
      tshirtSearch: [],
      message,
      type
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
const getById = async (req, res) => {
  try {
    const tshirt = await Tshirt.findByPk(req.params.id);
    const tshirts = await Tshirt.findAll();
    res.render("detalhes", {
      tshirts,
      tshirtSearch: [],
      tshirt,
      message,
      type
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const criar = (req, res) => {
  try {
    res.render("criar", {message, type});
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const tshirt = req.body;
    if (!tshirt.nome || !tshirt.descricao || !tshirt.preco || !tshirt.imagem) {
      message = "Preencha todos os campos para Cadastro", 
      type = "danger"
      return res.redirect("/criar");
    }
    message = "Produto cadastrado com sucesso"
    type='sucess'
    await Tshirt.create(tshirt);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const updater = async (req, res) => {
  const tshirt = await Tshirt.findByPk(req.params.id);



  if (!tshirt) {
    res.render("update", {
      message: 'Camiseta não encontrada',
      type: 'danger'
    });
  }

  message = 'Produto editado com sucesso'
  type= 'sucess'

  res.render("update", {
    tshirt,
    message: '',
    type: ''
  });
};

const deletar = async (req, res) => {
  try {
    await Tshirt.destroy({ where: { id: req.params.id } });
    message = "Produto deletado com sucesso" 
    type = "danger"
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const update = async (req, res) => {
  try {
    const tshirt = await Tshirt.findByPk(req.params.id);
    const { nome, descricao, preco, imagem, imagem2 } = req.body;
    tshirt.nome = nome;
    tshirt.descricao = descricao;
    tshirt.preco = preco;
    tshirt.imagem = imagem;
    tshirt.imagem2 = imagem2;

   res.redirect("/")

    const updated = await tshirt.save();
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const pesquisaProduto = async (req, res) => {
  try {
    const tshirt = await Tshirt.findAll({
      where: {
        nome: {
          [Op.like]: `%${req.body.tshirt}%`,
        },
      },
      order: [["id", "ASC"]],
    });

    if (tshirt.length == 0) {
      message = 'O produto pesquisado não foi encontrado'
      type = "danger"
      return res.redirect("/");
    }
  

    res.render("index", {
      tshirts: [],
      message: `Foram encontrados ${tshirt.length} produtos`,
      type: 'sucess',
      tshirtSearch: tshirt,
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  criar,
  create,
  updater,
  update,
  deletar,
  pesquisaProduto,
};
