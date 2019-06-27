<template>
    <div>
         <h2>档案详情</h2>
        <Card dis-hover>
            <p slot="title">
                基本信息
            </p>
            <basePanel :baseInfoList = "baseInfoList" @formEvent="saveJieQingCunFang"></basePanel>
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
                    <Tag :color="fileStates[file.archiveDocumentStatus].color">{{file.archiveDocumentStatusText}}</Tag>
                    <span>{{file.documentName || file.archiveDocumentId}}</span>
                    <div slot="content">
                        <div v-if="file.vm">
                            <basePanel :baseInfoList="file.vm"></basePanel>
                            <span>操作：</span>
                            <Button v-if="docActionBtns.docEdit" @click="openDocEditModal(file.detail)"
                                    class="btn-inline" type="primary">编辑
                            </Button>
                            <Button v-if="docActionBtns.pdfUpload" @click="openEmptyUploadModal(file)"
                                    class="btn-inline" type="primary">上传
                            </Button>
                            <Button v-if="docActionBtns.showPdf" @click="showPdf(file.pdfUrl)" class="btn-inline"
                                    type="primary">查看
                            </Button>
                            <Button v-if="docActionBtns.pdfDownload" @click="showPdf(file.pdfUrl)" class="btn-inline"
                                    type="primary">下载
                            </Button>
                        </div>
                        <div v-else>
                            <p>数据正在加载中...</p>
                        </div>

                    </div>
                </Panel>
            </Collapse>
            <br>
            <div>
                <Button icon="md-add" type="primary" @click="popAddFileModal">新增文件</Button>
            </div>
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
                    <Input @on-blur="saveDocRemark" v-model="remark" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder=""></Input>
                </FormItem>
            </Form>
        </Card>

        <div class="bottom-btn-group">
            <Button @click="openReceiveFileModal" class="btn-inline" size="large" type="primary">文件签收</Button>
            <Button @click="archiveAll" class="btn-inline" size="large" v-if="archiveStatus === 1" type="success">全部归档
            </Button>
            <Button @click="archiveRecall" class="btn-inline" size="large" v-if="archiveStatus === 11" type="info">
                撤回归档
            </Button>
            <Button @click="openArchiveZhanqiModal" v-if="archiveOrder.extend_order_filed_but_status" class="btn-inline"
                    size="large" type="warning">展期订单归档
            </Button>
        </div>

        <!-- 档案编辑 模态框 -->
        <Modal v-model="docEditModal.isShow"
               title="档案文件编辑">
            <Form :label-width="100">
                <Row>
                    <Col span="11">
                        <FormItem label="档案名称：">
                            <span>{{docEditModal.data.documentName}}</span>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem label="档案编号：">
                            <span>{{docEditModal.form.archiveId}}</span>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="11">
                        <FormItem label="丢失状态:">
                            <Select v-model="docEditModal.form.lostStatus">
                                <Option v-for="(li, index) in dictData.archiveDocumentLostStatusDic" :value="li.code"
                                        :key="index">
                                    {{li.description}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem label="归还性质:">
                            <Select v-model="docEditModal.form.returnProperty">
                                <Option v-for="(li, index) in dictData.archiveDocumentReturnPropertyDic"
                                        :value="li.code" :key="index">
                                    {{li.description}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="11">
                        <FormItem label="存放位置:">
                            <Select v-model="docEditModal.form.storeLocation">
                                <Option v-for="(li, index) in dictData.archiveDocumentStorePropertyDic" :value="li.code"
                                        :key="index">
                                    {{li.description}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem label="档案份数:">
                            <Input v-model="docEditModal.form.documentCount"></Input>
                        </FormItem>
                    </Col>
                </Row>

            </Form>
            <div slot="footer" class="text-center">
                <Button type="primary" @click="editDoc">同意</Button>
            </div>
        </Modal>

        <!--文件签收模态框-->
        <Modal v-model="receiveFileModal.isShow"
               title="文件签收">
            <Row type="flex" justify="center">
                <Col>
                    <Checkbox v-model="receiveFileModal.isAllChecked" @on-change="receiveFileCheckAllHandler">全选
                    </Checkbox>
                    <CheckboxGroup v-model="receiveFileModal.checked" @on-change="receiveFileCheckedHandler">
                        <template v-for="(item, index) in receiveFileModal.data">
                            <Checkbox :key="index" :label="item.archiveDocumentId">{{item.documentName+ '（'+
                                getTextByCode('documentMaterialDic', item.documentMaterial)+'）'+ item.documentCount +
                                '份'}}
                            </Checkbox>
                            <br>
                        </template>
                    </CheckboxGroup>
                </Col>
            </Row>

            <div slot="footer">
                <Button size="large" @click="rejectFile">打回</Button>
                <Button type="primary" size="large" @click="receiveFile">签收</Button>
            </div>
        </Modal>

        <!--展期订单归档 模态框-->
        <Modal v-model="archiveZhanqiModal.isShow"
               title="展期订单归档"
               @on-ok="archiveZhanqi">
            <Row type="flex" justify="center">
                <Col>
                    <CheckboxGroup v-model="archiveZhanqiModal.checked" v-for="(item, index) in archiveZhanqiModal.data"
                                   :key="index">
                        <Checkbox :key="index" :label="item.outOrderId">{{item.outOrderId}}
                        </Checkbox>
                        <br>
                    </CheckboxGroup>
                </Col>
            </Row>
            <div slot="footer">
                <Button size="large" @click="archiveZhanqiModal.isShow = false">取消</Button>
                <Button type="primary" size="large" @click="confirmArchiveZhanqi">确定</Button>
            </div>
        </Modal>

        <!-- 档案编辑 模态框 -->
        <Modal v-model="addFileModal.isShow"
               title="新增文件">
            <Form :label-width="100">
                <Row>
                    <Col span="20">
                        <FormItem label="档案类型:">
                            <Select v-model="addFileModal.data.documentTypeConfigId">
                                <Option v-for="(li, index) in documentTypeConfigList" :value="li.documentTypeConfigId"
                                        :key="index">
                                    {{li.documentTypeName}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="20">
                        <FormItem label="档案名称:">
                            <Select v-model="addFileModal.form.documentConfigId">
                                <Option v-for="(li, index) in documentConfigs" :value="li.documentConfigId"
                                        :key="index">
                                    {{li.documentName +'('+ getTextByCode('documentMaterialDic', li.documentMaterial) + ')'}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <Row>

                    <Col span="20">
                        <FormItem label="档案份数:">
                            <Input v-model="addFileModal.form.documentCount"></Input>
                        </FormItem>
                    </Col>
                    <Col span="20">
                        <FormItem label="交件人:">
                            <Input v-model="addFileModal.form.deliveryUserName"></Input>
                        </FormItem>
                    </Col>
                </Row>

            </Form>
            <div slot="footer" class="text-center">
                <Button type="default" @click="addFileModal.isShow = false">取消</Button>
                <Button type="primary" @click="confirmAddFile">确定</Button>
            </div>
        </Modal>

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
    import Cookies from 'js-cookie'
    import config from '@/config'

    export default {
        name: 'info',
        data () {
            return {
                archiveId: '',
                // 字典数据
                dictData: {},
                // 档案类型码表
                documentTypeConfigList: [],
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
                    },
                    41: {
                        color: '#347f5a',
                        text: '结清'
                    }
                },
                // 基本信息
                baseInfoList: {},
                // 影像资料
                picInfoList: [],
                // 档案清单
                archiveDocuments: [],
                // OA截图
                OAPicList: [],
                //档案清单订单信息
                archiveOrder: {},
                //档案 状态 判断按钮
                archiveStatus: '',
                remark: '',
                // 按钮权限
                docActionBtns: {
                    docEdit: false, // 编辑
                    pdfUpload: false, // 上传
                    showPdf: false, // 查看
                    pdfDownload: false, //下载
                },
                // 档案编辑模态框
                docEditModal: {
                    isShow: false,
                    data: {
                        'docName': '',
                        'docId': ''
                    },
                    form: {
                        'archiveDocumentId': '',    //档案下文件id
                        'archiveId': '',        //档案id
                        'documentCount': '',    //文件份数
                        'lostStatus': '',    //丢失状态
                        'returnProperty': '',    //归还性质
                        'storeLocation': '',    //存放位置
                        'storeProperty': '',    //存放性质
                    }
                },
                // 文件签收模态框
                receiveFileModal: {
                    isShow: false,
                    isAllChecked: false,
                    checked: [],
                    data: []
                },
                // 展期订单归档
                archiveZhanqiModal: {
                    isShow: false,
                    checked: [],
                    data: []
                },
                // 新增文件模态框
                addFileModal: {
                    isShow: false,
                    data: {
                        documentTypeConfigId: '', // 档案类型id
                    },
                    form: {
                        archiveId: '',
                        documentConfigId: '',  // 文件类型id
                        documentMaterial: '',
                        documentCount: '', //文件份数
                        deliveryUserName: '',
                    }
                },
                // 上传模态框
                uploadForm: {
                    uploadModalType: 'uploadPdf', //上传pdf
                    archiveDocumentId: ''
                },

                uploadModal: {
                    option: {},
                    picList: [],
                    canEdit: false,
                    canDelete: false,
                    accept: '',
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
            init () {
                this.archiveId = this.$route.params.id;
                this.addFileModal.form.archiveId = this.archiveId;
                // 1. 拿字典
                this.getDict().then(() => {
                    // 2. 拿数据
                    this.getDetail();
                });
                // 3. 获取上传凭证
                this.getUploadToken();
                // 4. 初始化按钮权限列表
                this.btnAuthInit();
                // 5. 获取档案类型
                this.getDocumentDictionary();

            },

            // 弹出新增文件模态框
            popAddFileModal () {
                this.addFileModal.isShow = true;
                this.addFileModal.data.documentTypeConfigId = '';
                this.addFileModal.form.documentConfigId = '';
                this.addFileModal.form.documentCount = '';
                this.addFileModal.form.deliveryUserName = '';
            },
            confirmAddFile () {
                // 前端校验
                if(!this.addFileModal.data.documentTypeConfigId){
                    return this.$Message.error('请选择档案类型');
                }
                if(!this.addFileModal.form.documentConfigId){
                    return this.$Message.error('请选择档案名称');
                }
                if(!this.addFileModal.form.documentCount){
                    return this.$Message.error('请输入档案份数');
                }
                // 获取documentMaterial字段
                this.documentTypeConfigList.forEach(v => {
                    if (v.documentTypeConfigId === this.addFileModal.data.documentTypeConfigId) {
                        v.documentConfigs.forEach(vv => {
                            if(vv.documentConfigId === this.addFileModal.form.documentConfigId){
                                this.addFileModal.form.documentMaterial = vv.documentMaterial;
                            }
                        })
                    }
                });
                // 调用接口，增加文件
                ajax.archiveDocumentAdd(this.addFileModal.form).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.addFileModal.isShow = false;
                        this.getDetail();
                    }
                }).catch(e => console.log(e));
            },
            // 根据用户权限初始化按钮
            btnAuthInit () {
                let urls = JSON.parse(Cookies.get('menus')) || [];
                for (let btn in this.docActionBtns) {
                    let btnUrl = config.btnUrls[btn];
                    this.docActionBtns[btn] = urls.includes(btnUrl)
                }
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
            // 获取文件类型码表
            getDocumentDictionary () {
                return ajax.getDocumentDictionary({}).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.documentTypeConfigList = data.documentTypeConfigList;
                    }
                }).catch(e => console.log(e));
            },
            // 获取上传token
            getUploadToken () {
                let o = {
                    url: '/guidang_manage/get_upload_token'
                }
                ajax.getUploadToken(o).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.uploadModal.option = data;
                    }
                }).catch(e => console.log(e));
            },
            // 获取详情页信息
            getDetail () {
                ajax.getGuiDangDetail({
                    archiveId: this.archiveId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.handleBaseInfo(data);
                        this.remark = data.remark;
                        this.archiveOrder = data.archiveOrder;
                        this.archiveStatus = data.archiveStatus;
                        // 影像资料
                        this.picInfoList = data.pic_list;
                        // 档案清单
                        this.archiveDocuments = data.archiveDocuments.map(v => {
                            v.archiveDocumentStatusText = this.getTextByCode('archiveDocumentStatusDic', v.archiveDocumentStatus);
                            return v;
                        });
                        // OA截图
                        this.OAPicList = data.oa_pic_list.map(v => {
                            return {
                                hpc_id: v.businessType,
                                hpc_name: this.getTextByCode('archiveBusinessTypeDic', v.businessType),
                                pic_num: v.pictureSize
                            }
                        });
                    }
                }).catch(e => console.log(e));
            },
            // 处理详情页信息
            handleBaseInfo (d) {
                let archiveOrder = d.archiveOrder;
                let settlementStore = {
                    name: '', desc: ''
                };
                // 41 代表还本结清出库成功，显示这个字段
                if (d.settlementStatus === 41) {
                    settlementStore = {
                        name: '结清存放', desc: d.settlementStoreRemark, field: 'settlementStoreRemark', type: 'text'
                    };
                }
                let zhanqi = [
                    {name: '', desc: ''},
                    {name: '', desc: ''}
                ];
                // 如果有展期订单，多显示两个字段
                if (archiveOrder.zhanqi_order.length > 0) {
                    zhanqi = [
                        {
                            name: '展期订单',
                            desc: archiveOrder.zhanqi_order.map(v => v.outOrderId + ' (' + this.getTextByCode("archiveOrderStatusDic", v.archiveOrderStatus) + ')').join(', ')
                        },
                        {name: '展期后到期日', desc: archiveOrder.zhanqi_end_date}
                    ]
                }
                // 延期后归档日期 需要备注次数
                let postponeDate = d.postponeDate ? d.postponeDate + ' ( ' + d.filingPostponeApproveCount + ' )' : '';
                this.baseInfoList = [
                    {
                        title: '',
                        data: [
                            [
                                {name: '档案号', desc: d.archiveNumber},
                                {name: '订单编号', desc: archiveOrder.outOrderId},
                                {name: '城市', desc: archiveOrder.city},
                            ],
                            [
                                {name: '借款人', desc: archiveOrder.borrowerName},
                                {name: '借款金额', desc: archiveOrder.loan_money + ' 万'},
                                {name: '借款期限', desc: archiveOrder.loan_limit + ' 期'},
                            ],
                            [
                                {name: '资金方', desc: archiveOrder.financeName},
                                {name: '信托计划', desc: archiveOrder.trust_plan_code_text},
                                settlementStore,
                            ],
                            [
                                {name: '放款日期', desc: archiveOrder.loanDate},
                                {name: '应归档日期', desc: d.filingPlanDate},
                                {name: '延期后归档日期', desc: postponeDate},
                            ],
                            [
                                {name: '档案状态', desc: this.getTextByCode('archiveStatusDic', d.archiveStatus)},
                                ...zhanqi
                            ]
                        ]
                    }
                ];

            },
            uploadComplete (fileList) {
                if (fileList.length === 0) {
                    return this.$Message.warning('未上传任何文件');
                }
                if (this.uploadForm.uploadModalType === 'uploadPdf') {
                    let pdfUrl = fileList[fileList.length - 1].qiniuUrl;
                    ajax.pdfUpdate({
                        archiveDocumentId: this.uploadForm.archiveDocumentId,
                        archiveId: this.archiveId,
                        pdfUrl
                    }).then(res => {
                        let {error_code, message, data} = res.data;
                        if (error_code) {
                            this.$Message.error(message);
                        } else {
                            this.$Message.success(message);
                            this.uploadModal.canEdit = false;
                            this.uploadModal.canDelete = false;
                            this.$refs.uploadModal.isShow = true;
                            this.updatePdfStatus(pdfUrl);
                        }
                    }).catch(e => console.log(e));
                }

            },
            // 上传完成，实时更新pdf状态
            updatePdfStatus(pdfUrl) {
                this.archiveDocuments.map(v => {
                    if(v.archiveDocumentId === this.uploadForm.archiveDocumentId){
                        v.pdfUrl = pdfUrl;
                        v.detail.pdfUrl = pdfUrl;
                        v.vm[0].data[3][2].desc = '是';
                    }
                    return v;
                });
            },
            showPdf (pdfUrl) {
                if (!pdfUrl) {
                    return this.$Message.warning('还未上传该档案文件');
                }
                ajax.showPdf({
                    pdfUrl
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        util.jumpViaA(data.pdfUrl);
                        this.$Modal.confirm({
                            title: '文件没有打开？请点击以下链接打开',
                            closable: true,
                            content: `<div style="word-break: break-all"><a href="${data.pdfUrl}" target="_blank">${data.pdfUrl}</a></div>`,
                        });
                    }
                }).catch(e => console.log(e));
            },
            // 打开上传pdf模态框
            openEmptyUploadModal (file) {
                this.initUploadModal();
                this.uploadForm.uploadModalType = 'uploadPdf';
                this.uploadForm.archiveDocumentId = file.archiveDocumentId;
                this.uploadModal.canEdit = true;
                this.uploadModal.accept = 'application/pdf';
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
            // 打开影像资料
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
                if (!data || !data.pic_list) {
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
                ajax.getGuiDangFileDetail({archiveDocumentId: file.archiveDocumentId}).then(res => {
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
                            {name: '状态', desc: this.getTextByCode('archiveDocumentStatusDic', d.archiveDocumentStatus)},
                        ],
                        [
                            {name: '档案份数', desc: d.documentCount},
                            {name: '丢失状态', desc: this.getTextByCode('archiveDocumentLostStatusDic', d.lostStatus)},
                            {
                                name: '归还性质',
                                desc: this.getTextByCode('archiveDocumentReturnPropertyDic', d.returnProperty)
                            },
                        ],
                        [
                            {
                                name: '存放性质',
                                desc: this.getTextByCode('archiveDocumentStorePropertyDic', d.storeProperty)
                            },
                            {
                                name: '存放位置',
                                desc: this.getTextByCode('archiveDocumentStorePropertyDic', d.storeLocation)
                            },
                            {name: '原件/复印件', desc: this.getTextByCode('documentMaterialDic', d.documentMaterial)},
                        ],
                        [
                            {name: '交件人', desc: d.deliveryUserName},
                            {name: '交件时间', desc: d.deliveryTime},
                            {name: '文件是否上传', desc: f.pdfUrl ? '是' : '否'},
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
            // 打开文件编辑模态框
            openDocEditModal (d) {
                this.docEditModal.data = {
                    documentName: d.documentName,
                }
                this.docEditModal.form = {
                    archiveDocumentId: d.archiveDocumentId,
                    archiveId: this.archiveId,
                    documentCount: d.documentCount,
                    lostStatus: d.lostStatus,
                    returnProperty: d.returnProperty,
                    storeLocation: d.storeLocation,
                    storeProperty: d.storeProperty
                }
                this.docEditModal.isShow = true;
            },
            // 档案文件编辑
            editDoc () {
                ajax.archiveDocumentUpdate(this.docEditModal.form).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.docEditModal.isShow = false;
                        // 更新这个档案文件的数据模型

                        this.archiveDocuments.map((item, index) => {
                            if (item.archiveDocumentId === this.docEditModal.form.archiveDocumentId) {
                                this.getFileDetail(item);
                            }
                        })
                    }
                }).catch(e => console.log(e));
            },
            // 打开文件签收模态框
            openReceiveFileModal () {
                this.receiveFileModal.checked = [];
                this.receiveFileModal.isAllChecked = false;
                ajax.listArchiveDocumentsUnSign({
                    archiveId: this.archiveId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        if (data.list.length === 0) {
                            return this.$Message.warning('这个档案下没有需要签收的文件');
                        }
                        this.receiveFileModal.data = data.list;
                        this.receiveFileModal.isShow = true
                    }
                }).catch(e => console.log(e));
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
            // 签收文件
            receiveFile () {
                if (this.receiveFileModal.checked.length === 0) {
                    return this.$Message.error('请先选择文件');
                }
                ajax.documentSign({
                    archiveId: this.archiveId,
                    archiveDocumentIds: this.receiveFileModal.checked,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.receiveFileModal.isShow = false;
                        // 如果以后这里需要维护的数据太多，直接将页面reload
                        this.archiveDocuments.map(v => {
                            if (this.receiveFileModal.checked.indexOf(v.archiveDocumentId) > -1) {
                                this.updateFilePanel(v);
                            }
                            return v;
                        });
                    }
                }).catch(e => console.log(e));
            },
            // 签收文件后，实时更新档案清单状态
            updateFilePanel (v) {
                // 实时修改数据模型
                v.archiveDocumentStatusText = '已签收';
                v.archiveDocumentStatus = 11;
                // 如果v.detail存在，说明这个文件详情已经打开，需要同步修改数据模型
                if (v.detail) {
                    v.detail.archiveDocumentStatus = 11;
                    v.vm[0].data[0][2].desc = '已签收';
                }
            },
            // 打回文件
            rejectFile () {
                if (this.receiveFileModal.checked.length === 0) {
                    return this.$Message.error('请先选择文件');
                }
                ajax.documentSignRefuse({
                    archiveId: this.archiveId,
                    archiveDocumentIds: this.receiveFileModal.checked,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                        this.receiveFileModal.isShow = false;
                        this.archiveDocuments.map(v => {
                            if (this.receiveFileModal.checked.indexOf(v.archiveDocumentId) > -1) {
                                v.archiveDocumentStatusText = '已打回';
                                v.archiveDocumentStatus = 12;
                            }
                            return v;
                        });
                    }
                }).catch(e => console.log(e));
            },
            // 页面底部按钮 全部归档
            archiveAll () {
                this.$Modal.confirm({
                    title: '全部归档',
                    content: '<div>确认该客户档案已全部归档？</div>',
                    onOk: () => {
                        ajax.mainOrderFiled({
                            archiveId: this.archiveId
                        }).then(res => {
                            let {error_code, message, data} = res.data;
                            if (error_code) {
                                this.$Message.error(message);
                            } else {
                                window.location.reload();
                                this.$Message.success(message);
                            }
                        }).catch(e => console.log(e));
                    }
                });
            },
            // 页面底部按钮 撤回归档
            archiveRecall () {
                this.$Modal.confirm({
                    title: '撤回归档',
                    content: '<div>确认该客户档案撤回归档？</div>',
                    onOk: () => {
                        ajax.mainOrderFiledUndo({
                            archiveId: this.archiveId
                        }).then(res => {
                            let {error_code, message, data} = res.data;
                            if (error_code) {
                                this.$Message.error(message);
                            } else {
                                window.location.reload();
                                this.$Message.success(message);
                            }
                        }).catch(e => console.log(e));
                    }
                });
            },
            openArchiveZhanqiModal () {
                this.archiveZhanqiModal.isShow = true;
                ajax.listArchiveOrdersNotField({
                    archiveId: this.archiveId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.archiveZhanqiModal.data = data.list;
                        this.archiveZhanqiModal.isShow = true
                    }
                }).catch(e => console.log(e));
            },
            confirmArchiveZhanqi () {
                if (this.archiveZhanqiModal.checked.length === 0) {
                    return this.$Message.error('请先选择展期订单');
                }
                ajax.extendOrderFiled({
                    archiveId: this.archiveId,
                    outOrderId: this.archiveZhanqiModal.checked
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.success(message);
                    }
                }).catch(e => console.log(e));
            },
            // 页面底部按钮 展期订单归档
            archiveZhanqi () {
                console.log(this.archiveZhanqiModal.checked);
            },
            // 保存档案备注
            saveDocRemark () {
                ajax.archiveUpdate({
                    archiveId: this.archiveId,
                    remark: this.remark
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.info(message);
                    }
                }).catch(e => console.log(e));
            },
            // 保存结清存放
            saveJieQingCunFang (v) {
                ajax.archiveUpdate({
                    archiveId: this.archiveId,
                    settlementStoreRemark: v.settlementStoreRemark
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.$Message.info(message);
                    }
                }).catch(e => console.log(e));
            },
            getTextByCode () {
                return util.getTextByCodeFromDict(this.dictData, ...arguments)
            }

        },
        computed: {
            documentConfigs () {
                let configList = [];
                this.documentTypeConfigList.forEach(v => {
                    if (v.documentTypeConfigId === this.addFileModal.data.documentTypeConfigId) {
                        configList = v.documentConfigs;
                    }
                });
                // 一旦档案类型变化，清空名称
                this.addFileModal.form.documentConfigId = '';
                return configList;
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
