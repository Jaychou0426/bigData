$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    let baseURL = 'http://www.liulongbin.top:3007';
    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                alert('输入的两次密码不一致哦！');
            }
        }
    });

    $('#form_reg').on('submit', function(param) {
        param.preventDefault();
        let name = $('.reg-box [name=username]').val();
        let pwd = $('.reg-box [name=password]').val();
        $.ajax({
            type: "POST",
            url: baseURL + "/api/reguser",
            data: {
                username: name,
                password: pwd
            },
            success: function(response) {
                if (response.status === 0) {
                    return layer.open({
                        title: '这是一个提示',
                        content: '注册成功啦！'
                    });

                } else if (response.status === 1) {
                    return layer.open({
                        title: '这是一个提示',
                        content: `注册失败了哎!因为 ${response.message}`
                    });
                    //alert('注册失败,' + response.message);
                }
            }
        });
    });

    // $('#form_login').on('submit', function(param) {
    //     param.preventDefault();
    //     let name = $('#form_login [name=username]').val();
    //     let pwd = $('#form_login [name=password]').val();
    //     $.ajax({
    //         type: "POST",
    //         url: "http://www.liulongbin.top:3007/api/login",
    //         data: {
    //             username: name,
    //             password: pwd
    //         },
    //         success: function(response) {
    //             if (response.status === 0) {
    //                 return layer.open({
    //                     title: '这是一个提示',
    //                     content: '登陆成功啦！'
    //                 });
    //             } else if (response.status === 1) {
    //                 return layer.open({
    //                     title: '这是一个提示',
    //                     content: `${response.message}因为你丑！！`
    //                 });

    //             }
    //         }
    //     });
    // })

    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.post(baseURL + '/api/login', {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }, function(response) {
            if (response.status === 0) {
                layer.open({
                    title: '这是一个提示',
                    content: '登陆成功啦！'
                });
                localStorage.setItem('token', response.token);
                location.href = '/index.html';
            } else if (response.status === 1) {
                layer.open({
                    title: '这是一个提示',
                    content: `${response.message}因为你丑！！`
                });

            }

        });
    })

    // $('#form_login').submit(function(e) {
    //     e.preventDefault();

    //     $.ajax({
    //         url: 'http://www.liulongbin.top:3007/api/login',
    //         method: 'POST',
    //         data: $(this).serialize(),
    //         success: function(response) {
    //             if (response.status === 0) {
    //                 layer.open({
    //                     title: '这是一个提示',
    //                     content: '登陆成功啦！'
    //                 });
    //                 localStorage.setItem('token', response.token);
    //                 location.href = '/index.html'

    //             } else if (response.status === 1) {
    //                 layer.open({
    //                     title: '这是一个提示',
    //                     content: `${response.message}因为你丑！！`
    //                 });

    //             }

    //         }
    //     })


    // });

    // $.post('http://www.liulongbin.top:3007/api/login', {
    //     username: $('#form_login [name=username]').val(),
    //     password: $('#form_login [name=password]').val()
    // }, function(response) {
    //     if (response.status === 0) {
    //         return layer.open({
    //             title: '这是一个提示',
    //             content: '登陆成功啦！'
    //         });
    //     } else if (response.status === 1) {
    //         return layer.open({
    //             title: '这是一个提示',
    //             content: `${response.message}因为你丑！！`
    //         });

    //     }

    // });


})