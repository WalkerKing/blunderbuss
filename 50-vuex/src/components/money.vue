<template>
    <div class="page-container">
        <div>
            <h2>coin</h2>
            <button @click="init">开始动画</button>
        </div>
        <div class="wrapper" v-show="visible">
            <div
                class="item-container"
                v-for="(item, i) in Array(amount)"
                :key="i"
                :ref="`coin_${i}`"
            >
                <div class="item">1</div>
            </div>
        </div>
        <audio ref="audio">
            <source src="./getMoney.wav" />
        </audio>
    </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js';

// const TWEEN = require('@tweenjs/tween.js').default;

export default {
    props: {
        visible: true,
    },
    data() {
        return {
            amount: 10,
            children: [],
        };
    },
    mounted() {
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);
        // setInterval(() => {
        //     TWEEN.update();
        // }, 10);
    },
    methods: {
        gerateOption() {
            return {
                delay: Math.random() * 500, // 开始延时
                rotateAxis: `${Math.random() * 2}, ${Math.random() * 2}, 0`, // 旋转轴
                rotateTotal: 180 * 10,
                startPos: {
                    x: window.screen.width * Math.random(),
                    y: -100 * Math.random(),
                    rotate: 0,
                },
                endPos: {
                    x: window.screen.width * Math.random(),
                    y: window.screen.height + Math.random() * 200,
                    rotate: '+1800',
                },
            };
        },
        init() {
            // Setup the animation loop.
            this.visible = true;
            this.childrenStr = Array(this.amount).fill(1).map((k, i) => this.generateCoin(this.$refs[`coin_${i}`][0]));
        },
        generateCoin(dom) {
            const opt = this.gerateOption();
            // debugger;
            const tween = new TWEEN.Tween(opt.startPos) // Create a new tween that modifies 'coords'.
                // .delay(opt.delay)
                .to(opt.endPos, 2000) // Move to (300, 200) in 1 second.
                .onStart(() => {
                    this.$refs.audio.play();
                })
                .onComplete(() => {
                    this.visible = false;
                    this.$emit('animateEnd');
                })
                .interpolation(TWEEN.Interpolation.Linear)
                // .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate(() => {
                    // Called after tween.js updates 'coords'.
                    const translate = `translate(${opt.startPos.x}px, ${opt.startPos.y}px)`;
                    const rotate = `rotate3d(${opt.rotateAxis}, ${opt.startPos.rotate}deg)`;
                    const property = `${translate} ${rotate}`;
                    dom.style.setProperty('transform', property);
                })
                .start(); // Start the tween immediately.
        },
    },
};
</script>

<style lang="less" scoped>
.page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .wrapper {
        flex: 1;
    }
}
.item-container {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: #39bd86;
    text-align: center;
    line-height: 50px;
    position: absolute;
}
.addMoneyAnim {
    background: url("https://gw.alipayobjects.com/zos/rmsportal/fseEOKMDOXOieJiHKuQg.png")
        no-repeat;
    background-size: 420px 104px;
    width: 52px;
    height: 52px;
    animation: rotateMoney 0.45s step-start infinite;
}

.addMoneyFrame(@one, @frame, @i: 0, @name: 0%) when (@i =< @frame) {
    .addMoneyFrame(@one, @frame, @i + 1, (100% / @frame * (@i + 1)));
    @{name} {
        background-position: -(mod(@i, @one) * 52px) - (floor(@i / @one) * 52px);
    }
}

@keyframes rotateMoney {
    .addMoneyFrame(8, 15);
}
.snow-demo-wrapper {
    background: #dfeaff;
    overflow: hidden;
    height: 500px;
    display: flex;
    align-items: center;
    position: relative;
}

.snow-demo {
    width: 300px;
    height: 90%;
    margin: auto;
    position: relative;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/dNpuKMDHFEpMGrTxdLVR.jpg);
    background-position: top;
    background-size: 100% auto;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.15);
}

.snow {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
}

.snowChild {
    position: absolute;
    top: 0;
    left: 0;
}

.snowRotate {
    transform-origin: center center;
}
</style>
