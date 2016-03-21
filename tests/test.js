var assert = require('assert');

describe('Homepage',function() {

    this.timeout(99999999);

  it('example page should look the same',function(done) {
        browser
            // .url('http://onlineclock.net/seconds/')
            .url('http://example.com/')
            .title().then(function (title) {
                console.log('Title was: ' + title.value);
            })
            .webdrivercss('examplepage',[
                {
                    name: 'body',
                    elem: 'body'
                }
            ], function(err, res) {
                assert.ifError(err);
                assert.ok(res.body[0].isWithinMisMatchTolerance);
            })
            .call(done);;
   });

});
