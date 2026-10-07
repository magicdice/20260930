// 宣告用於儲存所有上浮光斑物件的陣列
let spots = [];

// 定義參考圖片中擷取的鮮明多彩色盤陣列（包含青藍、亮紅、天藍、寶藍、深紫藍、芥黃）
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
  // 建立符合當前瀏覽器視窗大小的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 取消繪製所有圖形的外框線
  noStroke();
  // 依據視窗面積初始化所有光斑實體
  initSpots();
}

// 定義持續繪圖迴圈函式，每秒執行約 60 次以維持平滑流暢的動畫
function draw() {
  // 繪製參考圖片中的淡天藍色背景底色
  background(189, 222, 252);

  // 遍歷所有光斑物件進行垂直位置更新與繪製
  for (let spot of spots) {
    // 呼叫物件內部方法更新 Y 座標位置
    spot.update();
    // 呼叫物件內部方法在畫布上繪製光斑與右上星星
    spot.display();
  }
}

// 根據畫面面積動態生成光斑數量的初始化函式
function initSpots() {
  // 清空現有的光斑陣列資料
  spots = [];
  // 依據畫面總像素動態計算數量（每 45000 平方像素產生 1 個光斑，最少維持 12 個）
  let count = max(12, floor((width * height) / 45000));

  // 迴圈實例化指定數量的光斑物件
  for (let i = 0; i < count; i++) {
    // 初始載入時隨機分布在全螢幕垂直高度上，避免啟動時畫面底部過度擁擠
    let initialY = random(-50, height + 100);
    // 將新建立的光斑實體加入陣列中
    spots.push(new LightSpot(initialY));
  }
}

// 定義光斑物件類別（封裝圓形光斑與右上五角星星）
class LightSpot {
  // 建構函式，可指定初始垂直座標
  constructor(initialY) {
    // 隨機分派水平 X 座標，預留稍微超出兩側邊界的範圍以增加自然延伸感
    this.x = random(-30, width + 30);
    // 設定垂直 Y 座標（若未指定則放於畫布底端外側）
    this.y = (initialY !== undefined) ? initialY : height + random(50, 150);
    // 隨機重設光斑基本屬性（尺寸、透明度、色彩、速度）
    this.resetAttributes();
  }

  // 隨機生成或重置光斑各項屬性值的方法
  resetAttributes() {
    // 隨機決定光斑直徑（尺寸介於 60px 至 220px 之間）
    this.size = random(60, 220);
    // 隨機決定半透明度（Alpha: 140 至 220，兼具色彩飽和度與疊色層次）
    this.alpha = random(140, 220);
    // 從色盤陣列中隨機挑選一組 RGB 色彩
    this.color = random(palette);
    // 隨機決定往上漂浮的移動速度（介於 0.6 至 2.0 像素之間）
    this.speed = random(0.6, 2.0);
  }

  // 更新光斑位置與生命週期的方法
  update() {
    // 讓光斑依照設定速度往上浮動（垂直 Y 座標遞減）
    this.y -= this.speed;

    // 當光斑完全穿出畫面頂端（超出自身直徑距離以上）
    if (this.y < -this.size) {
      // 將垂直位置重新放回畫面底部下方等待上浮
      this.y = height + this.size / 2 + random(10, 80);
      // 重新隨機指派水平 X 座標
      this.x = random(-30, width + 30);
      // 重新賦予新的大小、透明度、隨機色彩與速度
      this.resetAttributes();
    }
  }

  // 繪製光斑與右上五角星的方法
  display() {
    // 設定主要圓形光斑的填滿色彩與透明度
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    // 於當前座標繪製主要圓形光斑
    circle(this.x, this.y, this.size);

    // 依據圓形直徑等比例計算右上星星的外徑尺寸（約為直徑的 14%）
    let starRadius = this.size * 0.14;
    // 計算右上星星的相對水平偏移量（約為半徑的 42%）
    let offsetX = (this.size / 2) * 0.42;
    // 計算右上星星的相對垂直偏移量（往上偏移約為半徑的 42%）
    let offsetY = (this.size / 2) * 0.42;

    // 設定星星顏色為明亮的亮黃色
    fill(255, 230, 0);
    // 呼叫五角星繪製函式，並傳入內外半徑（內徑取外徑的一半）
    this.drawStar(this.x + offsetX, this.y - offsetY, starRadius * 0.5, starRadius, 5);
  }

  // 繪製五角星頂點的自訂方法（傳入中心座標、內徑、外徑與角數）
  drawStar(x, y, radius1, radius2, npoints) {
    // 計算每個頂點的角位移量（兩倍圓周率除以頂點總數）
    let angle = TWO_PI / npoints;
    // 計算內凹點相對於外頂點的半角位移量
    let halfAngle = angle / 2.0;
    // 開始自訂頂點形狀
    beginShape();
    // 迴圈依序計算每個尖端與內凹處的頂點位置
    for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
      // 計算外凸頂點的水平 X 座標
      let sx = x + cos(a) * radius2;
      // 計算外凸頂點的垂直 Y 座標
      let sy = y + sin(a) * radius2;
      // 新增外凸頂點到形狀中
      vertex(sx, sy);
      // 計算內凹頂點的水平 X 座標
      sx = x + cos(a + halfAngle) * radius1;
      // 計算內凹頂點的垂直 Y 座標
      sy = y + sin(a + halfAngle) * radius1;
      // 新增內凹頂點到形狀中
      vertex(sx, sy);
    }
    // 結束形狀定義並封閉路徑進行填色
    endShape(CLOSE);
  }
}

// 監聽視窗尺寸改變的事件函式，當使用者調整瀏覽器視窗時自動觸發
function windowResized() {
  // 重新調整畫布尺寸以貼齊新的視窗大小
  resizeCanvas(windowWidth, windowHeight);
  // 重新計算並依據新視窗面積生成適當數量的光斑實體
  initSpots();
}