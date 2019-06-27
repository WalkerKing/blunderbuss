<template>
    <Content class="content_box">
        <Form :model="form" :label-width="100" class="form_style">
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="订单号:">
                        <Input v-model="outOrderId" placeholder=""></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="借款人:">
                        <Input v-model="borrowerName" placeholder=""></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="城市:">
                        <Select v-model="cities">
                            <Option value="">请选择</Option>
                            <Option v-for="item in dictData.cityList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="资金方:">
                        <Select v-model="financeIds">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) in dictData.financingChannelList" :value="index" :key="item.value">{{
                                item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="订单性质:">
                        <Select v-model="archiveOrderType">
                            <Option v-for="(item,index) in dictData.archiveOrderTypeDic" :value="item.code" :key="item.value">{{
                                item.description }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click.native="search">搜索</Button>
                    </FormItem>
                </Col>
            </Row>
            <Row v-show="danganTransferStatus">
                <FormItem>
                    <Button class="transfer_btn" type="primary" @click.native="danganTransferHandle">档案移交</Button>
                </FormItem>
            </Row>
        </Form>
        <!-- 档案移交弹窗 -->
        <Modal v-model="danganTransferModal"
               title="选择档案资料"
               width="650"
               ok-text="提交">
            <div class="modal_body clearfix">
                <CellGroup class="modal_cell_group">
                    <div class="ivu-cell" :class="{selected: index === selectedOrder}"
                         v-for="(item, index) of transferModal" @click="changSelectLeftModal(index,item)" :key="item.value">
                        {{item.name}}
                    </div>
                </CellGroup>
                <CellGroup class="modal_cell_group modal_right_box">
                    <div class="modal_item_title" v-for="(item,index) in transferModal[selectedOrder].documentInfos"
                         :key="index">
                        <p class="modal_subtitle" v-show="item.documentConfigs.length > 0">
                            {{item.documentTypeName}}</p>
                        <p class="modal_subitem" v-for="(field,index) in item.documentConfigs">
                            <Checkbox v-model="field.isChecked" :disabled="field.disabled" @on-change="changeDocumentConfig(field)">{{field.documentName}}{{field.documentMaterial== 1?'(复印件)':'(原件)'}}</Checkbox>
                            <Button v-if="selectedOrder !== 'common'" size="small" @click="addCountHandle(field.documentCount,field.documentConfigId)">{{field.documentCount}}份
                            </Button>
                        </p>
                    </div>
                </CellGroup>
            </div>
            <div slot="footer">
                <Button type="text"  size="large" @click="danganTransferCancel">取消</Button>
                <Button type="primary" size="large" @click="danganTransferOk">提交</Button>
            </div>
        </Modal>
        <!-- 档案移交 增加数量弹窗 -->
        <Modal v-model="addCountModal"
               title="档案份数"
               @on-ok="addCountSuccess">
            <Form :label-width="100">
                <Row>
                    <Col span="10">
                        <FormItem label="档案份数:">
                            <InputNumber :min="0" v-model="count" placeholder="" size="default"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>

        <Tabs @on-click="handleTabs">
            <TabPane v-for="(item,index) in dictData.archiveStatusDic" :label="item.description" :key="index" :name="item.code + ''">
                <Table border :columns="tableColumns[archiveOrderStatus]" :data="tableData"></Table>
            </TabPane>
        </Tabs>
        <Row type="flex" justify="end">
            <Col>
                <Page
                    :style="{ padding: '24px 30px 4px 0' }"
                    :current="form.page"
                    :total="form.total"
                    :page-size="form.perPage"
                    @on-change="pageChangeHandle"></Page>
            </Col>
        </Row>
    </Content>
</template>
<script>
    import * as ajax from '@/api'
    import * as util from '@/libs/util'

    export default {
        son_order_id: 'list',
        data () {
            return {
                dictData: {},
                outOrderId: '',
                borrowerName: '',
                cities: '',
                financeIds: '',
                archiveOrderStatus: '1', //默认1 未归档
                archiveOrderType: '',

                danganTransferStatus: true,
                danganTransferModal: false,
                addCountModal: false,
                count: 0,
                count_id: null,
                danganLeftData: [
                    {
                        name: '共同档案清单',
                        selected: 1
                    }
                ],
                documentTypeConfigList: [],
                form: {
                    total: 0, // 数据总数
                    page: 1, // 当前页码
                    perPage: 10, // 每页条数
                },
                tableColumnsMapping: [],
                // 归档提醒状态
                archiveFilingRemindFlagColors: {
                    1: {
                        color: 'success',
                        text: '正常'
                    },
                    11: {
                        color: 'warning',
                        text: '归库预警'
                    },
                    12: {
                        color: 'error',
                        text: '归库超期'
                    }
                },
                tableColumns: {},
                tableData: [],
                selectedOrder: 'common',
                transferModal: {
                    common: {
                        name: '共同档案清单',
                        selected: 1,
                        fields: {}
                    }
                }
            }
        },
        methods: {
            initColumns() {
                // 1 未归档 11:已归档 99:已终止
                this.tableColumns = {
                    1: [
                        {
                            title: '选择',
                            width: 50,
                            render: (h, params) => {
                                return h('div', [
                                    h("checkbox", {
                                        props: {
                                            size: 'large',
                                            value: false
                                        },
                                        on: {
                                            'on-change': (val) => {
                                                this.tableData[params.row._index].checkbox = val;
                                            }
                                        }

                                    })
                                ])
                            },
                        },
                        {
                            title: '订单编号',
                            key: '',
                            render: (h, params) => {
                                let archiveFilingRemindFlag = params.row.archiveFilingRemindFlag;
                                let outOrderId = params.row.outOrderId;
                                let archiveFilingRemindFlagObj = this.archiveFilingRemindFlagColors[archiveFilingRemindFlag];

                                let labelStr = this.getTextByCode('filingRemindFlagDic', archiveFilingRemindFlag);
                                // === 1时是正常订单，正常订单不显示label
                                if(archiveFilingRemindFlag === 1){
                                    return h('div', [
                                        h('span', outOrderId)
                                    ]);
                                }else{
                                    return h('div', [
                                        h('span', outOrderId),
                                        h('Button', {
                                            props: {
                                                type: archiveFilingRemindFlagObj.color,
                                                size: 'small',
                                            }
                                        }, labelStr)
                                    ]);
                                }

                            },
                        },
                        {
                            title: '借款人',
                            key: 'borrowerName',
                        },
                        {
                            title: '城市',
                            key: 'city',
                        },
                        {
                            title: '资金方',
                            key: 'financeName',
                        },
                        {
                            title: '订单性质',
                            key: 'archiveOrderTypeText',
                        },
                        {
                            title: '订单状态',
                            key: 'order_status_text',
                        },
                        {
                            title: '操作',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                const outOrderId = params.row.outOrderId
                                                this.$router.push(`/transfer_manage/detail/${outOrderId}`)
                                            },
                                        },
                                    }, '查看'),
                                ])
                            },
                        },
                    ],
                    11: [
                        {
                            title: '选择',
                            width: 50,
                            render: (h, params) => {
                                return h('div', [
                                    h("checkbox", {
                                        props: {
                                            size: 'large',
                                            value: false
                                        },
                                        on: {
                                            'on-change': (val) => {
                                                this.tableData[params.row._index].checkbox = val;
                                            }
                                        }

                                    })
                                ])
                            },
                        },
                        {
                            title: '订单编号',
                            key: 'outOrderId',
                        },
                        {
                            title: '借款人',
                            key: 'borrowerName',
                        },
                        {
                            title: '城市',
                            key: 'city',
                        },
                        {
                            title: '资金方',
                            key: 'financeName',
                        },
                        {
                            title: '订单性质',
                            key: 'archiveOrderTypeText',
                        },
                        {
                            title: '订单状态',
                            key: 'order_status_text',
                        },
                        {
                            title: '操作',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                const outOrderId = params.row.outOrderId
                                                this.$router.push(`/transfer_manage/detail/${outOrderId}`)
                                            },
                                        },
                                    }, '查看'),
                                ])
                            },
                        },
                    ],
                    99: [
                        {
                            title: '订单编号',
                            key: 'outOrderId',
                        },
                        {
                            title: '借款人',
                            key: 'borrowerName',
                        },
                        {
                            title: '城市',
                            key: 'city',
                        },
                        {
                            title: '资金方',
                            key: 'financeName',
                        },
                        {
                            title: '订单性质',
                            key: 'archiveOrderTypeText',
                        },
                        {
                            title: '订单状态',
                            key: 'order_status_text',
                        },
                        {
                            title: '操作',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                const outOrderId = params.row.outOrderId
                                                this.$router.push(`/transfer_manage/detail/${outOrderId}`)
                                            },
                                        },
                                    }, '查看'),
                                ])
                            },
                        },
                    ]
                };
            },
            search () {
                this.form.page = 1;
                this.getListData();
            },
            pageChangeHandle (page) {
                this.form.page = page
                this.getListData();
            },
            handleTabs (e) {
                //切换的时候 是否显示第一列 选择
                // 1 未归档 11:已归档 99:已终止
                this.archiveOrderStatus = e;
                // 切换时先清空tableData
                this.tableData = [];
                this.getListData();
            },
            danganTransferHandle () {
                this.transferModal = {
                    common: {
                        name: '共同档案清单',
                        selected: 1,
                        fields: {}
                    }
                }

                let canOpenTransferModal = false;
                this.tableData.map(tr => {
                    if (tr.checkbox) {
                        canOpenTransferModal = true;
                    }
                });
                if(!canOpenTransferModal){
                    this.$Message.warning('请选择订单');
                }else{
                    let param = {}
                    ajax.getDocumentDictionary(param).then(res => {
                        let {error_code, message, data} = res.data;
                        if(error_code){
                            this.$Message.error(message);
                        }else{
                            this.documentTypeConfigList = data.documentTypeConfigList;
                            for (let i = 0; i < this.documentTypeConfigList.length; i++) {
                                for (let j = 0; j < this.documentTypeConfigList[i].documentConfigs.length; j++) {
                                    this.documentTypeConfigList[i].documentConfigs[j].documentCount = 1; //默认都给1份
                                    this.documentTypeConfigList[i].documentConfigs[j].isChecked = false; //默认都是未选择
                                    this.documentTypeConfigList[i].documentConfigs[j].disabled = false; //默认都是未选择
                                }
                            }
                            this.transferModal.common.documentInfos = JSON.parse(JSON.stringify(this.documentTypeConfigList));
                            this.tableData.map(tr => {
                                if (tr.checkbox) {
                                    canOpenTransferModal = true;
                                    this.$set(this.transferModal, tr.outOrderId, {
                                        name: tr.outOrderId + '(' + tr.borrowerName + ')',
                                        archiveId: tr.archiveId,
                                        outOrderId: tr.outOrderId,
                                        selected: 1,
                                        documentInfos: JSON.parse(JSON.stringify(this.transferModal.common.documentInfos))
                                    })
                                }
                            });

                            // 打开档案移交弹框
                            this.danganTransferModal = canOpenTransferModal;
                        }
                    });

                }

            },
            // 选中档案中的材料事件
            changeDocumentConfig(field) {
                // 需要判断点击common还是其他
                if(this.selectedOrder === 'common'){
                    if(field.isChecked){
                        // 执行全选
                        this.checkAllOrders(field);
                    }else{
                        // 执行反选
                        this.uncheckAllOrders(field);
                    }
                }else{
                    this.modifyCommon(field);
                }
            },
            // 修改共同档案清单中的字段值
            modifyCommon(field) {
                let documentConfigId = field.documentConfigId;
                let isSame = true;
                for (let k in this.transferModal) {
                    let item = this.transferModal[k];
                    if (k === 'common') {
                        continue;
                    } else {
                        item.documentInfos.map((v,index) => {
                            for(let i = 0; i < v.documentConfigs.length; i++){
                                let vv = v.documentConfigs[i];
                                if(vv.documentConfigId === documentConfigId){

                                    if(vv.isChecked !== field.isChecked){
                                        isSame = false;
                                        break;
                                    }
                                }
                            }
                        });
                    }
                }
                this.transferModal.common.documentInfos.map(v => {
                    for(let i = 0; i < v.documentConfigs.length; i++){
                        let vv = v.documentConfigs[i];
                        if(vv.documentConfigId === documentConfigId){
                            // 如果所有订单这个字段的值都一样，切为true时，将common中该字段设置为true，否则设置为false
                            vv.isChecked = isSame && field.isChecked;
                        }
                    }
                });
            },
            checkAllOrders(field) {
                this.iterationOrders(field, true);
            },
            uncheckAllOrders(field) {
                this.iterationOrders(field, false);
            },
            iterationOrders(field, value) {
                let documentConfigId = field.documentConfigId;
                for (let k in this.transferModal) {
                    let item = this.transferModal[k];
                    if (k === 'common') {
                        continue;
                    } else {
                        item.documentInfos.map(v => {
                            return v.documentConfigs.map(vv => {
                                if(vv.documentConfigId === documentConfigId){
                                    vv.isChecked = value;
                                }
                            })
                        });
                    }
                }
            },
            danganTransferCancel(){
                this.danganTransferModal = !this.danganTransferModal;
            },
            danganTransferOk () {
                var form = [];
                for (let k in this.transferModal) {
                    let item = this.transferModal[k];
                    if (k === 'common') {
                        continue;
                    } else {
                        let arr = [];
                        item.documentInfos.map(v => {
                            v.documentConfigs.map(vv => {
                                if(vv.isChecked){
                                    arr.push(vv)
                                }
                            })
                        });
                        // delete item.documentInfos;
                        item.archiveDocumentInfos = arr;
                        form.push(item);
                    }
                }

                let data = ajax.submitTransfer({
                    data: form
                });
                data.then(result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.danganTransferModal = !this.danganTransferModal;
                        // 关闭弹窗
                        this.$Message.success('提交成功');
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            addCountHandle (count, id) {
                this.addCountModal = true;
                this.count = count;
                this.count_id = id;
            },
            addCountSuccess () {
                let currentOrder = this.transferModal[this.selectedOrder];
                currentOrder.documentInfos.map(v => {
                    v.documentConfigs.map(vv => {
                        if(vv.documentConfigId === this.count_id){
                            vv.documentCount = this.count;
                        }
                    })
                });
            },
            changSelectLeftModal (index,opt) {
                this.selectedOrder = index;

                for (let k in this.transferModal) {
                    let item = this.transferModal[k];
                    if (k === 'common') {
                        continue;
                    } else {
                        item.documentInfos.map((v,index) => {
                            for(let i = 0; i < v.documentConfigs.length; i++){
                                let vv = v.documentConfigs[i];
                                if(this.transferModal.common.documentInfos[index].documentConfigs[i].isChecked){
                                    //共同档案勾选的 在子选项中不可修改
                                    vv.disabled = true;
                                }else{
                                    vv.disabled = false;
                                }
                            }
                        });
                    }
                }
            },
            //列表数据
            getListData () {
                const o = {
                    "outOrderId": this.outOrderId,
                    "borrowerName": this.borrowerName,
                    "cities": this.cities,
                    "financeIds": this.financeIds,
                    "archiveOrderStatus": this.archiveOrderStatus,
                    "archiveOrderType": this.archiveOrderType,
                    "pageNum": this.form.page,
                    "pageSize": this.form.perPage
                }
                let data = ajax.transferManageGetListData(o);
                data.then(result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.tableData = result.data.list;
                        this.form.total = result.data.total;
                        this.tableData.map(v => {
                            v.archiveOrderTypeText = this.getTextByCode('archiveOrderTypeDic', v.archiveOrderType);
                        });
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            getTextByCode(){
                return util.getTextByCodeFromDict(this.dictData, ...arguments);
            }
        },
        mounted () {
            //得到码表数据
            ajax.getDictData().then(result => {
                result = result.data;
                if (result.error_code === 0) {
                    this.dictData = result.data;
                    this.getListData();
                } else {
                    this.$Message.error(result.message);
                }
            })

            this.initColumns();

        }
    }
</script>
<style>
    .content_box {
        padding: 20px;
        min-height: 280px;
        background: #fff;
    }

    .form_style {
        position: relative;
        height: 130px;
    }

    .transfer_btn {
        padding: 5px 20px;
        position: absolute;
        right: 0px;
        bottom: -25px;
    }

    .selected {
        color: #2d8cf0;
    }

    .modal_cell_group {
        width: 300px;
        max-height: 360px;
        overflow: auto;
        display: inline-block;
    }

    .modal_right_box {
        float: right;
        width: 280px;

    }

    .modal_item_title {
        font-weight: bold;
        color: #515a6e;
    }

    .modal_subtitle {
        padding: 8px 0;
        font-size: 14px;
    }

    .modal_subitem {
        color: #515a6e;
        font-size: 14px;
        font-weight: normal;
        text-indent: 6px;
        padding: 3px 0;
    }

    .clearfix:after {
        content: "";
        height: 0;
        display: block;
        visibility: hidden;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }

    .table_cell {
        display: table-cell;
    }

    .no_table_cell {
        display: none;
    }

    .ivu-cell {
        cursor: pointer;
        font-size: 14px !important;
    }
</style>
