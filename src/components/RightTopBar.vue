<template>
  <div>
    <div font-weight="bolder">拉伸牵张幅度/位移速度</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
let isFull = false;
console.log("-------------1.1-------------");

let _rawData = props.data.rightTop;

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
        id: "拉伸牵张幅度",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "" },
              { dimension: "Item", "=": "ItemA" },
            ],
          },
        },
      },
      {
        id: "位移速度",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "" },
              { dimension: "Item", "=": "ItemB" },
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
      data: ["拉伸牵张幅度", "位移速度"],
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
          color:'#E49516',
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
        name: "拉伸牵张幅度",
        datasetId: "拉伸牵张幅度",
        showSymbol: false,
        encode: {
          x: "Time",
          y: "Value",
          itemName: "Time",
          tooltip: ["Value"],
        },
      },
      {
        type: "line",
        lineStyle: {
          width: 3,
          shadowColor: "rgba(0,0,0,0.3)",
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
        name: "位移速度",
        datasetId: "位移速度",
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

// 监听数据的变化，重新渲染图表
watch(
  () => props.data,
  () => {
    renderChart();
  }
);
</script>

<style lang="scss" scoped></style>
