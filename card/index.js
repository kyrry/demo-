import './index.scss';

import _          from 'lodash';
import Header     from '~common/components/header';
import Models     from '~common/models';
import NotifyPopup  from '~common/components/notify_popup';

export default {
  name: 'userCard',
  data () {
    return {
      /*
       * @param type 1000(待确定)|1001（待审核）|1002（审核通过）|1003（审核失败）
       * @param user_id 工号，可选
       * @param sn 订单号，可选
       */
      status        : 1000,
      formTemp      : {
        list        : [],
      },
      keyword       : '',
      timer         : '',
      /*
       * 分页
       */
      page          : 1,
      total         : 0,
      per_page      : 0,
      current_page  : 0,
      last_page     : 0,
      isNoticeShow  : false,
    };
  },
  components: {
    'app-header': Header,
    'notify-popup': NotifyPopup
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {
    this.list();
    // this.isNoticeShow = true;
  },
  watch: {
    keyword: {
      deep: true,
      handler () {
        let self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(() => {
          self.list();
        }, 500);
      },
    },
  },
  methods: {

    toggleNotifyFn () {
      this.isNoticeShow = false;
    },

    /*
     * 获取办卡列表
     */
    list () {
      let self = this;
      Models.User
      .cardList({
        params: {
          keyword: self.keyword,
          page   : self.page,
          type   : self.status,
        },
      })
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;

          if (1 < self.page) {
            self.formTemp.list = _.concat(self.formTemp.list, data.data);
          }
          else {
            self.formTemp.list = data.data;
          }

          self.total         = data.total;
          self.per_page      = data.per_page;
          self.current_page  = data.current_page;
          self.last_page     = data.last_page;
        }
      });
    },

    /*
     * 切换办卡状态
     */
    switchState (status) {
      if (status !== this.status) {
        this.status = status;
        this.list();
      }
    },

    refresh (done) {
      let self = this;
      setTimeout(() => {
        self.page = 1;
        this.list();
        done();
      }, 1500);
    },

    infinite (done) {
      if (this.last_page <= this.current_page) {
        setTimeout(() => {
          done(true);
        }, 1500);
        return;
      }

      setTimeout(() => {
        this.page ++;
        this.list();
        done();
      }, 1500);
    },
  },
};
