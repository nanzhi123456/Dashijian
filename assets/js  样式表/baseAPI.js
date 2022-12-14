// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  // 判断是否有'/my/'这个字符串,没有就返回-1
  if (options.url.indexOf('/my/') !== -1) {
    // .统一为有权限的接口 设置headers请求头
    options.headers = {
      // 这是是从本地存储里面拿值
      Authorization: localStorage.getItem('token') || ''
    }
  }
  //全局统一挂载complete的函数
  options.complete = function (res) {
    if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
      localStorage.removeItem('token')
      location.href = './南栀.html'
    }
  }
})
