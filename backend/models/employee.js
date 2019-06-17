const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  department: { type: String, required: true },
  basicSalary: { type: String, required: true },
  designation: { type: String, required: true }
})

module.exports = mongoose.model('Emplyee', employeeSchema);
