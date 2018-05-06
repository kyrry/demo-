<template>
  <main class="add_licence">
    <app-header title="添加驾照"></app-header>
    <scroller ref="myscroller">

      <section class="add_licence_wrapper">
        <div class="info-header com-header">
          <p>请填写{{carCode}}车主本人信息</p>
        </div>
        <div class="info_box">
          <ul class="info">

            <li class="list">
              <span class="title">车主姓名</span>
              <input type="text" class="input-item" v-model="userInfo.name" placeholder="车主姓名">
					  </li>

            <li class="list">
              <span class="title">驾驶证号</span>
              <input type="text" vd-type="number" v-model="userInfo.number" class="input-item"
                placeholder="驾驶证号完整 15位或者18位">
					  </li>

            <li class="list">
              <span class="title">档案编号</span>
              <input type="text" v-model="userInfo.seriaNumber" class="input-item" placeholder="档案编号完整 12位">
					  </li>

            <li class="list" @click="handleDateChange('date1')">
              <span class="title">初次领证日期</span>
              <span class="input-item school date">{{ userInfo.formIndex ? userInfo.formIndex : '请选择' }}</span>
              <div class="arrow"></div>
					  </li>

            <li class="list">
              <span class="title">驾驶证绑定手机号</span>
              <input type="text" class="input-item " v-model="userInfo.phone" placeholder="请输入手机号码">
					  </li>

            <li class="list">
              <span class="title">驾驶证条形码编号</span>
              <input type="text" class="input-item " v-model="userInfo.qrcodeNumber" placeholder="请输入条形码编号">
					  </li>

            <li class="list">
              <span class="title">驾驶证正面</span>
              <div class="image">
                <img v-if="formData.driverUrl" :src="formData.driverUrl">
                <img v-else src="~assets/images/car-verification/driver-license-face.png">
              </div>
              <i class="sp sp-right"></i>
              <input type="file" class="input-item files" name="file" accept="image/*"
                  ref="driverUrl" v-on:change="setImage($event, 'driverUrl')">
            </li>

            <li class="list">
              <span class="title">驾驶证反面</span>
              <div class="image">
                <img v-if="formData.driverSecondUrl" :src="formData.driverSecondUrl">
                <img v-else src="~assets/images/car-verification/driver-license-back.png">
              </div>
              <i class="sp sp-right"></i>
              <input type="file" class="input-item files"  name="file" accept="image/*"
                  ref="driverSecondUrl" v-on:change="setImage($event, 'driverSecondUrl')">
            </li>

          </ul>
          <button type="submit" class="btn" :class="{ 'on': active }" @click="save">保存</button>
        </div>
      </section>

    </scroller>
    <Dates v-on:onDateClick="handelDateClick" :show="isShow" :today="false"></Dates>
    <cropper v-on:uploadFileClose="fileClose"></cropper>
  </main>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
