<template>
  <div class="loaded">
    <div class="satono_layer  type-satono" id="kita">
      <div class="kv__bg" :style="{top:top+'px'}">
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
                <p v-for="(item,index) in list" :style="{'display': current===index?'block':'none'}"><img :src="item.url"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "satono",
  data() {
    return {
      top: 0,
      list: [
        {url: require('@/assets/image/satono_cell01.png')},
        {url: require('@/assets/image/satono_cell02.png')},
        {url: require('@/assets/image/satono_cell03.png')},
        {url: require('@/assets/image/satono_cell04.png')},
        {url: require('@/assets/image/satono_cell05.png')},
        {url: require('@/assets/image/satono_cell06.png')},
      ],
      current: 0,
      timer: null,
    }
  },
  methods: {
    init() {
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
    this.init()
  }
}
</script>

<style >
.satono_layer{
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