<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

}
</script>

<style>
  .el-input__inner {
    border: 1px solid #004cff !important;
  }
  body{
    background-color: #f8f6f9;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .el-menu.el-menu--horizontal{
    border-bottom: none !important;
  }
  /*火狐不支持修改滚动条*/
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  /*::-webkit-scrollbar{
    width: 8px;
    display: block;
    height: 8px;
    background-color: #F5F5F5;
  }
  !*定义滚动条轨道 内阴影+圆角*!
  ::-webkit-scrollbar-track {
    !*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*!
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  !*定义滑块 内阴影+圆角*!
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    !*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*!
    !*background: -webkit-gradient(linear, 40% 0%, 75% 84%, from(#4D9C41), to(#19911D), color-stop(.6,#54DE5D));;*!
    background: #366EFF;
    !*background-color: #555;*!
  }*/
</style>
