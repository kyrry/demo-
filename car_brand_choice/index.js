
import './index.scss';
import Footer       from '~common/components/footer';
import Header       from '~common/components/header';
import Models         from '~common/models';
export default {
  name: 'CarBrandChoice',
  data () {
    return {
      loading: false,
      active: false,
      carList         : [],
      rankList        : [],
      workList        : [],
      formData: {
        goodsId       : undefined,
        bank_id       : '',
      },
    };
  },
  components: {
    'app-header' : Header,
    'app-footer' : Footer,
  },
  computed: {

  },
  mounted () {
    this.bank_id = this.$route.query.bankId;
    this.getGoods();
  },
  watch: {

  },
  methods: {
  /* eslint-disable */
    scrollToByTag (name) {
      this.$nextTick ( () =>{
        let el = document.getElementById(name);
        console.log (name);
        if (el) {
          setTimeout( () => {
            let posy = this.getElementViewTop(el);

            this.$refs.my_scroller.scrollTo(0, posy, false)
          },500)
        }
      })
    },

    getElementViewTop (element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      let elementScrollTop = 0;
      let headheight = document.querySelector( '.header' ).clientHeight;
      let tagheight = document.querySelector( '.tag' ).clientHeight;
　　　while (  current !== null) {
  　　　actualTop += current.offsetTop;
  　　　current = current.offsetParent;
　　　}
　　　if (document.compatMode === 'BackCompat') {
        elementScrollTop = document.body.scrollTop;
　　　}
      else {
        elementScrollTop = document.documentElement.scrollTop;
　　　}
　　　return actualTop - elementScrollTop - headheight;
　　},
    /* eslint-enable */
    // 获取数据
    getGoods () {
      let self = this;
      Models.Goods
      .plateList()
      .then((res) => {
          // console.log(res);
          self.carList = res.data;
          for (let i in self.carList) {
            self.rankList.push(self.carList[i]);
            self.workList.push(i);
          }
      });
    },

    // 确认弹窗
    confirm (item) {
      /* eslint-disable */
      this.formData.goodsId = item.id;
      this.cartName = item.name;
      // console.log(item.id,item.name,item.parentid);
      let self = this;
      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : self.cartName,
        msg   : '',
        html  : '',
        lists : [
          {
            msg: '取消'
          },
          {
            msg: '确定',
            class: 'ok',
            func () {
              self.$router.replace({
                name: 'home.CarAccreditation',
                query: Object.assign({}, self.$route.query , { brand_id: item.id })
              });

            }
          },
        ]
      });
    },
     /* eslint-enable */
    refresh (done) {
      setTimeout(() => {
        done();
      }, 1500);
    },
    infinite (done) {
      if ( 30 <= this.bottom) {
        setTimeout(() => {
          done(true);
        }, 1500);
        return;
      }
      setTimeout(() => {
        this.bottom = this.bottom + 10;
        done();
      }, 1500);
    },
  },
};
