<template>
  <div class="increase-cheats">

    <scroller>

      <div class="wrapper">
        
        <div class="slot left" slot="right" v-on:click="handleCityShowChange()">
          <a href="javascript:void(0)" class="">{{address}}
            <i class="icon-enter"></i>
          </a>
        </div>

        <div class="slot right" slot="right">
          <span class="">
            <a href="javascript:void(0)" >
              盗刷险
              <i class="icon-enter"></i>
            </a>
          </span>
        </div>
        <div class="controller">

          <div class="photo" ref="mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="photo-item">
                  <img src="~assets/images/intelligent_generation/banner.jpg">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="photo-item">
                   <img src="~assets/images/intelligent_generation/banner.jpg">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="photo-item">
                   <img src="~assets/images/intelligent_generation/banner.jpg">
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>

					<div class="tips">
						<i class="icon icon-horn"></i>
						<div class="notice">
							<div class="marquee">信用卡精养卡自动代还特色，每个月预留5%-10%的金额</div>
						</div>
          </div>

          <div class="main">
            <ul class="list">
              <li class="item" v-for="(item, index) in groupItems" :key="index" @click="linkToIncreaseList(item.key)">
                  <div class="content-group">
                    <img :src="item.thumbnail" :class="item.key">
                    <div class="content-txt">
                      <p class="tit">{{item.title}}</p>
                      <p class="instruction">{{item.instruction}}</p>
                    </div>
                    <div class="content-r">
                      <a class="btn" :class="{ open: item.isOpen }" :href="item.url">点击查询</a>
                    </div>
                  </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </scroller>
    <CityList></CityList>
  </div>
</template>

<script>
import Index from "./index.js";
export default Index;
</script>
