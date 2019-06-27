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
                            <Option v-for="(item,index) in dictData.cityList" :value="item" :key="item">{{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="资金方:">
                        <Select v-model="option.financeIds">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) in dictData.financingChannelList" :value="index" :key="item">{{
                                item }}
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

        <Tabs @on-click="handleTabs">
            <TabPane v-for="(item,index) in tabPanels" :label="item.description" :name="item.code + ''" :key="index">
                <Table border :columns="tableColumns[option.type]" :data="tableData"></Table>
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

        <!-- 归档延期申请 模态框 -->
        <Modal v-model="filingPostponeModal.isShow"
               title="归档延期申请">

            <Row type="flex" align="middle">
                <Col span="8" class="text-right">延期后归档日期：</Col>
                <Col span="16">{{filingPostponeModal.data.postponeDate}}</Col>
            </Row>
            <br>

            <Row type="flex" align="middle">
                <Col span="8" class="text-right">OA截图：</Col>
                <Col span="16">
                    <Button class="inline-btn" type="primary" @click="showPic(filingPostponeModal.data.pictureUrl)">
                        归档延期申请【1】
                    </Button>
                </Col>
            </Row>
            <br>

            <div slot="footer" class="text-center">
                <Button type="warning" @click="refuseFilingPostpone">拒绝</Button>
                <Button type="primary" @click="approveFilingPostpone">同意</Button>
            </div>
        </Modal>

        <!-- 借用延期申请 模态框 -->
        <Modal v-model="borrowPostponeModal.isShow"
               title="借用延期申请">

            <template v-for="(item, index) in borrowPostponeModal.data.list">
                <Row type="flex" align="middle" :key="index">
                    <Col span="8" class="text-right">{{item.documentName}}：</Col>
                    <Col span="16">{{item.postponeDate}}</Col>
                </Row>
                <br>
            </template>

            <Row type="flex" align="middle">
                <Col span="8" class="text-right">OA截图：</Col>
                <Col span="16">
                    <Button class="inline-btn" type="primary" @click="showPic(borrowPostponeModal.data.pictureUrl)">
                        借用延期申请【1】
                    </Button>
                </Col>
            </Row>
            <br>

            <div slot="footer" class="text-center">
                <Button type="warning" @click="refuseBorrowPostpone">拒绝</Button>
                <Button type="primary" @click="approveBorrowPostpone">同意</Button>
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
                option: {
                    archiveNumber: '',
                    borrowerName: '',
                    city: '',
                    financeIds: '',
                    type: 'filing',
                },
                form: {
                    total: 0, // 数据总数
                    pageNum: 1, // 当前页码
                    pageSize: 20, // 每页条数
                },
                tabPanels: [
                    {
                        code: 'filing',
                        description: "归档延期"
                    },
                    {
                        code: 'borrow',
                        description: "借用延期"
                    }
                ],
                dictData: [],
                tableData: [],
                tableColumns: {
                    filing: [],
                    borrow: []
                },

                // 归档延期审批模态框
                filingPostponeModal: {
                    isShow: false,
                    data: {
                        filingPostponeId: '',
                        postponeDate: '',
                        pictureUrl: ''
                    },
                    form: {}
                },

                // 借用延期审批模态框
                borrowPostponeModal: {
                    isShow: false,
                    data: {
                        borrowPostponeId: '',
                        list: [],
                        pictureUrl: ''
                    },
                    form: {}
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
        },
        methods: {
            initColumns () {
                this.tableColumns.filing = [
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
                        title: '放款日期',
                        key: 'loanDate',
                        align: 'center',
                    },
                    {
                        title: '应归档日期',
                        key: 'filingPlanDate',
                        align: 'center',
                        render: (h, param) => {
                            return h('span', param.row.filingPlanDate || '');
                        }
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
                                            if(this.option.type === 'filing') {
                                                this.openFilingPostponeModal(params.row.filingPostponeId);
                                            }else if(this.option.type === 'borrow') {
                                                this.openBorrowPostponeModal(params.row.borrowPostponeId);
                                            }
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
                                                name: 'postpone_detail',
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
                this.tableColumns.borrow = this.tableColumns.filing.map((v, index) => {
                    if(index === 6) {
                        return {
                            title: '计划归档日期',
                            key: 'returnPlanDate',
                            align: 'center',
                        }
                    }
                    return v
                })
            },
            handleTabs (name) {
                this.option.type = name;
                this.tableData = [];
                this.fetchList();
            },
            //请求得到列表数据
            fetchList () {
                this.option.pageSize = this.form.pageSize;
                this.option.pageNum = this.form.pageNum;
                ajax.getPostponeManageList(this.option).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.tableData = data.list;
                        this.form.total = data.total
                    }
                }).catch(e => console.log(e));
            },
            // 获取OA截图
            getOaPictureByApply(param) {
                return ajax.getPostponeOaPictureByApply(param).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        return data
                    }
                }).catch(e => console.log(e));
            },

            // 获取归档延期审批弹框详情
            getFilingPostponeDetail(filingPostponeId) {
                return ajax.getFilingPostponeDetail({filingPostponeId}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        return data
                    }
                }).catch(e => console.log(e));
            },
            // 打开归档延期模态框
            openFilingPostponeModal(filingPostponeId) {
                this.filingPostponeModal.data.filingPostponeId = '';
                this.filingPostponeModal.data.postponeDate = '';
                this.filingPostponeModal.data.OA = '';
                let filingPostponeDetail = this.getFilingPostponeDetail(filingPostponeId);
                let oaPic = this.getOaPictureByApply({filingPostponeId});
                Promise.all([filingPostponeDetail, oaPic]).then(res => {
                    console.log(res);
                    let [detail, oa] = res;
                    // OA截图存在才打开模态框
                    if(oa.pictureUrl){
                        this.filingPostponeModal.isShow = true;
                    }else{
                        return this.$Message.error('数据错误：OA截图不存在');
                    }
                    // 保存延期记录号
                    this.filingPostponeModal.data.filingPostponeId = detail.filingPostponeId;
                    this.filingPostponeModal.data.postponeDate = detail.postponeDate;
                    this.filingPostponeModal.data.pictureUrl = oa.pictureUrl;
                }).catch(e => {
                    this.$Message.error('网络错误');
                });

            },
            // 归档延期 拒绝
            refuseFilingPostpone() {
                ajax.filingPostponeRefuse({
                    filingPostponeId: this.filingPostponeModal.data.filingPostponeId,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.filingPostponeModal.isShow = false;
                        this.fetchList();
                    }
                }).catch(e => console.log(e));
            },
            // 归档延期 同意
            approveFilingPostpone() {
                ajax.filingPostponeApprove({
                    filingPostponeId: this.filingPostponeModal.data.filingPostponeId,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.filingPostponeModal.isShow = false;
                        this.fetchList();
                    }
                }).catch(e => console.log(e));
            },
            // 获取 借用延期 审批模态框 详情
            listBorrowPostponesDocuments(borrowPostponeId) {
                return ajax.listBorrowPostponesDocuments({borrowPostponeId}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        return data
                    }
                }).catch(e => console.log(e));
            },
            // 打开借用延期模态框
            openBorrowPostponeModal(borrowPostponeId) {
                // 保存延期记录号
                this.borrowPostponeModal.data.borrowPostponeId = borrowPostponeId;
                this.borrowPostponeModal.data.list = [];
                this.borrowPostponeModal.data.pictureUrl = '';
                let borrowPostponesDocumentsDetail = this.listBorrowPostponesDocuments(borrowPostponeId);
                let oaPic = this.getOaPictureByApply({borrowPostponeId});
                Promise.all([borrowPostponesDocumentsDetail, oaPic]).then(res => {
                    let [detail, oa] = res;
                    if(oa.pictureUrl){
                        this.borrowPostponeModal.isShow = true;
                    }else{
                        return this.$Message.error('数据错误：OA截图不存在');
                    }
                    this.borrowPostponeModal.isShow = true;
                    this.borrowPostponeModal.data.list = detail.list;
                    this.borrowPostponeModal.data.pictureUrl = oa.pictureUrl;
                }).catch(e => {
                    this.$Message.error('网络错误');
                });
            },
            // 借用延期审批 拒绝
            refuseBorrowPostpone() {
                let borrowPostponeId = this.borrowPostponeModal.data.borrowPostponeId;
                ajax.borrowPostponeRefuse({borrowPostponeId}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.borrowPostponeModal.isShow = false;
                        this.fetchList();
                    }
                }).catch(e => {console.log(e)});
            },
            // 借用延期审批 同意
            approveBorrowPostpone() {
                let borrowPostponeId = this.borrowPostponeModal.data.borrowPostponeId;
                ajax.borrowPostponeApprove({borrowPostponeId}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.borrowPostponeModal.isShow = false;
                        this.fetchList();
                    }
                }).catch(e => {console.log(e)});
            },

            search () {
                this.form.page = 1
                this.fetchList();
            },
            pageChangeHandle (page) {
                this.form.page = page
                this.fetchList();
            },
            showPic (pictureUrl) {
                if(!pictureUrl){
                    return this.$Message.error('OA截图不存在');
                }
                this.uploadModal.canEdit = false;
                this.uploadModal.canDelete = false;
                this.$refs.uploadModal.isShow = true;
                this.uploadModal.picList = [
                    {
                        url: pictureUrl,
                        time: '',
                        name: '',
                    }
                ];
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
            getTextByCode () {
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
