const { Sequelize } = require("sequelize");
const database = require("../database/db");

const Tshirt = database.sequelize.define(
  "camisa",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preco: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    imagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imagem2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updateAt: false,
  }
);

const initTable = async () =>{
  await Tshirt.sync();
}

initTable();

module.exports = Tshirt;
