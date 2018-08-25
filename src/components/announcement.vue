<style>
	.nouvelle_main {
		width: 120px;
		height: inherit;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.side {
    height: 32px;
    width: 100%;
    vertical-align: top;
    border: 0px;
    overflow: hidden;
}
.side .WC_countdown {
    width: 100%;
    height: 32px;
    background: url("../../static/img/WCsideTime-cs-bg.png");
    border: solid 1px #0f2d6d;
    border-radius: 3px;
    padding-left: 36%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    float: left;
}
.WC_countdown .st-open {
    width: 100%;
    text-align: right;
    line-height: 30px;
    color: red;
    font-size: 12px;
    text-shadow: 1px 1px 1px #111;
}
	.nouvelle_main .category:hover {
		background-image: url("../../static/img/edzh2.png");
	}
	
	.nouvelle_main .messages:hover {
		background-image: url("../../static/img/message2.png");
	}
	
	.nouvelle_main div {
		width: 20px;
		height: 20px;
		background-size: cover;
	}
	
	.nouvelle_main div:nth-child(1) {
		background-image: url("../../static/img/edzh2.png");
	}
	
	.nouvelle_main div.messages {
		width: 24px;
		height: 24px;
		background-image: url("../../static/img/message.png");
	}
	
	.notice_tip {
		height: 200px;
		line-height: 200px;
		margin: auto;
		text-align: center;
	}
	
	.announce_modal .ivu-modal-content {
		height: 380px;
		min-width: 440px;
	}
	
	.announce_modal .ivu-modal-body {
		height: 315px;
		overflow: auto;
	}
	
	.announce_modal .ivu-modal-footer {
		border-top: none!important;
	}
	
	.announce_modal .ivu-table-wrapper {
		border: 1px solid #dddee1!important;
	}
	
	.announce_modal .header-left {
		display: flex;
		align-items: center;
		width: 70%;
	}
	
	.announce_modal .ivu-tabs-bar {
		margin-bottom: 10px;
	}
	
	.announce_modal .ivu-menu-horizontal {
		height: 50px;
		margin-bottom: 10px;
	}
	
	.announce_modal .header-left button:hover {
		background: red;
		transition: 0.8s;
	}
	
	.announce_modal .header-left button:hover span {
		color: white;
		transition: .8s;
	}
	
	.nouvelle_main .modal2 .ivu-modal-content {
		height: auto!important;
	}
	
	.nouvelle_main .modal2 .ivu-modal-body {
		height: auto;
	}
</style>

<template>
<div class="">
	

	<div class="nouvelle_main">
		
		<!--@click="amountConversion"-->
		<div class="category" @click="amountConversion"></div>
		<Badge :dot="dot">
			<div @click="modal2 = true" class="messages"></div>
		</Badge>
		<Modal v-model="modal2" title="公告消息" width="700px" class-name="announce_modal">
			<Tabs>
				<TabPane label="近期公告" icon="volume-high">
					<Collapse v-if="NoticeList2.length>0">
						<Panel v-for="(item,index) in NoticeList2" :key="index">
							{{item.title}}
							<p slot="content">{{item.content}}</p>
						</Panel>
					</Collapse>
					<div class="notice_tip" v-else>暂时没有消息</div>
				</TabPane>
				<TabPane label="最新消息" icon="chatbox-working">
					<Collapse v-if="NoticeList1.length>0">
						<Panel v-for="(item,index) in NoticeList1" :key="index">
							{{item.title}}
							<p slot="content">{{item.content}}</p>
						</Panel>
					</Collapse>
					<div class="notice_tip" v-else>暂时没有消息</div>
				</TabPane>
				<TabPane :label="label">
					<Menu mode="horizontal" active-name="0" @on-select="NoticeList">
						<MenuItem name=""> 全部
						</MenuItem>
						<MenuItem name="1"> 已读
						</MenuItem>
						<MenuItem name="0"> 未读
						</MenuItem>
					</Menu>
					<Table @on-expand="update" @on-selection-change="select" border ref="selection" :columns="columns4" :data="AlertList">
						<div slot="header" style="display: flex">
							<div class="header-left">
								<Button @click="removeMessage()" size="default" style="margin-left: 10px;height: 32px;color: red">删除</Button>
								<span style="margin-left: 10px">上次更新时间：{{time}}</span>
							</div>
							<div style="width: 30%;height:48px;display: flex;align-items: center;justify-content: flex-end;margin-right: 10px">
								<Button @click="refresh()" icon="android-refresh" size="default" style="height: 32px;float: right">刷新</Button>
							</div>
						</div>
					</Table>
				</TabPane>

			</Tabs>
			<div slot="footer"></div>
		</Modal>
		<Modal v-model="modal1" title="会员公告" width="700" class-name="modal2">
			<template v-if="NoticeList2.length>0">
				<p v-for="(item,index) in NoticeList2" :key="index" style="border-bottom: 1px solid grey;padding-bottom: 10px;margin-top: 10px">{{item.content}}</p>
			</template>
			<p style="font-weight: 600;text-align: center" v-else="">您不在线期间没有最新会员公告</p>
			<div slot="footer">
				<Button @click="modal1=false" type="primary" size="default">确认</Button>
			</div>
		</Modal>
		<Modal v-model="modal3" width="700" class-name="modal3">
			<p slot="header" style="text-align:center">
				<span>额度转换</span>
			</p>
			<div style="text-align:center">
				<Table stripe border :columns="columns1" :data="data1"></Table>
			</div>
			<div slot="footer">

			</div>

		</Modal>
		<Modal v-model="modal4" width="500" class-name="modal4">
			<p slot="header" style="text-align:center">
				<span>额度转换</span>
			</p>
			<div style="text-align:center">
				<p style="text-align: left;margin-bottom: 20px;margin-left: 80px;">您的中心钱包余额为<span style="color: red;">{{userDetail.accountBalance}}</span>元,{{typeName[type]}}钱包余额为<span style="color: red;">{{balance}}</span>元</p>
				<Form ref="formCustom" :label-width="80">
					<FormItem label="转入">
						<Select ref="model1" v-model="model1" style="width:200px">
							<Option v-for="item in gameType" :value="item.key" :key="item.key">{{ item.walletType }}</Option>
						</Select>
					</FormItem>
					<FormItem label="转出">
						<Select ref="model2" v-model="model2" style="width:200px">
							<Option v-for="item in gameType" :value="item.key" :key="item.key">{{ item.walletType }}</Option>
						</Select>
					</FormItem>
					<FormItem label="金额">
						<InputNumber :min="1" ref="amount" v-model="amount" style="width: 198px;"></InputNumber>
					</FormItem>
					<!--<FormItem label="资金密码" >
        	<Input ref="amountPassword"  v-model="amountPassword" style="width: 198px;" type="password"></Input>
        </FormItem>-->
					<FormItem>
						<Button type="primary" @click="conversionAmount" :loading="modal_loading">立即转换</Button>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">

			</div>

		</Modal>
	</div>
	<!-- <div class="side" >
    <div class="WC_countdown" @click="show_sport"><div class="st-open">火热进行中</div></div>
</div> -->
</div>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	import { bus } from '../bus.js';
	export default {
		mounted() {
			bus.$on('announce', () => {
				this.modal1 = true;
			})
			bus.$on("show_amount", () => {
				this.amountConversion()
			})
			let that = this;
			this.queryMemberNoticeList("?notice_type=3");
			this.queryMemberNoticeList("?notice_type=2&type=1");
			that.NoticeList(0);
			this.$http({
				method: 'get',
				url: '/notice/queryNoticeAlertList?is_read=0&memberid=' + this.userDetail.account
			}).then(function(data) {
				if(data.data.data.length !== 0) {
					that.dot = true
				} else {
					that.dot = false
				}
			}).catch(function(error) {
				console.log(error)
			})
			this.Times(new Date());
			this.$Notice.config({
				top: 64,
				duration: 3
			});
		},
		data() {
			return {
				balance: '',
				modal_loading: false,
				amount: 1,
				//    	amountPassword:"",
				model1: "",
				model2: "",
				modal2: false,
				modal3: false,
				modal4: false,
				time: '',
				type: "sb",
				typeName:{sb:"沙巴",lj:"利记",vg:"VG"},
				gameType: [{
					name: 'M5II',
					key: 'm5',
					balance: 18,
					address: '转换',
					walletType: '中心钱包'
				}],
				columns4: [{
						type: 'expand',
						width: 50,
						align: 'center',
						render: function(createElement) {
							return createElement(
								'div', {

								}, [
									createElement('p', this.row.content)
								]
							)
						}
					},
					{
						type: 'selection',
						width: 55,
						align: 'center'
					},
					{
						title: '标题',
						key: 'title',
						render: (h, params) => {
							return h('div', {

							}, [
								h('span', params.row.title),
								h('Badge', {
									props: {
										dot: params.row.isRead == 0 ? true : false,
									},
									attrs: {
										id: params.row.id
									},

								})
							]);
						}
					},
					{
						title: '发送人',
						key: 'sentPersonName'
					},
					{
						title: '发送时间',
						key: 'sentTime'
					}
				],
				columns1: [{
						title: '我的厅室',
						key: 'name'
					},
					{
						title: '余额',
						key: 'balance'
					},
					{
						title: '操作',
						key: 'address',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.model1 = "";
											this.model2 = "";
											this.type = params.row.type;
											this.balance = params.row.balance;
											this.modal4 = true;
											this.gameType = [{
												name: 'M5II',
												key: 'm5',
												balance: 18,
												address: '转换',
												walletType: '中心钱包'
											}];

											this.gameType[0].balance = this.userDetail.accountBalance
											if(this.type == "sb") {
												this.gameType.push(this.data1[0])
											} else if(this.type == "lj") {
												this.gameType.push(this.data1[1])
											} else if(this.type == "vg") {
												this.gameType.push(this.data1[2])
											}

										}
									}
								}, '额度转换')
							]);
						}
					}
				],
				data1: [{
						name: '沙巴',
						key: 'sb',
						balance: "",
						address: '转换',
						walletType: '沙巴钱包',
						type: "sb"
					},
					{
						name: '利记',
						key: 'lj',
						balance: "",
						address: '转换',
						walletType: '利记钱包',
						type: "lj"
					},
					{
						name: 'VG',
						key: 'vg',
						balance: "",
						address: '转换',
						walletType: 'VG钱包',
						type: "vg"
					},
				],
				//选中项
				selection: '',
				//选中id
				id: [],
				//判断为全部，未读，已读
				name: '',
				//所读信息的id
				isRead: '',
				dot: false,
				label: (h) => {
					return h('div', [
						h('Icon', {
							props: {
								type: 'android-mail'
							}
						}),
						h('span', '站内私信'),
						h('Badge', {
							props: {
								dot: this.dot
							}
						})
					])
				},
				modal1: false,

			}
		},
		methods: {
			...mapActions([
				"queryMemberNoticeList",
				"queryNoticeAlertList",
				"deleteNoticeAlert",
				"updateNoticeAlert",
				"getBalance",
				"getUserDetail",
				"amountOut",
				"withdrawal",
				"register"
			]),
			//显示沙巴体育
			show_sport(){
				bus.$emit('show_sport')
			},
			//时间解析;
			Times(now) {
				let year = new Date(now).getFullYear();
				let month = new Date(now).getMonth() + 1;
				let date = new Date(now).getDate();
				let houer = new Date(now).getHours();
				let minute = new Date(now).getMinutes();
				let second = new Date(now).getSeconds();
				if(month < 10) month = "0" + month;
				if(date < 10) date = "0" + date;
				if(minute < 10) minute = "0" + minute;
				if(second < 10) second = "0" + second;
				if(houer < 10) houer = "0" + houer;
				this.time = year + "-" + month + "-" + date + " " + houer + ":" + minute + ":" + second
			},
			//打开额度转换弹窗
			amountConversion() {
				if(this.modal3) {
					return false;
				}
				if(this.userDetail.type != '0') {
					return false;
				}
				this.modal3 = true;
				this.model1 = "";
				this.model2 = "";
				this.getBalance({
					platform: "gm_ibc"
				}).then((res) => {
					this.data1[0].balance = res.data;
				})
				this.getBalance({
					platform: "lj_lj"
				}).then((res) => {
					this.data1[1].balance = res.data
				})
				this.getBalance({
					platform: "vg_vg"
				}).then((res) => {
					this.data1[2].balance = res.data
				})

			},
			NoticeList(name) {
				this.name = name;
				this.queryNoticeAlertList('?is_read=' + name + '&memberid=' + this.userDetail.account).then((res) => {
					//        console.log(res)
					if(name === '0') {
						if(res.data.length === 0) {
							this.dot = false;
						} else {
							this.dot = true;
						}
					}
				});

				this.Times(new Date());
			},
			select(selection) {
				this.selection = selection;
			},
			//删除信息
			removeMessage() {
				let time;
				//      console.log(this.selection)
				if(this.selection.length !== 0) {
					this.selection.map(function(item) {
						this.id.push(item.id)
					}.bind(this))
				} else {
					this.$Notice.warning({
						title: 'M5Ⅱ通知',
						desc: '至少选择一条消息'
					});
				}
				this.id.join(',');
				let that = this;
				new Promise(function(resolve, reject) {
					clearTimeout(time);
					that.deleteNoticeAlert('?messageIds=' + that.id);
					resolve();
				}).then(function() {
					time = setTimeout(function() {
						that.queryNoticeAlertList('?is_read=' + that.name + '&memberid=' + that.userDetail.account);
					}, 300)
					that.id = [];
					that.selection = [];
				}).catch(function(error) {
					console.log(error)
				})
			},
			//额度转换
			conversionAmount() {

				if(this.model1 == "") {
					//    		this.$refs.model1.focus()
					this.$Message.error('请填写需要转入的钱包');
					return false
				} else if(this.model2 == "") {
					this.$Message.error('请填写需要转出的钱包');
					return false
				} else if(this.amount == '') {
					this.$refs.amount.focus()
					this.$Message.error('请填写转换的金额');
					return false
				}
				let platform;
				if(this.type == "sb") {
					platform = "gm_ibc";
				} else if(this.type == "lj") {
					platform = "lj_lj";
				} else if(this.type == "vg") {
					platform = "vg_vg";
				}
				let parmes = {
					amount: this.amount + "",
					//    		amountPassword:hex_md5(this.amountPassword),
					platform: platform
				}
				this.modal_loading = true;
				//从m5中心钱包转出时为存款，否则为取款
				if(this.model2 == "m5") {
					if(this.userDetail.accountBalance * 1 < this.amount * 1) {
						this.$Notice.warning({
							title: 'M5II通知',
							desc: '中心钱包余额不足!'
						});
						this.modal_loading = false;
						return false
					}

					this.amountOut(parmes).then((res) => {
						if(res.code == '0') {
							this.modal_loading = false;
							this.$Message.success('转换成功');
							this.getBalance({
								platform: platform
							}).then((res) => {
								if(res.code == "0") {
									this.getUserDetail()
									this.modal4 = false
									this.amount = 1;
									this.balance = res.data
									if(this.type == "sb") {
										this.data1[0].balance = res.data;
									} else if(this.type == "lj") {
										this.data1[1].balance = res.data;
									} else if(this.type == "vg") {
										this.data1[2].balance = res.data;
									}
								}
							})
						} else {
							this.modal_loading = false;
							this.$Message.error(res.msg);
						}
					})
				} else {
					if(this.balance * 1 < this.amount * 1) {
						this.$Notice.warning({
							title: 'M5II通知',
							desc: this.typeName[this.type]+'钱包余额不足!'
						});
						this.modal_loading = false;
						return false
					}
					this.withdrawal(parmes).then((res) => {
						if(res.code == '0') {
							this.modal_loading = false;
							this.$Message.success('转换成功');
							this.getBalance({
								platform: platform
							}).then((res) => {
								if(res.code == "0") {
									this.getUserDetail()
									this.modal4 = false
									this.amount = 1;
									this.balance = res.data
									if(this.type == "sb") {
										this.data1[0].balance = res.data;
									} else if(this.type == "lj") {
										this.data1[1].balance = res.data;
									} else if(this.type == "vg") {
										this.data1[2].balance = res.data;
									}
								}
							})
						} else {
							this.modal_loading = false;
							this.$Message.error(res.msg);
						}
					})
				}
			},
			//刷新
			refresh() {
				this.queryNoticeAlertList('?is_read=' + this.name + '&memberid=' + this.userDetail.account);
				this.Times(new Date());
			},
			//读取信息
			update(row, status) {
				this.isRead = row.isRead;
				if((this.name == '0' || this.name == '') && status == true) {
					this.updateNoticeAlert('?messageId=' + row.id);
					let dot = document.getElementById(row.id);
					if(dot) {
						dot.parentNode.removeChild(dot);
					}
					if(document.getElementsByClassName('ivu-badge-dot').length <= 2) {
						this.dot = false
					}
				}
			},
		},
		computed: mapState(["NoticeList1", "NoticeList2", "AlertList", "deleteNotice", "userDetail", "model", ]),
		watch: {
			model1() {
				if(this.type == "sb") {
					if(this.model1 == "sb") {
						this.model2 = "m5"
					} else if(this.model1 == "m5") {
						this.model2 = "sb"
					}
				} else if(this.type == "lj") {
					if(this.model1 == "lj") {
						this.model2 = "m5"
					} else if(this.model1 == "m5") {
						this.model2 = "lj"
					}
				} else if(this.type == "vg") {
					if(this.model1 == "vg") {
						this.model2 = "m5"
					} else if(this.model1 == "m5") {
						this.model2 = "vg"
					}
				}

			},
			model2() {
				if(this.type == "sb") {
					if(this.model2 == "sb") {
						this.model1 = "m5"
					} else if(this.model2 == "m5") {
						this.model1 = "sb"
					}
				} else if(this.type == "lj") {
					if(this.model2 == "lj") {
						this.model1 = "m5"
					} else if(this.model2 == "m5") {
						this.model1 = "lj"
					}
				} else if(this.type == "vg") {
					if(this.model2 == "vg") {
						this.model1 = "m5"
					} else if(this.model2 == "m5") {
						this.model1 = "vg"
					}
				}

			}
		}
	}
</script>