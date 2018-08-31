let config = require('./config.json');
let base = require('./base');
module.exports = () => {
    let name = base.name;
    return "<h3>"+ config.greetText +name+"</h3>";
};
