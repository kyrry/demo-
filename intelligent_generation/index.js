import './index.scss';
import 'swiper/dist/css/swiper.css';
import _                from 'lodash';
import Models           from '~common/models';
import Swiper           from 'swiper';
import CityList   from '~common/components/city_list';

export default {
  name: 'generation',
  data () {
    return {
      isShow:true,
      address : '',
      formTemp: {
				increaseData:[]
      },
      groupItems:[
        {
          thumbnail: './assets/images/intelligent_generation/generation_04.jpg',
          title: '精养代还系统',
          instruction: '添加信用卡，设置计划代还信用卡',
          isOpen: true,
          key: 'intensive'
        },
        {
          thumbnail: './assets/images/intelligent_generation/generation_08.jpg',
          title: '还款进度查询',
          instruction: '还款进度，还款计划详情',
          isOpen: true,
          key: 'notice'
        },
      ],
      formDada: {
        province      : '',
        city          : '',
        address       : {},
      }
    };
  },
  components: {
    CityList,
  },
  computed: {
    userInfo () {
      let data = _.get(this.$store.get.state, 'App.userInfo') || this.$user.get();
      return data;
    },
    cityShow () {
      return _.get(this.$store.get.state, 'CityList.content.isShow') || false;
    },
    provObj () {
      let data = _.get(this.$store.get.state, 'CityList.content.data.prov') || {};
      this.formData = _.assign({}, this.formData, {
        province: data.region_id,
        city: '',
        district: '',
      });
      return data;
    },
    cityObj () {
      let data = _.get(this.$store.get.state, 'CityList.content.data.city') || {};
      this.formData = _.assign({}, this.formData, {
        city: data.region_id,
        district: '',
      });
      return data;
    },
    address1 () {
      let data = `${_.get(this.provObj, 'region_name') || ''}${_.get(this.cityObj, 'region_name') || ''}${_.get(this.areaObj, 'region_name') || ''}`;
      // if (false === this.isEdit || _.isEmpty(data)) {
      //   data = `${this.userInfo.province_name || ''}${this.userInfo.city_name || ''}${this.userInfo.district_name || ''}`;
      // }

      return data;
    },
    authentication () {
      return _.get(this.$store.get.state, 'Authentication');
    },
	},
	watch: {
    address1 (val, old) {
      if (!_.isEmpty(this.formData.province_name)) {
        this.address = `${this.formData.province_name}${this.formData.city_name}${this.formData.district_name}`;

        if (!_.isEmpty(old)) {
          if (false === this.isEdit) {
            this.address = old;
            this.isEdit = true;
          }
          else {
            this.address = val;
          }
        }
      }
      else {
        this.address = val;
      }
    }
  },
  mounted () {
    this.getPoint();
    this.$nextTick(() => {
      /* eslint-disable */
      let swiper = new Swiper(this.$refs.mySwiper, {
        notNextTick: true,
        autoplay: 2000,
        grabCursor : true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : false,
        observeParents:true,
        loop: true,
        autoplayDisableOnInteraction: false,
      });
      /* eslint-enable */
    });
    this.checkAuthentication();
  },
  beforeRouteLeave (to, from, next) {
    this.$store.get.dispatch({
      type: 'cityListData',
      data: {},
      isShow: false,
    });
    next();
  },
  methods: {
    // 城市切换
    handleCityShowChange () {
      this.$store.get.dispatch({
        type: 'cityListData',
        isShow: true,
      });
    },
    // 精养还贷
    linkToIncreaseList (key) {
      switch (key) {
         /* eslint-disable */
         case 'intensive':
           this.$router.push({
             name: 'home.creditcardManageList',
           });
           break;
         case 'notice':
           this.$router.push({
             name: 'home.creditcardManageList',
           });
           break;
         default:
           // this.goMyCarPage();
       }
       /* eslint-enable */
    },
    //根据IP定位
    async getPoint () {
      let data = await Models.Home
      .localCity()
      .then(res => res);
      if (1 === data.code) {
       this.cityName = data.data.city;
      }
    },
    // 检测是否已经实名验证
    checkAuthentication () {
      let auditing = this.authentication.authentication.audit;
      if (!auditing) {
        Models.Intelligent
          .userCheck()
          .then((res) => {
            if (0 === res.code) {
              this.handleMaskText();
            }
            else {
              this.$toast(res.msg);
            }
          });
      }
      else {
        this.pendingTips();
      }
    },
    // 未实名验证弹窗
    handleMaskText () {
      let self = this;
      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '请先进行实名认证',
        lists : [
          {
            msg: '取消'
          },
          {
            msg: '确认',
            class: 'ok',
            func () {
              self.$router.push({
                name: 'home.generationAuthFlow'
              });
            }
          },
        ]
      });
    },

    pendingTips () {
      let self = this;
      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '实名认证审核中',
        lists : [
          {
            msg: '确认',
            class: 'ok',
          },
        ]
      });
    }
  },
};
