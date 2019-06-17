const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Employee = require('./models/employee');

const app = express();

mongoose.connect("mongodb+srv://assignment_user:U2WKGhpcjWPvNyir@assignment-db-zlisk.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=>{
    console.log('Connected to database.');
  })
  .catch(()=>{
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/employees', (req, res, next) => {

  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    department: req.body.department,
    basicSalary: req.body.basicSalary,
    designation: req.body.designation
  });
  employee.save(employee).then( createdEmployee => {
    res.status(201).json({
      message: "Employee added successfully!",
      employeeId: createdEmployee._id
    });
  });

});

app.put('/api/employees/:id', (req, res, next) => {

  const employee = new Employee({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    department: req.body.department,
    basicSalary: req.body.basicSalary,
    designation: req.body.designation
  });
  Employee.updateOne({ _id: req.params.id }, employee).then( result => {
    console.log(result);
    res.status(200).json({message: "Updated successful!"})
  });
});

app.get('/api/employees', (req, res, next) => {
  Employee.find()
  .then(documents => {
    res.status(200).json({
      message: "Employees fetched successfully",
      employees: documents
    });
  });

});

app.get('/api/employees', (req, res, next) => {
  Employee.findById(req.params.id).then( employee => {
    if(employee){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Employee not found!"});
    }
  });
});

app.delete('/api/employees/:id', (req, res, next) => {

  Employee.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({ message: "Employee deleted!" });
  })
});
module.exports = app;

