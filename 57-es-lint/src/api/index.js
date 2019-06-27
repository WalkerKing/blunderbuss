import axios from '@/libs/api.request'
import qs from 'qs'

export const login = param => {
    return axios.request(param).catch((err) => {console.log(err)})
}
// 档案移交管理 -> 获取文件名称列表
export const logout = () => {
    let params = {
        url: '/login/logout',
        method: 'post',
        data: qs.stringify({})
    }
    return axios.request(params);
}

// 获取字典
export const getDictData = (function() {
    let param = {
        url: '/index/get_dict_data',
        method: 'get'
    };
    let ret = null;
    return function () {
        if (!ret) {
            ret = axios.request(param)
        }
        return ret
    }
})()
// 文件管理 -> 获取下发数据
export const fileManageGetParams = param => {
    param.url = '/file_manage/dict_data';
    param.method = 'post';
    return axios.request(param);
}
// 文件管理 -> 列表数据
export const fileManageGetListData = param => {
    param.url = '/file_manage/ajax_get_list';
    param.method = 'post';
    return axios.request(param);
}
// 文件管理 -> 新增 或者编辑
export const fileManageAddOrEdit = param => {
    param.method = 'post';
    return axios.request(param);
}

// 档案移交管理 -> 获取文件名称列表
export const getDocumentDictionary = param => {
    param.url = '/index/getDocumentDictionary';
    param.method = 'get';
    return axios.request(param);
}

// 档案移交管理 -> 获取下发数据
export const transferManageGetParams = param => {
    param.url = '/transfer_manage/dict_data';
    param.method = 'post';
    return axios.request(param);
}
// 档案移交管理 -> 列表数据
export const transferManageGetListData = param => {
    let params = {
        url: '/transfer_manage/ajax_get_list',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}
// 档案移交管理 -> 移交确定
export const submitTransfer = param => {
    param.url = '/transfer_manage/submit';
    param.method = 'post';
    return axios.request(param);
}
// 档案移交管理 -> 移交详情
export const transferManageDetail = param => {
    param.url = '/transfer_manage/detail';
    param.method = 'post';
    return axios.request(param);
}

// 档案移交管理 -> 借用出库 -> 得到出库档案
export const transferManageOutboundAbleArchive = param => {
    param.url = '/transfer_manage/listOutboundAbleArchiveDocuments';
    param.method = 'post';
    return axios.request(param);
}
// 档案移交管理 -> 借用出库 -> 确定
export const transferManageBorrowOutboundApply = param => {
    param.url = '/transfer_manage/borrowOutboundApply';
    param.method = 'post';
    return axios.request(param);
}
// 档案移交管理 -> 还本结清出库 -> 确定
export const transferManageSettlementOutboundApply = param => {
    param.url = '/transfer_manage/settlementOutboundApply';
    param.method = 'post';
    return axios.request(param);
}

// 档案移交详情 -> 归档延期 申请 前置校验
export const countFilingPostponeWaitApprove = param => {
    let params = {
        url: '/transfer_manage/countFilingPostponeWaitApprove',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 档案移交管理 -> 归档延期 申请
export const filingPostponeApply = param => {
    let params = {
        url: '/guidang_manage/filingPostponeApply',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 -> 获取列表
export const getOutBoundList = param => {
    let params = {
        url: '/outbound_manage/ajax_get_list',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 - 待出库中的审批按钮
export const getOutBoundInfo = param => {
    let params = {
        url: '/outbound_manage/getOutBoundInfo',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 -  借用出库 同意
export const borrowOutboundApprove = param => {
    let params = {
        url: '/outbound_manage/borrowOutboundApprove',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}
// 出库管理 - 还本结清出库 同意
export const settlementOutboundApprove = param => {
    let params = {
        url: '/outbound_manage/settlementOutboundApprove',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 - 借用出库 拒绝
export const borrowOutboundRefuse = param => {
    let params = {
        url: '/outbound_manage/borrowOutboundRefuse',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}
// 出库管理 - 还本结清出库 拒绝
export const settlementOutboundRefuse = param => {
    let params = {
        url: '/outbound_manage/settlementOutboundRefuse',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 - 待出库 获取OA截图
export const getOutboundOaPictureByApply = param => {
    let params = {
        url: '/outbound_manage/getOaPictureByApply',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 - 借用出库中文件列表查询
export const listBorrowingOutboundDocuments = param => {
    let params = {
        url: '/outbound_manage/listBorrowingOutboundDocuments',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 - 借用出库中文件签收
export const borrowOutboundSign = param => {
    let params = {
        url: '/outbound_manage/borrowOutboundSign',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理 - 还本结清出库签收[结清归档]
export const settlementOutboundSign = param => {
    let params = {
        url: '/outbound_manage/settlementOutboundSign',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理详情
export const getOutboundDetail = param => {
    let params = {
        url: '/outbound_manage/detail',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}
// 出库管理详情 - 获取文件详情
export const getOutboundFileDetail = param => {
    let params = {
        url: '/outbound_manage/file_detail?' + qs.stringify(param),
        method: 'get'
    }
    return axios.request(params);
}

// 归档管理 -> 获取列表
export const getGuiDangList = param => {
    let params = {
        url: '/guidang_manage/ajax_get_list?' + qs.stringify(param),
        method: 'get',
    }
    return axios.request(params);
}

// 归档管理 -> 导出
export const guiDangExport = param => {
    return '/guidang_manage/export?' + qs.stringify(param);
}

// 归档详情 -> 获取档案详情
export const getGuiDangDetail = param => {
    let params = {
        url: '/guidang_manage/detail?' + qs.stringify(param),
        method: 'get'
    }
    return axios.request(params);
}

// 归档详情 -> 获取文件详情
export const getGuiDangFileDetail = param => {
    let params = {
        url: '/guidang_manage/file_detail?' + qs.stringify(param),
        method: 'get'
    }
    return axios.request(params);
}

// 归档详情 -> 编辑档案
export const archiveDocumentUpdate = param => {
    let params = {
        url: '/guidang_manage/archiveDocumentUpdate',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 更新档案字段
export const archiveUpdate = param => {
    let params = {
        url: '/guidang_manage/archiveUpdate',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 更新pdf文件
export const pdfUpdate = param => {
    let params = {
        url: '/guidang_manage/pdf_update',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 查看pdf文件
export const showPdf = param => {
    let params = {
        url: '/guidang_manage/show_pdf',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 - 获取OA截图
export const listGuiDangOaPictureByApply = param => {
    let params = {
        url: '/guidang_manage/listOaPicturesByType',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 获取影像资料详情
export const listByCateid = param => {
    let params = {
        url: '/guidang_manage/list_by_cateid?' + qs.stringify(param),
        method: 'get'
    }
    return axios.request(params);
}

// 归档详情 -> 获取待签收文件列表
export const listArchiveDocumentsUnSign = param => {
    let params = {
        url: '/guidang_manage/list_archive_documents_un_sign',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 获取待归档展期订单列表
export const listArchiveOrdersNotField = param => {
    let params = {
        url: '/guidang_manage/list_archive_orders_not_field',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 文件签收同意
export const documentSign = param => {
    let params = {
        url: '/guidang_manage/document_sign',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 文件签收打回
export const documentSignRefuse = param => {
    let params = {
        url: '/guidang_manage/document_sign_refuse',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 展期订单归档 ->
export const extendOrderFiled = param => {
    let params = {
        url: '/guidang_manage/extend_order_filed',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档详情 -> 档案全部归档
export const mainOrderFiled = param => {
    let params = {
        url: '/guidang_manage/main_order_filed',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}
// 归档详情 -> 撤回归档
export const mainOrderFiledUndo = param => {
    let params = {
        url: '/guidang_manage/main_order_filed_undo',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}


// 归档详情 -> 获取上传token
export const getUploadToken = param => {
    param.method = 'get';
    return axios.request(param);
}

// 归档管理 -> 新增文件
export const archiveDocumentAdd = param => {
    let params = {
        url: '/guidang_manage/archiveDocumentAdd',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 用户信息 您好，zhangyan， 部门：产品技术部，岗位：产品经理
export const userInfo = param => {
    return axios.request(param).catch((err) => {console.log(err)})
}

// 归档提醒配置 -> 列表查询
export const getFilingRemindList = param => {
    let params = {
        url: '/filing_remind_config/ajax_get_list',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档提醒配置 -> 新增提醒配置
export const addFilingRemindConfig = param => {
    let params = {
        url: '/filing_remind_config/add',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 归档提醒配置 -> 更新提醒配置
export const updateFilingRemindConfig = param => {
    let params = {
        url: '/filing_remind_config/update',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 借用记录 -> 获取借用记录列表
export const getOutboundRecords = param => {
    let params = {
        url: '/outbound_records/ajax_get_list',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 借用记录 -> 借用延期申请前置校验
export const countBorrowPostponeWaitApprove = param => {
    let params = {
        url: '/outbound_records/countBorrowPostponeWaitApprove',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 借用记录 -> 借用延期申请 确定
export const borrowPostponeApply = param => {
    let params = {
        url: '/outbound_records/borrowPostponeApply',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 获取延期列表
export const getPostponeManageList = param => {
    let params = {
        url: '/postpone_manage/ajax_get_list',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 审批通过
export const filingPostponeApprove = param => {
    let params = {
        url: '/postpone_manage/filingPostponeApprove',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 审批拒绝
export const filingPostponeRefuse = param => {
    let params = {
        url: '/postpone_manage/filingPostponeRefuse',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 获取归档延期信息
export const getFilingPostponeDetail = param => {
    let params = {
        url: '/postpone_manage/getFilingPostponeDetail',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 借用延期 审批弹窗
export const listBorrowPostponesDocuments = param => {
    let params = {
        url: '/postpone_manage/listBorrowPostponesDocuments',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 借用延期 审批弹窗 获取OA截图
export const getPostponeOaPictureByApply = param => {
    let params = {
        url: '/postpone_manage/getOaPictureByApply',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 借用延期 审批弹窗 同意
export const borrowPostponeApprove = param => {
    let params = {
        url: '/postpone_manage/borrowPostponeApprove',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期管理 -> 借用延期 审批弹窗 拒绝
export const borrowPostponeRefuse = param => {
    let params = {
        url: '/postpone_manage/borrowPostponeRefuse',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 出库管理详情 - 获取文件详情
export const getPostponeFileDetail = param => {
    let params = {
        url: '/postpone_manage/file_detail?' + qs.stringify(param),
        method: 'get'
    }
    return axios.request(params);
}

// 延期详情 -> 获取归档延期信息
export const getPostponeDetail = param => {
    let params = {
        url: '/postpone_manage/detail',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期详情 - 获取OA截图
export const listPostponeOaPictureByApply = param => {
    let params = {
        url: '/postpone_manage/listOaPicturesByType',
        method: 'post',
        data: qs.stringify(param)
    }
    return axios.request(params);
}

// 延期详情 -> 获取影像资料详情
export const listPostponeByCateid = param => {
    let params = {
        url: '/postpone_manage/list_by_cateid?' + qs.stringify(param),
        method: 'get'
    }
    return axios.request(params);
}

