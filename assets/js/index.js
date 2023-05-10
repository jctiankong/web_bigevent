$(function () {

    //获取用户的基本信息
    getUserInfo()

    $("#btnLogout").on('click', function () {
        layer.confirm('确定是否退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/阶段四前后端交互/CODE/login.html'
            layer.close(index)
        })
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            //调用渲染用户的头像
            renderAvatar(res.data)
        }
        // complete:function(res){
        //     let josn = res.responseJSON
        //     if(json.status === 1 && json.message==='身份认证失败')
        //     {
        //         localStorage.removeItem('token')
        //         location.href = '/阶段四前后端交互/CODE/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        let first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()

    }
}