/**
 * Using POST params update or save a boss to the database
 * If res.locals.boss is there, it's an update otherwise this middleware creates an entity
 * Redirects to / after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const BossModel = requireOption(objectrepository, 'BossModel');
    return function (req, res, next) {

        if(
            typeof req.body.name === 'undefined' ||
            typeof req.body.dateOfBirth === 'undefined' ||
            typeof req.body.nickName === 'undefined' ||
            typeof req.body.wealth === 'undefined')
            {
            return next();
        };


        if(typeof res.locals.boss==='undefined') {
            res.locals.boss = new BossModel();
        }

        res.locals.boss.name=req.body.name;
        res.locals.boss.dateOfBirth=req.body.dateOfBirth;
        res.locals.boss.nickName=req.body.nickName;
        res.locals.boss.wealth=req.body.wealth;


        if(typeof res.locals.boss.picture === 'undefined' || res.locals.boss.picture == 'none') {
            if(typeof req.file === 'undefined') {
                res.locals.boss.picture = 'none';
            } else {
                res.locals.boss.picture = req.file.filename;
            }
        } else {
            if(typeof req.file !== 'undefined') {
                res.locals.boss.picture = req.file.filename;
            }
        }



        


        res.locals.boss.save(err => {
            if(err) {
                return next(err);
            }
            return res.redirect('/');
        })
    };
};