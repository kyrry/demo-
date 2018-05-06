<template>
  <div class="user-card-detail-page">
    <app-header title="办卡查询"></app-header>
    <scroller>
      <div class="wrapper">
        <div class="container" v-if="formTemp">
          <div class="banner">
            <img :src="formTemp.bank.banner">
          </div>






          <div class="time">
						<div class="bank-log">
							<img :src="formTemp.avatar">  
              <span class="id_number">{{formTemp.invite_code}}</span>
						</div>
            <span class="bank-name">{{ formTemp.user_nickname }}   <em class="font">{{ formTemp.user_level_name }}</em>
            <i class="hp hp-level " :class="'hp-level-0'+formTemp.level"></i></span>
            <!-- <span v-if="userInfo.id === formTemp.user_id" class="state">进度查询</span> -->
            <!-- <span v-else class="state" v-on:click="handleNotice()">提醒查询</span> -->
          </div>





          <div class="text">
            <div class="info">申请时间：
							<span class="date">{{ formTemp.create_at }}</span>
						</div>
            <div class="info">申请人：
							<span class="date">{{ formTemp.user_name }}<i>（{{ formTemp.user_level_name }}）</i></span>
						</div>
            <!-- <div class="info">证件号：
							<span class="date">{{ formTemp.id_number | hideId }}</span>
						</div> -->
            <div class="info">手机号：
							<span class="date">{{ formTemp.phone | hidePhone }}</span>
						</div>
            <!-- <div class="info">浏览时间：
              <span class="date">2017-11-20 <i>18:30:31</i></span>
            </div> -->
          </div>

          <div class="status">
            <div class="sta-group">
              <div class="item">
                 <p class="item1"  :class="{ success: 5 === isStatus}" ><span>1</span>申请提交</p>
                 <p class="item2"   :class="{ success: 6 === isStatus}"><span>2</span>银行数据反馈</p>
                 <p class="item3" v-show="2 != isStatus && 3 != isStatus"  :class="{ success: 2 === isStatus || 3 === isStatus}" ><span>3</span>审核结果</p>
                 <p class="item4" v-show ="2 === isStatus"  :class="{ isOk: 2 === isStatus }" ><span>审核成功</span></p>
                 <p class="item5" v-show ="3 === isStatus"  :class="{ error : 3 === isStatus }" ><span>审核失败</span></p>
              </div>
            </div>
          </div>

          <!-- <div class="foot-tip">
            <p>申请进度无需查询，7-15个工作日会自动更新申请状态</p>
          </div> -->

          <div class="status-tip">真实客户办卡进度.流程效果图，佣金以银行提供最终准确数据为准</div>

          <div class="desc" v-if="type == 1000 || type == 1001">
            <p><b>[信用卡佣金]</b></p>
            <p><strong>条件：</strong><span class="blue">①</span> 本行首卡， <span class="blue">②</span> 平台填写信息和银行申请信息一致，
                <span class="blue">③</span> 没在其他渠道同时申请过， <span class="blue">④</span> 银行短信通知并已寄卡。</p>
            <p><strong>时间：</strong>收到银行寄卡短信通知开始计算，达到规定时间后自动计算。逢法定节假日延后。</p>
            <!-- <p>如超过规定时间又确定银行已寄卡的。请提供办卡者姓名、电话、下卡银行给客服登记，统一给银行核查。</p> -->
            <p>(交通、兴业、上海、民生、浦发、华夏寄卡12个工作日后；光大白金、工商寄卡30个工作日后)</p>
          </div>

          <div class="desc" v-if="type == 1003">
            <p><span style="color: red;">审核失败：</span>① 此次申请并非本行首卡; &nbsp; ② 银行审批不通过; &nbsp; ③ 同时在其他平台申请过; &nbsp; ④ 平台填写资料与银行填写不一致。</p>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
