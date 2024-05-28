<template>
    <div>
        <div>动态排序柱状图</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>

<script setup>
    import {onMounted, ref, watch} from 'vue'
    import * as echarts from 'echarts'

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    })

    // 获取 dom 实例
    const target = ref(null)
    let data = [];
    console.log("----------------LeftTopBar-----------------")
    console.log(props.data)
    data = props.data.vals;
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
                data: yAxis,
                // data: ['A', 'B', 'C', 'D', 'E'],
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 2 // only the largest 3 bars will be displayed
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
        for (var i = 0; i < data.length; ++i) {
            if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000);
            } else {
                data[i] += Math.round(Math.random() * 200);
            }
        }
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
        () => props.data,
        () => {
            renderChart()
        }
    )
</script>

<style lang="scss" scoped></style>
