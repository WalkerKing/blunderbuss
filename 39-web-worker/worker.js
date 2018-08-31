
onmessage = function(e){
    console.log(e.data);
    postMessage('worker线程收到信息并返回该信息');
};