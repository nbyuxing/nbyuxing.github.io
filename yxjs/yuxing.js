$(function () {

  /* ===============================
     产品页 Tab 切换
     =============================== */
  $('.tab-btn').click(function () {
    const key = $(this).data('tab');

    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.tab-content').removeClass('active');
    $('#tab-' + key).addClass('active');
  });

  /* ===============================
     图片放大 / 参数弹层
     =============================== */
  $('.zoom-img, .param-btn').click(function () {
    const img = $(this).data('img') || $(this).attr('src');
    $('#popupImg').attr('src', img);
    $('#imgPopup').fadeIn();
  });

  $('.img-popup .close, .img-popup').click(function () {
    $('#imgPopup').fadeOut();
  });

  /* ===============================
     产品展示页 Banner 箭头轮播
     （仅 products 分类页，不含具体型号页）
     =============================== */

  // ✅ 只匹配 /products 且「没有第二层路径」
  // 例如：
  // ✔ /products
  // ✔ /products/
  // ✘ /products/thx-120
  if (!/^\/products\/?$/.test(location.pathname)) return;

  const $banner = $('.page-header, .banner, .index-header').first();
  if (!$banner.length) return;

  // 1️⃣ 替换 Banner 内容（左右箭头）
  $banner.html(`
    <div class="page-banner-slider">
      <div class="banner-track">
        <div class="banner-slide" style="background-image:url(/img/products_banner1.png)"></div>
        <div class="banner-slide" style="background-image:url(/img/products_banner2.png)"></div>
        <div class="banner-slide" style="background-image:url(/img/products_banner3.png)"></div>
      </div>

      <div class="banner-arrow prev">‹</div>
      <div class="banner-arrow next">›</div>
    </div>
  `);

  // 2️⃣ 初始化轮播逻辑
  const $slider = $banner.find('.page-banner-slider');
  const $track = $slider.find('.banner-track');
  const $slides = $slider.find('.banner-slide');
  const total = $slides.length;

  let index = 0;
  let timer = null;

  function update() {
    $track.css('transform', `translateX(-${index * 100}%)`);
  }

  function next() {
    index = (index + 1) % total;
    update();
  }

  function prev() {
    index = (index - 1 + total) % total;
    update();
  }

  // 箭头事件
  $slider.find('.next').on('click', function () {
    next();
    restart();
  });

  $slider.find('.prev').on('click', function () {
    prev();
    restart();
  });

  function start() {
    timer = setInterval(next, 4000); // ⭐ 轮播速度在这里改
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  start();

});
