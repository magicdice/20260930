// 宣告儲存所有光斑物件的陣列
let spots = [];

// 定義參考圖片中擷取的鮮明色盤（包含青藍、亮紅、亮天藍、寶藍、深紫、芥黃）
const palette = [
  [61, 218, 245],   // 亮青藍
  [224, 86, 96],    // 珊瑚亮紅
  [26, 126, 237],   // 鮮明寶藍
  [95, 34, 219],    // 深紫藍
  [224, 203, 102],  // 芥黃色
  [58, 175, 230]    // 澄澈天藍
];

// 定義初始化設定函式，於網頁載入時僅執行一次
function setup() {
  // 建立全螢幕畫布，尺寸貼齊當前視窗大小
  createCanvas(windowWidth, windowHeight);
  // 取消繪製所有圖形的外框線
  noStroke();
  // 依據當前畫面大小計算並建立光斑物件
  initSpots();
}

// 定義持續繪圖迴圈函式，每秒執行約 60 次以維持平滑動態
function draw() {
  // 繪製參考圖片中的淡天藍色背景底色
  background(189, 222, 252);

  // 遍歷所有光斑物件進行位置更新與繪製
  for (let spot of spots) {
    // 呼叫物件更新垂直位置的方法
    spot.update();
    // 呼叫物件於畫布上繪製自身的方法
    spot.display();
  }
}

// 根據畫面面積動態生成光斑數量的初始化函式
function initSpots() {
  // 清空既有的光斑陣列資料
  spots = [];
  // 依據視窗面積計算光斑數量（每 45000 平方像素約產生 1 個光斑，最少維持 12 個）
  let count = max(12, floor((width * height) / 45000));

  // 迴圈建立光斑物件
  for (let i = 0; i < count; i++) {
    // 初始載入時隨機分布在畫布垂直範圍內，避免剛啟動時底部過度扎堆
    let initialY = random(-50, height + 100);
    // 將新建立的光斑實體推進陣列中
    spots.push(new LightSpot(initialY));
  }
}

// 定義光斑物件類別（封裝圓形光斑與右上小方塊高光）
class LightSpot {
  // 建構函式，可指定初始垂直座標
  constructor(initialY) {
    // 隨機指定水平座標，略微超出邊界以增加畫面延伸的自然感
    this.x = random(-30, width + 30);
    // 設定垂直座標（未指定則預設置於畫面底端外側）
    this.y = (initialY !== undefined) ? initialY : height + random(50, 150);
    // 初始化隨機屬性（尺寸、透明度、配色、速度）
    this.resetAttributes();
  }

  // 隨機重設光斑屬性值的方法
  resetAttributes() {
    // 隨機決定光斑直徑（尺寸介於 60px 至 220px 之間）
    this.size = random(60, 220);
    // 隨機決定光斑半透明度（Alpha: 140 至 220，保有鮮明飽和感與重疊層次）
    this.alpha = random(140, 220);
    // 從色盤中隨機挑選一組 RGB 色彩
    this.color = random(palette);
    // 隨機決定向上移動的速度（介於 0.6 至 2.0 像素之間）
    this.speed = random(0.6, 2.0);
  }

  // 更新光斑位置與生命週期的方法
  update() {
    // 依照速度向上浮動（垂直 Y 座標遞減）
    this.y -= this.speed;

    // 當光斑完全超出畫面頂端（超出自身直徑距離）
    if (this.y < -this.size) {
      // 將垂直位置重新放回畫面底部下方
      this.y = height + this.size / 2 + random(10, 80);
      // 重新隨機分派水平 X 座標
      this.x = random(-30, width + 30);
      // 重新賦予新的大小、透明度、顏色與速度
      this.resetAttributes();
    }
  }

  // 繪製光斑與右上高光正方形的方法
  display() {
    // 設定主要圓形光斑的填滿色彩與透明度
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    // 在當前座標繪製主要圓形
    circle(this.x, this.y, this.size);

    // 依據圓形直徑等比例計算右上小正方形的邊長（約為直徑的 16%）
    let sqSize = this.size * 0.16;
    // 計算右上小正方形的相對水平偏移量（約為半徑的 42%）
    let offsetX = (this.size / 2) * 0.42;
    // 計算右上小正方形的相對垂直偏移量（往上偏移約為半徑的 42%）
    let offsetY = (this.size / 2) * 0.42;

    // 設定高光正方形為半透明白色
    fill(255, 255, 255, 200);
    // 設定矩形繪製模式為中心對齊
    rectMode(CENTER);
    // 在光斑右上角指定偏移位置繪製小正方形高光
    rect(this.x + offsetX, this.y - offsetY, sqSize, sqSize);
  }
}

// 監聽視窗尺寸改變的事件函式，當使用者調整瀏覽器視窗時自動觸發
function windowResized() {
  // 重新調整畫布尺寸以貼齊新的視窗大小
  resizeCanvas(windowWidth, windowHeight);
  // 重新計算並依據新視窗面積生成適當數量的光斑
  initSpots();
}