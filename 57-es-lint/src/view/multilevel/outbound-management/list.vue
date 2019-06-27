<template>
    <Content class="content_box">
        <Form :model="form" :label-width="100" class="form_style">
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="档案号:">
                        <Input v-model="option.archiveNumber" placeholder="请输入档案号"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="借款人:">
                        <Input v-model="option.borrowerName" placeholder="请输入借款人"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="城市:">
                        <Select v-model="option.city">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) in dictData.cityList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="资金方:">
                        <Select v-model="option.financeIds">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) in dictData.financingChannelList" :value="index" :key="item">{{ item }}
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
        </Form>

        <Tabs  @on-click="handleTabs">
            <TabPane v-for="(item,index) in tabPanels" :label="item.description" :name="item.code + ''" :key="index">
                <Table border :columns="tableColumns[option.outboundStatus]" :data="tableData"></Table>
            </TabPane>
        </Tabs>
        <Row type="flex" justify="end">
            <Col>
                <Page
                    :style="{ padding: '24px 30px 4px 0' }"
                    :current="form.pageNum"
                    :total="form.total"
                    :page-size="form.pageSize"
                    @on-change="pageChangeHandle"></Page>
            </Col>
        </Row>

        <!-- 出库审批 模态框 -->
        <Modal v-model="approveModal.isShow"
               :title="approveModal.title[approveModal.outboundType]">
            <template v-if="approveModal.outboundType === 2">
                <Row type="flex" align="middle">
                    <Col span="8" class="text-right">出库档案：</Col>
                    <Col span="16">{{approveModal.data.outboundDocuments}}</Col>
                </Row>
                <br>
                <Row type="flex" align="middle">
                    <Col span="8" class="text-right">计划归库日期：</Col>
                    <Col span="16">{{approveModal.data.planReturnDate}}</Col>
                </Row>
                <br>
            </template>

            <Row type="flex" align="middle">
                <Col span="8" class="text-right">OA截图：</Col>
                <Col span="16">
                    <Button class="inline-btn" type="primary" @click="showPic">{{approveModal.title[approveModal.outboundType]}}【1】</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="8" class="text-right">申请人：</Col>
                <Col span="16">{{approveModal.data.name}}</Col>
            </Row>
            <br>
            <Row>
                <Col span="8" class="text-right">部门：</Col>
                <Col span="16">{{approveModal.data.department_name}}</Col>
            </Row>
            <br>
            <Row>
                <Col span="8" class="text-right">岗位：</Col>
                <Col span="16">{{approveModal.data.position_name}}</Col>
            </Row>
            <br>
            <template v-if="approveModal.outboundType === 2">
                <Row type="flex" align="middle">
                    <Col span="8" class="text-right">出库日期：</Col>
                    <Col span="16">{{approveModal.data.outboundDate}}</Col>
                </Row>
            </template>
            <div slot="footer" class="text-center">
                <Button type="warning" @click="refuseOutbound">拒绝</Button>
                <Button type="primary" @click="approveOutbound">同意</Button>
            </div>
        </Modal>

        <!--签收 模态框-->
        <Modal v-model="signModal.isShow"
               title="签收">
            <Row type="flex" justify="center">
                <Col>
                    <Checkbox v-model="signModal.isAllChecked" @on-change="signFileCheckAllHandler">全选
                    </Checkbox>
                    <CheckboxGroup v-model="signModal.checked" @on-change="signFileCheckedHandler">
                        <template v-for="(item, index) in signModal.data">
                            <Checkbox :key="index" :label="item.outboundDocumentId">{{item.documentName+ '（'+ getTextByCode('documentMaterialDic', item.documentMaterial)+'）'+ item.outboundDocumentCount + '份'}}</Checkbox>
                            <br>
                        </template>
                    </CheckboxGroup>
                </Col>
            </Row>

            <div slot="footer">
                <Button type="primary" size="large" @click="receiveFile">签收</Button>
            </div>
        </Modal>

        <uploadModal v-bind="uploadModal" ref="uploadModal"></uploadModal>

    </Content>
</template>
<script>
    import uploadModal from '../components/upload-modal.vue'
    import * as ajax from '@/api'
    import * as util from '@/libs/util'
    import {getTextByCodeFromDict} from '@/libs/util'

    export default {
        data () {
            return {
                option:{
                    archiveNumber: '',
                    borrowerName: '',
                    city: '',
                    financeIds: '',
                    outboundStatus: 1,
                },
                form: {
                    total: 0, // 数据总数
                    pageNum: 1, // 当前页码
                    pageSize: 10, // 每页条数
                },
                tabPanels: [
                    {
                        code: 1,
                        description: "待审批"
                    },
                    {
                        code: 11,
                        description: "审批通过"
                    }
                ],
                // 归库状态label配置
                returnFlagColors: {
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
                dictData:[],
                tableData:[],
                tableColumns:[],

                // 出库审批模态框数据模型
                approveModal: {
                    isShow: false,
                    title: {
                        1: '还本结清出库',
                        2: '借用出库',
                    },
                    outboundType: 2,
                    data: {

                    }
                },

                // 签收模态框数据模型
                signModal: {
                    isShow: false,
                    isAllChecked: false,
                    checked: [],
                    data: []
                },
                uploadModal: {
                    option: {},
                    picList: [],
                    canEdit: false,
                    canDelete: false,
                }
            }
        },
        components: {
            uploadModal
        },
        mounted () {
            this.initColumns();
            ajax.getDictData().then(res => {
                let {error_code, message, data} = res.data;
                if (error_code) {
                    this.$Message.error(message);
                } else {
                    this.dictData = data;
                }
            }).then(() => {
                this.fetchList();
            }).catch(e => console.log(e));

            ajax.getUploadToken({
                url:'/outbound_manage/get_upload_token'
            }).then( res => {
                let {error_code, message, data} = res.data;
                if (error_code) {
                    this.$Message.error(message);
                } else {
                    this.uploadModal.option = data;
                }
            }).catch(e => console.log(e));
        },
        methods: {
            initColumns() {
                this.tableColumns = {
                    1: [
                        {
                            title: '档案号',
                            key: 'archiveNumber',
                            align: 'center',
                        },
                        {
                            title: '订单编号',
                            key: 'outOrderId',
                            align: 'center',
                        },
                        {
                            title: '借款人',
                            key: 'borrowerName',
                            align: 'center',
                        },
                        {
                            title: '借款信息',
                            key: 'borrowerMsg',
                            align: 'center',
                            render(h, params) {
                                let v = params.row;
                                return h('div', [
                                    v.loan_money + '万',
                                    h('br'),
                                    v.loan_limit + '期'
                                ]);
                            }
                        },
                        {
                            title: '城市',
                            key: 'city',
                            align: 'center',
                        },
                        {
                            title: '资金方',
                            key: 'financeName',
                            align: 'center',
                        },
                        {
                            title: '出库类型',
                            key: 'outboundTypeText',
                            align: 'center',
                        },
                        {
                            title: '操作',
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.openApproveModal(params.row.outboundId);
                                            },
                                        },
                                    }, '审批'),
                                    h('Button', {
                                        style: {
                                            marginLeft: '10px'
                                        },
                                        props: {
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                const {archiveId} = params.row;
                                                this.$router.push({
                                                    name: 'outbound_detail',
                                                    params: {
                                                        id: archiveId
                                                    }
                                                })
                                            },
                                        },
                                    }, '查看'),
                                ])
                            },
                        },
                    ],
                    11: [
                        {
                            title: '档案号',
                            align: 'center',
                            render: (h, params) => {
                                let returnFlag = params.row.returnFlag;
                                let archiveNumber = params.row.archiveNumber;
                                let returnFlagObj = this.returnFlagColors[returnFlag];
                                let labelStr = this.getTextByCode('outboundReturnFlagDic', returnFlag);
                                if(returnFlag === 1) {
                                    return h('div', [
                                        h('span', archiveNumber || '无档案号')
                                    ]);
                                }else{
                                    return h('div', [
                                        h('span', archiveNumber || '无档案号'),
                                        h('Button', {
                                            props: {
                                                type: returnFlagObj.color,
                                                size: 'small',
                                            }
                                        }, labelStr)
                                    ]);
                                }
                            }
                        },
                        {
                            title: '订单编号',
                            key: 'outOrderId',
                            align: 'center',
                        },
                        {
                            title: '借款人',
                            key: 'borrowerName',
                            align: 'center',
                        },
                        {
                            title: '借款信息',
                            key: 'borrowerMsg',
                            align: 'center',
                            render(h, params) {
                                let v = params.row;
                                return h('div', [
                                    v.loan_money + '万',
                                    h('br'),
                                    v.loan_limit + '期'
                                ]);
                            }
                        },
                        {
                            title: '城市',
                            key: 'city',
                            align: 'center',
                        },
                        {
                            title: '资金方',
                            key: 'financeName',
                            align: 'center',
                        },
                        {
                            title: '出库类型',
                            key: 'outboundTypeText',
                            align: 'center',
                        },
                        {
                            title: '操作',
                            align: 'center',
                            render: (h, params) => {
                                let actionBtnStr = '';
                                if(params.row.outboundType === 1){
                                    actionBtnStr = '结清归档'
                                }else if(params.row.outboundType === 2){
                                    actionBtnStr = '签收'
                                }
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.openJieqingGuidangModal(params.row);
                                            }
                                        },
                                    }, actionBtnStr),
                                    h('Button', {
                                        style: {
                                            marginLeft: '10px'
                                        },
                                        props: {
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                const {archiveId} = params.row;
                                                this.$router.push({
                                                    name: 'outbound_detail',
                                                    params: {
                                                        id: archiveId
                                                    }
                                                })
                                            },
                                        },
                                    }, '查看'),
                                ])
                            },
                        },
                    ]
                }
            },
            handleTabs (name) {
                this.option.outboundStatus = name;
                this.fetchList();
            },
            //请求得到列表数据
            fetchList () {
                this.option.pageSize = this.form.pageSize;
                this.option.pageNum = this.form.pageNum;

                ajax.getOutBoundList(this.option).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.tableData = data.list;
                        this.tableData.map(v => {
                            v.outboundTypeText = getTextByCodeFromDict(this.dictData, 'outboundTypeDic', v.outboundType);
                        });
                        this.form.total = data.total
                    }
                }).catch(e => console.log(e));
            },
            // 打开出库审批模态框
            openApproveModal(outboundId) {
                ajax.getOutBoundInfo({outboundId}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.approveModal.outboundType = data.outboundType;
                        this.approveModal.data = {
                            archiveId: data.archiveId,
                            outboundId: data.outboundId,
                            outboundDocuments: data.outboundDocuments.map(v => {
                                const {documentName,documentMaterial, outboundDocumentCount} = v;
                                const documentMaterialText = this.getTextByCode('documentMaterialDic', documentMaterial);
                                return `${documentName}(${documentMaterialText}/${outboundDocumentCount}份)`
                            }).join('、'),
                            planReturnDate: data.returnPlanDate,
                            ...data.admin,
                            outboundDate: util.formatDate(new Date(), 'yyyy-MM-dd')
                        }
                        this.approveModal.isShow = true;
                    }
                }).catch(e => console.log(e));

            },
            // 出库审批 拒绝
            refuseOutbound() {
                // title = {
                //     1: '还本结清出库',
                //     2: '借用出库',
                // };
                switch(this.approveModal.outboundType) {
                    case 1:
                        ajax.settlementOutboundRefuse({
                            outboundId: this.approveModal.data.outboundId,
                        }).then(res => {
                            let {error_code, message, data} = res.data;
                            if (error_code) {
                                this.$Message.error(message);
                            } else {
                                this.$Message.success(message);
                                this.fetchList();
                                this.approveModal.isShow = false;
                            }
                        }).catch(e => console.log(e));
                        break;
                    case 2:
                        ajax.borrowOutboundRefuse({
                            outboundId: this.approveModal.data.outboundId,
                        }).then(res => {
                            let {error_code, message, data} = res.data;
                            if (error_code) {
                                this.$Message.error(message);
                            } else {
                                this.$Message.success(message);
                                this.fetchList();
                                this.approveModal.isShow = false;
                            }
                        }).catch(e => console.log(e));
                        break;
                }
            },
            // 出库审批 同意
            approveOutbound() {
                // title = {
                //     1: '还本结清出库',
                //     2: '借用出库',
                // };
                switch(this.approveModal.outboundType) {
                    case 1:
                        ajax.settlementOutboundApprove({
                            outboundId: this.approveModal.data.outboundId,
                        }).then(res => {
                            let {error_code, message, data} = res.data;
                            if (error_code) {
                                this.$Message.error(message);
                            } else {
                                this.$Message.success(message);
                                this.fetchList();
                                this.approveModal.isShow = false;
                            }
                        }).catch(e => console.log(e));
                        break;
                    case 2:
                        ajax.borrowOutboundApprove({
                            outboundId: this.approveModal.data.outboundId,
                        }).then(res => {
                            let {error_code, message, data} = res.data;
                            if (error_code) {
                                this.$Message.error(message);
                            } else {
                                this.$Message.success(message);
                                this.fetchList();
                                this.approveModal.isShow = false;
                            }
                        }).catch(e => console.log(e));
                        break;
                }
            },
            // 结清归档
            openJieqingGuidangModal(row) {
                if(row.outboundType === 1){
                    this.$Modal.confirm({
                        title: '结清归档',
                        content: '<div>确认该客户档案结清归档吗？</div>',
                        onOk: () => {
                            ajax.settlementOutboundSign({
                                outboundId: row.outboundId
                            }).then(res => {
                                let {error_code, message, data} = res.data;
                                if (error_code) {
                                    this.$Message.error(message);
                                } else {
                                    this.fetchList();
                                    this.$Message.success(message);
                                }
                            }).catch(e => console.log(e));
                        }
                    });
                }else if(row.outboundType === 2){
                    ajax.listBorrowingOutboundDocuments({
                        outboundId: row.outboundId
                    }).then(res => {
                        let {error_code, message, data} = res.data;
                        if (error_code) {
                            this.$Message.error(message);
                        } else {
                            this.signModal.isShow = true;
                            this.signModal.data = data.list;
                        }
                    }).catch(e => console.log(e));
                }

            },
            // 签收模态框 多选事件
            signFileCheckedHandler() {
                this.signModal.isAllChecked = this.signModal.checked.length === this.signModal.data.length;
            },
            // 文件签收全选
            signFileCheckAllHandler(v) {
                if (v) {
                    this.signModal.checked = this.signModal.data.map(item => {
                        return item.outboundDocumentId;
                    })
                } else {
                    this.signModal.checked = [];
                }
            },
            // 签收文件
            receiveFile () {
                if(this.signModal.checked.length === 0){
                    return this.$Message.error('请先选择文件');
                }
                const outboundId = this.signModal.data[0].outboundId;
                ajax.borrowOutboundSign({
                    outboundId,
                    outboundDocumentId: this.signModal.checked,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.fetchList();
                        this.signModal.isShow = false;
                    }
                }).catch(e => console.log(e));
            },
            search () {
                this.form.pageNum = 1
                this.fetchList();
            },
            pageChangeHandle (pageNum) {
                this.form.pageNum = pageNum
                this.fetchList();
            },
            showPic () {
                ajax.getOutboundOaPictureByApply({
                    outboundId: this.approveModal.data.outboundId,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.uploadModal.canEdit = false;
                        this.uploadModal.canDelete = false;
                        this.$refs.uploadModal.isShow = true;
                        this.uploadModal.picList = [
                            {
                                url: data.pictureUrl,
                                time: '',
                                name: '',
                            }
                        ];
                    }
                }).catch(e => console.log(e));
            },
            // 初始化上传模态框
            initUploadModal (data) {
                this.uploadModal.picList = this.formatImgList(data);
            },
            // 格式化图片列表
            formatImgList (data) {
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
            getTextByCode(){
                return util.getTextByCodeFromDict(this.dictData, ...arguments)
            }
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

    .text-right {
        text-align: right;
    }

    .text-center {
        text-align: center;
    }

    .inline-btn {
        vertical-align: center;
    }
</style>
