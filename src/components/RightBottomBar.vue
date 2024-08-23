<template>
  <div>
    <div>拉伸牵张幅度/位移速度</div>
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
        id: "拉伸牵张幅度数据展示",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "2024-08-23" },
              { dimension: "Item", "=": "拉伸牵张幅度" },
            ],
          },
        },
      },
      {
        id: "位移速度数据展示",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "2024-08-23" },
              { dimension: "Item", "=": "位移速度" },
            ],
          },
        },
      },
    ],
    title: {
      
    },
    tooltip: {
      trigger: "axis",
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
        datasetId: "拉伸牵张幅度数据展示",
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
        datasetId: "位移速度数据展示",
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
