  /**
 * Removes a boss from the database, the entity used here is: res.locals.boss
 * Redirects to / after delete
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository, rootDir) {
    const BossModel = requireOption(objectrepository, 'BossModel');
    const EmployeeModel = requireOption(objectrepository, 'EmployeeModel');
    return function (req, res, next) {
        if(typeof res.locals.boss === 'undefined') {
            return next();
        }  
        EmployeeModel.remove({_employer:res.locals.boss._id}, (err) => {
                if(err){
                console.error(err);
                }
            });
            res.locals.boss.remove(err => {
                
                return next(err);
            })
        res.redirect('/');
    };
};