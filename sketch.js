// 宣告用於儲存所有光斑物件的陣列
let spots = [];

// 定義初始化設定函式，於網頁載入時僅執行一次
function setup() {
  // 建立全螢幕畫布，尺寸貼齊當前視窗大小
  createCanvas(windowWidth, windowHeight);
  // 初始化並產生所有光斑資料
  initSpots();
  // 由於為靜態光斑構圖，關閉持續重繪以節省瀏覽器效能
  noLoop();
}

// 定義繪圖函式，負責繪製背景與所有光斑
function draw() {
  // 繪製溫暖的灰褐米色背景底色
  background(210, 203, 196);
  // 取消繪製任何形狀的外框線條
  noStroke();

  // 遍歷陣列中儲存的每一個光斑物件
  for (let spot of spots) {
    // 設定填滿顏色為溫暖米白色，並套用各自獨立的半透明度 (Alpha: 40 ~ 180)
    fill(248, 243, 236, spot.alpha);
    // 根據光斑計算出的座標與直徑繪製圓形
    circle(spot.x, spot.y, spot.size);
  }
}

// 根據畫面面積動態生成光斑數量的初始化函式
function initSpots() {
  // 清空既有的光斑陣列資料
  spots = [];
  // 根據當前視窗面積動態計算光斑總數量（基準為每 40000 平方像素約產生 1 個光斑，最少 15 個）
  let count = max(15, floor((width * height) / 40000));

  // 迴圈建立指定數量的光斑參數
  for (let i = 0; i < count; i++) {
    // 將隨機產生的光斑參數物件加入陣列
    spots.push({
      // 在畫布可視範圍與邊界外隨機選取 X 軸座標
      x: random(-20, width + 20),
      // 在畫布可視範圍與邊界外隨機選取 Y 軸座標
      y: random(-20, height + 20),
      // 隨機選取光斑直徑（尺寸介於 40px 至 180px 之間）
      size: random(40, 180),
      // 隨機選取半透明透明度數值（數值介於 40 至 180 之間以產生深淺層次重疊）
      alpha: random(40, 180)
    });
  }
}

// 監聽視窗尺寸改變的函式，當使用者調整瀏覽器視窗時自動觸發
function windowResized() {
  // 重新調整畫布尺寸以符合新的視窗大小
  resizeCanvas(windowWidth, windowHeight);
  // 重新計算並依據新視窗面積生成適當數量的光斑
  initSpots();
  // 觸發重新繪製一次畫面
  redraw();
}