<template>
  <div>
    <div font-weight="bolder">拉伸牵张幅度/位移速度</div>
    <div id="rightTopId" ref="target" class="w-full h-full"></div>
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
    toolbox: {
      feature: {
        restore: { show: true, title: "重置" }, // 重置
        myFull: {
          // 全屏
          show: true,
          title: "全屏",
          icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
          onclick: (e) => {
            // let fullFlag = true;
            let element = document.getElementById("rightTopId");
            // 一些浏览器的兼容性
            if (element.requestFullScreen) {
              // HTML W3C 提议
              element.requestFullScreen();
            } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
              // Webkit (works in Safari5.1 and Chrome 15)
              element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
              // Firefox (works in nightly)
              element.mozRequestFullScreen();
            }

            // 退出全屏
            if (element.requestFullScreen) {
              document.exitFullscreen();
            } else if (element.msRequestFullScreen) {
              document.msExitFullscreen();
            } else if (element.webkitRequestFullScreen) {
              document.webkitCancelFullScreen();
            } else if (element.mozRequestFullScreen) {
              document.mozCancelFullScreen();
            }
          },
        },
      },
    },
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
          color: "#E49516",
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

  const onresize = function () {
    //自适应大小
    mChart.resize();
  };
  window.addEventListener("resize", onresize);

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
