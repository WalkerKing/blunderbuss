<template>
    <transition name="fade">
        <div v-show="popupVisible" class="yqpopup yqpopup-bottom">
            <!--省份简称键盘-->
            <div class="area-tag-wrap" v-if="!showNum">
                <div class="com-btn" @click="complete">完成</div>
                <div class="flex first-line">
                    <span
                        class="flex1"
                        v-for="(item,index) in area[0]"
                        :key="index"
                        @click="selectPlateArea(item)"
                    >{{ item }}</span>
                </div>
                <div class="flex first-line mt-3">
                    <span
                        class="flex1"
                        v-for="(item,index) in area[1]"
                        :key="index"
                        @click="selectPlateArea(item)"
                    >{{ item }}</span>
                </div>
                <div class="flex first-line mt-3">
                    <span
                        class="flex1"
                        v-for="(item,index) in area[2]"
                        :key="index"
                        @click="selectPlateArea(item)"
                    >{{ item }}</span>
                </div>
                <div class="flex first-line mt-3">
                    <span
                        class="flex1"
                        :class="{'bg-del': item === 'del','bg-yes': item === 'yes'}"
                        v-for="(item,index) in area[3]"
                        :key="index"
                        @click="selectPlateArea(item)"
                    >{{ item === 'del' || item === 'yes' ? '' : item }}</span>
                </div>
            </div>
            <!--数字与字母键盘-->
            <div class="area-tag-wrap" v-if="showNum">
                <div class="com-btn" @click="complete">完成</div>
                <div class="flex first-line" v-if="plateNum.length!=0">
                    <span
                        class="flex1"
                        v-for="(item,index) in num[0]"
                        :key="index"
                        @click="selectOtherNum(item)"
                    >{{ item }}</span>
                </div>
                <div class="flex first-line" v-else>
                    <span
                        class="flex1 flexWhite"
                        v-for="(item,index) in num[0]"
                        :key="index"
                    >{{ item }}</span>
                </div>
                <div class="flex first-line mt-3">
                    <span
                        class="flex1"
                        v-for="(item,index) in num[1]"
                        :key="index"
                        @click="selectOtherNum(item)"
                    >{{ item }}</span>
                    <span class="flex1" @click="selectOtherNum('O')" v-if="plateNum.length === 0">O</span>
                    <span class="flex1 flexWhite" v-else>O</span>
                    <span class="flex1" v-if="plateNum.length>=5" @click="showOtherWord()">字</span>
                    <span class="flex1 flexWhite" v-else>字</span>
                </div>
                <div class="flex first-line mt-3">
                    <span
                        class="flex1"
                        v-for="(item,index) in num[2]"
                        :key="index"
                        @click="selectOtherNum(item)"
                    >{{ item }}</span>
                </div>
                <div class="flex first-line mt-3">
                    <span
                        class="flex1"
                        :class="{'bg-del': item === 'del','bg-yes': item === 'yes'}"
                        v-for="(item,index) in num[3]"
                        :key="index"
                        @click="selectOtherNum(item)"
                    >{{ item === 'del' || item === 'yes' ? '' : item }}</span>
                </div>
            </div>
            <!--字键盘-->
            <div class="word" v-show="showWord">
                <div class="flex">
                    <span
                        class="flex1"
                        v-for="(item,index) in word"
                        :key="index"
                        @click="selectWord(item)"
                    >{{ item }}</span>
                </div>
                <i id="triangle-down"></i>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: ['popupVisible', 'showNum'],
    data() {
        return {
            plateNum: '',
            showWord: false,
            area: [
                ['京', '沪', '粤', '浙', '苏', '津', '冀', '川', '渝', '鄂'],
                ['闽', '陕', '鲁', '湘', '辽', '皖', '赣', '豫', '桂'],
                ['晋', '云', '黑', '贵', '吉', '琼', '甘', '蒙'],
                ['yes', '新', '青', '宁', '藏', '使', 'del'],
            ], // 省份简称键盘参数
            num: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'del'],
            ], // 数字与字母键盘（车牌号中没有I，老式警车含有O的进行特殊处理，只能在第二位输入O，其他为不能选中）
            word: ['港', '澳', '学', '警', '领', '挂'], // 文字键盘
        };
    },
    mounted() {
    },
    methods: {
        // 省份简称键盘
        selectPlateArea(item) {
            this.$emit('selectPlateArea', item);
            this.showWord = false;
        },
        // 字母与数字键盘
        selectOtherNum(item) {
            this.$emit('selectOtherNum', item);
            if (item === 'del') {
                const plateNumArr = this.plateNum.split('');
                plateNumArr.splice(plateNumArr.length - 1, 1);
                this.plateNum = plateNumArr.join('');
                return;
            }
            this.plateNum = this.plateNum + item;
        },
        // 文字键盘
        selectWord(item) {
            this.$emit('selectWord', item);
            if (item === 'del') {
                const plateNumArr = this.plateNum.split('');
                plateNumArr.splice(plateNumArr.length - 1, 1);
                this.plateNum = plateNumArr.join('');
                return;
            }
            this.plateNum = this.plateNum + item;
            this.showWord = false;
        },
        // 文字键盘是否显示
        showOtherWord() {
            this.showWord = !this.showWord;
        },
        // 完成
        complete() {
            this.showWord = false;
            this.$emit('selectPlateArea', 'yes');
        },
    },
};
</script>
<style scoped>
.yqpopup {
    width: 100%;
    position: fixed;
    background: #fff;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: 0.2s ease-out;
}
.yqpopup-bottom {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
}
.area-tag-wrap {
    /*padding: .25rem .2rem .13rem .2rem;*/
    padding-bottom: 0.4rem;
    background-color: #caced3;
    position: relative;
}
.first-line {
    display: -moz-box;
    display: -webkit-box;
    display: box;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    box-pack: center;
    justify-content: center;
}
.word {
    position: absolute;
    bottom: 3.5rem;
    right: 0;
    z-index: 1000;
    background-color: #666666;
    padding: 0.05rem 0.05rem;
}
.word span {
    display: block;
    margin: 0 0.01rem;
    min-width: 0.75rem;
    height: 0.85rem;
    line-height: 0.85rem;
    text-align: center;
    font-size: 0.36rem;
    color: #333;
    width: 0.75rem;
    border-radius: 0.05rem;
    background-color: #fff;
}
#triangle-down {
    position: absolute;
    top: 0.9rem;
    right: 0.3rem;
    width: 0;
    height: 0;
    border-left: 0.15rem solid transparent;
    border-right: 0.15rem solid transparent;
    border-top: 0.2rem solid #666666;
}
.first-line span {
    display: block;
    margin: 0 0.01rem;
    max-width: 0.72rem;
    /*width: 0.72rem;*/
    height: 0.85rem;
    line-height: 0.85rem;
    text-align: center;
    font-size: 0.36rem;
    color: #333;
    border-radius: 0.05rem;
    background-color: #fff;
}
.first-line span.flexWhite {
    background-color: #dddddd;
}
.mt-3 {
    margin-top: 0.2rem;
}
.first-line span. .bg-del {
    width: 1.2rem;
}
/* .bg-del {
    background: url("btn_cuowu@2x.png") no-repeat center center;
    background-size: 110% 110%;
    width: 100%;
    height: 100%;
}
.bg-yes {
    background: url("btn_zhengque@2x.png") no-repeat center center;
    background-size: 110% 110%;
    width: 100%;
    height: 100%;
} */

.com-btn {
    text-align: right;
    background: #f4f4f4;
    font-size: 0.32rem;
    padding-right: 0.2rem;
    line-height: 0.65rem;
    margin-bottom: 0.2rem;
}
</style>
