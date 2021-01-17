

const dataset = [
  { apple: 1, orange: 1, banana: 1},
  { apple: 2, orange: 2, banana: 2},
  { apple: 3, orange: 3, banana: 3},
  { apple: 4, orange: 4, banana: 4},
  { apple: 5, orange: 5, banana: 5},
  { apple: 6, orange: 6, banana: 6},
  { apple: 7, orange: 7, banana: 7},
  { apple: 8, orange: 8, banana: 8},
  { apple: 9, orange: 9, banana: 9}
];

const width  = 400;
const height = 300;
const padding = 30;
const strokeWidth = 2;
const dataValueMax = 30;
const dataValueMin = 0;

// スタックメソッド
const stack = d3
  .stack()
  .keys(["apple", "orange", "banana"])  // キー設定
  .order(d3.stackOrderDescending);  // 降順

// データ積み上げ配列
const series = stack(dataset);
// console.log(series[0]);

// SVGの設定
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// 軸スケールの設定
const xScale = d3
  .scaleBand()
  .rangeRound([padding, width - padding])
  .padding(0.2)
  .domain(d3.range(dataset.length));
const yScale = d3
  .scaleLinear()
  .domain([dataValueMin, dataValueMax])
  .range([height - padding, padding]);

// 3色カラーパレットの設定
const fillColorList = d3.schemeCategory10.map((v) => v + "80");
const strokeColorList = d3.schemeCategory10;
console.log(strokeColorList[1]);
console.log(fillColorList[1]);

// データ種類ごとにグループ作成
const groups = svg
  .selectAll("g")
  .data(series)
  .enter()
  .append("g")
  .style("stroke", (d, i) => strokeColorList[i])
  .style("fill", (d, i) => fillColorList[i])
  .style("stroke-width", strokeWidth);

// それぞれのデータのグラフを作成
groups
  .selectAll("rect")
  .data((d) => d)
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScale(i) + strokeWidth / 2)
  .attr("y", (d) => yScale(d[1]) + strokeWidth) // バーの可変のy座標
  .attr("height", (d) => yScale(d[0]) - yScale(d[1]) - strokeWidth)
  .attr("width", xScale.bandwidth() - strokeWidth);

// x,y軸の描画
svg
  .append("g")
  .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
  .call(d3.axisBottom(xScale));
svg
  .append("g")
  .attr("transform", "translate(" + padding + "," + 0 + ")")
  .call(d3.axisLeft(yScale));
