<template>
  <div class="container">
      <div class="container-con" id="transition">

             <div class="row">
                 <!-- v-model 即时 -->
                <h2>v-model.lazy</h2>  
                <!-- v-model.lazy   失去焦点的时候 -->
                <input type="text" v-model.lazy="input_lazy" />
            </div>

            <!-- 开始输入数字后边的字符不会显示，如果一开始输入的是字符后的无论数字还是字符都会出现 -->
            <div class="row">
                <h2>v-model.number</h2>
                <input type="text" v-model.number="input_number" />
                <hr />
           </div>
           
           <!-- 自动过滤掉前后的多个空格，最终属性值是前后没有空字符的字符串 -->
           <div class="row">
                <h2>v-model.trim</h2>
                 <input type="text" v-model.trim="input_trim" />
                <hr />
            </div>


           <!-- 阻止冒泡  --> 
            <div class="row">
                <h2>v-on.stop</h2>
                <div @click="div_click">的功夫功夫
                    <button type="button" @click.stop="stop_click">StopPropagation</button>
                </div>
                <hr />
            </div>


            <div class="row">
                <h2>v-on.prevent</h2>
                <form @submit.prevent="form_submit">
                    <button type="submit">Submit</button>
                </form>
                <hr />
            </div>
          
          <!-- 点击父元素，子元素不受影响 -->
          <div class="row">
            <h2>v-on.self</h2>
            <div @click.self="div_click" style="display:inline-block; width: px; background-color:red;">
                <button type="button" @click="stop_click">Button</button>
            </div>
            <hr />
        </div>
   
        <!-- 事件只触发一次 -->
        <div class="row">
            <h2>v-on.once</h2>
            <button type="button" @click.once="once_click">Button</button>
            <hr />
        </div>

       <!-- 键盘事件 -->
       <div class="row">
            <h2>v-on.once</h2>
            <button type="button" @click.once="once_click">Button</button>
            <hr />
        </div>

      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name:"Mycontainer",
  data(){
      return{
          input_lazy: "",
          input_number: "",
          input_trim: "",
  
      }
  },
  
   computed:{
      ...mapGetters(["this.$store.state.orders"]),
       jifeng(){
          var jifeng=0
          this.$store.state.orders.forEach(list => {
            jifeng += parseInt(list.price)
        });
         return jifeng;
      }
  },

  methods:{
    div_click: function () {
      console.log("div click1111...");
    },
    stop_click: function () {
      console.log("stop_click222...");
    },
     form_submit: function () {
      console.log("form submit!");
    }
  }
}
</script>



