<template>
  <div>
    <div>Income of Germany and France since 1950</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'



const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

console.log("-------------1.1-------------")

let _rawData = props.data.servers

console.log(_rawData)

console.log("typeof _rawData" + typeof _rawData)
console.log("is _rawData Array?" + Array.isArray(_rawData))
console.log("_rawData" + _rawData)


const target = ref(null)
let mChart = null


const countries = [
  'Finland',
  'France',
  'Germany',
  'Iceland',
  'Norway',
  'Poland',
  'Russia',
  'United Kingdom'
];
const datasetWithFilters = [];
const seriesList = [];
echarts.util.each(countries, function (country) {
  var datasetId = 'dataset_' + country;
  datasetWithFilters.push({
    id: datasetId,
    fromDatasetId: 'dataset_raw',
    transform: {
      type: 'filter',
      config: {
        and: [
          { dimension: 'Year', gte: 1950 },
          { dimension: 'Country', '=': country }
        ]
      }
    }
  });
  seriesList.push({
    type: 'line',
    datasetId: datasetId,
    showSymbol: false,
    name: country,
    endLabel: {
      show: true,
      formatter: function (params) {
        return params.value[3] + ': ' + params.value[0];
      }
    },
    labelLayout: {
      moveOverlap: 'shiftY'
    },
    emphasis: {
      focus: 'series'
    },
    encode: {
      x: 'Year',
      y: 'Income',
      label: ['Country', 'Income'],
      itemName: 'Year',
      tooltip: ['Income']
    }
  });
});

onMounted(() => {
  mChart = echarts.init(target.value)
  if (_rawData != null) {
    renderChart(_rawData)
  }
})


const renderChart = () => {
  const options = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData
      },
      ...datasetWithFilters
    ],
    title: {
      //   text: 'Income of Germany and France since 1950'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Income'
    },
    grid: {
      right: 140
    },
    series: seriesList
  }

  mChart.setOption(options)
}

// 监听数据的变化，重新渲染图表
watch(
  () => props.data,
  () => {
    if (_rawData != null) {
      renderChart()
    }
  }
)
</script>

<style lang="scss" scoped></style>
