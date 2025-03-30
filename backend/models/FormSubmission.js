const mongoose = require("mongoose");

const FormSubmissionSchema = new mongoose.Schema({
  employeeName: String,
  employeeEmail: String,
  employeePassword: String,
  birthDate: String,
  employeeID: String,
  agreeToTerms: Boolean,
  employmentType: String,
  address: String,
  department: String,
  resume: String, // This should be a file path if stored in disk
});

const FormSubmission = mongoose.model("FormSubmission", FormSubmissionSchema);

module.exports = FormSubmission;
