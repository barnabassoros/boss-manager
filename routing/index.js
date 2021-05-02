const renderMW = require('../middleware/renderMW');
const delBossMW = require('../middleware/boss/delBossMW');
const getBossesMW = require('../middleware/boss/getBossesMW');
const getBossMW = require('../middleware/boss/getBossMW');
const saveBossMW = require('../middleware/boss/saveBossMW');
const delEmployeeMW = require('../middleware/employee/delEmployeeMW');
const getEmployeesMW = require('../middleware/employee/getEmployeesMW');
const getEmployeeMW = require('../middleware/employee/getEmployeeMW');
const saveEmployeeMW = require('../middleware/employee/saveEmployeeMW');
const getEmployeesForBossMW = require('../middleware/employee/getEmployeesForBossMW');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const BossModel = require('../models/boss');
const EmployeeModel = require('../models/employee');

module.exports = function(app, rootdir) {
    const objRepo = {
        BossModel:BossModel,
        EmployeeModel:EmployeeModel
    };

   


    app.use(
        '/boss/new',
        upload.single("profile"),
        saveBossMW(objRepo),
        renderMW(objRepo, 'bossform')
    );
    app.use(
        '/boss/edit/:bossid',
        upload.single("profile"),
        getBossMW(objRepo),
        saveBossMW(objRepo),
        renderMW(objRepo, 'bossform')
    );
    app.get(
        '/boss/del/:bossid',
        getBossMW(objRepo),
        delBossMW(objRepo, rootdir)
    );
    app.use(
        '/boss/profile/:bossid',
        getBossMW(objRepo),
        getEmployeesForBossMW(objRepo),
        renderMW(objRepo, 'bossprofile')
    );
    app.use(
        '/employeelist',
        getEmployeesMW(objRepo),
        renderMW(objRepo, 'employeelist')
    );
    app.use(
        '/employee/new',
        upload.single("profile"),
        saveEmployeeMW(objRepo),
        renderMW(objRepo, 'employeeform')
    );
    app.use(
        '/employee/edit/:employeeid',
        upload.single("profile"),
        getEmployeeMW(objRepo),
        saveEmployeeMW(objRepo),
        renderMW(objRepo, 'employeeform')
    );
    app.get(
        '/employee/del/:employeeid',
        getEmployeeMW(objRepo),
        delEmployeeMW(objRepo, rootdir),
    );
    app.use(
        '/employee/profile/:employeeid',
        getEmployeeMW(objRepo),
        renderMW(objRepo, 'employeeprofile')
    );
    app.use('/profilepic/:id',
    function(req, res,next) {
        if(req.params.id=='none') {
            res.sendFile(`${rootdir}/uploads/noimg.jpg`)
        } else {
        res.sendFile(`${rootdir}/uploads/${req.params.id}`);
        }
    });
    app.use(
        '/',
        getBossesMW(objRepo),
        renderMW(objRepo, 'index'));


};