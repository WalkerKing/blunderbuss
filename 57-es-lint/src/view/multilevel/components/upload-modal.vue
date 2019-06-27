<template>
    <div>
        <!-- 展示图片modal  fileListModal -->
        <Modal
            :width="80"
            v-model="isShow"
            title="文件资料"
            @on-cancel="fileListModalCancelHandler">
            <div slot="header" style="height:24px;line-height:24px;">
                <Row>
                    <Col span="12">文件资料</Col>
                    <Col span="12" v-if="canEdit">
                        <Button type="primary" size="small" @click.native="openUploader"
                                style="float:right;margin-right:40px;">上传文件
                        </Button>
                    </Col>
                </Row>
            </div>

            <div class="modal-container" :style="{height: modelHeight + 'px'}">
                <Split v-model="split1" min="244px">
                    <div slot="left" class="modal-img-list" :style="{height: modelHeight + 'px'}">
                        <ul>
                            <li
                                v-for="(file, index) in files"
                                :key="index"
                                :style="{backgroundImage: backgroundImage(file)}"
                                @mouseover="mouseoverHandler(file)"
                                @click="openUploadedViewer(index, file)">

                                <p v-if="file.name !== ''">{{ file.name }}</p>
                                <p v-if="file.time !== ''">{{ file.time }}</p>
                            </li>
                        </ul>
                    </div>
                    <div slot="right" class="modal-view" :style="{backgroundImage: `url(${modalViewBase64})`}"></div>
                </Split>
            </div>
        </Modal>

        <!-- 上传图片modal uploaderModal -->
        <Modal
            ok-text="上传"
            :width="80"
            v-model="isShow2"
            title="上传文件">
            <div class="modal-container" :style="{height: modelHeight + 'px'}">
                <div class="modal-img-list" :style="{height: modelHeight + 'px'}">
                    <ul>
                        <li
                            v-for="(file, index) in uploadFiles"
                            :key="index"
                            :style="{backgroundImage: backgroundImage(file)}"
                            @click="openUploadViewer(index, file)">
                            <Icon class="delete" type="ios-trash-outline" size="24" color="red"
                                  @click.native.stop="deleteHandler(index)"/>
                            <p v-if="file.name !== ''">{{ file.name }}</p>
                            <p v-if="file.time !== ''">{{ file.time }}</p>

                            <div class="progress" v-if="file.percent !== 100">
                                <div :style="{width: file.percent + '%'}"></div>
                            </div>
                        </li>
                        <li style="background: #ccc;">
                            <Icon class="upload" type="md-cloud-upload" size="48" color="#fff"
                                  @click.native="openFile"/>
                            <input class="file-input" type="file" name="file" :accept="accept" id="uploadInput" multiple
                                   @change="inputChange" hidden>
                        </li>
                    </ul>
                </div>
            </div>
            <div slot="footer">
                <Button size="large" @click="uploaderModalCancelHandler">取消</Button>
                <Button type="primary" size="large" @click="uploadComplete">确定</Button>
            </div>
        </Modal>
        <!-- 图片大图 -->
        <viewer
            :images="images"
            @inited="inited"
            class="viewer" ref="viewer">
            <template slot-scope="scope">
                <img v-for="(file, index) in scope.images" :src="file.url || file.base64" :key="index">
            </template>
        </viewer>

    </div>
</template>
<script>
    import * as qiniu from 'qiniu-js'
    import Viewer from 'v-viewer/src/component.vue'
    import 'viewerjs/dist/viewer.css'

    export default {
        props: ['picList', 'option', 'canEdit', 'canDelete', 'accept'],
        data () {
            return {
                split1: 0.5,
                isShow: false,
                isShow2: false,
                uploadFiles: [],
                images: [],
                modalViewBase64: '',
                files: []
            }
        },
        mounted () {

        },
        computed: {
            modelHeight () {
                return document.documentElement.clientHeight * 0.6
            }
        },
        watch: {
            uploadFiles (nv) {
                this.images = nv
            },
            files (nv) {
                this.images = nv
            },
            picList () {
                this.files = this.picList.map(({url, name, time}) => {
                    return {
                        key: '',
                        name,
                        time,
                        url,
                        percent: '',
                        file: null,
                        base64: '',
                        qiniuUrl: '',
                    }
                })
            },
            isShow (nv) {
                // 当isShow的值变为false，清空pic
                if (nv === false) {
                    this.resetData();
                }
            }
        },
        methods: {
            resetData () {
                this.uploadFiles = [];
                this.images = [];
                this.modalViewBase64 = '';
                this.files = [];
            },
            backgroundImage (file) {
                // 上传完成的时候直接展示url
                if (file.url !== '') {
                    return `url(${file.url})`
                }

                // 上传的时候展示base64
                let isImgBase64 = file.base64 !== '' && file.base64.match('data:image')
                if (isImgBase64) {
                    return `url(${file.base64})`
                } else {
                    return `url(${require('@/assets/images/file_extension_others.png')})`
                }
            },

            fileListModalCancelHandler () {
                this.modalViewBase64 = ''
            },
            openUploader () {
                this.isShow2 = true
            },
            uploaderModalCancelHandler () {
                this.isShow2 = false
                this.uploadFiles = []
            },
            mouseoverHandler (file) {
                // 图片
                if (file.base64.match('data:image') || file.url) {
                    this.modalViewBase64 = file.base64 || file.url
                } else {
                    this.modalViewBase64 = ''
                }
            },
            deleteHandler (index) {
                this.uploadFiles.splice(index, 1)
            },
            openFile () {
                document.querySelector('#uploadInput').value = ''
                document.querySelector('#uploadInput').click()
            },
            isAllFileUploaded () {
                return this.uploadFiles.every(file => {
                    return file.percent === 100
                })
            },
            inputChange (e) {
                let files = e.target.files
                let token = this.option.token
                let qiniu_url = this.option.qiniu_url

                Array.from(files).forEach(file => {
                    let key = this.option.img_path + '/' + new Date().getTime() + '-' + file.size + '.' + file.type.split('/')[1];
                    let observable = qiniu.upload(file, key, token, null, {})
                    this.uploadFiles.push({
                        key: key,
                        name: file.name,
                        time: new Date(),
                        url: '',
                        percent: 0,
                        file,
                        base64: '',
                        qiniuUrl: qiniu_url,
                        domain: qiniu_url
                    })

                    let next = ({total}) => {
                        let {percent} = total

                        this.uploadFiles.forEach(file => {
                            if (file.key === key) {
                                file.percent = percent
                            }
                        })
                    }
                    let error = () => {
                    }
                    let complete = ({key}) => {
                        let qiniuUrl = qiniu_url + '/' + key // 上传你的url

                        this.uploadFiles.forEach(file => {
                            if (file.key === key) {
                                file.qiniuUrl = qiniuUrl

                                // 生成base64
                                let fileReader = new FileReader()
                                fileReader.onloadend = function (e) {
                                    let base64 = e.target.result
                                    file.base64 = base64
                                }
                                fileReader.readAsDataURL(file.file)
                            }
                        })
                    }
                    observable.subscribe(next, error, complete)
                })
            },
            uploadComplete () {
                if (!this.isAllFileUploaded()) {
                    return alert('文件上传中，请稍候...')
                }
                this.isShow2 = false
                this.files = [...this.files, ...this.uploadFiles];
                this.$emit('uploadComplete', this.uploadFiles);
                this.uploadFiles = []
            },
            openUploadViewer (index, file) {
                this._view(index, file)
            },
            openUploadedViewer (index, file) {
                this._view(index, file)
            },
            _view (index, file) {
                if (file.url !== '') {
                    this.$viewer.show()
                    this.$viewer.view(index)
                    return
                }

                if (file.base64 && file.base64.match('data:image')) {
                    this.$viewer.show()
                    this.$viewer.view(index)
                } else {
                    // word，excel，ppt 使用微软的预览功能（https://view.officeapps.live.com/op/view.aspx?src= ${src}） | 预览暂不实现
                    // pdf 预览暂不实现

                    alert('暂不支持该文件的预览！')
                    // window.open('/#/pdf')
                }
            },
            inited (viewer) {
                this.$viewer = viewer
            },
        },
        components: {
            Viewer,
        },
    }
</script>
<style lang="less" scoped>
    .viewer {
        display: none;
    }

    .left-pane .ivu-split-pane {
        overflow: auto !important;
    }

    .modal-container {
        .modal-img-list {
            overflow: auto;
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    position: relative;
                    top: 0;
                    left: 0;
                    list-style: none;
                    width: 120px;
                    height: 160px;
                    border: 1px solid #f6f6f6;
                    margin: 0 2px 2px 0;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    cursor: pointer;
                    &:hover {
                        border-color: #ccc;
                    }
                    .progress {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 1;
                        div {
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            background: #2d8cf0;
                        }
                    }

                    p {
                        display: inline-block;
                        position: absolute;
                        bottom: 18px;
                        width: 100%;
                        height: 18px;
                        line-height: 18px;
                        text-align: center;
                        background: rgba(0, 0, 0, .4);
                        color: #fff;
                        z-index: 2;
                        overflow: hidden;
                        &:nth-last-child(1) {
                            bottom: 0px;
                        }
                    }

                    .delete {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                    }
                    .upload {
                        display: block;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 54px;
                        height: 54px;
                    }
                }
            }
        }

        .modal-view {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
</style>
