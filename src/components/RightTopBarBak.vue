<template>
    <div>
        <div>Income of Germany and France since 1950</div>
        <!--        <button @click="toggleFullScreen">全屏</button>-->
        <!--        <button @click="fullScreen">全屏</button>-->
        <div id="main" ref="target" class="w-full h-full"></div>

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
    let isFull = false
    console.log("-------------1.1-------------")

    let _rawData = props.data.servers

    // console.log(_rawData)
    //
    // console.log("typeof _rawData" + typeof _rawData)
    // console.log("is _rawData Array?" + Array.isArray(_rawData))
    // console.log("_rawData" + _rawData)


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
                        {dimension: 'Year', gte: 1950},
                        {dimension: 'Country', '=': country}
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
        // mChart.
    })

    const fullScreen = () => {
        // 获取图表容器元素
        // const chartContainer = mChart
        // 切换全屏模式
        if (mChart.requestFullscreen) {
            mChart.requestFullscreen()
        } else if (mChart.mozRequestFullScreen) {
            mChart.mozRequestFullScreen()
        } else if (mChart.webkitRequestFullscreen) {
            mChart.webkitRequestFullscreen()
        } else if (mChart.msRequestFullscreen) {
            mChart.msRequestFullscreen()
        }
    }

    // const toggleFullScreen = () => {
    //     console.log('111111111111111', mChart)
    //     if (mChart) {
    //         // 切换全屏
    //         mChart.dispatchAction({
    //             type: 'togglefullscreen'
    //         });
    //     }
    // }

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
            toolbox: {
                feature: {
                    restore: {show: true}, // 重置
                    myFull: {
                        // 全屏
                        show: true,
                        title: '全屏',
                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick: (e) => {
                            // let fullFlag = true;
                            let element = document.getElementById('main');
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
            series: seriesList,

        }

        mChart.setOption(options)

    }

    const onresize = function () {
        //自适应大小
        mChart.resize();
    };
    window.addEventListener('resize', onresize);


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
