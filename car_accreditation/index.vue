<template>
  <main class="add_car_accreditation">
    <app-header title="车辆验证"></app-header>
    <scroller ref="myscroller">
      <section class="basic-info-wrapper">
        <div class="header">
          <p>
            <span>请填写 {{ carCode }} 车主本人信息</span>
            <span class = "car_message_delete" @click="deleteCar">
            <i class="message_delect"></i>删除</span>
          </p>
        </div>
        <div class="info_box">
          <ul class="info">
            <li class="list">
              <span class="people">车架号</span>
              <input type="text" class="input-item" placeholder="请输入" v-model="carInfo.car_code">
					  </li>

            <!-- <li class="list">
              <span class="people">发动机号</span>
              <input type="text" class="input-item" placeholder="请输入" v-model="carInfo.car_drive_number">
					  </li> -->

            <li class="list" @click="handleDateChange('car_reg_date')">
              <span class="title">车辆注册日期</span>
              <span class="input-item date">{{ carInfo.car_reg_date ? carInfo.car_reg_date : '请选择' }}</span>
              <div class="arrow"></div>
            </li>

            <li class="list" @click="handleDateChange('car_check_date')">
              <span class="title">验证有效期至</span>
               <span class="input-item date">{{ carInfo.car_check_date ? carInfo.car_check_date :'请选择' }}</span>
              <div class="arrow"></div>
            </li>

            <li class="list" @click="selectCart">
              <span class="people">品牌车系</span>
              <span class="input-item date">{{ brandName ? brandName :'请选择' }}</span>
              <div class="arrow"></div>
					  </li>

            <li class="list">
              <span class="people">行驶证档案编号</span>
              <input type="text" class="input-item" placeholder="（选填）" v-model="carInfo.car_license_number">
					  </li>

            <li class="list">
              <span class="people">车辆登记证书号</span>
              <input type="text" class="input-item" placeholder="（选填）" v-model="carInfo.car_dj_number">
					  </li>

            <li class="list">
              <span class="title">行驶证正面</span>
              <div class="image">
                <img v-if="formData.car_license_face" :src="formData.car_license_face">
                <img v-else src="~assets/images/car-verification/car_license_face.png">
              </div>
              <i class="sp sp-right"></i>
              <input type="file" class="input-item files" name="file" accept="image/*"
                  ref="car_license_face" v-on:change="setImage($event, 'car_license_face')">
            </li>

            <li class="list">
              <span class="title">行驶证反面</span>
              <div class="image">
                <img v-if="formData.car_license_back" :src="formData.car_license_back">
                <img v-else src="~assets/images/car-verification/car_license_back.png">
              </div>
              <i class="sp sp-right"></i>
              <input type="file" class="input-item files" name="file" accept="image/*"
                  ref="car_license_back" v-on:change="setImage($event, 'car_license_back')">
            </li>

            <li class="list">
              <span class="title">违章通知及年检提醒</span>
              <div :class="['switch-btn', { on: carInfo.new_notice === 1 }]" @click="toggleNewNotice">
                <i class="switch-btn-inner"></i>
              </div>
            </li>
          </ul>

          <button class="btn" :class="{ 'on': active }" @click="save">保存</button>
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
