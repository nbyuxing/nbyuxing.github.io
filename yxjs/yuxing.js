<script>
(function () {
  const poiName = "元明机械";

  document.getElementById("navBtn").onclick = function () {
    const ua = navigator.userAgent.toLowerCase();

    // 百度地图 App（只用名称，避免坐标偏移）
    const appUrl =
      `baidumap://map/direction?destination=${encodeURIComponent(poiName)}&mode=driving`;

    // 百度地图网页版（兜底，不 404）
    const webUrl =
      `https://map.baidu.com/dir/?destination=${encodeURIComponent(poiName)}`;

    if (/iphone|ipad|ipod|android/.test(ua)) {
      // 尝试唤起百度地图 App
      window.location.href = appUrl;

      // App 未安装兜底
      setTimeout(() => {
        window.open(webUrl, "_blank");
      }, 2000);
    } else {
      // PC
      window.open(webUrl, "_blank");
    }
  };
})();
</script>