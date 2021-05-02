  
/**
 * Load all bosses from the database
 * The result is saved to res.locals.bosses
 */
const getAge = require('age-by-birthdate');
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    
    const BossModel = requireOption(objectrepository, 'BossModel');
    return function (req, res, next) {
        BossModel.find({}, (err, bosses) => {
            if(err) {
                return next(err);
            }
            res.locals.bosses = bosses;
            res.locals.bosses.forEach(element => {
                element.age = getAge(element.dateOfBirth);
            });
            return next();
        });
        
    };
};