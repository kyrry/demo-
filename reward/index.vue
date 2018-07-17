<template>
  <div class="message-reward-page">
    <app-header title="卡盟金服"></app-header>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="my_scroller">
      <div class="wrapper">
        <div class="controller">
          <ul class="list">

            <li class="item" v-for="(item, index) in formTemp.list" :key="index">
                <div class="day date">
                  <span>{{ item.day_s.substring(0,11) | handlePushTime  }} {{item.time.substring(0,5)}} </span>
                </div>
                <div class="inner">

                  <div class="head">
                    <p>{{ item.title }}</p>
                    <p class="time">{{ item.day_s.substring(0,11) | handleDate }}</p>
                  </div>
                  <div class="content">
                    <p>{{ item.msg_content_new }}</p>
                    <p><span>奖励金额：</span><span class="textColor">{{item.extend.money}}元</span></p>
                    <p><span>时间：</span><span>{{item.day_s}}</span></p>
                     <div class="text">点击查看详情</div>
                  </div>
                  <router-link :to="{ name: 'message.RewardDetail', params: { id: item.extend.account_id } }" class="detail">
                    <span>详情</span>
                     <i class="icon"></i>
  									
  								</router-link>
                </div>
            </li>



          </ul>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>