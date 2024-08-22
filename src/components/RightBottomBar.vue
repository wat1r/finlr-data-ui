<template>
  <div>
    <div>【测试图表】</div>
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
        id: "dataset_since_1950_of_germany",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Year", gte: 1950 },
              { dimension: "Country", "=": "Germany" },
            ],
          },
        },
      },
      {
        id: "dataset_since_1950_of_france",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Year", gte: 1950 },
              { dimension: "Country", "=": "France" },
            ],
          },
        },
      },
    ],
    title: {
      text: "Income of Germany and France since 1950",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      nameLocation: "middle",
    },
    yAxis: {
      name: "Income",
    },
    series: [
      {
        type: "line",
        datasetId: "dataset_since_1950_of_germany",
        showSymbol: false,
        encode: {
          x: "Year",
          y: "Income",
          itemName: "Year",
          tooltip: ["Income"],
        },
      },
      {
        type: "line",
        datasetId: "dataset_since_1950_of_france",
        showSymbol: false,
        encode: {
          x: "Year",
          y: "Income",
          itemName: "Year",
          tooltip: ["Income"],
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
