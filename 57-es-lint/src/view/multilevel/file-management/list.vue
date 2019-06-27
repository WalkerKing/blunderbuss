<template>
    <Content :style="{padding: '20px', minHeight: '280px', background: '#fff'}">
        <Form :model="form" :label-width="100" :style="{minHeight: '120px'}">
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="档案类型:">
                        <Select v-model="documentTypeConfigId">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of documentTypeConfigList" :value="item.documentTypeConfigId" :key="item.documentTypeName">{{ item.documentTypeName }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="档案名称:">
                        <Input v-model="documentName" placeholder="请输入档案名称"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="原件/复印件:">
                        <Select v-model="documentMaterial">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of documentMaterialDic" :value="item.code" :key="index">{{ item.description }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="状态:">
                        <Select v-model="documentStatus">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of documentStatusDic" :value="item.code" :key="index">{{ item.description }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem>
                        <Button type="primary" icon="ios-search" @click.native="search">搜索</Button>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <FormItem>
                    <Button class="file_manage_btn" type="primary" @click.native="showFileManageModal('新增','','')">新增</Button>
                </FormItem>
            </Row>
        </Form>
        <Table border :columns="columns" :data="tableData"></Table>
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

        <!-- 文件管理 -->
        <Modal v-model="fileManageModal"
            :title="`${fileManageTitle}档案文件`">
            <div class="modal_body clearfix">
                <Form :label-width="100">
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>档案类型:</label>
                            <FormItem>
                                <Select v-model="documentTypeConfigIdModal" :label="documentTypeConfigIdModal">
                                    <Option value="">请选择</Option>
                                    <Option v-for="(item,index) of documentTypeConfigList" :value="item.documentTypeConfigId" :key="item.documentTypeName">{{ item.documentTypeName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>档案名称:</label>
                            <FormItem>
                                <Input v-model="documentNameModal" placeholder="请输入档案名称"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>原件/复印件:</label>
                            <FormItem>
                                <RadioGroup v-model="documentMaterialModal">
                                    <Radio v-for="(item,index) of documentMaterialDic" :label="item.code" :key="index">{{ item.description }}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20">
                            <label class="ivu-form-item-label biaoshi_red"><i>*</i>状态:</label>
                            <FormItem>
                                <RadioGroup v-model="documentStatusModal">
                                    <Radio v-for="(item,index) of documentStatusDic" :label="item.code" :key="index">{{ item.description }}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="fileManageModalOk">确定</Button>
            </div>
        </Modal>
    </Content>
</template>
<script>
    import Cookies from 'js-cookie'
    import * as ajax from '@/api'
    import axios from '@/libs/api.request'
    import qs from 'qs'
    import {getTextByCodeFromDict} from '@/libs/util'


    export default {
        name: 'list',
        data () {
            return {
                documentStatusDic:[],
                documentMaterialDic:[],
                documentTypeConfigList:[],
                documentName:'',
                documentTypeConfigId:'',
                documentMaterial:'',
                documentStatus:'',

                documentTypeConfigIdModal:'',
                documentNameModal:'',
                documentMaterialModal:'',
                documentStatusModal:'',

                fileManageModal:false,
                fileManageTitle:'新增',
                form: {
                    total: 0, // 数据总数
                    page: 1, // 当前页码
                    perPage: 20, // 每页条数
                },
                columns: [
                    {
                        title: '序号',
                        key: 'id',
                    },
                    {
                        title: '档案类型',
                        key: 'documentTypeNameText',
                    },
                    {
                        title: '档案名称',
                        key: 'documentName',
                    },
                    {
                        title: '原件/复印件',
                        key: "documentMaterialText",
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
                    },
                    {
                        title: '状态',
                        key: 'documentStatusText',
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
                                            this.showFileManageModal('编辑',params.row.documentConfigId,params.row);
                                        },
                                    },
                                }, '编辑'),
                            ])
                        },
                    },
                ],
                tableData: [],
                documentConfigId:'',
                dictData:''//码表
            }
        },
        methods: {
            search () {
                this.form.page = 1
                this.getListData()
            },
            pageChangeHandle (page) {
                this.form.page = page
                this.getListData()
            },
            showFileManageModal(text,configId,allData){
                if(text == '新增'){
                    //清空一下弹出框信息
                    this.documentTypeConfigIdModal = '';
                    this.documentNameModal = '';
                    this.documentMaterialModal = '';
                    this.documentStatusModal = '';
                }else{ //编辑带出数据
                    this.documentTypeConfigIdModal = allData.documentTypeConfig.documentTypeConfigId;
                    this.documentNameModal = allData.documentName;
                    this.documentMaterialModal = allData.documentMaterial;
                    this.documentStatusModal = allData.documentStatus;
                }

                this.fileManageTitle = text;
                this.documentConfigId = configId;
                this.fileManageModal = !this.fileManageModal;
            },
            fileManageModalOk(){
                if(!this.documentTypeConfigIdModal || this.documentTypeConfigIdModal == ''){
                    this.$Message.error('档案类型不能为空');
                    return false;
                }
                if(!this.documentNameModal || this.documentNameModal == ''){
                    this.$Message.error('档案名称不能为空');
                    return false;
                }
                if(!this.documentMaterialModal || this.documentMaterialModal == ''){
                    this.$Message.error('原件/复印件不能为空');
                    return false;
                }
                if(!this.documentStatusModal || this.documentStatusModal == ''){
                    this.$Message.error('状态不能为空');
                    return false;
                }
                let url;
                if(this.fileManageTitle == '新增'){
                    url = '/file_manage/add'
                }else{
                    url = '/file_manage/edit';
                }
                const o = {
                    url: url,
                    data: qs.stringify({
                        "documentName":this.documentNameModal,
                        "documentTypeConfigId": this.documentTypeConfigIdModal,
                        "documentMaterial": this.documentMaterialModal,
                        "documentStatus": this.documentStatusModal,
                        "documentConfigId":this.documentConfigId
                    })
                }
                let data = ajax.fileManageAddOrEdit(o);
                data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.getListData();
                        this.fileManageModal = false;
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            getListData(){
                const o = {
                    data: qs.stringify({
                        "documentName":this.documentName,
                        "documentTypeConfigId": this.documentTypeConfigId,
                        "documentMaterial": this.documentMaterial,
                        "documentStatus": this.documentStatus,
                        "pageNum":this.form.page,
                        "pageSize":this.form.perPage
                    })
                }
                let data = ajax.fileManageGetListData(o);
                data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.tableData = result.data.list;
                        this.form.total = result.data.total;
                        for(var i=0;i<this.tableData.length;i++){
                            this.tableData[i].id = i+1;
                            this.tableData[i].documentMaterialText = getTextByCodeFromDict(this.dictData,"documentMaterialDic",this.tableData[i].documentMaterial)
                            this.tableData[i].documentStatusText = getTextByCodeFromDict(this.dictData,"documentStatusDic",this.tableData[i].documentStatus)
                            this.tableData[i].documentTypeNameText = this.tableData[i].documentTypeConfig.documentTypeName;
                        }
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            },
            getDocumentDictionaryList(){
                //得到档案类型码表数据
                const o = {}
                let data = ajax.getDocumentDictionary(o);
                data.then( result => {
                    result = result.data;
                    if (result.error_code === 0) {
                        this.documentTypeConfigList = result.data.documentTypeConfigList;
                    } else {
                        this.$Message.error(result.message);
                    }
                })
            }
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
                } else {
                    this.$Message.error(result.message);
                }
            }).then(() => {
                this.getListData();
                this.getDocumentDictionaryList();
            })



        },
    }
</script>
<style>
.biaoshi_red{
    width: 100px;
}
.biaoshi_red i{
    color: red;
    padding: 0 3px;
    font-size: 14px;
}
.file_manage_btn{
    padding: 5px 20px;
    position:absolute;
    right:10px;
    bottom:24px;
}
</style>

