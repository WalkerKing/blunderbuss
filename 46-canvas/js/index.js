let  gco= [];
gco.push("source-atop");
gco.push("source-in");
gco.push("source-out");
gco.push("source-over");
gco.push("destination-atop");
gco.push("destination-in");
gco.push("destination-out");
gco.push("destination-over");
gco.push("lighter");
gco.push("copy");
gco.push("xor");
let  c=document.getElementById("c1");
c.width=500;
c.height=300;
let  ctx=c.getContext("2d");
let img1 = new Image();
img1.src = './img/3倍图.png';
let img2 = new Image();
img2.src = './img/未标题-1.png';
img1.onload = () => {
    ctx.drawImage(img1,100,10);
};
img2.onload = () => {
    ctx.globalCompositeOperation='xor';
    ctx.drawImage(img2,30,30);
};

