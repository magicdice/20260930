// 宣告用於儲存所有上浮光斑物件的陣列
let spots = [];

// 定義參考圖片中擷取的調色盤陣列（RGB 格式：灰綠、水綠、亮湖綠、米黃、粉白）
const palette = [
  [95, 173, 148],   // 湖水綠
  [154, 205, 178],  // 柔和淺綠
  [214, 230, 203],  // 淡黃綠
  [238, 235, 206],  // 溫暖米黃
  [247, 245, 238]   // 柔和粉白
];

// 定義初始化設定函式，於網頁載入時僅執行一次
function setup() {
  // 建立全螢幕畫布，尺寸貼齊當前視窗大小
  createCanvas(windowWidth, windowHeight);
  // 取消繪製所有圖形的外框線條
  noStroke();
  // 根據當前畫面面積初始化光斑物件
  initSpots();
}

// 定義持續繪圖迴圈函式，每秒執行約 60 次以呈現動態流暢感
function draw() {
  // 每次重繪前填入參考圖中的柔和暖灰背景色
  background(218, 210, 208);

  // 遍歷所有光斑物件進行更新與繪製
  for (let spot of spots) {
    // 呼叫物件方法更新垂直位置
    spot.update();
    // 呼叫物件方法在畫布上繪製自身
    spot.display();
  }
}

// 根據畫面面積動態生成光斑數量的初始化函式
function initSpots() {
  // 清空既有的光斑陣列資料
  spots = [];
  // 依據畫面面積動態計算數量（每 30000 平方像素生成 1 個，確保各種螢幕尺寸皆有合適密度，最少 20 個）
  let count = max(20, floor((width * height) / 30000));

  // 迴圈建立光斑實體
  for (let i = 0; i < count; i++) {
    // 初始化時讓光斑隨機散佈在全螢幕垂直高度上，避免剛載入時畫面底端過度擁擠
    let randomY = random(-50, height + 100);
    // 將新建立的光斑實體推進陣列
    spots.push(new LightSpot(randomY));
  }
}

// 定義光斑（泡泡）物件類別
class LightSpot {
  // 建構函式，可傳入初始 Y 軸位置（未傳入則預設自底端外側生成）
  constructor(initialY) {
    // 初始化隨機水平座標，預留稍微超出邊界的範圍以增加自然感
    this.x = random(-30, width + 30);
    // 設定垂直座標（有指定則用指定值，否則置於畫布底部下方準備上浮）
    this.y = (initialY !== undefined) ? initialY : height + random(50, 150);
    // 隨機重設光斑屬性（包含直徑、透明度、配色與上浮速度）
    this.resetAttributes();
  }

  // 隨機生成或重設光斑的屬性值
  resetAttributes() {
    // 隨機選取光斑直徑（尺寸介於 40px 至 190px）
    this.size = random(40, 190);
    // 隨機選取透明度（Alpha: 60 至 190，產生重疊深淺層次）
    this.alpha = random(60, 190);
    // 從色盤中隨機挑選一組 RGB 顏色
    this.color = random(palette);
    // 隨機設定上浮速度（大光斑略快或隨機浮動，速度介於 0.4 至 1.8 像素之間）
    this.speed = random(0.4, 1.8);
  }

  // 更新光斑位置與生命週期狀態的方法
  update() {
    // 讓光斑依照設定速度往上移動（Y 座標遞減）
    this.y -= this.speed;

    // 判斷是否已經完全穿出畫面頂端（超出半徑外）
    if (this.y < -this.size) {
      // 重新將位置重置回畫面底部下方
      this.y = height + this.size / 2 + random(10, 80);
      // 重新隨機分派水平 X 軸位置
      this.x = random(-30, width + 30);
      // 重新賦予新的直徑、半透明度、色盤色彩與上升速度
      this.resetAttributes();
    }
  }

  // 繪製光斑自身的方法
  display() {
    // 套用選定的 RGB 色彩與獨立的半透明度數值
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    // 於當前座標位置繪製圓形
    circle(this.x, this.y, this.size);
  }
}

// 監聽視窗尺寸改變的事件函式，當使用者調整瀏覽器視窗時自動觸發
function windowResized() {
  // 重新調整畫布尺寸以符合視窗大小
  resizeCanvas(windowWidth, windowHeight);
  // 重新計算並依據新視窗面積生成適當數量的光斑
  initSpots();
}