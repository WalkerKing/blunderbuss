<template>
    <div>
        <h2>档案移交详情</h2>
        <Card dis-hover>
            <p slot="title">
                基本信息
            </p>
            <basePanel :baseInfoList="baseInfoList"></basePanel>
        </Card>
        <Card dis-hover>
            <p slot="title">
                档案清单记录
            </p>
            <Table border :columns="columns" :data="tableData"></Table>

        </Card>

        <div class="bottom-btn-group">
            <!--“已归档”和“已终止”详情页不显示该功能按钮，只有未归档时显示；-->
            <Button class="btn-inline" size="large" v-show="detailData.archiveOrderStatus  == 1" type="primary"  @click="popDelayApplyModal">归档延期申请</Button>

            <!-- “已终止 ”详情页不显示该功能按钮，“未归档”和“已终止”时显示； archiveOrderStatus 1 和 11
               展期订单无此按钮archiveOrderType 1主订单 2展示订单 -->
            <Button class="btn-inline" size="large" v-show="detailData.archiveOrderType == 1 &&(detailData.archiveOrderStatus == 1 || detailData.archiveOrderStatus == 11)" type="primary"  @click="showOutStockOk">借用出库</Button>

            <!-- 订单状态为“结单” order_status 99 settlementStatus 41已出库 11出库申请已发起  -->
            <Button class="btn-inline" size="large" v-show="detailData.settlementStatus != 41 && detailData.settlementStatus != 11 && detailData.archiveOrderType == 1 && (detailData.archiveOrderStatus == 1 || detailData.archiveOrderStatus == 11)" @click="showJieqingOutStockOk" type="success">还本结清出库</Button>
            <Button class="btn-inline" v-show="detailData.settlementStatus == 41 || detailData.settlementStatus == 11" size="large" type="success" disabled>结清</Button>
        </div>

        <!-- 借用出库 -->
        <Modal v-model="outStockModal"
            title="借用出库">
            <div class="modal_body clearfix">
                <Form :label-width="100">
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>出库档案:</label>
                            <FormItem>
                                <Checkbox v-model="receiveFileModal.isAllChecked" @on-change="receiveFileCheckAllHandler">全选</Checkbox>
                                <CheckboxGroup v-model="receiveFileModal.checked" @on-change="receiveFileCheckedHandler">
                                    <template v-for="(item, index) in receiveFileModal.data" >
                                        <Checkbox :key="index" :label="item.archiveDocumentId">{{item.documentName+ '（'+ getTextByCode('documentMaterialDic', item.documentMaterial)+'）'+ item.documentCount + '份'}}</Checkbox>
                                    </template>
                                </CheckboxGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>计划归档日期:</label>
                            <FormItem>
                                <DatePicker type="date" :value="outStock.returnPlanDate" @on-change="outStock.returnPlanDate=$event" placeholder="Select date" style="width: 200px"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>OA截图:</label>
                            <FormItem>
                                <Col span="16">
                                    <Button :class="outStock.oaPictureUrl == ''?'':'primary'" class="inline-btn" @click="showPic(1)">借用出库</Button>
                                </Col>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="outStockOk">确定</Button>
            </div>
        </Modal>
        <!-- 还本结清出库 -->
        <Modal v-model="jieqingOutStockModal"
            title="还本结清出库">
            <div class="modal_body clearfix">
                <Form :label-width="100">
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>OA截图:</label>
                            <FormItem>
                                <Button :class="jieqingOutStock.oaPictureUrl == ''?'':'primary'" class="inline-btn" @click="showPic(2)">还本结清出库</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="jieqingOutStockOk">确定</Button>
            </div>
        </Modal>

        <!-- 归档延期申请 -->
        <Modal v-model="delayApplyModal.isShow"
               title="归档延期申请">
            <div class="modal_body clearfix">
                <Form :label-width="100">
                    <Row>
                        <Col span="20">
                            <FormItem label="延期后归档日期:">
                                <DatePicker type="date" :value="delayApplyModal.form.postponeDate" @on-change="delayApplyModal.form.postponeDate=$event" placeholder="请输入延期后归档日期"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>OA截图:</label>
                            <FormItem>
                                <Button :class="delayApplyModal.form.oaPictureUrl === ''?'':'primary'" class="inline-btn" @click="showPic(3)">归档延期申请</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="confirmDelayApply">确定</Button>
            </div>
        </Modal>

        <uploadModal v-bind="uploadModal"  @uploadComplete="uploadComplete" ref="picModal"></uploadModal>
    </div>
</template>
<script>
    import basePanel from '@/view/multilevel/components/panels/basePanel'
    import uploadModal from '../components/upload-modal.vue'

    import * as ajax from '@/api'
    import axios from '@/libs/api.request'
    import qs from 'qs'
    import {getTextByCodeFromDict,formatDate} from '@/libs/util'

    export default {
        name: 'detail',
        data () {
            return {
                //借用出库：
                outStock:{
                    returnPlanDate:'',
                    oaPictureUrl:'',
                    archive:[],
                },
                //还本结清出库
                jieqingOutStock:{
                    oaPictureUrl:'',
                },
                btnGlag:1,
                uploadModal: {
                    option: {},
                    picList: [],
                    canEdit: true,
                    canDelete: true,
                },
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],
                param:[],
                baseInfoList:1,
                outStockModal:false,
                jieqingOutStockModal:false,
                columns: [
                    {
                        title: '序号',
                        key: 'id',
                    },
                    {
                        title: '档案名称',
                        key: 'documentName',
                    },
                    {
                        title: '档案份数',
                        key: 'documentCount',
                    },
                    {
                        title: '原件/复印件',
                        key: 'documentMaterialText',
                    },
                    {
                        title: '交件人',
                        key: 'deliveryUserName',
                    },
                    {
                        title: '交件时间',
                        key: 'deliveryTime',
                    },
                    {
                        title: '收件人',
                        key: 'signUserName',
                    },
                    {
                        title: '收件时间',
                        key: 'signTime',
                    },
                    {
                        title: '状态',
                        key: 'archiveDocumentStatusText',
                    }
                ],
                tableData: [],
                dictData:[],
                detailData:[],

                // 文件签收模态框
                receiveFileModal: {
                    isShow: false,
                    isAllChecked: false,
                    checked: [],
                    data: []
                },

                // 归档延期申请 模态框
                delayApplyModal: {
                    isShow: false,
                    data: {},
                    form: {
                        archiveId: '',
                        postponeDate: '',
                        oaPictureUrl: ''
                    }
                }
            }
        },
        components: {
            basePanel,
            uploadModal
        },
        created () {
            //得到码表数据
            const o = {}
            let data = ajax.getDictData(o);
            data.then( result => {
                result = result.data;
                if (result.error_code === 0) {
                    this.dictData = result.data;
                    this.documentStatusDic = result.data.documentStatusDic;
                    this.documentMaterialDic = result.data.documentMaterialDic;
                    this.getData();
                } else {
                    this.$Message.error(result.message);
                }
            })
        },
        methods: {
            // 弹出归档延期申请
            popDelayApplyModal() {
                this.delayApplyModal.form.archiveId = this.detailData.archiveId;
                this.delayApplyModal.form.postponeDate = '';
                this.delayApplyModal.form.oaPictureUrl = '';
                ajax.countFilingPostponeWaitApprove({
                    archiveId: this.detailData.archiveId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.delayApplyModal.isShow = true;
                    }
                }).catch(e => console.log(e))

            },

            // 归档延期申请 确认
            confirmDelayApply() {
                if(!this.delayApplyModal.form.postponeDate){
                    return this.$Message.error('请选择延期后归档日期');
                }
                if(!this.delayApplyModal.form.oaPictureUrl){
                    return this.$Message.error('请上传OA截图');
                }
                ajax.filingPostponeApply(this.delayApplyModal.form).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.delayApplyModal.isShow = false;
                    }
                }).catch(e => console.log(e))
            },
            getData(){
                const pic_o = {
                    url:'/transfer_manage/get_upload_token'
                }
                let pic_data = ajax.getUploadToken(pic_o);
                pic_data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.uploadModal.option = result.data;
                    } else {
                        this.$Message.error(result.message);
                    }
                })

                const params = {
                    data: qs.stringify({
                        "outOrderId": this.$route.params.id
                    })
                }
                let res = ajax.transferManageDetail(params);
                res.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.baseInfoList = [
                            {
                                title: '',
                                data: [
                                    [
                                        {name: '订单编号', desc: result.data.outOrderId},
                                        {name: '借款人', desc: result.data.borrowerName},
                                        {name: '城市', desc: result.data.city},
                                    ],
                                    [
                                        {name: '借款金额', desc: result.data.order_info.loan_money + '万'},
                                        {name: '信托计划', desc: result.data.order_info.trust_plan_code_text},
                                        {name: '借款期限', desc: result.data.order_info.loan_limit + '期'},
                                    ],
                                    [
                                        {name: '资金方', desc: result.data.financeName},
                                        {name: '档案状态', desc: getTextByCodeFromDict(this.dictData,"archiveOrderStatusDic",result.data.archiveOrderStatus)}
                                    ]
                                ]
                            }
                        ];
                        this.detailData = result.data;
                        this.detailData.settlementStatus = result.data.archive.settlementStatus;
                        this.tableData = result.data.archiveDocuments;
                        //增加序号
                        for(let i=0;i<this.tableData.length;i++){
                            this.tableData[i].documentMaterialText = getTextByCodeFromDict(this.dictData,"documentMaterialDic",this.tableData[i].documentMaterial);
                            this.tableData[i].archiveDocumentStatusText = getTextByCodeFromDict(this.dictData,"archiveDocumentStatusDic",this.tableData[i].archiveDocumentStatus);
                            this.tableData[i].id = i + 1;
                        }
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            showPic (op) {
                this.$refs.picModal.isShow = true;
                // op == 1?this.btnGlag = 1:this.btnGlag =2;
                this.btnGlag =op;
            },
            // 文件签收全选
            receiveFileCheckAllHandler (v) {
                if (v) {
                    this.receiveFileModal.checked = this.receiveFileModal.data.map(item => {
                        return item.archiveDocumentId;
                    })
                } else {
                    this.receiveFileModal.checked = [];
                }
            },
            // 文件签收全选 多选事件
            receiveFileCheckedHandler () {
                this.receiveFileModal.isAllChecked = this.receiveFileModal.checked.length === this.receiveFileModal.data.length;
            },
            showOutStockOk(){
                //清空已选数据
                this.checkAll = false;
                this.param = [];
                 this.receiveFileModal.checked = [];
                this.outStock.oaPictureUrl = '';
                this.outStock.returnPlanDate = '';

                this.outStockModal = !this.outStockModal;

                const o = {
                    data: qs.stringify({
                        "archiveId": this.detailData.archiveId
                    })
                }
                let data = ajax.transferManageOutboundAbleArchive(o);
                data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        let arr = [];
                        result.data.list.map(v => {
                            let j = {};
                            j.documentMaterialText = v.documentMaterial== 1?'(复印件)':'(原件)';
                            j.documentName = v.documentName  + j.documentMaterialText;
                            j.archiveDocumentId = v.archiveDocumentId;
                            j.isChecked = false;
                            arr.push(j);
                        })
                        this.receiveFileModal.data = result.data.list;
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            showJieqingOutStockOk(){ //结清弹窗弹出
                this.jieqingOutStockModal = !this.jieqingOutStockModal;
            },
            jieqingOutStockOk(){ //结清弹窗确定 逻辑
                if(!this.jieqingOutStock.oaPictureUrl || this.jieqingOutStock.oaPictureUrl == ''){
                    this.$Message.error('请上传OA截图');
                    return false;
                }
                let o = {
                    data: qs.stringify({
                        "oaPictureUrl":this.jieqingOutStock.oaPictureUrl,
                        "archiveId": this.detailData.archiveId
                    })
                }
                let data = ajax.transferManageSettlementOutboundApply(o);
                data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.jieqingOutStockModal = !this.jieqingOutStockModal;
                        this.getData();
                        this.$Message.success(result.message);
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            outStockOk(){ //借用出库弹窗确定 逻辑
                if(! this.receiveFileModal.checked ||  this.receiveFileModal.checked.length == 0){
                    this.$Message.error('出库档案不能为空');
                    return false;
                }
                if(!this.outStock.returnPlanDate || this.outStock.returnPlanDate == ''){
                    this.$Message.error('计划归档日期不能为空');
                    return false;
                }
                if(!this.outStock.oaPictureUrl || this.outStock.oaPictureUrl == ''){
                    this.$Message.error('请上传OA截图');
                    return false;
                }

                let o = {
                    data: qs.stringify({
                        "returnPlanDate":this.outStock.returnPlanDate,
                        "oaPictureUrl":this.outStock.oaPictureUrl,
                        "archiveDocumentId": this.receiveFileModal.checked,
                        "archiveId": this.detailData.archiveId
                    })
                }
                let data = ajax.transferManageBorrowOutboundApply(o);
                data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.outStockModal = !this.outStockModal;
                        this.getData();
                        this.$Message.success(result.message);
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            uploadComplete(files){
                // this.btnGlag == 1?this.outStock.oaPictureUrl = files[0].qiniuUrl:this.jieqingOutStock.oaPictureUrl = files[0].qiniuUrl;
                let qiniuUrl = files[0].qiniuUrl;
                switch (this.btnGlag) {
                    case 1:
                        this.outStock.oaPictureUrl = qiniuUrl
                        break;
                    case 2:
                        this.jieqingOutStock.oaPictureUrl = qiniuUrl
                        break;
                    case 3:
                        this.delayApplyModal.form.oaPictureUrl = qiniuUrl;
                        break;
                }
            },
            getTextByCode(){
                return getTextByCodeFromDict(this.dictData, ...arguments)
            }
        },
        watch: {
            $route (to, from) {
                this.getData()
            }
        }
    }
</script>
<style lang="less" scoped>
    .bottom-btn-group {
        margin: 60px;
        text-align: center;
        .btn-inline {
            margin: 10px;
        }
    }
    .biaoshi_red{
        width: 100px;
    }
    .biaoshi_red i{
        color: red;
        padding: 0 3px;
        font-size: 14px;
    }
    .primary{
        background: #2d8cf0;
        color: #fff;
    }
</style>
