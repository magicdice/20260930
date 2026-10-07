// 宣告用於儲存所有光斑物件的陣列
let spots = [];

// 定義色盤陣列，擷取自參考圖中的多種光斑顏色 (RGB 格式)
const palette = [
  [238, 240, 215], // 柔和淡米黃色
  [205, 227, 206], // 淺粉綠色
  [147, 200, 172], // 中調灰綠色
  [95, 185, 154],  // 鮮明松石綠色
  [74, 163, 142]   // 深翠綠色
];

// 定義初始化設定函式，於網頁載入時僅執行一次
function setup() {
  // 建立符合當前瀏覽器視窗寬度與高度的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 根據當前視窗大小初始化並產生所有光斑資料
  initSpots();
  // 關閉持續重繪迴圈以優化瀏覽器效能
  noLoop();
}

// 定義繪圖函式，負責繪製背景底色與所有光斑
function draw() {
  // 填滿畫布背景底色為淡灰粉暖色調 (RGB: 218, 210, 206)
  background(218, 210, 206);
  // 取消繪製所有幾何圖形的外框線
  noStroke();

  // 逐一取出陣列中記錄的每一個光斑資料進行繪製
  for (let spot of spots) {
    // 依據選定的色盤顏色與各自隨機的半透明度設定填滿色彩 (Alpha: 80 ~ 190)
    fill(spot.color[0], spot.color[1], spot.color[2], spot.alpha);
    // 在指定座標上繪製指定大小的圓形光斑
    circle(spot.x, spot.y, spot.size);
  }
}

// 根據畫面面積動態生成光斑數量的初始化函式
function initSpots() {
  // 清空現有的光斑陣列資料
  spots = [];
  // 依據畫布總像素面積動態計算光斑總數（以每 28000 平方像素約產生 1 個光斑為基準，最少產生 25 個）
  let count = max(25, floor((width * height) / 28000));

  // 依計算出的數量迴圈建立各個光斑的屬性
  for (let i = 0; i < count; i++) {
    // 將隨機生成的光斑物件加入到光斑陣列中
    spots.push({
      // 隨機選取 X 軸座標，允許略微超出左右邊界以營造自然邊緣效果
      x: random(-40, width + 40),
      // 隨機選取 Y 軸座標，允許略微超出上下邊界
      y: random(-40, height + 40),
      // 隨機設定光斑直徑（直徑大小介於 35px 到 220px 之間）
      size: random(35, 220),
      // 從色盤中隨機抽樣選取一種光斑基底顏色
      color: random(palette),
      // 隨機設定半透明 Alpha 值（介於 80 到 190 之間以產生深淺交錯的穿透質感）
      alpha: random(80, 190)
    });
  }
}

// 監聽視窗尺寸改變事件的函式，當瀏覽器縮放時自動觸發
function windowResized() {
  // 將畫布大小重新調整為目前瀏覽器的新尺寸
  resizeCanvas(windowWidth, windowHeight);
  // 依據新視窗的面積重新動態計算並配置光斑
  initSpots();
  // 重新繪製一次畫面以更新呈現
  redraw();
}