<template>
    <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
         v-if="data">
        <div class="flex-1  mt-2 p-1 flex flex-col">
            <LeftTopBar class="h-1/2 box-border pb-1  mr-2 md-2 bg-opacity-50 bg-slate-800" v-if="leftTop"
                        :data="leftTop.leftTopData"/>
<!--            <LeftBottomBar class="h-1/2 box-border pb-1  mr-2 mt-2 bg-opacity-50 bg-slate-800" v-if="leftBottom"-->
<!--                           :data="leftBottom.leftBottomData"/>-->
            <!--			<Relation class="h-1/5" :data="data.relationData" />-->
        </div>
        <!--        <div class="w-1/3 mr-2 flex flex-col">-->
        <!--            &lt;!&ndash; 数据展示图 &ndash;&gt;-->
        <!--            <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>-->
        <!--            &lt;!&ndash; 地图可视化 &ndash;&gt;-->
        <!--            <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1" :data="data.mapData"/>-->
        <!--        </div>-->
        <div class="flex-1 bg-opacity-50 bg-slate-800 p-1 mt-2 flex flex-col">
            <!-- 竖向柱状图 -->
            <RightTopBar class="h-1/2 box-border pb-1  mr-2 md-2 bg-opacity-50 bg-slate-800" v-if="rightTop"
                         :data="rightTop.serverData"/>
            <!-- 环形资源站比图 -->
            <RightBottomBar class="h-1/2 box-border pb-1  mr-2 mt-2 bg-opacity-50 bg-slate-800"
                            :data="data.abnormalData"/>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import {getDataLeftBottom, getDataLeftTop, getDataRightTop, getDataTotal} from '@/api/visualization.js'


    const data = ref(null)
    const rightTop = ref(null)
    const leftTop = ref(null)
    const leftBottom = ref(null)


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


    const leftBottomData = async () => {
        leftBottom.value = await getDataLeftBottom()
        console.log("------------D4----------")
        console.log(leftBottom)
    }

    loadData()
    leftTopData()
    rightTopData()
    leftBottomData()


    // setInterval(() => {
    //     loadData()
    // }, 3000)

</script>
