$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value)
        {
            if(value.length>6)
            {
                return '昵称必须在1~6个字符之间！'
            }
        }
    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0)
                {
                    return layer.msg('获取用户信息失败')
                }

                console.log(res)
            }
        })
    }

})