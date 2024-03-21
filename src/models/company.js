module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define(
      "company",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        companyId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        companyName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
    return Company;
  };
  