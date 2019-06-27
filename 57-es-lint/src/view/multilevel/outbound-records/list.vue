<template>
    <Content class="content_box">
        <Form :model="form" :label-width="100">
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="档案号:">
                        <Input v-model="form.archiveNumber" placeholder="请输入档案号"></Input>
                    </FormItem>
                </Col>

                <Col span="6">
                    <FormItem label="借款人:">
                        <Input v-model="form.borrowerName" placeholder="请输入借款人"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="城市:">
                        <Select v-model="form.city">
                            <Option value="">请选择</Option>
                            <Option v-for="item in dictData.cityList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="资金方:">
                        <Select v-model="form.financeIds">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) in dictData.financingChannelList" :value="index"
                                    :key="item.value">{{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">

                <Col span="6">
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click.native="search">搜索</Button>
                    </FormItem>
                </Col>
            </Row>

        </Form>
        <br>
        <Table border :columns="tableColumns" :data="tableData"></Table>
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


        <!-- 借用延期申请 模态框 -->
        <Modal v-model="delayApplyModal.isShow"
               title="借用延期申请">
            <Form :label-width="100">
                <Row v-for="(item, index) in delayApplyModal.data.list">
                    <Col span="20">
                        <FormItem :label="item.documentName + ':'">
                            <DatePicker style="width: 100%" :value="item.postponeDate" @on-change="item.postponeDate=$event" type="date" placeholder="请选择延期后归库日期"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span="20">
                        <FormItem label="OA截图：">
                            <Button class="inline-btn" :type="delayApplyModal.data.oaPictureUrl ? 'primary' : 'default'" @click="openOAUploadModal">{{delayApplyModal.data.btnStr}}</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" class="text-center">
                <Button type="default" @click="delayApplyModal.isShow = false">取消</Button>
                <Button type="primary" @click="confirmDelayApplyModal">确认</Button>
            </div>
        </Modal>

        <!--文件上传组件-->
        <uploadModal ref="uploadModal" v-bind="uploadModal" @uploadComplete="uploadComplete"></uploadModal>
    </Content>
</template>
<script>

    import uploadModal from '@/view/multilevel/components/upload-modal'
    import * as ajax from '@/api'
    import * as util from '@/libs/util'

    export default {
        data () {
            return {
                dictData: {},
                form: {
                    archiveNumber: '',
                    borrowerName: '',
                    city: '',
                    financeIds: '',
                    total: 0, // 数据总数
                    pageNum: 1, // 当前页码
                    pageSize: 10, // 每页条数
                },
                tableColumns: [],
                tableData: [],
                delayApplyModal: {
                    isShow: false,
                    data: {
                        outboundId: '',
                        list: [

                        ],
                        oaPictureUrl: '',
                        btnStr: '借用延期申请【0】',
                    }
                },
                uploadModal: {
                    option: {},
                    picList: [],
                    canEdit: false,
                    canDelete: false,
                    accept: ''
                }
            }
        },
        components: {
            uploadModal
        },
        mounted () {
            // 1.
            this.initColumns();
            ajax.getDictData().then(result => {
                result = result.data;
                if (result.error_code === 0) {
                    this.dictData = result.data;
                    this.getListData();
                } else {
                    this.$Message.error(result.message);
                }
            })
            // 3. 获取上传凭证
            this.getUploadToken();

        },
        methods: {
            initColumns () {
                this.tableColumns = [
                    {
                        title: '档案号',
                        align: 'center',
                        key: 'archiveNumber',
                    },
                    {
                        title: '借款人',
                        align: 'center',
                        key: 'borrowerName',
                    },
                    {
                        title: '城市',
                        align: 'center',
                        key: 'city',
                    },
                    {
                        title: '资金方',
                        align: 'center',
                        key: 'financeName',
                    },
                    {
                        title: '借用文件',
                        key: 'outboundDocuments',
                        align: 'left',
                        minWidth: 150,
                        render: (h, params) => {
                            var row = params.row;
                            let docNameList = row.outboundDocuments.map(v => {
                                return {
                                    name: v.documentName + '(' + this.getTextByCode('documentMaterialDic', v.documentMaterial) + ') ',
                                    date: '归库日期：' + v.returnRequiredDate || ''
                                }
                            });
                            return h('div', docNameList.map(v => {
                                return h('span', [
                                    h('span', v.name),
                                    h('span', v.date),
                                    h('br')
                                ]);
                            }))
                        }
                    },
                    {
                        title: '审批时间',
                        align: 'center',
                        key: 'approveTime',
                    },
                    {
                        title: '审批结果',
                        align: 'center',
                        render: (h, params) => {
                            let row = params.row;
                            let str = this.getTextByCode('outboundStatusDic', row.outboundStatus);
                            return h('div', str);
                        }
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            // let isShowBtn = true;
                            // outboundStatus === 12 审批拒绝
                            let outboundId = params.row.outboundId;
                            // 11 代表审批通过
                            if(params.row.outboundStatus === 11){
                                return h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.popDelayApplyModal(outboundId)
                                        },
                                    },
                                }, '借用延期申请')
                            }else{
                                return h('span', '')
                            }

                        },
                    },
                ]
            },
            search () {
                this.form.pageNum = 1;
                this.getListData();
            },
            pageChangeHandle (pageNum) {
                this.form.pageNum = pageNum
                this.getListData();
            },
            // 获取上传token
            getUploadToken () {
                ajax.getUploadToken({
                    url:'/outbound_records/get_upload_token'
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.uploadModal.option = data;
                    }
                }).catch(e => console.log(e));
            },
            // 弹出借用延期申请模态框
            popDelayApplyModal (outboundId) {
                // 先将之前的列表数据清空
                this.delayApplyModal.data.list = [];
                this.delayApplyModal.data.btnStr = '借用延期申请【0】';
                this.delayApplyModal.data.oaPictureUrl = '';
                this.delayApplyModal.data.outboundId = outboundId;
                ajax.countBorrowPostponeWaitApprove({
                    outboundId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        // error_code === 0说明校验通过
                        this.delayApplyModal.isShow = true;
                        this.delayApplyModal.data.list = data.list;
                    }
                }).catch(e => console.log(e));
            },

            // 借用延期申请 确认
            confirmDelayApplyModal () {
                let borrowPostponeDocumentInfos = [];
                this.delayApplyModal.data.list.forEach(v => {
                    if(v.postponeDate){
                        borrowPostponeDocumentInfos.push(v)
                    }
                })

                if(borrowPostponeDocumentInfos.length === 0){
                    return this.$Message.error(`请至少选择一个文件的延期日期`);
                }

                if(!this.delayApplyModal.data.oaPictureUrl){
                    return this.$Message.error(`请上传OA截图`);
                }
                // console.log(JSON.parse(JSON.stringify(this.delayApplyModal.data)));
                let {outboundId, oaPictureUrl} = this.delayApplyModal.data;
                ajax.borrowPostponeApply({
                    outboundId,
                    oaPictureUrl,
                    borrowPostponeDocumentInfos
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.delayApplyModal.isShow = false;
                    }
                }).catch(e => console.log(e));
            },

            // 上传组件触发的上传完成事件回调
            uploadComplete(fileList) {
                if(fileList.length === 0){
                    return this.$Message.warning('未上传任何文件');
                }
                this.delayApplyModal.data.btnStr = '借用延期申请【1】';
                this.delayApplyModal.data.oaPictureUrl = fileList[fileList.length - 1].qiniuUrl;

                this.$refs.uploadModal.isShow = true;
            },
            // 打开OA上传模态框
            openOAUploadModal () {
                this.uploadModal.canEdit = true;
                this.uploadModal.canDelete = true;
                this.$refs.uploadModal.isShow = true;
            },

            //列表数据
            getListData () {
                ajax.getOutboundRecords(this.form).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.tableData = data.list;
                        this.form.total = data.total
                    }
                }).catch(e => console.log(e));
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

</style>
