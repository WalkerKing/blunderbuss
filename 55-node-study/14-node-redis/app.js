const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log('记得启动redis ./redis-server &');
    console.log("Error " + err);
});
 
client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);

// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
// });
client.hmset("user1000", 'name', 'Bob', 'age', '10', redis.print)
client.hmget("user1000", 'name', 'age', (err, res) => console.log(res))
client.quit();