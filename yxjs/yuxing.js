$(function () {

  // tab 切换
  $('.tab-btn').click(function () {
    const key = $(this).data('tab');

    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.tab-content').removeClass('active');
    $('#tab-' + key).addClass('active');
  });

  // 图片放大
  $('.zoom-img, .param-btn').click(function () {
    const img = $(this).data('img') || $(this).attr('src');
    $('#popupImg').attr('src', img);
    $('#imgPopup').fadeIn();
  });

  $('.img-popup .close, .img-popup').click(function () {
    $('#imgPopup').fadeOut();
  });

});
