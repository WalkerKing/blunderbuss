import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Keyboard from '@/components/testKeyboard';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
        },
        {
            path: '/keyboard',
            name: 'keyboard',
            component: Keyboard,
        },
        {
            path: '/money',
            name: 'money',
            component(resolve) {
                require(['@/components/money'], resolve);
            },
        },
    ],
});
