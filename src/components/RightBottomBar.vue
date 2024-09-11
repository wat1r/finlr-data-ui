<template>
  <div>
    <div>疲劳程度</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { getDataRightTop } from "@/api/visualization.js";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});



let data = [];
let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
data = props.data;
console.log("init:", data);

console.log("-------------1.4:[pic4/疲劳程度]-------------");

let _rawData = props.data.rightBottom;

const target = ref(null);
console.log("---------------target:" + target);
let mChart = null;
onMounted(() => {
  mChart = echarts.init(target.value);
  if (_rawData != null) {
    renderChart(_rawData);
  }
});

console.log("---------------_rawData:" + target);

const renderChart = () => {
  const option = {
    dataset: [
      {
        id: "dataset_raw",
        source: _rawData,
      },
      {
        id: "疲劳程度",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "" },
              { dimension: "Item", "=": "Fatigue" },
            ],
          },
        },
      },
    ],
    title: {},
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["疲劳程度"],
      textStyle: {
        fontSize: 14,
        color: "#ff6633",
        padding: [0, 0, 0, 5], 
      },
    },
    xAxis: {
      type: "category",
      nameLocation: "middle",
    },
    yAxis: {
      name: "Value",
    },
    series: [
      {
        type: "line",
        lineStyle: {
          width: 3,
          shadowColor: "rgba(0,0,0,0.3)",
          color:'#E44C4C',
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
        name: "疲劳程度",
        datasetId: "疲劳程度",
        showSymbol: false,
        encode: {
          x: "Time",
          y: "Value",
          itemName: "Time",
          tooltip: ["Value"],
        },
      },
    ],
  };

  mChart.setOption(option);
};


// setInterval(function () {
//   rightTopData();

//   mChart.setOption({
//     series: [
//       {
//         data: data,
//       },
//     ],
//   });
// }, 5000);

// 监听数据的变化，重新渲染图表
watch(
  () => data,
  () => {
    renderChart();
  }
);
</script>
