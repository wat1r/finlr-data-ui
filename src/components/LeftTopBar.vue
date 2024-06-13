<template>
    <div>
        <div>动态排序柱状图</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>

<script setup>
    import {onMounted, ref, watch} from 'vue'
    import * as echarts from 'echarts'

    import {getDataLeftTop} from '@/api/visualization.js'


    const leftTop = ref(null)

    let data = [];

    const leftTopData = async () => {
        leftTop.value = await getDataLeftTop()
        console.log("------------D2----------")
        console.log(leftTop)
        data = leftTop.value.leftTopData.vals
    }


    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    })

    // 获取 dom 实例
    const target = ref(null)

    console.log("----------------LeftTopBar-----------------")
    console.log(props.data)
    // data = props.data.vals;
    let yAxis = props.data.yAxis;
    // for (let i = 0; i < 5; ++i) {
    //     data.push(Math.round(Math.random() * 200));
    // }
    // echarts 实例变量
    let mChart = null
    // 在 mounted 生命周期之后，实例化 echarts
    onMounted(() => {
        mChart = echarts.init(target.value)
        // 渲染 echarts
        renderChart()
    })

    // 渲染图表
    const renderChart = () => {
        const options = {
            xAxis: {
                max: 'dataMax'
            },
            yAxis: {
                type: 'category',
                // data: yAxis,
                data: ['A', 'B', 'C', 'D', 'E'],
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 4 // only the largest 3 bars will be displayed
            },
            series: [
                {
                    realtimeSort: true,
                    name: 'X',
                    type: 'bar',
                    data: data,
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }
                }
            ],
            legend: {
                show: true
            },
            animationDuration: 0,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        }

        mChart.setOption(options)
    }

    function run() {
        leftTopData()

        mChart.setOption({
            series: [
                {
                    type: 'bar',
                    data
                }
            ]
        });
    }


    setTimeout(function () {
        run();
    }, 0);
    setInterval(function () {
        run();
    }, 3000);

    // 监听数据的变化，重新渲染图表
    watch(
        () => data,
        () => {
            renderChart()
        }
    )
</script>

<style lang="scss" scoped></style>
