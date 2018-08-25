<template>
	<div style="height: 100%;overflow: hidden;" v-if="url!=''" >
		<!--<iframe :src="url" style="width: 100%;height:100%;" border="0"></iframe>-->
	</div>
</template>

<script>
	export default {
		data(){
			return{
				url:"",
			}
		},
		created(){
			let sport_url = decodeURIComponent(window.location.search.split("?url=")[1]);
			window.location.href=sport_url
		}
	}
	
</script>

<style>
</style>