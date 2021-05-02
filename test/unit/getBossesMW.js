var expect = require('chai').expect;
var getBossesMW = require('../../middleware/boss/getBossesMW');

describe('getBosses middleware ', function () {
    it('should return bosses from db and put it to res.locals.bosses', function (done) {
        const mw =getBossesMW({
            BossModel: {
                find: (p1,cb) => {
                    cb(null,[{
                        name:'name1',
                        dateOfBirth:new Date("1990-12-10"),
                        nickName:'nick1',
                        wealth:12,
                        picture:'pic1'
                    },
                    {
                        name:'name2',
                        dateOfBirth:new Date("1990-12-10"),
                        nickName:'nick2',
                        wealth:12,
                        picture:'pic2'
                    }]);
                }
            }
        });

        const resMock = {
            locals: {}
        }
        mw({},
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({bosses: [{
                name:'name1',
                dateOfBirth:new Date("1990-12-10"),
                nickName:'nick1',
                wealth:12,
                picture:'pic1',
                age:30
            },
            {
                name:'name2',
                dateOfBirth:new Date("1990-12-10"),
                nickName:'nick2',
                wealth:12,
                picture:'pic2',
                age:30
            }]});
            done();
        })
    });

    it('should return with db error', function (done) {
        const mw =getBossesMW({
            BossModel: {
                find: (p1,cb) => {
                    cb('dbError',null);
                }
            }
        });
    
        const resMock = {
            locals: {}
        }
        mw({},
        resMock,
        (err) => {
            expect(err).to.be.eql('dbError');
            done();
        })
    
      });
});