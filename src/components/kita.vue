<template>
  <div class="loaded">
    <div class="kita_layer type-kita" id="kita">
      <div class="kv__bg change-anime" :style="{top:top+'px'}">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "kita",
  data() {
    return {
      top: 0,
      list: [
        {url: require('@/assets/image/kita_cell01.png')},
        {url: require('@/assets/image/kita_cell02.png')},
        {url: require('@/assets/image/kita_cell03.png')},
        {url: require('@/assets/image/kita_cell04.png')},
        {url: require('@/assets/image/kita_cell05.png')},
        {url: require('@/assets/image/kita_cell06.png')},
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