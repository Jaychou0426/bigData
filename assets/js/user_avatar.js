  $(function() {

      var layer = layui.layer;
      // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
          // 1.2 配置选项
      const options = {
          // 纵横比
          aspectRatio: 1,
          // 指定预览区域
          preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)

      $('#btnChooseImage').on('click', function(e) {
          $('#file').click();
      });

      $('#file').on('change', function(e) {
          let filelist = e.target.files
          if (filelist.length === 0) {
              return layer.msg('请选择头像!');
          };
          let file = e.target.files[0];
          let newImgURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', newImgURL).cropper(options); // 重新初始化裁剪区域
      })

      $('#upload').on('click', function() {
          let dataURL = $image.cropper('getCroppedCanvas', {
              width: 100,
              height: 100
          }).toDataURL('image/png');
          $.ajax({
              type: "POST",
              url: "/my/update/avatar",
              data: { avatar: dataURL },
              success: function(response) {
                  if (response.status !== 0) {
                      return layer.msg('头像更新失败啦！');
                  }
                  window.parent.getUserInfo();
              }
          });
      });
  })