// 定義初始化設定函式，於網頁載入時僅執行一次
function setup() {
  // 建立符合當前視窗寬度與高度的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
}

// 定義持續繪圖迴圈函式，預設每秒執行約 60 次
function draw() {
  // 設定畫布背景顏色為深普魯士藍 (#1D3557)
  background('#1D3557');

  // 設定繪製形狀的框線顏色為亮紅 (#E63946)
  stroke('#E63946');

  // 設定框線粗細為 5 像素
  strokeWeight(5);

  // 設定形狀內部填滿顏色為粉青淡藍 (#A8DADC)
  fill('#A8DADC');

  // 在畫面中心繪製直徑為 300 像素的圓形
  circle(width / 2, height / 2, 300);
}

// 監聽視窗尺寸改變事件的函式，當瀏覽器縮放時自動觸發
function windowResized() {
  // 重新調整畫布尺寸以符合當前視窗的寬度與高度
  resizeCanvas(windowWidth, windowHeight);
}