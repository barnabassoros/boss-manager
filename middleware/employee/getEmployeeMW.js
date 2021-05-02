/**
 * Load a employee from the database using the :employeeid param
 * The result is saved to res.locals.employee
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');
    function formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let fullDate = year+"-";
        if(month<10) {
            month="0"+month;
        }
        fullDate+=month+"-";
        if(day<10) {
            day="0"+day;
        }
        fullDate += day;
        return fullDate;
    }
    return function (req, res, next) {
        EmployeeModel.findOne({_id:req.params.employeeid})
        .populate('_employer').exec((err,employee) => {
            if(err) {
                return next(err);
            }
            res.locals.employee = employee;
            res.locals.formattedDate = formatDate(employee.dateOfBirth);
            return next();
        })
    };
};