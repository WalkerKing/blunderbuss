<template>
    <Content class="content_box">
        <Form :model="form" :label-width="100">
            <Row :gutter="16">
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
                        <Select v-model="form.financeId">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) in dictData.financingChannelList" :value="index"
                                    :key="item.value">{{
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
                <Col span="6">
                    <FormItem>
                        <Button type="success" @click.native="popEditRemindModal('create')">添加归档提醒</Button>
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


        <!-- 添加归档提醒 模态框 -->
        <Modal v-model="editRemindModal.isShow"
               :title="editRemindModal.data.title">
            <Form :label-width="100">
                <Row>
                    <Col span="20">
                        <FormItem label="城市:">
                            <Select v-model="editRemindModal.form.city">
                                <Option v-for="(li, index) in dictData.cityList" :value="li" :key="index">
                                    {{li}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="20">
                        <FormItem label="资金方:">
                            <Select v-model="editRemindModal.form.financeId">
                                <Option v-for="(li, index) in dictData.financingChannelList" :value="index"
                                        :key="index">
                                    {{li}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="20">
                        <FormItem label="归档提醒:">
                            <span>放款时间 + </span>
                            <Input class="shortInput" size="small"
                                   v-model="editRemindModal.form.filingRemindOffset"></Input>
                            <span> 天</span>
                        </FormItem>
                    </Col>
                    <Col span="20">
                        <FormItem label="归档时间:">
                            <span>放款时间 + </span>
                            <Input class="shortInput" size="small"
                                   v-model="editRemindModal.form.filingDateOffset"></Input>
                            <span> 天</span>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormItem label="状态:">
                            <RadioGroup v-model="editRemindModal.form.status">
                                <Radio v-for="(item, index) in dictData.filingRemindConfigStatusDic" :label="item.code"
                                       :key="index">
                                    <span>{{item.description}}</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>

            </Form>
            <div slot="footer" class="text-center">
                <Button type="default" @click="editRemindModal.isShow = false">取消</Button>
                <Button type="primary" @click="confirmEditRemindModal">确认</Button>
            </div>
        </Modal>
    </Content>
</template>
<script>
    import * as ajax from '@/api'
    import * as util from '@/libs/util'

    export default {
        data () {
            return {
                dictData: {},
                form: {
                    city: '',
                    financeId: '',
                    total: 0, // 数据总数
                    pageNum: 1, // 当前页码
                    pageSize: 20, // 每页条数
                },
                tableColumns: [],
                tableData: [],
                editRemindModal: {
                    isShow: false,
                    data: {
                        title: '',
                        opType: '' // 操作类型
                    },
                    form: {
                        city: '',
                        financeId: '',
                        filingRemindOffset: '', // 归档提醒偏移量
                        filingDateOffset: '',  // 归档时间偏移量
                        status: ''
                    }
                }
            }
        },
        mounted () {
            this.initColumns();
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

        },
        methods: {
            initColumns () {
                this.tableColumns = [
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
                        title: '归档提醒',
                        key: 'filingRemindOffset',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', `放款时间 + ${params.row.filingRemindOffset}`)
                        },
                    },
                    {
                        title: '归档时间',
                        key: 'filingDateOffset',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', `放款时间 + ${params.row.filingDateOffset}`)
                        },
                    },
                    {
                        title: '状态',
                        align: 'center',
                        render: (h, params) => {
                            let str = util.getTextByCodeFromDict(this.dictData, 'filingRemindConfigStatusDic', params.row.status)
                            return h('span', str)
                        },
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
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
                                            this.popEditRemindModal('edit', params.row);
                                        },
                                    },
                                }, '编辑'),
                            ])
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
            // 弹出归档编辑模态框
            popEditRemindModal (status, oldConfig) {
                this.editRemindModal.isShow = true;
                if (status === 'create') {
                    // 添加归档提醒
                    this.editRemindModal.data.filingConfigId = '';
                    this.editRemindModal.data.title = '添加归档提醒';
                    this.editRemindModal.form = {
                        city: '',
                        financeId: '',
                        filingRemindOffset: '', // 归档提醒偏移量
                        filingDateOffset: '',  // 归档时间偏移量
                        status: ''
                    }
                } else if (status === 'edit') {
                    // 编辑归档提醒
                    this.editRemindModal.data.filingConfigId = oldConfig.filingConfigId;
                    this.editRemindModal.data.title = '编辑归档提醒';
                    this.editRemindModal.form = {
                        city: oldConfig.city,
                        financeId: oldConfig.financeId,
                        filingRemindOffset: oldConfig.filingRemindOffset, // 归档提醒偏移量
                        filingDateOffset: oldConfig.filingDateOffset,  // 归档时间偏移量
                        status: oldConfig.status
                    }
                }
            },
            // 归档提醒的编辑确认
            confirmEditRemindModal () {
                // 前端表单校验
                if(!this.validateForm()){
                    return ;
                }
                if (this.editRemindModal.data.filingConfigId) {
                    this.updateFilingRemindConfig();
                } else {
                    this.addFilingRemindConfig();
                }
            },
            validateForm(){
                if(!this.editRemindModal.form.city){
                    this.$Message.error('城市不能为空');
                    return false;
                }
                if(!this.editRemindModal.form.financeId){
                    this.$Message.error('资金方不能为空');
                    return false;
                }
                if(!this.editRemindModal.form.filingRemindOffset){
                    this.$Message.error('归档提醒时间不能为空');
                    return false;
                }
                if(!this.editRemindModal.form.filingDateOffset){
                    this.$Message.error('归档时间不能为空');
                    return false;
                }
                if(!this.editRemindModal.form.status){
                    this.$Message.error('状态不能为空');
                    return false;
                }
                return true;
            },
            // 添加归档提醒设置
            addFilingRemindConfig () {
                ajax.addFilingRemindConfig({
                    ...this.editRemindModal.form,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                        return false
                    } else {
                        this.editRemindModal.isShow = false;
                        return true;
                    }
                }).then(res => {
                    res && this.getListData();
                }).catch(e => console.log(e));
            },
            // 更新归档提醒设置
            updateFilingRemindConfig () {
                ajax.updateFilingRemindConfig({
                    ...this.editRemindModal.form,
                    filingConfigId: this.editRemindModal.data.filingConfigId,
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                        return false
                    } else {
                        this.editRemindModal.isShow = false;
                        return true;
                    }
                }).then(res => {
                    res && this.getListData();
                }).catch(e => console.log(e));
            },
            //列表数据
            getListData () {
                ajax.getFilingRemindList({
                    pageSize: this.form.pageSize,
                    pageNum: this.form.pageNum,
                    city: this.form.city,
                    financeId: this.form.financeId
                }).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.tableData = data.list;
                        this.form.total = data.total
                    }
                });
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

    .shortInput {
        width: 40px;
    }

</style>
