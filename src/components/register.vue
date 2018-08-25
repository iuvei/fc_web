<template>
  <div id="register">
    <div class="head_img">
      <!-- <img src="../../static/img/register_m5_logo.png" alt=""> -->
      <img src="../../static/img/fucai_logo.png" />  
    </div>
    <div class="register_nav">
      <div class="register_nav_img">
        <img src="../../static/img/login_banner.jpg" alt="">
      </div>
      <div class="register_nav_form">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom"  label-position="top">
          <FormItem label="账号" prop="account" >
            <Input type="text" v-model="formCustom.account"></Input>
          </FormItem>
          <!-- <FormItem label="昵称" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
          </FormItem> -->
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formCustom.password" number></Input>
          </FormItem>
           <FormItem label="确认密码" prop="confirmPassword">
            <Input type="password" v-model="formCustom.confirmPassword" number></Input>
          </FormItem>
          <!-- <FormItem v-show="next" label="真实姓名" prop="fcName" >
            <Input  v-model="formCustom.fcName" ></Input>
          </FormItem>
           <FormItem v-show="next" label="联系电话" prop="registerPhone" >
            <Input  v-model="formCustom.registerPhone" number></Input>
          </FormItem> -->
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')" long>注册</Button>
          </FormItem>
        </Form>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
    data () {
      const account = (rule, value, callback) => {
        let regs = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        if (value === '') {
          callback(new Error('账号不能为空!'));
        } else if (!regs.test(value)) {
          callback(new Error('账号必须包含数字和字母,长度在6-16之间!'));
        } else {
          callback();
        }
      };
      const password = (rule, value, callback) => {
        let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        if (value === '') {
          callback(new Error('密码不能为空!'));
        }else if(!reg.test(value)){
          callback(new Error('密码为6-20位，至少包含数字和字母'));
        }else {
          callback();
        }
      };
      const confirmPassword = (rule, value, callback) => {
        if (value !== this.formCustom.password) {
          callback(new Error('两次输入的密码不一致'));
        }else {
          callback();
        }
      };
      const fcName = (rule, value, callback) => {
        let regNmae = /^[\u4E00-\u9FA5A-Za-z]+$/;
        if (!regNmae.test(value)) {
          callback(new Error('请输入您的真实姓名'));
        }else {
          callback();
        }
      };
      const registerPhone = (rule, value, callback) => {
        let regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (!regPhone.test(value)) {
          callback(new Error('请输入您的电话号码'));
        }else {
          callback();
        }
      };
      return {
        next:false,
        rescode:null,
        formCustom: {
          account: '',
          name: '',
          password: '',
          confirmPassword:'',
          fcName:'',
          registerPhone:'',
        },
        ruleCustom: {
          account: [
            { validator: account, trigger: 'blur', required: true }
          ],
          name: [
            { trigger: 'blur', required: true, message: '请填写用户昵称' }
          ],
          password: [
            { validator: password, trigger: 'blur', required: true }
          ],
          confirmPassword:[
            { validator: confirmPassword, trigger: 'blur', required: true }
          ],
          fcName:[
            {  trigger: 'blur', required: true, message: '请填写真实姓名'}
          ],
          registerPhone:[
            { validator: registerPhone, trigger: 'blur', required: true}
          ]
        }
      }
    },
     created(){
      this.setIsLogin(false);
       
      //  this._queryRegister()
    },
    methods: {
      ...mapActions(['registerMember','setIsLogin']),
      ...mapActions('account',['queryRegister']),
      _queryRegister(){
        this.queryRegister().then( res => {
          this.rescode = res.code;
          if(res.code == 0){
            this.next = true;
          }else{
            this.next = false;
          }
        })
      },
       
      register(){
        let windLocation = window.location.href;
        let urlId = windLocation.substring(windLocation.indexOf("register")+9,windLocation.length);
        if(urlId==""||urlId==null||urlId==undefined){
          urlId="73acd9a5972130b75066c82595a1fae3";
        }
        let md5_pwd = hex_md5(this.formCustom.password);
        let params
        // if(this.rescode == 0){
        //   params = {
        //     'memberAccount': this.formCustom.account,
        //     'password': md5_pwd,
        //     'memberName': this.formCustom.name,
        //     'promoteId': urlId,
        //     'way': '1',
        //     'trueName':this.formCustom.fcName,
        //     'registerPhone':this.formCustom.registerPhone+'',
        //   };
        // }else if(this.rescode != 0){
        //   params = {
        //     'memberAccount': this.formCustom.account,
        //     'password': md5_pwd,
        //     'memberName': this.formCustom.name,
        //     'promoteId': urlId,
        //     'way': '1'
        //   };
        // }
         params = {
            'memberAccount': this.formCustom.account,
            'password': md5_pwd,
            // 'memberName': this.formCustom.name,
            'promoteId': urlId,
            'way': '1'
          };
        
        this.registerMember(params).then((res) => {
          if (res.code === 0){
            this.setIsLogin(true);
            this.$Message.success(res.msg);
            this.$router.replace({path: '/bet'})
          }else if(res.code != 0) {
            this.$Message.error(res.msg);
            this.formCustom.account = '';
            this.formCustom.name = '';
            this.formCustom.password = '';
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            this.$Message.error('填写必填参数!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style>
  #register{
    width: 1000px;
    overflow: hidden;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 71.2px;
    margin: 0 auto;
    overflow: hidden;
    font-size: 12px;
    background: #ececec;
    padding:50px 8px;
    box-sizing: border-box;
   
  }
  .head_img{
    height: 120px;
  }
  .head_img img{
    height: 110px;

  }
  .register_nav{
  	display: flex;
  	align-items: center;
    height: 400px;
    /*border: 1px solid #1c2438;*/
    border-radius: 7px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: #d7d7d7 0px 0px 3px 3px ;
  }
  .register_nav_img{
    width: 603px;
    height: 278px;
    float: left;
  }
  .register_nav_form{
    float: left;
    width: 260px;
    height: 380px;
    padding:55px 10px 0 10px;
    box-sizing: border-box;
    overflow: auto;
  }
</style>
