const expect = require('chai').expect;

describe('Hexa-CMS 核心业务逻辑测试', function() {

    it('应当能正确解析标签字符串为数组 (同步测试)', function() {
        const tagsStr = "Node.js,React,Agile";
        const tagsArr = tagsStr.split(',');

        expect(tagsArr).to.be.an('array');
        expect(tagsArr).to.have.lengthOf(3);
        expect(tagsArr).to.include('React');
    });

    it('数据库异步查询超时模拟测试 (异步测试)', function(done) {
        setTimeout(() => {
            const mockDbResult = { title: "学习 Node 测试", author: "admin" };

            expect(mockDbResult).to.have.property('author').with.equal('admin');

            done();
        }, 1000);
    });

});
