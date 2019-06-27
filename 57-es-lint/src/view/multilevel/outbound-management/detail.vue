<template>
    <div>
        <h2>档案详情</h2>
        <Card dis-hover>
            <p slot="title">
                基本信息
            </p>
            <basePanel :baseInfoList="baseInfoList"></basePanel>
        </Card>
        <Card dis-hover>
            <p slot="title">
                影像资料
            </p>
            <picPanel @openUploadModal="openMatUploadModal" :picInfoList="picInfoList"></picPanel>
        </Card>
        <Card dis-hover>
            <p slot="title">
                档案清单
            </p>
            <Collapse @on-change="docPanelOpen">
                <Panel v-for="(file, index) in archiveDocuments" :name="file.archiveDocumentId" :key="index">
                    <Tag :color="fileStates[file.archiveDocumentStatus] && fileStates[file.archiveDocumentStatus].color">{{file.archiveDocumentStatusText}}</Tag>
                    <span>{{file.documentName || file.archiveDocumentId}}</span>
                    <div slot="content">
                        <div v-if="file.vm">
                            <basePanel :baseInfoList="file.vm"></basePanel>
                        </div>
                        <div v-else>
                            <p>数据正在加载中...</p>
                        </div>

                    </div>
                </Panel>
            </Collapse>
        </Card>
        <Card dis-hover>
            <p slot="title">
                OA截图
            </p>
            <picPanel @openUploadModal="openOAUploadModal" :picInfoList="OAPicList"></picPanel>
        </Card>
        <Card dis-hover>
            <p slot="title">
                备注
            </p>
            <Form ref="formValidate" :label-width="0">
                <FormItem>
                    <Input v-model="remark" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="" readonly></Input>
                </FormItem>
            </Form>
        </Card>
        <!--文件上传组件-->
        <uploadModal ref="uploadModal" v-bind="uploadModal" @uploadComplete="uploadComplete"></uploadModal>
    </div>
</template>

<script>
    import basePanel from '@/view/multilevel/components/panels/basePanel'
    import picPanel from '@/view/multilevel/components/panels/picPanel'
    import uploadModal from '@/view/multilevel/components/upload-modal'
    import * as ajax from '@/api'
    import * as util from '@/libs/util'

    export default {
        name: 'info',
        data () {
            return {
                archiveId: '',
                // 字典数据
                dictData: {},
                // 文件状态颜色对应表
                fileStates: {
                    1: {
                        color: 'error',
                        text: '待签收'
                    },
                    11: {
                        color: 'success',
                        text: '已签收'
                    },
                    12: {
                        color: 'primary',
                        text: '已打回'
                    },
                    21: {
                        color: '#000bff',
                        text: '待出库'
                    },
                    31: {
                        color: 'warning',
                        text: '出库中'
                    }
                },
                baseInfoList: {},
                // 影像资料
                picInfoList: [],
                // OA截图
                OAPicList: [],
                // 档案清单
                archiveDocuments: [],
                //档案清单订单信息
                archiveOrder:{},
                //档案 状态 判断按钮
                archiveStatus:'',
                remark: '',
                // 上传模态框
                uploadModal: {
                    option: {},
                    picList: [],
                    canEdit: false,
                    canDelete: false,
                }
            }

        },
        components: {
            basePanel,
            picPanel,
            uploadModal
        },
        watch: {
            '$route': function () {
                this.init();
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init() {
                this.archiveId = this.$route.params.id;
                // 1. 拿字典
                this.getDict().then(() => {
                    // 2. 拿数据
                    this.getDetail();
                });
            },
            // 获取码表
            getDict () {
                return ajax.getDictData().then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.dictData = data;
                    }
                }).catch(e => console.log(e));
            },
            // 获取详情页信息
            getDetail () {
                ajax.getOutboundDetail({
                    archiveId: this.archiveId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.handleDetailData(data);

                        this.picInfoList = data.pic_list;
                        this.OAPicList = data.oa_pic_list.map(v => {
                            return {
                                hpc_id: v.businessType,
                                hpc_name: this.getTextByCode('archiveBusinessTypeDic', v.businessType),
                                pic_num: v.pictureSize
                            }
                        });
                        this.archiveOrder = data.archiveOrder;
                        this.archiveStatus = data.archiveStatus;
                    }
                }).catch(e => console.log(e));
            },
            // 处理详情页信息
            handleDetailData(d) {
                let archiveOrder = d.archiveOrder;
                this.remark = d.remark;
                this.baseInfoList = [
                    {
                        title: '',
                        data: [
                            [
                                {name: '档案号', desc:d.archiveNumber},
                                {name: '订单编号', desc: archiveOrder.outOrderId},
                                {name: '城市', desc: archiveOrder.city},
                            ],
                            [
                                {name: '借款人', desc: archiveOrder.borrowerName},
                                {name: '借款金额', desc: archiveOrder.loan_money + '万'},
                                {name: '借款期限', desc: archiveOrder.loan_limit},
                            ],
                            [
                                {name: '资金方', desc: archiveOrder.financeName},
                                {name: '信托计划', desc: archiveOrder.trust_plan_code_text },
                                {name: '结清存放', desc: d.settlementStoreRemark},
                            ],
                            [
                                {name: '放款日期', desc: archiveOrder.loanDate},
                                {name: '应归档日期', desc: archiveOrder.fillingPlaningDate},
                                {name: '延期后归档日期', desc: ''},
                            ],
                            [
                                {name: '档案状态', desc: this.getTextByCode('archiveStatusDic', d.archiveStatus)},
                                {name: '展期订单', desc: archiveOrder.zhanqi_order.map(v => v.outOrderId).join(',')},
                                {name: '展期后到期日', desc: archiveOrder.zhanqi_end_date},
                            ]
                        ]
                    }
                ];
                this.archiveDocuments = d.archiveDocuments.map(v => {
                    v.archiveDocumentStatusText = this.getTextByCode('archiveDocumentStatusDic', v.archiveDocumentStatus)
                    return v;
                });
            },
            uploadComplete(picList) {
                // todo 调用接口保存数据？
                console.log(picList);
            },
            // 打开OA图片，可预览已上传的文件
            openOAUploadModal (item) {
                ajax.listGuiDangOaPictureByApply({
                    archiveId: this.archiveId,
                    businessType: item.hpc_id
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.uploadModal.canEdit = false;
                        this.uploadModal.canDelete = false;
                        this.$refs.uploadModal.isShow = true;
                        this.uploadModal.picList = data.list.map(v => {
                            return {
                                url: v.pictureUrl,
                                time: '',
                                name: '',
                            }
                        });
                    }
                }).catch(e => console.log(e));
            },
            openMatUploadModal (item) {
                ajax.listByCateid({
                    outOrderId: this.archiveOrder.outOrderId,
                    category_id: item.hpc_id
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.initUploadModal(data);
                    }
                }).catch(e => console.log(e));
            },
            // 初始化上传模态框
            initUploadModal (data) {
                this.$refs.uploadModal.isShow = true;
                this.uploadModal.picList = this.formatImgList(data);
            },
            // 格式化图片列表
            formatImgList (data) {
                if(!data || !data.pic_list){
                    return [];
                }
                let pic_data_tag_list_map = {}
                data.pic_data_tag_list.forEach(({id, name}) => {
                    pic_data_tag_list_map[id] = name
                })

                return data.pic_list.map(item => {
                    return {
                        url: item.img_url,
                        time: item.ocp_ctime,
                        name: pic_data_tag_list_map[item.pic_tag_id] || '',
                    }
                })
            },
            // 打开档案清单
            docPanelOpen (openedDocs) {
                openedDocs.map(archiveDocumentId => {
                    this.archiveDocuments.map(file => {
                        if (file.archiveDocumentId === archiveDocumentId && !file.detail) {
                            this.getFileDetail(file);
                        }
                    })
                })
            },
            getFileDetail (file) {
                ajax.getOutboundFileDetail({archiveDocumentId: file.archiveDocumentId}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.handleFileData(file, data);
                    }
                }).catch(e => console.log(e));
            },
            // 处理文件数据结构
            handleFileData (f, d) {
                let vm = [];
                vm.push({
                    title: '',
                    data: [
                        [
                            {name: '档案类型', desc: d.documentTypeConfig && d.documentTypeConfig.documentTypeName},
                            {name: '档案编码', desc: d.archiveDocumentId},
                            {name: '状态', desc: f.archiveDocumentStatusText},
                        ],
                        [
                            {name: '档案份数', desc: d.documentCount},
                            {name: '丢失状态', desc: this.getTextByCode('archiveDocumentLostStatusDic', d.lostStatus)},
                            {name: '归还性质', desc: this.getTextByCode('archiveDocumentReturnPropertyDic', d.returnProperty)},
                        ],
                        [
                            {name: '存放性质', desc: this.getTextByCode('archiveDocumentStorePropertyDic', d.storeProperty)},
                            {name: '存放位置', desc: this.getTextByCode('archiveDocumentStorePropertyDic', d.storeLocation)},
                            {name: '原件/复印件', desc:  this.getTextByCode('documentMaterialDic', d.documentMaterial)},
                        ],
                        [
                            {name: '交件人', desc: d.deliveryUserName},
                            {name: '交件时间', desc: d.deliveryTime},
                            {name: '文件是否上传', desc: f.pdfUrl ? '是': '否'},
                        ],
                        [
                            {name: '收件人', desc: d.signUserName},
                            {name: '收件时间', desc: d.signTime},
                            {name: '', desc: ''},
                        ]
                    ]
                });

                d.outbound_list.map((v, idx) => {
                    // 后台让加的逻辑，如果这两个不相等，显示延期后归库日期，否则，不显示
                    let returnRequiredDate = v.outboundInfo.returnPlanDate === v.returnRequiredDate ? '' : v.returnRequiredDate;
                    vm.push({
                        title: idx === 0 ? '出库记录' : '',
                        data: [
                            [
                                {name: '申请人', desc: v.outboundInfo.proposerName},
                                {name: '部门', desc: v.outboundInfo.proposer_department_name},
                                {name: '岗位', desc: v.outboundInfo.proposer_position_name},
                            ],
                            [
                                {name: '出库日期', desc: v.outboundInfo.outboundDate},
                                {name: '计划归库日期', desc: v.outboundInfo.returnPlanDate},
                                {name: '延期后归库日期', desc: returnRequiredDate},
                            ],
                            [
                                {name: '审批人', desc: v.outboundInfo.approveName},
                                {name: '审批时间', desc: v.outboundInfo.approveTime},
                                {name: '审批结果', desc: this.getTextByCode('outboundStatusDic', v.outboundInfo.outboundStatus)},
                            ]
                        ]
                    });
                });
                this.$set(f, 'vm', vm);
                this.$set(f, 'detail', d);
            },

            getTextByCode(){
                return util.getTextByCodeFromDict(this.dictData, ...arguments)
            }

        }
    }
</script>

<style lang="less" scoped>
    .bottom-btn-group {
        margin: 60px;
        text-align: center;
    }

    .btn-inline {
        margin: 10px;
    }
</style>
