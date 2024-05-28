<template>
    <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
         v-if="data">
        <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
            <LeftTopBar class="h-2/4 box-border pb-4" v-if="leftTop" :data="leftTop.leftTopData"/>
            <LeftBottomBar class="h-2/4 box-border pb-4" :data="data.riskData"/>
            <!--			<Relation class="h-1/5" :data="data.relationData" />-->
        </div>
        <div class="w-1/3 mr-2 flex flex-col">
            <!-- 数据展示图 -->
            <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>
            <!-- 地图可视化 -->
            <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1" :data="data.mapData"/>
        </div>
        <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
            <!-- 竖向柱状图 -->
            <RightTopBar class="h-3/6 box-border pb-4" v-if="rightTop" :data="rightTop.serverData"/>
            <!-- 环形资源站比图 -->
            <RightBottomBar class="h-3/6 box-border pb-4" :data="data.abnormalData"/>
        </div>
    </div>
</template>

<script setup>
    import LeftTopBar from './components/LeftTopBar.vue'
    import LeftBottomBar from './components/LeftBottomBar.vue'
    import TotalData from './components/TotalData.vue'
    import MapChart from './components/MapChart.vue'
    import RightTopBar from './components/RightTopBar.vue'
    import RightBottomBar from './components/RightBottomBar.vue'

    import {ref} from 'vue'
    import {getDataTotal, getDataRightTop, getDataLeftTop} from '@/api/visualization.js'


    const data = ref(null)
    const rightTop = ref(null)
    const leftTop = ref(null)


    const loadData = async () => {
        data.value = await getDataTotal()
        console.log(data.value)
        console.log(data.value.relationData)
        console.log("------------D1----------")

    }

    const leftTopData = async () => {
        leftTop.value = await getDataLeftTop()
        console.log("------------D2----------")
        console.log(leftTop)
    }

    const rightTopData = async () => {
        rightTop.value = await getDataRightTop()
        console.log("------------D3----------")
        console.log(rightTop)
    }

    loadData()
    leftTopData()
    rightTopData()


    // setInterval(() => {
    //     loadData()
    // }, 3000)

</script>
