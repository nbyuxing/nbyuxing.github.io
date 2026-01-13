$(function () {

  /* =========================
     Tab 切换
     ========================= */
  $('.tab-btn').on('click', function () {
    const tab = $(this).data('tab');

    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.tab-content').removeClass('active');
    $('#tab-' + tab).addClass('active');
  });


  /* =========================
     图片 / 参数 点击放大
     ========================= */
  function openPopup(imgSrc) {
    const popupImg = $('#popupImg');
    
    // 动态设置图片源
    popupImg.attr('src', imgSrc);

    // 强制延迟，以确保图片正确显示并居中
    setTimeout(function() {
      $('#imgPopup').fadeIn(200).addClass('show');
      $('body').addClass('no-scroll');
    }, 10);  // 延迟 10ms 确保图片加载

    // 监听图片加载事件，确保居中
    popupImg.on('load', function() {
      // 强制更新样式，确保居中
      $('#imgPopup').addClass('show');
    });
  }

  function closePopup() {
    $('#imgPopup').fadeOut(200).removeClass('show');
    $('body').removeClass('no-scroll');
  }

  // 点击图片
  $('.zoom-img').on('click', function () {
    openPopup($(this).attr('src'));
  });

  // 点击参数按钮
  $('.param-btn').on('click', function () {
    openPopup($(this).data('img'));
  });


  /* =========================
     关闭逻辑（三重保险）
     ========================= */

  // 点关闭按钮
  $('#imgPopup .close').on('click', function (e) {
    e.stopPropagation();
    closePopup();
  });

  // 点黑色遮罩
  $('#imgPopup').on('click', function (e) {
    if (e.target === this) {
      closePopup();
    }
  });

  // ESC 键关闭
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      closePopup();
    }
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
