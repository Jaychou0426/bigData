$(function() {

    $('.layui-nav-tree').children().each(function(index) {
        //console.log($('.layui-nav-tree').children());
        $(this).click(function() {
            $(this).addClass('layui-nav-itemed').siblings().removeClass('layui-nav-itemed');
        });

    });
    getUserInfo();

})

let form = layui.form;
let layer = layui.layer;
// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function(response) {
            if (response.status === 0 && response.data.user_pic !== null) {
                $('.text-avatar').hide();
                $('#welcome')[0].innerText = '欢迎 ' + response.data.username;
                $('.layui-nav-img').attr('src', response.data.user_pic).show();
            } else if (response.status === 0 && response.data.user_pic === null) {
                $('.text-avatar').show();
                $('.layui-nav-img').hide();
                $('#welcome')[0].innerText = '欢迎 ' + response.data.username;
                renderAvatar(response.data);

            }
            // else {
            //     alert("登陆状态失效啦！请重新登陆！");
            //     location.href = '/login.html';

            // }
        },


    });
}


function renderAvatar(data) {
    let str = data.nickname.substr(0, 1).toUpperCase() || data.username.substr(0, 1).toUpperCase();
    $('.text-avatar').each(function() {
        this.innerText = str;
    });
};


$('#user-exit').click(function() {
    layer.confirm('是否退出?', function(index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });
})