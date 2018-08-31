let obj = {
    name: 'bob',
    get_name(){
        console.log(this.name);
    }
};
module.exports = obj;