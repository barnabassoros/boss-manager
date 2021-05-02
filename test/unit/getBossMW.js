var expect = require('chai').expect;
var getBossMW = require('../../middleware/boss/getBossMW');

describe('getBoss middleware ', function () {

  it('should return boss with id 1 from db and put it to res.locals.boss', function (done) {
    const mw =getBossMW({
        BossModel: {
            findOne: (p1,cb) => {
                expect(p1).to.be.eql({_id:'1'});
                cb(null,{
                    name:'name1',
                    dateOfBirth:new Date("1990-12-10"),
                    nickName:'nick1',
                    wealth:12,
                    picture:'pic1'
                });
            }
        }
    });

    const resMock = {
        locals: {}
    }
    mw({
        params: {
            bossid:'1'
        }
    },
    resMock,
    (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({boss: {
            name:'name1',
            dateOfBirth:new Date("1990-12-10"),
            nickName:'nick1',
            wealth:12,
            picture:'pic1'
        }, formattedDate: '1990-12-10'});
        done();
    })

  });
  it('should return with db error', function (done) {
    const mw =getBossMW({
        BossModel: {
            findOne: (p1,cb) => {
                expect(p1).to.be.eql({_id:'1'});
                cb('dbError',null);
            }
        }
    });

    const resMock = {
        locals: {}
    }
    mw({
        params: {
            bossid:'1'
        }
    },
    resMock,
    (err) => {
        expect(err).to.be.eql('dbError');
        done();
    })

  });
  it('should return boss not found err', function (done) {
    const mw =getBossMW({
        BossModel: {
            findOne: (p1,cb) => {
                expect(p1).to.be.eql({_id:'1'});
                cb(undefined,null);
            }
        }
    });

    const resMock = {
        locals: {}
    }
    mw({
        params: {
            bossid:'1'
        }
    },
    resMock,
    (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({})
        done();
    })

  });
});
