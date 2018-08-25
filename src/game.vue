<template>
	<div class="game">
		<div class="loadding" v-if="show">
			{{title}}
		</div>
		<iframe :src="game_url" class="content" ></iframe>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	export default {
		data(){
			return{
				title:'正在加载中...',
				game_url:'',
				show:true
				
			}
		},
		created(){
//			setTimeout(()=>{
//				this.show=false;
//				this.game_url = "https://tt.njgck.com/newlobby/index.html?token=D573CD2B09472305EE0B84A86D6E5F93&source="
//			},2000)
		    var type = window.location.search.split("=")[1];
		    let platform;
				if(type == "sb") {
					platform = "gm_ibc";
				} else if(type == "lj") {
					platform = "lj_lj";
				}else if(type == "vg") {
					platform = "vg_vg";
				}
			this.register({
					platform: platform
				}).then((res) => {
					if(res.code == '0') {
							this.goSportLink({
							mobile: "no",
							platform: platform
						}).then((res)=>{
							if(res.code == "0"){
								if(res.data==""){
									this.title = "网站正在维护中，请稍后再试！"
								}else{
									this.show=false;
									this.game_url = res.data
								}
								
							}else{
						this.title = "加载失败请联系客服"
					}
						})
					}else{
						this.title = "加载失败请联系客服"
					}
				})
		
		},
		methods: {
			...mapActions([
				"register",
				"goSportLink"
			]),
		}
	}
</script>

<style>
	.game{
		height: 100%;
		width: 100%;
		background: #FFFFFF;
	}
	.game .loadding{
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 100px;
		width: 100%;
		height: 100%;
		font-weight: 900;
		font-size: 20px;
		background: #FFFFFF;
	}
	.game .content{
		background: #03A9F4;
		width: 100%;
		height: 100%;
		border: none;
	}
</style>