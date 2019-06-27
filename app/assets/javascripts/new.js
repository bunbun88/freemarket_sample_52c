$(function() {
  $('input[type=file]').after('<span></span>');

  // アップロードするファイルを選択
  $('input[type=file]').change(function() {
    var file = $(this).prop('files')[0];

    // 画像以外は処理を停止
    if (! file.type.match('image.*')) {
      // クリア
      $(this).val('');
      $('').html('');
      return;
    }

    // 新幅・高さ
    var new_w = 200;
    var new_h = 160;    

    // 画像表示
    var reader = new FileReader();
    reader.onload = function() {
      var img_src = $('<img>').attr('src', reader.result);

      var org_img = new Image();
      org_img.src = reader.result;
      org_img.onload = function() {
        // 元幅・高さ
        var org_w = this.width;
        var org_h = this.height;
        // 幅 ＜ 規定幅 && 高さ ＜ 規定高さ
        if (org_w < new_w && org_h < new_h) {
          // 幅・高さは変更しない
          new_w = org_w;
          new_h = org_h;
        } else {
          // 幅 ＞ 規定幅 || 高さ ＞ 規定高さ
          if (org_w > org_h) {
            // 幅 ＞ 高さ
            var percent_w = new_w / org_w;
            // 幅を規定幅、高さを計算
            new_h = Math.ceil(org_h * percent_w);
          } else if (org_w < org_h) {
            // 幅 ＜高さ
            var percent_h = new_h / org_h;
            // 高さを規定幅、幅を計算
            new_w = Math.ceil(org_w * percent_h);
          }
        }

        // リサイズ画像
        $('.sell--upload--drop--box2').html($('<canvas>').attr({
          'id': 'canvas',
          'width': new_w,
          'height': new_h
        }));
        var ctx = $('#canvas')[0].getContext('2d');
        var resize_img = new Image(); 
        resize_img.src = reader.result;
        ctx.drawImage(resize_img, 0, 0, new_w, new_h);
      };
    }
    reader.readAsDataURL(file);
  });
});
