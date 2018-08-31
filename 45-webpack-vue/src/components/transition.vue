<template>
	<div id="animation_div">
		<transition name="my-trans">
			<div v-show="show">
				演示动画
			</div>
		</transition>	
		<button @click="show=!show">切换展示/隐藏</button>
	</div>
</template>



<script>
	export default {
		data(){
			return {
				show: false
			}
		},
		methods: {
			toggleShow(){   
				this.show = !this.show;
			}
		}
	}	
</script>



<style>
	#animation_div {
		width: 600px;
		border: 2px dashed #e4393c;
		margin:  0 auto;
		padding:  10px;
	}
	.fade-enter-active, 
	.fade-leave-active{
		transition: opacity 1.5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}


	.my-trans-enter-active,
	.my-trans-leave-active{
		transition:  all 1.5s;
	}
	.my-trans-enter{
		transform:  translateY(-500px);
	}
	.my-trans-leave-active {
		transform:  translateY(500px);
	}
</style>