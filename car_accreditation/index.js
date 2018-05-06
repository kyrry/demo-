import './index.scss';
import _                from 'lodash';
import Header           from '~common/components/header';
import Dates            from '~common/components/dates';
import Models           from '~common/models';
import Cropper          from '~common/components/cropper';

let carBrand = {};

export default {
  name: 'StudentCreditCardApply',
  data () {
    return {
      carCode: '',
      brandName: '',
      carInfo: {
        car_id: '',
        car_code: '',
        car_drive_number: '',
        car_reg_date: '',
        car_check_date: '',
        new_notice: 1,
        brand_id: '',
        car_license_face: '',
        car_license_back: '',
        car_license_number: '',
        car_dj_number: '',
      },
      formData: {
        isShowTime1: 1,
        car_license_face: '',
        car_license_back: '',
      },
      currentFile: '',
      isShow: false,
    };
  },

  components: {
    'app-header': Header,
    Dates,
    Cropper,
  },

  computed: {
    active () {
      let bool = true;
      for (let i in this.carInfo) {
        if (i === 'car_license_number' || i === 'car_dj_number') {
          continue;
        }
        if (!this.carInfo[i]) {
          bool = false;
          break;
        }
      }
      return bool;
    },

    uploadImage () {
      let data = _.get(this.$store.get.state, 'Cropper.content.data');
      return data;
    },
  },

  async mounted () {
    this.carInfo.car_id = this.$store.get.state.CarBreakInfo.carId;
    this.carCode = this.$store.get.state.CarBreakInfo.carCode;

    await this.getCarBrand();
    await this.getCarInfo();

    // 选择车系后回跳
    if (Object.keys(this.$route.query).length) {
      for (let i in this.$route.query) {
        if (i in this.carInfo) {
          this.carInfo[i] = this.$route.query[i];
        }
      }
      if (this.$route.query.car_license_face_all) {
        this.formData.car_license_face = this.$route.query.car_license_face_all;
      }
      if (this.$route.query.car_license_back_all) {
        this.formData.car_license_back = this.$route.query.car_license_back_all;
      }
    }

    // 补充图片完整路径
    if (this.carInfo.car_license_face) {
      this.formData.car_license_face = 'http://res.kamengjinfu.com/admin/' + this.carInfo.car_license_face.split('admin')[1];
    }
    if (this.carInfo.car_license_back) {
      this.formData.car_license_back = 'http://res.kamengjinfu.com/admin/' + this.carInfo.car_license_back.split('admin')[1];
    }
  },

  watch: {
    uploadImage (val) {
      if (!_.isEmpty(val.preview) && !_.isEmpty(val.url)) {
        this.formData = _.assign({}, this.formData, {
          [this.currentFile]: val.preview
        });

        this.carInfo = _.assign({}, this.carInfo, {
          [this.currentFile]: val.url
        });
        this.$toast('上传成功');
      }
    },

    'carInfo.brand_id' (val) {
      if (val && val in carBrand) {
        this.brandName = carBrand[val].name;
      }
    }
  },

  methods: {
    // 获取车辆品牌
    async getCarBrand () {
      if (Object.keys(carBrand).length) {
        return;
      }
      let res = await Models.CarVio.getCarBrand();
      if (res.code === 1) {
        for (let i in res.data) {
          let el = res.data[i];
          for (let opt of el) {
            carBrand[opt.id] = opt;
          }
        }
      }
    },

    // 获取补充资料
    async getCarInfo () {
      let res = await Models.CarVio.illegalIncome({
        params: {
          car_id: this.carInfo.car_id
        }
      });
      if (res.code === 1) {
        let data = res.data;
        this.carInfo.car_code = data.car_code;
        this.carInfo.car_drive_number = data.car_drive_number;
        this.carInfo.car_reg_date = data.car_reg_date;
        this.carInfo.car_check_date = data.car_check_date;
        this.carInfo.new_notice = data.new_notice;
        this.carInfo.brand_id = data.brand_id;
        this.carInfo.car_license_face = data.car_license_face;
        this.carInfo.car_license_back = data.car_license_back;
        this.carInfo.car_license_number = data.car_license_number;
        this.carInfo.car_dj_number = data.car_dj_number;
      }
    },
    // 删除车辆
    async deleteCar () {
      let self = this;
      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '确定删除该车辆吗？',
        lists : [
          {
            msg: '取消'
          },
          {
            msg: '确定',
            class: 'ok',
            async func () {
              let id = self.carInfo.car_id;
              let res = await Models.CarVio.deleteCar({ id });
              if (res.code === 1) {
                self.$toast('车辆删除成功');
                setTimeout(() => {
                  self.$router.replace({ name: 'home.CarBreak' });
                }, 500);
              }
              else {
                self.$toast('删除车辆失败');
              }
            }
          },
        ]
      });
    },

    // 提醒按钮
    toggleNewNotice () {
      if (this.carInfo.new_notice === 1) {
        this.carInfo.new_notice = 0;
      }
      else {
        this.carInfo.new_notice = 1;
      }
    },

    // 日期选择
    handleDateChange (item) {
      this.isShow = true;
      this.formIndex = item;
    },

    // 日期组件回调
    handelDateClick (obj) {
      if (!_.isNull(obj)) {
        if (_.isObject(obj)) {
          this.isShow = obj.status;
          _.assign(this.carInfo, {
            [this.formIndex]: obj.content
          });
          return;
        }
      }
    },

    // 品牌选择
    selectCart () {
      this.$router.push({
        name: 'home.CarBrandChoice',
        query: Object.assign({}, this.carInfo, {
          car_license_face_all: this.formData.car_license_face,
          car_license_back_all: this.formData.car_license_back,
        })
      });
    },

    // 图片上传组件
    setImage (e, el) {
      if (!_.isEmpty(e)) {
        this.currentFile = el;
        const file = e.target.files[0];
        this.$store.get.dispatch({
          type  : 'cropperData',
          isShow: true,
          save  : 1,
          data: {
            file: file
          }
        });
      }
    },

    // 重置input file值
    fileClose () {
      this.$refs[this.currentFile].value = '';
    },

    //保存
    async save () {
      if (!this.carInfo.car_code) {
        this.$toast('请填写车架号');
        return;
      }
      // if (!this.carInfo.car_drive_number) {
      //   this.$toast('请填写发动机号');
      //   return;
      // }
      if (!this.carInfo.car_reg_date) {
        this.$toast('请填写车辆注册日期');
        return;
      }
      if (!this.carInfo.car_check_date) {
        this.$toast('请填写验证有效期');
        return;
      }
      if (!this.carInfo.brand_id) {
        this.$toast('请选择品牌车系');
        return;
      }
      // if (!this.carInfo.car_license_number) {
      //   this.$toast('请填写行驶证档案编号');
      //   return;
      // }
      // if (!this.carInfo.car_dj_number) {
      //   this.$toast('请填写车辆登记证书号');
      //   return;
      // }
      if (!this.carInfo.car_license_face) {
        this.$toast('请上传行驶证正面照片');
        return;
      }
      if (!this.carInfo.car_license_back) {
        this.$toast('请上传行驶证反面照片');
        return;
      }

      let res = await Models.CarVio.verification({
         car_id: this.carInfo.car_id,
         car_code: this.carInfo.car_code,
         car_reg_date: this.carInfo.car_reg_date,
         car_check_date: this.carInfo.car_check_date,
         new_notice: this.carInfo.new_notice,
         brand_id: this.carInfo.brand_id,
         car_license_face: this.carInfo.car_license_face,
         car_license_back: this.carInfo.car_license_back,
         car_license_number: this.carInfo.car_license_number,
         car_dj_number: this.carInfo.car_dj_number,
       });
       if (res.code === 1) {
          this.$toast('保存成功');

          // 修改车架号
          // await Models.CarVio.updateFurther({ params: { car_drive_number: this.carInfo.car_drive_number } });

          if (this.$route.query.fromRoute === 'deal') {
            setTimeout(() => {
              this.$router.replace({ name: 'home.MyCarInfo', query: { violationId: this.$route.query.violationId } });
            }, 500);
          }
       }
       else {
         this.$toast(res.msg || '保存失败，请稍后重试');
       }
     }
  }
};
