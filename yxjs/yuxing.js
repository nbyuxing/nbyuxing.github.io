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
   图片 / 参数 点击放大（稳定版）
   ========================= */
function openPopup(imgSrc) {
  const $popup = $('#imgPopup');
  const $img = $('#popupImg');

  // 先清理旧状态（非常关键）
  $img.off('load');
  $img.attr('src', '');

  // 先显示弹层（flex 居中先建立）
  $popup.addClass('show').fadeIn(150);
  $('body').addClass('no-scroll');

  // 再设置图片
  $img.attr('src', imgSrc);

  // 只监听这一次加载
  $img.one('load', function () {
    // 不做任何位置计算，交给 CSS
  });
}

function closePopup() {
  $('#imgPopup').fadeOut(150, function () {
    $(this).removeClass('show');
  });
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
