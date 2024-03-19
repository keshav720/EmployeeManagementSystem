module.exports = (sequelize, Sequelize) => {
    const EmployeeDetails = sequelize.define(
      "employees",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        employeeName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        joiningDate: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        jobTitle: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        primarySkills: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        managerId: {
            type: Sequelize.STRING,
            allowNull: true,
          },
        departmentId: {
            type: Sequelize.STRING,
            allowNull: false,
          },
    
      },
      {
        timestamps: true,
      }
    );
  
    return EmployeeDetails;
  };
  