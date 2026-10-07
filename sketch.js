function setup() { // p5.js 初始化函式，程式開始時只執行一次
createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布，寬度為視窗寬度、高度為視窗高度
}
 
function draw() { // p5.js 繪圖迴圈，每秒約執行 60 次
background('#1D3557'); // 設定背景色為深藍色，清除前一幀畫面
 
stroke('#E63946'); // 設定圓形外框顏色為紅色
strokeWeight(5); // 設定外框粗細為 5 像素
fill('#A8DADC'); // 設定圓形填滿顏色為淺藍綠色
 
ellipse(width / 2, height / 2, 300, 300); // 在畫布正中央繪製直徑 300px 的圓形
}
 
function windowResized() { // 當瀏覽器視窗大小改變時自動觸發
resizeCanvas(windowWidth, windowHeight); // 依照新的視窗尺寸重新調整畫布大小
}