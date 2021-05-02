/**
 * Using POST params update or save a employee to the database
 * If res.locals.employee is there, it's an update otherwise this middleware creates an entity
 * Redirects to /employees after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');
    const BossModel = requireOption(objectrepository, 'BossModel');
    
    return function (req, res, next) {
        if(
            typeof req.body.name === 'undefined' ||
            typeof req.body.dateOfBirth === 'undefined' ||
            typeof req.body.employer === 'undefined' ||
            typeof req.body.profession === 'undefined' ||
            typeof req.body.succesRate === 'undefined' ||
            typeof req.body.loyalty === 'undefined') {
            return next();
        }
        if(typeof res.locals.employee === 'undefined') {
            res.locals.employee = new EmployeeModel();
        }


        res.locals.employee.name = req.body.name;
        res.locals.employee.dateOfBirth = req.body.dateOfBirth;
        res.locals.employee.profession = req.body.profession;
        res.locals.employee.succesRate = req.body.succesRate;
        res.locals.employee.loyalty = req.body.loyalty;

        if(typeof res.locals.employee.picture === 'undefined' || res.locals.employee.picture == 'none') {
            if(typeof req.file === 'undefined') {
                res.locals.employee.picture = 'none';
            } else {
                res.locals.employee.picture = req.file.filename;
            }
        } else {
            if(typeof req.file !== 'undefined') {
                res.locals.employee.picture = req.file.filename;
            }
        }


        BossModel.findOne({name:req.body.employer}, (err, boss) => {
            if(err) {
                return next(err);
            }
            res.locals.employee._employer = boss;
            res.locals.employee.save(err => {
                if(err) {
                    return next(err);
                }
                res.redirect('/employeelist');
            })
        });

    };
};