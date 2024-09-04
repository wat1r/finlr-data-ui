<template>
  <div>
    <div>欧拉角度</div>
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

let _rawData = props.data.leftTop;

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
        id: "EulerX",
        title: "EulerX",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "" },
              { dimension: "Item", "=": "EulerX" },
            ],
          },
        },
      },
      {
        id: "EulerY",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "" },
              { dimension: "Item", "=": "EulerY" },
            ],
          },
        },
      },
      {
        id: "EulerZ",
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Time", "!=": "" },
              { dimension: "Item", "=": "EulerZ" },
            ],
          },
        },
      },
      // {
      //   id: "UnknownA",
      //   fromDatasetId: "dataset_raw",
      //   transform: {
      //     type: "filter",
      //     config: {
      //       and: [
      //         { dimension: "Time", "!=": "" },
      //         { dimension: "Item", "=": "UnknownA" },
      //       ],
      //     },
      //   },
      // },
      // {
      //   id: "UnknownB",
      //   fromDatasetId: "dataset_raw",
      //   transform: {
      //     type: "filter",
      //     config: {
      //       and: [
      //         { dimension: "Time", "!=": "" },
      //         { dimension: "Item", "=": "UnknownB" },
      //       ],
      //     },
      //   },
      // },
    ],
    title: {},
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["EulerX", "EulerY", "EulerZ"],
      // data: ["EulerX", "EulerY", "EulerZ", "UnknownA", "UnknownB"],
      textStyle: {
            color: 'green' 
        }
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
        name: "EulerX",
        datasetId: "EulerX",
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
        name: "EulerY",
        datasetId: "EulerY",
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
        name: "EulerZ",
        datasetId: "EulerZ",
        showSymbol: false,
        encode: {
          x: "Time",
          y: "Value",
          itemName: "Time",
          tooltip: ["Value"],
        },
      },
      // {
      //   type: "line",
      //   name: "UnknownA",
      //   datasetId: "UnknownA",
      //   showSymbol: false,
      //   encode: {
      //     x: "Time",
      //     y: "Value",
      //     itemName: "Time",
      //     tooltip: ["Value"],
      //   },
      // },
      // {
      //   type: "line",
      //   name: "UnknownB",
      //   datasetId: "UnknownB",
      //   showSymbol: false,
      //   encode: {
      //     x: "Time",
      //     y: "Value",
      //     itemName: "Time",
      //     tooltip: ["Value"],
      //   },
      // },
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
