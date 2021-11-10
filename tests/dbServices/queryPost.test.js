const queryPost = require("../../dbServices/queryPost")
const connect = require("../../dbServices/connect")
require('dotenv').config()
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
 
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

it("test mockgoose connection", (done) => {
    mockgoose.prepareStorage().then(() => {
    
        mongoose.connect(process.env.DB_POSTS);
        mongoose.connection.on('connected', () => {  
          console.log('db connection is now open');
          it("....", () => {
              expect(1).toBe(1)
          })
          done()
        }); 
        // describe('...', function() {
        //     it("...", function(done) {
        //         const req = {
        //             filter: {_id: "60a3a62225f2e20367aa2350"},
        //         }
        //         queryPost(req, (numberOfPosts, post) => {
        //             expect(numberOfPosts).toBe(1)
        //             expect(post._id).toBe("60a3a62225f2e20367aa2350")
        //         })
        //         done();
        //     });
        // });
    });
})
