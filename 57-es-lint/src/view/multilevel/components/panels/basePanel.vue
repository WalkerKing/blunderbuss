<template>
    <div>
        <div v-for="(o, index) in baseInfoList" :key="index" class="panel-container">
            <p class="panel-title" v-if="o.title">{{ o.title }}</p>
            <table border="1" cellspacing="0" cellpadding="0" class="table-cell">
                <tr v-for="(item, index) in o.data" :key="index">
                    <td v-for="(cell, index) in item" :key="index">
                        <p v-if="cell.type">
                            <span>{{ cell.name }}{{ cell.name === '' ? '' : '：' }}</span>
                            <span><input :type="cell.type" :value="cell.desc" @blur="inputBlur($event, cell.field)"></span>
                        </p>
                        <p v-else>
                            <span>{{ cell.name }}{{ cell.name === '' ? '' : '：' }}</span>
                            <span>{{ cell.desc }}</span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['baseInfoList'],
        methods: {
            inputBlur (e, field) {
                let ret = {};
                ret[field] = e.target.value;
                this.$emit('formEvent', ret);
            }
        }
    }
</script>

<style lang="less" scoped>
    .panel-container {
        margin-top: 10px;
        .panel-title {
            background: #f1f7fc;
            padding: 10px;
        }
    }

    .table-cell {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        tr {
            width: 100%;
            th,
            td {
                width: 33.33%;
                padding: 6px;
                text-indent: 4px;
                border-style: solid;
                border-color: #e8eaec;
                font-size: 12px !important;
                span {
                    font-size: 12px !important;
                }
            }
        }
    }
</style>
