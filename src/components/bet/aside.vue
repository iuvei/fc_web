<template>
	<div class="aside" id="aside" v-if="show">
		<Menu ref="menu" width="148px" style="background-color:#f3f3f3;" @on-select="selectKindOrclassId" :open-names="openNames" :active-name="kindId+'-'+classId" accordion>
			<a class="tiyu" name="0-0" @click="showModal('sb')"><img class="hot" src="../../../static/img/hot.png" /><img src="../../../static/img/tiyu.png" style="width: 24px;height: 24px; position: absolute;left: 10px;top: 5px;" href="#" />沙巴体育<img class="new" src="../../../static/img/new.png" /></a>
			<!-- <a class="tiyu" name="0-0" @click="showModal('lj')"><img class="hot" src="../../../static/img/hot.png" /><img src="../../../static/img/7.png" style="width: 24px;height: 24px; position: absolute;left: 10px;top: 5px;" href="#" />利记体育<img class="new" src="../../../static/img/new.png" /></a> -->
			<a class="tiyu" name="0-0" @click="showModal('vg')"><img class="hot" src="../../../static/img/hot.png" /><img src="../../../static/img/8.png" style="width: 24px;height: 24px; position: absolute;left: 10px;top: 5px;" href="#" />VG<img class="new" src="../../../static/img/new.png" /></a>
			<Submenu :name="items.classId" v-for="(items,index1) in kindList" :key="index1">
				<template slot="title">
					<div style="position: absolute;width:100%" class="child_div" @click="openChange(items.classId)">
						<img :src="'../../../static/img/'+(items.classId)+'.png'" style="width: 24px;height: 24px; position: absolute;left: 10px;top: 5px;" /> {{items.className}}
					</div>
				</template>
				<MenuItem :name="item.kindId+'-'+items.classId" v-for="(item,index2) in items.kindList" :key="index2"><span>{{item.kindName}}</span>
				<BetSiderTimeCount style="float: right;margin-right:8px;" :kindKey="item.kindId" :classKey="items.classId" :currentOpen="currentOpen"></BetSiderTimeCount>
				</MenuItem>
			</Submenu>
		</Menu>
		<Modal v-model="modal2" width="500">
			<p slot="header" style="color:#f60;text-align:center">
				<span>额度转换</span>
			</p>
			<div style="text-align:center">
				<div class="modal">
					<ul style="display: flex;justify-content:center;align-items: center;">
						<li><img src="../../../static/img/zhuanchu.png" style="width: 64px;height: 64px;" />
							<div>
								<h3>主账户</h3>
								<h3 style="color: #d81e06;">${{userDetail.accountBalance.toFixed(2)}}</h3></div>
						</li>
						<li style="margin: 0 60px;"><img src="../../../static/img/jiantou.png" style="width: 32px;height: 32px;" /></li>
						<li><img src="../../../static/img/zhuanru.png" style="width: 64px;height: 64px;" />
							<div>
								<h3>{{typeName[type]}}</h3>
								<h3 style="color: #d81e06;">${{balance}}</h3></div>
						</li>
					</ul>
					<div style="margin-top: 20px;text-align: left;margin-left: 120px;">

						<InputNumber :min="1" v-model="amount" ref="amountInp" placeholder="输入转入金额" style="width: 180px;margin-right: 30px;"></InputNumber>
						<Button type="primary" @click="transferAccounts(type)" :loading="modal_loading">确认转账</Button>
						<!--<Input v-model="amountPassword" ref="amountPasswordInp" placeholder="请输入资金密码" style="width: 180px;margin-right: 30px;margin-top: 10px;" type="password"></Input>-->
					</div>
					<div class="left" style="margin-top: 20px;text-align: left;margin-left: 120px;display: flex;">
						<div style="width: 200px;display: flex;flex-wrap: wrap;justify-content: space-between;">
							<Button type="primary" @click="amount=100" style="width: 60px;height: 34px;padding: 0;margin-bottom: 4px;">$100</Button>
							<Button type="primary" @click="amount=500" style="width: 60px;height: 34px;padding: 0;margin-bottom: 4px;">$500</Button>
							<Button type="primary" @click="amount=1000" style="width: 60px;height: 34px;padding: 0;margin-bottom: 4px;">$1000</Button>
							<Button type="primary" @click="amount=5000" style="width: 60px;height: 34px;padding: 0;margin-bottom: 4px;">$5000</Button>
							<Button type="primary" @click="amount=10000" style="width: 60px;height: 34px;padding: 0;margin-bottom: 4px;">$10000</Button>
							<Button type="primary" @click="amount=userDetail.accountBalance" style="width: 60px;height: 34px;padding: 0;margin-bottom: 4px;">全部转入</Button>
						</div>

						<div style="display: flex;align-items: center;margin-left: 20px;" @click="modal2 = false">
							<Button type="primary" @click="goSportGame">直接进入游戏</Button>
						</div>

						<a ref="goSport" id="goSport" :href="sport_url" target="_blank" class="goSport" style="display: none;"></a>
					</div>
				</div>
			</div>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>

<script>
	import { bus } from '../../bus.js';
	import { mapState, mapActions } from "vuex";
	import gameConfig from "../../../static/js/gameConfig.js"
	import BetSiderTimeCount from "./BetSiderTimeCount.vue"
	export default {
		data() {
			return {
				amoutInp: false,
				modal_loading: false,
				//				amountPassword: "",
				balance: "",
				amount: 1,
				modal2: false,
				show: false,
				openNames: [],
				gameConfig: gameConfig,
				currentOpen: '3',
				typeName: {
					sb: "沙巴",
					lj: "利记",
					vg: "VG"
				},
				type: "sb",
				sport_url: "",
				count: 0,
			}
		},
		created() {
			this.getTimes('/' + this.classId)
			this.getKind().then(() => {
				this.show = true;
				this.openNames = [this.classId]
			})

		},
		mounted() {
			bus.$on('show_sport', () => {
				this.showModal("sb")
				this.count++;
			})
		},

		components: {
			BetSiderTimeCount
		},
		methods: {
			...mapActions([
				"onSelectKindOrclassId",
				"getKind",
				"getTimes",
				"setSelectMode",
				"goSportLink",
				"getBalance",
				"amountOut",
				"getUserDetail",
				"register"
			]),
			getSportUrlOrBalance(type) {
				let platform;
				if(type == "sb") {
					platform = "gm_ibc";
				} else if(type == "lj") {
					platform = "lj_lj";
				} else if(type == "vg") {
					platform = "vg_vg";
				}
				this.register({
					platform: platform
				}).then((res) => {

					if(res.code == '0') {
						if(type == "lj") {
							this.goSportLink({
								mobile: "no",
								platform: platform
							}).then((res) => {
								if(res.code == "0") {
									this.sport_url = res.data
								}
							})
						} else {
							this.sport_url = this.urls["url_" + type]
						}
						this.getBalance({
							platform: platform
						}).then((res) => {
							this.balance = res.data
						})
					} else if(res.code == "1") {
						this.$Notice.warning({
							title: '福彩官方通知',
							desc: '注册失败，请联系客服!'
						});
					}
				})

			},
			changeVal(event) {},
			showModal(type) {
				this.sport_url = "";
				this.balance = '';
				this.type = type;
				if(this.userDetail.type != '0') {
					this.$Notice.warning({
						title: '福彩官方通知',
						desc: '会员登录畅玩更多精彩游戏!'
					});
					return false;
				}
				this.modal2 = true;
				this.getSportUrlOrBalance(type)

			},
			goSportGame() {
				if(this.type == "lj") {
					if(this.sport_url != '') {
						this.$refs.goSport.click()
					} else {
						this.$Modal.warning({
							content: "<span style='font-size:14px'><b>您好!我们的体育网站正在维护中,非常抱歉给您造成不便。请您稍后再试!</b></span>"
						});
					}
				} else {
					window.open(window.location.origin + '/game?type=' + this.type);
				}

				//			newWin.document.body.innerHTML = '加载中...';

				//			this.modal2 = false;
				//			if(this.sport_url != '') {
				//				this.$refs.goSport.click()
				//			} else {
				//				this.$Modal.warning({
				//					content: "<span style='font-size:14px'><b>您好!我们的体育网站正在维护中,非常抱歉给您造成不便。请您稍后再试!</b></span>"
				//				});
				//			}
			},
			transferAccounts(type) {
				if(this.amount == '') {
					this.$refs.amountInp.focus()
					this.$Message.error('请输入转换金额');
					return false
				}
				this.modal_loading = true;
				if(this.userDetail.accountBalance * 1 < this.amount * 1) {
					this.$Notice.warning({
						title: '福彩官方通知',
						desc: '中心钱包余额不足!'
					});
					this.modal_loading = false;
					return false
				}
				let platform;
				if(type == "sb") {
					platform = "gm_ibc";
				} else if(type == "lj") {
					platform = "lj_lj";
				}
				if(type == "vg") {
					platform = "vg_vg";
				}
				let parmes = {
					amount: this.amount + "",
					//					amountPassword: hex_md5(this.amountPassword),
					platform: platform
				}
				this.amountOut(parmes).then((res) => {
					if(res.code == '0') {
						this.modal_loading = false;
						this.$Message.success('转换成功');
						//						this.amount = '';
						//						this.amountPassword ='';

						this.getBalance({
							platform: platform
						}).then((res) => {
							this.balance = res.data;
							this.getUserDetail()
						})

					} else {
						this.modal_loading = false;
						this.$Message.error(res.msg);
					}
				})
			},

			selectKindOrclassId(name) {

				this.setSelectMode("0")
				this.onSelectKindOrclassId(name)
			},
			openChange(name) {
				this.currentOpen = name;
			}
		},
		computed: mapState(["kindList", "kindId", "classId", "times", "userDetail", "urls"]),
		watch: {
			kindId() {
				//				console.log(this.kindId, this.classId)
			},
			currentOpen(newOpen) {
				this.getTimes('/' + newOpen).then((res) => {
					//				  console.log(res.data)
				});
			},
			modal2() {
				if(this.modal2 == false) {
					this.amount = 1;
					//					this.amountPassword = '';
				}
			}
		}
	}
</script>

<style>
	.aside .ivu-menu .ivu-menu-submenu .ivu-menu li {
		height: 34px;
		border-right: none;
		padding: 0;
		padding-left: 26px !important;
		line-height: 34px;
		background: #fff;
		border-bottom: 1px solid #b4b4b4;
		font-size: 12px;
	}
	
	.aside .hot {
		width: 24px;
		height: 24px;
		position: absolute;
		top: -5px;
		left: -10px;
		z-index: 100;
	}
	
	.aside .modal ul {
		display: flex !important;
	}
	
	.aside .new {
		width: 34px;
		height: 34px;
		position: absolute;
		top: 0px;
		right: 0px;
	}
	
	.aside .tiyu:hover {
		background: rgba(255, 0, 0, .8);
		color: #ffdb4a !important;
	}
	
	.aside .tiyu {
		display: block;
		width: 100%;
		line-height: 34px;
		font-size: 12px;
		height: 34px;
		padding: 0px;
		position: relative;
		padding-left: 45px !important;
		line-height: 34px;
		border-bottom: 1px solid #b4b4b4;
		font-size: 12px;
		color: #d81e06 !important;
		z-index: 1000;
		border-right: none !important;
	}
	
	.aside .ivu-menu .ivu-menu-submenu .ivu-menu-submenu-title {
		width: 100%;
		height: 34px;
		padding: 0px;
		line-height: 34px;
		border-bottom: 1px solid #b4b4b4;
		font-size: 12px;
		z-index: 1000;
	}
	
	.aside .ivu-menu .ivu-menu-submenu .ivu-menu-submenu-title .child_div {
		padding-left: 45px;
		line-height: 34px;
		font-size: 12px;
		z-index: 1000;
	}
	
	.aside .ivu-icon-ios-arrow-down {
		top: 10.2px !important;
	}
	
	.aside .ivu-menu-submenu:hover {
		color: #2d8cf0;
	}
	
	.aside .ivu-menu-submenu .ivu-menu-item-active,
	.aside .ivu-menu-submenu .ivu-menu-item-selected {
		background: #ffdb4a !important;
		color: #d80c09 !important;
	}
	
	.aside .ivu-menu-submenu .ivu-menu-item:hover {
		background: #ffdb4a !important;
		color: #d80c09 !important;
	}
	
	.aside .ivu-menu-submenu .ivu-menu-item:before {
		content: '';
		position: absolute;
		left: 10px;
		top: 15px;
		width: 4px;
		height: 4px;
		border-radius: 2px;
		background: currentColor;
	}
</style>