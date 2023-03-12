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
  }

}
</script>

<style scoped>

</style>
