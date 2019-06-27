let Publisher = {
    subscribe: function(eName, cb){
        if(this.queue[eName]){
            this.queue[eName].push(cb);
        }else{
            this.queue[eName] = []
            this.queue[eName].push(cb); 
            console.log(`${eName}事件第一次被订阅`)

        }
    },
    unsubscribe: function(eName, cb){
        if(this.queue[eName] && this.queue[eName].length > 0){
            for(let i in this.queue[eName]){
                if(this.queue[eName][i] === cb) {
                    this.queue[eName].splice(i,1)
                }
            }
        }
    },
    queue: {},
    trigger: function () {
        let [eName, ...args] = [...arguments];
        if(this.queue[eName] && this.queue[eName].length > 0){
            for(let i in this.queue[eName]) {
                this.queue[eName][i](...args)
            }
        }
    }
}

Publisher.subscribe('click', function(){
    console.log('click2被触发了')
})
Publisher.subscribe('click', function(){
    console.log('click2被触发了')
})
Publisher.trigger('click')