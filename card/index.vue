<template>
  <div class="user-card-page">
    <app-header title="办卡查询"></app-header>
		<div class="my-team">
      <i class="sp sp-sea"></i>
			<div class="input">
				<input type="text" placeholder="请输入订单号 / 工号" v-model="keyword">
			</div>
      <i class="icon icon-close" v-show="keyword" @click="keyword = ''"></i>
    </div>
    <div class="nav">
      <div class="nav-group">
        <div class="item" :class="{ active: 1000 == status}" @click="switchState(1000)">
					<div class="sprite">
						<span class="sp sp-refer01"></span>
					</div>
					<div class="title">待确定</div>
				</div>
        <div class="item" :class="{ active: 1001 == status}" @click="switchState(1001)">
					<div class="sprite">
						<span class="sp sp-refer02"></span>
					</div>
					<div class="title">已提交</div>
				</div>
        <div class="item" :class="{ active: 1002 == status}" @click="switchState(1002)">
					<div class="sprite">
						<span class="sp sp-refer04"></span>
					</div>
					<div class="title">审核状态</div>
				</div>
        <!-- <div class="item" :class="{ active: 1002 == status}" @click="switchState(1002)">
					<div class="sprite">
						<span class="sp sp-refer05"></span>
					</div>
					<div class="title">已结算</div>
				</div> -->
        <div class="item" :class="{ active: 1003 == status}" @click="switchState(1003)">
					<div class="sprite">
						<span class="sp sp-refer03"></span>
					</div>
					<div class="title">审核失败</div>
				</div>
      </div>
    </div>


    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="my_scroller">
      <div class="wrapper">
        <div class="container">
          <div v-show="1000 == status" class="tips">该明细为用户进入信用卡申请页面时的浏览记录，不能视为信用卡申请订单。申请通过要以客户收到银行短信通知为准，按照银行短信通知日期来计算。</div>
          <div v-show="1003 == status" class="tips">
            <p><span style="color: red;">审核失败：</span>① 此次申请并非本行首卡; &nbsp; ② 银行审批不通过; &nbsp; ③ 同时在其他平台申请过; &nbsp; ④ 平台填写资料与银行填写不一致。</p>
          </div>

          <ul class="list">
            <router-link class="item" tag="li" v-for="(item, index) in formTemp.list" :key="index" :to="{ name: 'user.CardDetail', params: { id: item.id }, query: { type: status } }">
              <div class="avatar">
								<div class="photo">
									<img :src="item.bank.thumb" alt="">
								</div>
								<div class="title">{{ item.bank.name }}</div>
              </div>
              <div class="info">
                <h2 class="name">申请人 ：{{ item.user_name }}</h2>
                <div class="level">
                  <span v-if="item.user_level_name" class="grade">（{{ item.user_level_name }}）</span>
                  <i v-if="0 < item.level" class="sp" :class="'sp-level-0' + item.level"></i>
                  <div v-if="1 == item.direct" class="direct">直</div>
                  <div v-if="2 == item.direct" class="direct red">间</div>
                </div>
                <p class="phone">手机号：{{ item.mobile }}</p>
                <p class="time">申请时间：<span class="date">{{ item.create_at }}</span></p>
              </div>
              <div class="finish-active" v-if="item.is_active === 1"></div>
              <router-link v-if="userInfo.id != item.user_id" :to="{ name: 'chat.Home', params: { id: item.user_id } }" tag="div" class="chat">
                <i class="sp sp-wchat"></i>
                <span class="text">微聊</span>
              </router-link>
              <div class="right">结算流程</div>
            </router-link>
          </ul>
        </div>
      </div>
    </scroller>

    <notify-popup :content="['该明细为用户进入信用卡申请页面时的浏览记录，不能视为信用卡申请订单。申请通过要以客户收到银行短信通知为准，按照银行短信通知日期来计算。']" :isNotice="isNoticeShow" @toggleNotify="toggleNotifyFn"></notify-popup>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
