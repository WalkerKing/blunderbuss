<template>
    <Content :style="{padding: '20px', minHeight: '280px', background: '#fff'}">
        <Form :model="form" :label-width="100">
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="城市:">
                        <Select v-model="form.city">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of dictData.cityList" :value="item"
                                    :key="index">{{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="自然年:">
                        <DatePicker :value="form.loanYear" @on-change="form.loanYear=$event" type="year" placeholder="Select year"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="资金方:">
                        <Select v-model="form.financeIds">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of dictData.financingChannelList" :value="index"
                                    :key="index">{{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="档案号:">
                        <Input v-model="form.archiveNumber" placeholder="请输入档案号"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="订单号:">
                        <Input v-model="form.outOrderId" placeholder="请输入订单号"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="借款人:">
                        <Input v-model="form.borrowerName" placeholder="请输入借款人"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="档案状态:">
                        <Select v-model="form.archiveStatus">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of dictData.archiveStatusDic" :value="item.code"
                                    :key="index">{{ item.description }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="是否有展期订单:">
                        <Select v-model="form.hasDeferOrder">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of dictData.yesNoDic" :value="item.code"
                                    :key="index">{{ item.description }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>

            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <FormItem label="即将超期:">
                        <Select v-model="form.remind">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of dictData.yesNoDic" :value="item.code"
                                    :key="index">{{ item.description }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="已超期:">
                        <Select v-model="form.overtime">
                            <Option value="">请选择</Option>
                            <Option v-for="(item,index) of dictData.yesNoDic" :value="item.code"
                                    :key="index">{{ item.description }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="">
                        <Button type="primary" icon="ios-search" @click.native="search">搜索</Button>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem>
                        <Button type="primary" @click.native="exportCsv">导出</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table border :columns="columns" :data="tableData"></Table>
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
    </Content>
</template>
<script>
    import * as ajax from '@/api'
    import * as util from '@/libs/util'

    export default {
        name: 'list',
        data () {
            return {
                dictData: {},
                form: {
                    city: '',
                    loanYear: '',
                    financeIds: '',
                    archiveNumber: '',
                    outOrderId: '',
                    borrowerName: '',
                    archiveStatus: '',
                    hasDeferOrder: '',
                    remind: '',
                    overtime: '',
                    total: 0,
                    pageNum: 1, // 当前页码
                    pageSize: 10, // 每页条数
                },
                // 归档状态label配置
                filingRemindFlagColors: {
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
                columns: [],
                tableData: [],
            }
        },
        mounted () {
            let a = 1;
if (a == 1) {
 console.log(a);
}
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

            this.initColumns();
        },
        methods: {
            exportCsv() {
                // 导出功能
                let exportForm = JSON.parse(JSON.stringify(this.form));
                // 删除页面相关参数
                delete exportForm.total;
                delete exportForm.pageNum;
                delete exportForm.pageSize;
                let url = ajax.guiDangExport(exportForm);
                util.jumpViaA(url);
                // this.$Modal.confirm({
                //     title: '文件没有下载？请点击以下链接打开',
                //     closable: true,
                //     content: `<div style="word-break: break-all"><a href="${url}" target="_blank">${url}</a></div>`,
                // });
            },
            initColumns () {
                this.columns = [
                    {
                        title: '档案号',
                        key: 'archiveNumber',
                        align: 'center',
                        render: (h, params) => {
                            let filingRemindFlag = params.row.filingRemindFlag;
                            let archiveNumber = params.row.archiveNumber;
                            let filingRemindFlagObj = this.filingRemindFlagColors[filingRemindFlag];
                            let labelStr = this.getTextByCode('filingRemindFlagDic', filingRemindFlag);
                            if(filingRemindFlag === 1) {
                                return h('div', [
                                    h('span', archiveNumber)
                                ]);
                            }else{
                                return h('div', [
                                    h('span', archiveNumber),
                                    h('Button', {
                                        props: {
                                            type: filingRemindFlagObj.color,
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
                        render: (h, params) => {
                            const row = params.row;
                            let outOrderId = row.outOrderId;
                            let str = '';
                            if(row.zhanqi_order.length > 0){
                                str += '('+ row.zhanqi_order.join(',') +')'
                            }
                            return h('div', [outOrderId, h('br'), str])
                        }
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
                        title: '到期日期',
                        key: 'huanben_date',
                        align: 'center',
                    },
                    {
                        title: '订单状态',
                        key: 'order_status_text',
                        align: 'center'
                    },
                    {
                        title: '档案状态',
                        key: 'archiveStatus',
                        align: 'center',
                        render: (h, params) => {
                            const {archiveStatus} = params.row;
                            return h('span', this.getTextByCode('archiveStatusDic', archiveStatus))
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        const {archiveId} = params.row;
                                        this.$router.push({
                                            name: 'guidang_detail',
                                            params: {
                                                id: archiveId
                                            }
                                        })
                                    },
                                },
                            }, '编辑')
                        },
                    }
                ];
            },
            search () {
                this.form.pageNum = 1;
                this.fetchList();
            },
            pageChangeHandle (page) {
                this.form.pageNum = page;
                this.fetchList()
            },
            fetchList () {
                ajax.getGuiDangList(this.form).then(res => {
                    let {error_code, message, data} = res.data;
                    if (error_code) {
                        this.$Message.error(message);
                    } else {
                        this.tableData = data.list;
                        this.tableData.map(v => {
                            //  借款信息
                            v.borrowerMsg = v.loan_money + '万' + v.loan_limit + '期';
                        })
                        this.form.total = data.total
                    }
                }).catch(e => console.log(e));
            },
            getTextByCode(){
                return util.getTextByCodeFromDict(this.dictData, ...arguments)
            }
        }
    }
</script>
