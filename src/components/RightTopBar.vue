<template>
    <div>
        <div>疲劳程度</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>

<script setup>
    import {onMounted, ref, watch} from 'vue'
    import * as echarts from 'echarts'
    import {getDataRightTop} from '@/api/visualization.js'

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    })


    const target = ref(null)
    let mChart = null

    let data = [];
    let now = new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    data = props.data
    console.log("init:", data)


    const rightTop = ref(null)

    const rightTopData = async () => {
        rightTop.value = await getDataRightTop()
        console.log("------------D4----------")
        console.log(rightTop)
        data = rightTop.value.rightTopData
    }
    console.log("----------------LeftBottomBar-----------------")

    onMounted(() => {
        mChart = echarts.init(target.value)
        renderChart()
    })


    const renderChart = () => {
        const options = {
            title: {
                // text: 'Dynamic Data & Time Axis'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    // console.log("params:", params)
                    var date = new Date(params.name);

                    return (
                        (date.getMonth() + 1) + "-" +
                        date.getDate() + " " +
                        date.getHours() + ":" + date.getMinutes() +
                        ' : ' +
                        params.value[1]
                    );
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    showSymbol: false,
                    data: data
                }
            ]
        }

        mChart.setOption(options)
    }

    setInterval(function () {
        rightTopData()

        mChart.setOption({
            series: [
                {
                    data: data
                }
            ]
        });
    }, 5000);

    // 监听数据的变化，重新渲染图表
    watch(
        () => data,
        () => {
            renderChart()
        }
    )
</script>
