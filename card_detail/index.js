import './index.scss';

import _          from 'lodash';
import Header     from '~common/components/header';
import Models     from '~common/models';
import Filter     from '~common/filters';

export default {
  name: 'userCardDetail',
  data () {
    return {
      isStatus:'',
      formTemp: {
        bank: {}
      },
      id: null,
      type: null,
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
    userInfo () {
      return this.$user.get() || _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {
    this.type = _.get(this.$route, 'query.type');
    this.getInfo();

  },
  watch: {
  },
  methods: {

    /*
     * 获取办卡详情
     */
    getInfo () {
      let self  = this;
      let id    = _.get(this.$route, 'params.id');
      Models.User
      .cardInfo({
        params: {
          id: id,
          type: this.type,
        },
      })
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;
          // console.log(data);
          self.formTemp = _.assign({}, self.formTemp, data);
          // console.log(self.formTemp.status_alias);
          self.isStatus = self.formTemp.status;
        }
      });
    },

    handleNotice () {

      if (this.userInfo.id * 1 === this.formTemp.user_id * 1) {
        this.$toast('自己的申请记录，无需提醒');
        return;
      }
      let data = {
        bank_id: this.formTemp.bank_id,
        user_id: this.formTemp.user_id,
      };

      Models.User
      .notice(data)
      .then((res) => {
        this.$toast(res.msg);
      });
    }
  },
  Filter,
};