<template>
	<span class="BetSiderTimeCount">
		{{timeTxt}}
	</span>
</template>

<script>
	import gameConfig from "../../../static/js/gameConfig.js"
	import { mapState, mapActions } from "vuex";
	export default {
		props:['kindKey','classKey','currentOpen'],
		data(){
			return{
				timeTxt:'00:00',
				gameConfig:gameConfig,
				intervalId:null,
				oldTime:null,
				time:null,
				time2:0,
			}

		},
		created(){
			
			
		},
		destroyed(){
			clearInterval(this.intervalId)
		},
		 computed:{
		 	...mapState(["kindId","classId","times","timeTxts","awarPeriod"]),
		 } ,
		 methods:{
		 	...mapActions([
				"setTimes",
				"getCqsscWinsDragon"
			]),
		 	startTime() {
		 		let awarPeriod;
		 		if(this.intervalId!=null){
		 			clearInterval(this.intervalId)
		 		}
		 		if(this.kindKey =="hk6"){
		 				this.timeTxt = this.formatSeconds(this.time2/1000)
		 			}else{
		 				this.timeTxt = this.timeFormat(this.time2);
		 			}
		 		this.intervalId = setInterval(()=>{
		 			this.time2 -=1000
		 			if(this.time2  < 0){
		 				this.time2 = this.gameConfig[this.kindKey].midleTime*1000+this.time2
		 			}
                    if(this.kindKey=='cqssc'){
                    	if(this.time2  == 60000){
                    		this.getCqsscWinsDragon("/" +'cqssc').then((res)=>{
                    			let awarPeriod2 =  res.data.winList[1].awarPeriod.slice(8)
                    			if(awarPeriod2 * 1 >= 95 || awarPeriod2 * 1 < 24) {
							this.gameConfig['cqssc'].midleTime = 300;
						} else {
							this.gameConfig['cqssc'].midleTime = 600;
						}
		 				})
                    	}
		 				}
		 			
		 			if(this.kindKey =="hk6"){
		 				this.timeTxt = this.formatSeconds(this.time2/1000)
		 			}else{
		 				this.timeTxt = this.timeFormat(this.time2);
		 			}
		 			if(this.kindKey == this.kindId){
						this.setTimes([this.timeTxt,this.time2])
						}
		 			
		 		},1000)

			},
		 	timeFormat(time) {
				let hours = moment.duration(time).hours(),
				minutes = moment.duration(time).minutes(),
				seconds = moment.duration(time).seconds();
				hours.toString().length < 2 ? hours = 0 + "" + hours : hours = hours;
				minutes.toString().length < 2 ? minutes = 0 + "" + minutes : minutes = minutes;
				seconds.toString().length < 2 ? seconds = 0 + "" + seconds : seconds = seconds;
				if(time>3600000){
		 			return hours + ':'+minutes + ':' + seconds
		 		}else{
		 			return minutes + ':' + seconds
		 		}
				
			},
		 	formatSeconds(value) {
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let s = parseInt(secondTime);
        let m = parseInt(minuteTime);
        let h = parseInt(hourTime);
        s<10?s='0'+s:null;m<10?m='0'+m:null;h<10?h='0'+h:null;
        var result = "" + s;
        if(minuteTime > 0) {
            result = "" + m + ":" + result;
        }
        if(hourTime > 0) {
            result = "" + h + ":" + result;
        }
       
        return result;
    }
		 },
		 watch:{
		 	times(newTimes){
		 			this.time = newTimes[this.classKey][this.kindKey]*1000;
		 	},
		 	time(newTimes){
		 		if (isNaN(newTimes) || newTimes <  0||newTimes == 0){
		 			 this.time2 = this.gameConfig[this.kindKey].midleTime*1000+newTimes;
		 		}else{
		 			this.time2 = newTimes
		 		}
		 		if(!isNaN(newTimes)){
		 			this.startTime()
		 		}
		 	},
		 	kindId(newId){
		 			if(this.time){
		 			this.setTimes(["00:00",this.timeTxt])
		 		}
		 	}
		 }
	}
</script>

<style>
</style>
