  /**
 * Removes a employee from the database, the entity used here is: res.locals.employee
 * Redirects to /employees after delete
 */
const requireOption = require('../requireOption');
module.exports = function (objectrepository, rootDir) {
    return function (req, res, next) {
        if(typeof res.locals.employee === 'undefined') {
            return next();
        }  
        res.locals.employee.remove((err) => {
                if(err){
                console.error(err);
                }
            
            return next(err);
        });
        res.redirect('/employeelist');
    };
};