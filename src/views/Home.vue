<template>
  <div>
    <!--<kita ></kita>-->
    <!--<satono ></satono>-->
    <all></all>
    <audio :src="bgm" loop ref="audio" ></audio>
  </div>
</template>

<script>
import Kita from "@/components/kita";
import Satono from "@/components/satono";
import All from "@/components/all";
import bgm from '@/assets/music/bgm.mp3';
export default {
  name: 'Home',
  components: {Satono, Kita,All},
  data() {
    return {
      timer: null,
      show: 0,
      bgm: bgm
    }
  },
  methods: {
    init() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();

    },
  },
  mounted() {
    this.init()
    let that = this
    window.wallpaperPropertyListener = {
      applyUserProperties: function(properties) {
        console.log(properties);
        if (properties.volume1) {
          let value = properties.volume1.value;
          console.log(value);
          that.$refs.audio.volume = value
          // Do something useful with the value here or assign it to a global variable
        }
      },
    };
  }

}
</script>

<style scoped>

</style>
