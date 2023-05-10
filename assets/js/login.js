$(function () {
    $("#link_reg").on('click', () => {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click', () => {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify自定义校验规则
    form.verify(
        {
            pwd: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
            repwd: function (value) {
                let password = $('.reg-box [name=password]').val()
                if (value !== password) {
                    return '两次密码不一致'
                }
            }
        }
    )


    //注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let username = $("#form_reg [name=username]").val()
        let password = $("#form_reg [name=password]").val()
        var data = { username: username, password: password }
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('注册成功,请登录')
                setTimeout(() => {
                    $("#link_login").click()
                }, 1000)

            })
    })

    $("#form_login").on('submit',function(e){
        e.preventDefault()

        $.ajax({
            url:'/api/login',
            method:'POST',
            data: $(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token)

                localStorage.setItem('token',res.token)

                location.href = '/阶段四前后端交互/CODE/index.html'
            }
        })
    })
})
//上传到云端
// git push -u origin login 

//git branch