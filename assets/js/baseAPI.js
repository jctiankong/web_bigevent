//每次调用 get post ajax的时候会下先调用这个函数
$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        options.complete = function (res) {
            let josn = res.responseJSON
            if (json.status === 1 && json.message === '身份认证失败') {
                localStorage.removeItem('token')
                location.href = '/阶段四前后端交互/CODE/login.html'
            }
        }
    }
})

//http://api-breakingnews-web.itheima.net/my/userinfo