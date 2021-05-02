  
/**
 * Load all employees from the database
 * The result is saved to res.locals.employees
 */
const requireOption = require('../requireOption');
const getAge = require('age-by-birthdate');

module.exports = function (objectrepository) {
    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');
    return function (req, res, next) {

        EmployeeModel.find({})
        .populate('_employer').exec((err,employees) => {
            if(err) {
                return next(err);
            }
            res.locals.employees = employees;
            res.locals.employees.forEach(element => {
                element.age = getAge(element.dateOfBirth);
            });
            return next();
        })
        
    };
};