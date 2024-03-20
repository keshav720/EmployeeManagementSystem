const { db } = require("../models");
const EmployeeDetails = db.EmployeeDetails;
const DepartmentDetails = db.DepartmentDetails;
const employeeController = {};

employeeController.create = async (req, res) => {
  try {
    // Validate request body
    const { employeeName, email, phoneNumber, departmentId } = req.body;
    if (!employeeName || !email || !phoneNumber || !departmentId) {
      return res
        .status(400)
        .send({ success: false, msg: "Missing required fields" });
    }

    // Check if email already exists
    const existingEmployee = await EmployeeDetails.findOne({
      where: { email },
    });
    if (existingEmployee) {
      return res
        .status(400)
        .send({ success: false, msg: "Email already exists" });
    }
    // Check if department exists
    const existingDepartment = await DepartmentDetails.findOne({
      where: { id: departmentId },
    });
    if (!existingDepartment) {
      return res
        .status(400)
        .send({ success: false, msg: "Department not found" });
    }
    const newEmployees = await EmployeeDetails.create({
      ...req.body,
    });
    if (newEmployees) {
      return res.status(200).send({ success: true, newEmployees });
    } else {
      res.status(400).send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Get all employees API
employeeController.getAll = async (req, res) => {
  try {

    const employees = await EmployeeDetails.findAll();
    console.log("employees---",employees);
    return res.status(200).send({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Get employee by ID API
employeeController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, msg: "employee Id is required" });
    }
    const employee = await EmployeeDetails.findOne({ where: { id } });
    if (!employee) {
      return res
        .status(404)
        .send({ success: false, msg: "Employee not found" });
    }
    return res.status(200).send({ success: true, employee });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Update employee API
employeeController.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, msg: "employee Id is required" });
    }
    const [updated] = await EmployeeDetails.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedEmployee = await EmployeeDetails.findOne({ where: { id } });
      return res.status(200).send({ success: true, employee: updatedEmployee });
    }
    return res.status(404).send({ success: false, msg: "Employee not found" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

// Delete employee API
employeeController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, msg: "employee Id is required" });
    }
    const deleted = await EmployeeDetails.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).send({ success: false, msg: "Employee not found" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

module.exports = employeeController;
