$(function() {
    let form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '名称太长啦，不许超过6字符！'
            }
        }
    });

    initUserInfo();


    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })


    $('#form_modify').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                window.parent.getUserInfo();
            },

        });
    });


    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(response) {
                if (response.status === 0) {
                    form.val('formUserInfo', response.data)
                        // $('[name=username]').val(response.data.username);
                        // $('[name=nickname]').val(response.data.nickname);
                        // $('[name=email]').val(response.data.email);
                        //console.log(response.data);
                }
            },

        });
    };


})