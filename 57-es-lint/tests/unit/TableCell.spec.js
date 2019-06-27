import { shallowMount, createLocalVue } from '@vue/test-utils'
import iView from 'iview'
import TableCell from '@/components/table-cell.vue'

// 创建一个扩展的 `Vue` 构造函数
const localVue = createLocalVue()

// 正常安装插件
localVue.use(iView)

describe('table-cell.vue', () => {
    it('渲染传递【title】属性', () => {
        const title = '标题'

        const wrapper = shallowMount(TableCell, {
            propsData: { title },
            localVue,
        })
        console.log('')
        expect(wrapper.text()).toMatch(title)
    })

    it('渲染传递【data】属性', () => {
        const data = [
            [
                {
                    name: '民族：',
                    desc: '汉族',
                },
                {
                    name: '姓名：',
                    desc: '汪峰',
                },
                {
                    name: '现住址：',
                    desc: '成都市高新区益州大道北段777号4栋1单元27楼2703号',
                },
            ],
            [
                {
                    name: '家庭成员：',
                    desc: ['老人', '小孩'],
                },
                {
                    name: 'aaaa：',
                    desc: 'bbbb',
                },
                {
                    name: 'cccc：',
                    desc: 'dddd',
                },
            ],
        ]

        const wrapper = shallowMount(TableCell, {
            propsData: { data },
            localVue,
        })

        data.forEach(item => {
            item.forEach(item => {
                if (Array.isArray(item.desc)) {
                    expect(wrapper.text()).toMatch(item.name)
                    expect(wrapper.text()).toMatch(item.desc.join(', '))
                } else {
                    expect(wrapper.text()).toMatch(item.name)
                    expect(wrapper.text()).toMatch(item.desc)
                }
            })
        })
    })

    it('渲染传递【title】【data】属性', () => {
        const title = '标题'
        const data = [
            [
                {
                    name: '111',
                    desc: '222',
                },
                {
                    name: '333',
                    desc: '444',
                },
                {
                    name: '现住址：',
                    desc: '成都市高新区益州大道北段777号4栋1单元27楼2703号',
                },
            ],
            [
                {
                    name: '家庭成员：',
                    desc: ['老人', '小孩'],
                },
                {
                    name: 'aaaa：',
                    desc: 'bbbb',
                },
                {
                    name: 'cccc：',
                    desc: 'dddd',
                },
            ],
        ]

        const wrapper = shallowMount(TableCell, {
            propsData: {
                title,
                data,
            },
            localVue,
        })

        expect(wrapper.text()).toMatch(title)

        data.forEach(item => {
            item.forEach(item => {
                if (Array.isArray(item.desc)) {
                    expect(wrapper.text()).toMatch(item.name)
                    expect(wrapper.text()).toMatch(item.desc.join(', '))
                } else {
                    expect(wrapper.text()).toMatch(item.name)
                    expect(wrapper.text()).toMatch(item.desc)
                }
            })
        })
    })
})
