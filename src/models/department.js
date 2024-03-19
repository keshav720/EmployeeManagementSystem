module.exports = (sequelize, Sequelize) => {
  const DepartmentDetails = sequelize.define(
    "departments",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      departmentName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return DepartmentDetails;
};
