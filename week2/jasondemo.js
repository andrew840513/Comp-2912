var jsonDoc = require('./sample.json');

console.log(jsonDoc.firstName);
console.log(jsonDoc.lastName);

var employee = {name: 'John', age: 34};

var employeeJSON = JSON.stringify(employee);

console.log(employeeJSON);

var employeeObject = JSON.parse(employeeJSON);

console.log(employeeObject);