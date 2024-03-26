const express = require("express");
const router = express.Router();
const authorizeUser = require("../middlewares/authUser");
const authenticateUser = require("../middlewares/authMiddleware");

// Import controllers
const employeeController = require("../controller/Employee");
const departmentController = require("../controller/Department");
const userController = require("../controller/User");
const companyController=require("../controller/Company");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/company",companyController.create);
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API endpoints for managing employees
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               joiningDate:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               primarySkills:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               managerId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Employee created successfully
 *       '400':
 *         description: Bad request
 */
router.post(
  "/employees",
  authenticateUser,
  authorizeUser(["admin"]),
  employeeController.create
);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */

router.get("/employees", employeeController.getAll); // Get all employees
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */

router.get("/employees/:id", employeeController.getById); // Get employee by ID
/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 */
router.put("/employees/:id", employeeController.update); // Update employee by ID
/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */

router.delete("/employees/:id", employeeController.delete); // Delete employee by ID

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API endpoints for managing departments
 */

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     description: Create a new department record.
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentName:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Department created successfully.

 *   get:
 *     summary: Get all departments
 *     description: Retrieve a list of all departments.
 *     tags: [Departments]
 *     responses:
 *       '200':
 *         description: A successful response with the list of departments.

 */

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     description: Retrieve a department by its ID.
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Department ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the department details.
 *       '404':
 *         description: Department not found.

 *   put:
 *     summary: Update department by ID
 *     description: Update details of an existing department.
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Department ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Department updated successfully.
 *       '404':
 *         description: Department not found.

 *   delete:
 *     summary: Delete department by ID
 *     description: Delete an existing department.
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Department ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Department deleted successfully.
 *       '404':
 *         description: Department not found.
 */

// Departments Routes
router.post("/departments", authenticateUser,
authorizeUser(["admin"]), departmentController.create); // Create a new department
router.get("/departments", departmentController.getAll); // Get all departments
router.get("/departments/:id", departmentController.getById); // Get department by ID
router.put("/departments/:id", departmentController.update); // Update department by ID
router.delete("/departments/:id", departmentController.delete); // Delete department by ID

module.exports = router;
