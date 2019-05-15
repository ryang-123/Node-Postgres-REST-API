module.exports = {
  up: (queryInterface, Sequelize) => {
    //You must return a promise
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      content: Sequelize.STRING(300),
      userId: Sequelize.INTEGER(11),
      //Those are added by default on insertion (make sure to create the their columns)
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    //Return a promise that drops a table in case of (migration:undo)
    return queryInterface.dropTable("users");
  }
};
