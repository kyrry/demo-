import './index.scss';
import _            from 'lodash';
import Header       from '~common/components/header';
import Dates        from '~common/components/dates';
import Models       from '~common/models';
import Cropper      from '~common/components/cropper';


export default {
  name: 'AddLicence',
  data () {
    return {
      loading: false,
			isShow: false,
      carId: '',
      carCode: '',
      userInfo: {
        name: '',
        number: '',
        seriaNumber: '',
        phone: '',
        formIndex: '',
        qrcodeNumber: '',
        driverUrl: '',
        driverSecondUrl: '',
      },
      formData: {
        date1: '',
        driverUrl: '',
        driverSecondUrl: '',
      },
      isApply: false,
      currentFile: '',
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
      for (let i in this.userInfo) {
        if (!this.userInfo[i]) {
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

  mounted () {
    this.carId = this.$route.params.id;
    this.carCode = this.$route.params.code;
    this.getCarInfo();
  },

  watch: {
    uploadImage (val) {
      if (!_.isEmpty(val.preview) && !_.isEmpty(val.url)) {
        this.formData = _.assign({}, this.formData, {
          [this.currentFile]: val.preview
        });

        this.userInfo = _.assign({}, this.userInfo, {
          [this.currentFile]: val.url
        });
        this.$toast('上传成功');
      }
    },
  },

  methods: {
    //获取补充资料
    async getCarInfo () {
      let res = await Models.CarVio.illegalIncome({
        params: { car_id: this.carId }
      });
      if (res.code === 1) {
        let data = res.data;
        this.userInfo.seriaNumber = data.archive_number;
        this.userInfo.number = data.driver_number;
        this.userInfo.name = data.name;
        this.userInfo.formIndex = data.first_license_date;
        this.userInfo.phone = data.phone;
        this.userInfo.qrcodeNumber = data.qrcode_number;
        // this.userInfo.driverUrl = 'admin' + data.driver_url.split('admin')[1];
        this.userInfo.driverUrl = data.driver_url;
        // this.userInfo.driverSecondUrl = 'admin' + data.driver_second_url.split('admin')[1];
        this.userInfo.driverSecondUrl = data.driver_second_url;
        if (data.driver_url) {
          this.formData.driverUrl = 'http://res.kamengjinfu.com/admin/' + data.driver_url.split('admin')[1];
        }
        if (data.driver_second_url) {
          this.formData.driverSecondUrl = 'http://res.kamengjinfu.com/admin/' + data.driver_second_url.split('admin')[1];
        }
      }
    },

    // 日期选择
    handleDateChange () {
      this.isShow     = true;
    },

    // 日期组件回调
    handelDateClick (obj) {
      if (!_.isNull(obj)) {
        if (_.isObject(obj)) {
          this.isShow = obj.status;
          _.assign(this.formData, {
            [this.userInfo.formIndex]: obj.content
          });
          this.userInfo.formIndex = obj.content;
          return;
        }
      }
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
      if (!this.userInfo.name) {
        this.$toast('请填写车主姓名');
        return;
      }
      if (!this.userInfo.number) {
        this.$toast('请填写驾驶证号');
        return;
      }
      if (!this.userInfo.seriaNumber) {
        this.$toast('请填写档案编号');
        return;
      }
      if (!this.userInfo.formIndex) {
        this.$toast('请填写初次领证日期');
        return;
      }
      if (!this.userInfo.phone) {
        this.$toast('请填写驾驶证绑定手机号');
        return;
      }
      if (!this.userInfo.qrcodeNumber) {
        this.$toast('请填写条形码编号');
        return;
      }
      if (!this.userInfo.driverUrl) {
        this.$toast('请上传驾驶证正面照');
        return;
      }
      if (!this.userInfo.driverSecondUrl) {
        this.$toast('请上传驾驶证反面照');
        return;
      }
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.userInfo.number)) {
        this.$toast('驾驶证号完整 15位或者18位');
        return;
      }
      if (!/^\d{12}$/.test(this.userInfo.seriaNumber)) {
        this.$toast('档案编号完整 12位');
        return;
      }
      let res = await Models.CarVio.saveLicense({
        name: this.userInfo.name,
        car_number: this.userInfo.number,
        archive_number: this.userInfo.seriaNumber,
        first_license_date: this.userInfo.formIndex,
        phone: this.userInfo.phone,
        qrcode_number: this.userInfo.qrcodeNumber,
        driver_url: this.userInfo.driverUrl,
        driver_second_url: this.userInfo.driverSecondUrl
      });
      if (res.code === 1) {
        this.$toast('保存成功');
        if (this.$route.query.fromRoute === 'deal') {
          setTimeout(() => {
            this.$router.replace({ name: 'home.MyCarInfo', query: { violationId: this.$route.query.violationId } });
          }, 500);
        }
      }
    }
  }
};
