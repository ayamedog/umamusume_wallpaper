let baseUrl = 'https://xinqushi.xwgou.net/api'
let  show = 1
import { MessageBox } from 'element-ui';
function request(method,url,data,text) {
  let token = localStorage.getItem('xwg')?localStorage.getItem('xwg'):'';//获取token
  return new Promise((resolve,reject)=>{
    let loading = ''
    if(text) {
      loading = this.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      });
    }
    //1创建异步对象
    const xhr = new XMLHttpRequest();
    //4创建监听 接收响应
    xhr.onreadystatechange=()=>{
      if(xhr.readyState==4 && xhr.status==200 || xhr.status==401){
        if(text) loading.close();
        if(xhr.status===401) {
          if(show===1) {
            MessageBox.alert('请登录后操作',{type: 'warning'})
              .then(t => {
                show = 1
                this.$router.push('/login?type=0')
              }).catch(t => {
              show = 1
              this.$router.push('/login?type=0')
            })
          }
          show++

        } else {
          let result = JSON.parse(xhr.responseText);
          resolve(result);//返回出去
        }
      }
    };
    //2创建请求 打开连接
    url = baseUrl + url
    xhr.open(method,url,true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.setRequestHeader("token",token);
    let paramsData = ''
    if(method=='POST') {
      paramsData = '';//创建参数
      if(Object.keys(data) && Object.keys(data).length>0) {
        Object.keys(data).forEach(function(key) {//循环参数
          paramsData += key + '=' + encodeURIComponent(data[key]) + '&'
        })
        paramsData = paramsData.substring(0, paramsData.length - 1);//去除最后一位
      }
    }
    //3发送请求
    xhr.send(paramsData);
  })
}
export default request