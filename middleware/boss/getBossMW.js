/**
 * Load a boss from the database using the :bossid param
 * The result is saved to res.locals.boss
 */

const requireOption = require('../requireOption');

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

module.exports = function (objectrepository) {


    const BossModel = requireOption(objectrepository, 'BossModel');
    return function (req, res, next) {
        
        BossModel.findOne({_id:req.params.bossid}, (err, boss) => {
            if(err || !boss) {
                return next(err);
            }
            res.locals.boss = boss;
            res.locals.formattedDate = formatDate(boss.dateOfBirth);
            return next();
        });
    };
};