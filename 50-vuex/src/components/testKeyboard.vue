<template>
    <div class="inputKey">
        <div class="list-item border-bottom">
            <span>车牌号码</span>
            <div class="inputWrap" @click="showPlateKeyBoard">
                <span class="focus" v-show="popupVisible"></span>
                <span class="input-text"></span>
            </div>
            <input
                type="text"
                minlength="8"
                class="licence-plate"
                placeholder="请输入车牌号"
                v-model="plateNum"
                maxlength="15"
                @click="showPlateKeyBoard"
                readonly
            />
        </div>
        <plate-key-board
            :popup-visible="popupVisible"
            :show-num="showNum"
            @selectPlateArea="selectArea"
            @selectOtherNum="selectNum"
            @selectWord="selectWord"
        ></plate-key-board>
    </div>
</template>

<script>
import plateKeyBoard from './Keyboard';

export default {
    data() {
        return {
            popupVisible: true, // 隐藏或显示
            showNum: false, // 数字键盘是否显示
            plateNum: '', // 车牌号
        };
    },
    components: {
        plateKeyBoard,
    },

    methods: {
        // 省份简称
        selectArea(item) {
            if (item === 'del') {
                return;
            }
            if (item === 'yes') {
                this.popupVisible = false;
                return;
            }
            this.plateNum = '';
            this.plateNum = this.plateNum + item;
            this.showNum = true;
        },
        // 数字
        selectNum(item) {
            if (item === 'del') {
                const plateNumArr = this.plateNum.split('');
                plateNumArr.splice(plateNumArr.length - 1, 1);
                this.plateNum = plateNumArr.join('');
                if (this.plateNum === '') {
                    this.showNum = false;
                }
                return;
            } else if (item === 'yes') {
                this.popupVisible = false;
                return;
            }
            if (this.plateNum.length >= 8) {
                return;
            }
            if (this.plateNum.length === 1) {
                const reg = /\d/;
                if (reg.test(item)) {
                    return;
                }
            }
            this.plateNum = this.plateNum + item;
            if (this.plateNum.length === 8) {
                this.popupVisible = false;
                setTimeout(() => {
                    this.showNum = false;
                }, 200);
            }
        },
        // 文字
        selectWord(item) {
            if (item === 'del') {
                const plateNumArr = this.plateNum.split('');
                plateNumArr.splice(plateNumArr.length - 1, 1);
                this.plateNum = plateNumArr.join('');
                if (this.plateNum === '') {
                    this.showNum = false;
                }
                return;
            } else if (item === 'yes') {
                this.popupVisible = false;
                return;
            }
            if (this.plateNum.length >= 8) {
                return;
            }
            if (this.plateNum.length === 1) {
                const reg = /\d/;
                if (reg.test(item)) {
                    return;
                }
            }
            this.plateNum = this.plateNum + item;
            if (this.plateNum.length === 8) {
                this.popupVisible = false;
                setTimeout(() => {
                    this.showNum = false;
                }, 200);
            }
        },
        // 点击输入框是否显示自定义键盘
        showPlateKeyBoard() {
            document.activeElement.blur();
            if (this.plateNum === '') {
                this.showNum = false;
            } else {
                this.showNum = true;
            }
            this.popupVisible = !this.popupVisible;
        },
    },
};
</script>

<style scoped>
.inputKey {
    font-size: 0.3rem;
    line-height: 1rem;
    color: #333333;
}
</style>
