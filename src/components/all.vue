<template>
  <div class="loaded">
    <div class="kita_layer " id="kita" :class="[
        {'type-satono': show==1},
        {'type-kita': show==0},
    ]">
      <div class="kv__bg change-anime" :class="[{'display-none': none==1}]" :style="{top:top+'px'}">
        <!--北黑-->
        <div class="kita">
          <div class="kv__layer">
            <div class="kv__layer-4"><img src="@/assets/image/kita_layer_4.png">
            </div>
            <div class="kv__layer-3"><img src="@/assets/image/kita_layer_3.png">
            </div>
            <div class="kv__layer-2"><img src="@/assets/image/kita_layer_2.png">
            </div>
            <div class="kv__layer-1">
              <img src="@/assets/image/kita_layer_1.png">
              <div class="kv__chara">
                <p v-for="(item,index) in list" :style="{'display': current===index?'block':'none'}"><img :src="item.url"></p>
              </div>
            </div>
          </div>
        </div>
        <!--里见-->
        <div class="satono">
          <div class="kv__layer">
            <div class="kv__layer-4"><img src="@/assets/image/satono_layer_4.png">
            </div>
            <div class="kv__layer-3"><img src="@/assets/image/satono_layer_3.png">
            </div>
            <div class="kv__layer-2"><img src="@/assets/image/satono_layer_2.png">
            </div>
            <div class="kv__layer-1">
              <img src="@/assets/image/satono_layer_1.png">
              <div class="kv__chara">
                <p v-for="(item,index) in list2" :style="{'display': current===index?'block':'none'}"><img :src="item.url"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kv__white"></div>
      <div class="kv__text">
        <div class="kita">
          <img src="@/assets/image/kita_catch.png" class="catch">
          <img src="@/assets/image/logo.png" class="logo">
        </div>
        <div class="satono">
          <img src="@/assets/image/satono_catch.png" class="catch">
          <img src="@/assets/image/logo.png" class="logo">
        </div>
      </div>
      <div class="kv__change-btn">
        <a href="#" class="js-change-btn kita" data-chara="0" @click="changeImg(1)">
          <img src="@/assets/image/btn_change_02_hover.png" class="hover">

          <img src="@/assets/image/btn_change_02.png">
        </a>
        <a href="#" class="js-change-btn satono" data-chara="1" @click="changeImg(0)">
          <img src="@/assets/image/btn_change_01_hover.png" class="hover">
          <img src="@/assets/image/btn_change_01.png">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "all",
  data() {
    return {
      show: 0,
      top: 0,
      list: [
        {url: require('@/assets/image/kita_cell01.png')},
        {url: require('@/assets/image/kita_cell02.png')},
        {url: require('@/assets/image/kita_cell03.png')},
        {url: require('@/assets/image/kita_cell04.png')},
        {url: require('@/assets/image/kita_cell05.png')},
        {url: require('@/assets/image/kita_cell06.png')},
      ],
      list2: [
        {url: require('@/assets/image/satono_cell01.png')},
        {url: require('@/assets/image/satono_cell02.png')},
        {url: require('@/assets/image/satono_cell03.png')},
        {url: require('@/assets/image/satono_cell04.png')},
        {url: require('@/assets/image/satono_cell05.png')},
        {url: require('@/assets/image/satono_cell06.png')},
      ],
      current: 0,
      timer: null,
      change: null,
      change2: null,
      none: 1
    }
  },
  methods: {
    changeImg(show) {
      clearInterval(this.change)
      clearInterval(this.change2)
      this.change = null
      this.change2 = null
      this.show = show
      this.none =0
      this.change2 = setTimeout(e => {
        this.none = 1
      },1500)
      this.init()
    },
    init() {
      this.change = setInterval(() => {
        this.show = this.show==0?1:0
        this.none =0
        this.change2 = setTimeout(e => {
          this.none = 1
        },1500)
      },10000)
    },
    initFps() {
      this.timer = setInterval(() => {
        if(this.current===this.list.length-1) {
          this.current = 0
        }else {
          this.current++
        }
      },160)
    }
  },
  mounted() {
    this.initFps()
    setTimeout(e => {
      this.init()
    },2500)
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style >
.kita_layer{
  overflow: hidden;
  position: absolute;
  /*top: 0;*/

  left: 0;
  /*width: 1920px;*/
  /*height: 1080px;*/
  width: 100%;
  height: 100%;
}
.kv__bg{
  position: relative;
}

</style>