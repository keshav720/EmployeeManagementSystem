const { db } = require("../models");
const company = db.Compnay;
const companyController = {};

// Create department API
companyController.create = async (req, res) => {
  try {
    const { companyId } = req.body;
    if (!companyId) {
      return res
        .status(404)
        .send({ success: false, msg: "companyId not found" });
    }
    const newCompany = await company.create({
      ...req.body,
    });
    return res.status(201).send({ success: true, company: newCompany });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};
companyController.getByCompanyId = async (req, res) => {
  try {
    const { compnayId } = req.params;
    if (!compnayId) {
      return res
        .status(400)
        .send({ success: false, msg: "Company Id is required" });
    }
    const companyDetails = await company.findOne({
      where: { companyId },
      include: [
        {
          model: db.User,
          as: "user",
          include: [
            {
              model: db.DepartmentDetails,
              as: "departments",
              include: [
                {
                  model: db.EmployeeDetails,
                  as: "employees",
                },
              ],
            },
          ],
        },
      ],
    });
    if (!companyDetails) {
      return res
        .status(404)
        .send({ success: false, msg: "companyDetails not found" });
    }
    return res.status(200).send({ success: true, companyDetails });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ success: false, error: error.message });
  }
};

module.exports=companyController;