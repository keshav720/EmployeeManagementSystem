// Import required modules
const { db } = require("../models");
const DepartmentDetails = db.DepartmentDetails;
const EmployeeDetails = db.EmployeeDetails;
const departmentController = {};

// Create department API
departmentController.create = async (req, res) => {
  try {
    const { departmentName } = req.body;
    if (!departmentName) {
      return res
        .status(404)
        .send({ success: false, msg: "Department Name not found" });
    }
    const newDepartment = await DepartmentDetails.create({
      ...req.body,
    });
    return res.status(201).send({ success: true, department: newDepartment });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Get all departments API
departmentController.getAll = async (req, res) => {
  try {
    const departments = await DepartmentDetails.findAll();
    return res.status(200).send({ success: true, departments });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Get department by ID API
departmentController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, msg: "Department Id is required" });
    }
    const department = await DepartmentDetails.findOne({ where: { id } ,
      include: [
        {
          model: db.EmployeeDetails,
          as: "employees",
        },
      ],}
      );
    if (!department) {
      return res
        .status(404)
        .send({ success: false, msg: "Department not found" });
    }
    return res.status(200).send({ success: true, department });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Update department API
departmentController.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, msg: "Department Id is required" });
    }
    const [updated] = await DepartmentDetails.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedDepartment = await DepartmentDetails.findOne({
        where: { id },
      });
      return res
        .status(200)
        .send({ success: true, department: updatedDepartment });
    }
    return res
      .status(404)
      .send({ success: false, msg: "Department not found" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Delete department API
departmentController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, msg: "Department Id is required" });
    }
    const deleted = await DepartmentDetails.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    return res
      .status(404)
      .send({ success: false, msg: "Department not found" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

module.exports = departmentController;
