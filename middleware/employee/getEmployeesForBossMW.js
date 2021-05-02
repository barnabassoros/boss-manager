  
/**
 * Load all employees for a boss from the database
 * The result is saved to res.locals.employees
 */
const requireOption = require('../requireOption');
const getAge = require('age-by-birthdate');

module.exports = function (objectrepository) {
    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');
    return function (req, res, next) {

        EmployeeModel.find({_employer:req.params.bossid},(err,employees) => {
            if(err) {
                return next(err);
            }
            res.locals.employeesForBoss = employees;
            res.locals.employeesForBoss.forEach(element => {
                element.age = getAge(element.dateOfBirth);
            });
            return next();
        });
        
    };
};