<template>
    <div id="app">

        <input type="text" v-model="this.$route.params.color">
        <p>{{ this.$route.params.province }}</p>
        <!--<p>{{ myValueWithoutNumber }}</p>-->
        <!--<p>现在时刻{{timeNow}}</p>--> 
        <router-view></router-view>
        <router-link :to="apple">to apple</router-link><br /><br />
        <router-link :to="banana">to banana</router-link><br /><br />
        <router-link :to="banana">to apple/profile子路由嵌套</router-link>

        <hr />
        <div>
        	<button @click="getParam">get params from router</button>
        	
        </div>
    </div>
</template>

<script>
    import animationA from './components/transition.vue'
    export default {
        components: {
            animationA
        },
        data() {
            return {
                myValue: '',
                apple: '/apple/red',
                banana: '/banana/blue'
            }
        },
        computed: {
            myValueWithoutNumber(){
                return this.myValue.replace(/\d/g, '');
            },
            timeNow(){
                return new Date().toLocaleString();
            }
        },
        methods: {
            addNewTodo(){
                this.list.push(this.newTodo);
                this.newTodo = {
                    id: null, title: ''
                }
            },
            eventFromComA(msg){
                console.log('子组件触发了一个事件，父组件监听到了');
                console.log(msg);
            },
            getParam(){
            	alert(this.$route.params.color)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }


    a {
        color: #42b983;
    }
</style>
