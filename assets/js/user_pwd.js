$(function() {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldPpwd]').val()) {
                // alert(1);
                layer.msg('你输入的新密码与旧密码一样了，请修改！');
            }
        },
        checkpwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                // alert(1);
                layer.msg('你输入的两次新密码不一样，请检查！');
            }
        }
    });

    $('#form_modifypwd').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(response) {
                if (response.status !== 0) {

                    return layer.msg('更新密码失败！');
                }
                layer.msg('更新密码成功！');
                $('#form_modifypwd')[0].reset();
            },


        });
    });

})