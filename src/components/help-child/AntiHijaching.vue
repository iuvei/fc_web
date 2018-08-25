<template>
    <div id='antihijaching'>
        <h1>Win8/Win7/Vista</h1>
        <p>1.在电脑右下角的网络图标上单击鼠标右键可以看到"打开网络和共享中心"选项，点击进入设置</p>
        <img src="../../../static/img/helpImg/win8-setting-0.jpg" alt="">
        <p>2.点击左侧的"更改适配器设置"</p>
        <img src="../../../static/img/helpImg/win8-setting-1.jpg" alt="">
        <p>3.在选中的网络连接上单击鼠标右键，选择"属性"</p>
        <img src="../../../static/img/helpImg/win8-setting-2.jpg" alt="">
        <p>4.单击"网络"选项卡。在"此连接使用下列项目"下，选中"Internet 协议版本 4 (TCP/IPv4)"，然后点击"属性"，或者直接双击"Internet 协议版本 4 (TCP/IPv4)"</p>
        <img src="../../../static/img/helpImg/win8-setting-3.jpg" alt="">
        <p>5.勾选"使用下面的DNS服务地址"，然后在"首选DNS服务器"和"备用DNS服务器"框中，键入主DNS服务器地址180.76.76.76和辅助DNS服务器的地址114.114.114.114，点击确定即设置完成</p>
        <img src="../../../static/img/helpImg/win8-setting-4.jpg" alt="">


        <h1>Linux 系统</h1>
        <p>1.以下设置对所用的Linux系统如Redhat/Ubuntu/Debian/CentOS等都有效，但您必须是管理员root或者具有管理员权限 vim /etc/resolv.conf</p>
        <p>2.在其中加入:</p>
         <p> nameserver 180.76.76.76</p> 
         <p> nameserver 114.114.114.114</p>
         <p>3.保存退出,使用nslookup或者dig验证是否可以通过180.76.76.76正常解析www.baidu.com</p>


         <h1>Mac系统</h1>
         <p>1.单击最左上角的苹果图标，在下拉菜单中点击"系统偏好设置"进入设置</p>
         <img class="mac_img" src="../../../static/img/helpImg/Mac-setting-0.png" alt="">
         <p>2.单击"网络"图标进入网络设置</p>
         <img class="mac_img" src="../../../static/img/helpImg/Mac-setting-1.png" alt="">
         <p>3.从列表中选择相应的网络连接服务，然后单击"高级"选项</p>
         <img class="mac_img" src="../../../static/img/helpImg/Mac-setting-2.png" alt="">
         <p>4.点击DNS的选项卡，然后点击左下角"+"，添加180.76.76.76和114.114.114.114，单击"好"</p>
         <img class="mac_img" src="../../../static/img/helpImg/Mac-setting-3.png" alt="">
         <p>5.返回到上一级，单击"应用"</p>
         <p>6.在浏览器中测试打开 http://www.baidu.com是否正常</p>

         <h1>IOS</h1>
         <p>1.在主屏幕中点击"设置"图标进入设置界面</p>
         <p>2.点击"无线局域网"</p>
         <img src="../../../static/img/helpImg/phone-setting-0.png" alt="">
         <p>3.在"选取网络"列表中点击相应的网络链接右侧的"i"图标，进入网络设置</p>
         <img src="../../../static/img/helpImg/phone-setting-1.png" alt="">
         <p>4.选择"DHCP"选项卡，设置选项下的"DNS"为180.76.76.76, 114.114.114.114即可</p>
         <img src="../../../static/img/helpImg/phone-setting-2.png" alt="">

         <h1>Android</h1>
         <p>1.在桌面点击"设置"图标，并且进入"WLAN设置"选项</p>
         <img src="../../../static/img/helpImg/Android-setting-0.jpg" alt="">
         <p>2.在wifi列表中，选择已经连接的WiFi网络，长按之后在弹出来的提示选择"修改网络"</p>
         <img src="../../../static/img/helpImg/Android-setting-1.jpg" alt="">
         <p>3.选中"显示高级选项"，将"IP设定"改成"静止"</p>
         <img src="../../../static/img/helpImg/Android-setting-2.jpg" alt="">
         <p>4.将域名1和域名2分别改成180.76.76.76和114.114.114.114，保存即可</p>
         <img src="../../../static/img/helpImg/Android-setting-3.jpg" alt="">

         <h1>小米路由</h1>
         <p>1.在界面中点击"路由设置"进入设置界面</p>
         <P>2.在右边栏的网络设置展开菜单选中"外网设置"进入设置</P>
         <img src="../../../static/img/helpImg/mi-setting-0.jpg" alt="">
         <P>3.在右边界面"配置联网类型"选择"使用静态IP"，设置选项下的"DNS1"为180.76.76.76, "DNS2"为114.114.114.114</P>
         <img src="../../../static/img/helpImg/mi-setting-1.jpg" alt="">

         <h1>极路由</h1>
         <p>1.登陆路由器，点击左下角外网设置</p>
         <img src="../../../static/img/helpImg/router-setting-0.jpg" alt="">
         <P>2.根据上网方式选择宽带拨号或网线接入（多为宽带拨号），勾选"自定义DNS"，然后在DNS地址输入框中分别输入180.76.76.76和114.114.114.114，点击保存完成设置</P>
         <img src="../../../static/img/helpImg/router-setting-1.jpg" alt="">

         <h1>其他</h1>
         <p>1.登录路由器管理界面，找到外网设置（不同厂商的可能名称不太一样）相关选项卡。</p>
         <P>2.找到DNS配置区域，设置首选DNS地址180.76.76.76，备选114.114.114.114。</P>
         
         <P>3.如有任何疑问，请直接联系我们。</P>
        


    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    #antihijaching{
        width: 1000px;
        box-sizing: border-box;
        padding: 20px 15px;
    }
    #antihijaching h1{
        color: #2483d1;
        font-size: 20px;
        padding: 5px 20px;
        border-bottom: 1px solid #e3e3e3;
    }
    .mac_img{
        width: 750px;
    }
    #antihijaching p{
        padding: 10px 5px;
        font-size: 16px;
    }
    #antihijaching img{
        margin-left: 15px;
    }

</style>


