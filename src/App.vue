<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
    v-if="data"
  >
    <div class="flex-1 mt-2 p-1 flex flex-col">
        <!-- pic1:肌群肌力 -->
      <LeftTopBar
        class="h-1/2 box-border pb-1 mr-2 md-2 bg-opacity-50 bg-slate-800"
        v-if="leftTop"
        :data="leftTop.leftTopData"
      />
      <!-- pic3:关节角度 -->
      <LeftBottomBar
        class="h-1/2 box-border pb-1 mr-2 mt-2 bg-opacity-50 bg-slate-800"
        v-if="leftBottom"
        :data="leftBottom.leftBottomData"
      />
    </div>

    <div class="flex-1 bg-opacity-50 bg-slate-800 p-1 mt-2 flex flex-col">
   <!-- pic2:拉伸牵张幅度/位移速度 -->
    <RightTopBar
      class="h-1/2 box-border pb-1 mr-2 md-2 bg-opacity-50 bg-slate-800"
      v-if="rightTop"
      :data="rightTop.rightTopData"
    />
    <!-- pic4:疲劳程度 -->
    <RightBottomBar
      class="h-1/2 box-border pb-1 mr-2 mt-2 bg-opacity-50 bg-slate-800"
      v-if="rightBottom"
      :data="rightBottom.rightBottomData"
    />
  </div>

  </div>

 
</template>

<script setup>
import LeftTopBar from "./components/LeftTopBar.vue";
import LeftBottomBar from "./components/LeftBottomBar.vue";
import RightTopBar from "./components/RightTopBar.vue";
import RightBottomBar from "./components/RightBottomBar.vue";

import { ref } from "vue";
import {
  getDataLeftBottom,
  getDataLeftTop,
  getDataRightTop,
  getDataRightBottom,
  getDataTotal,
} from "@/api/visualization.js";

const data = ref(null);
const rightTop = ref(null);
const leftTop = ref(null);
const leftBottom = ref(null);
const rightBottom = ref(null);

const loadData = async () => {
  data.value = await getDataTotal();
  console.log(data.value);
  console.log(data.value.relationData);
  console.log("------------D0----------");
};

const leftTopData = async () => {
  leftTop.value = await getDataLeftTop();
  console.log("------------D1----------");
  console.log(leftTop);
};

const rightTopData = async () => {
  rightTop.value = await getDataRightTop();
  console.log("------------D2----------");
  console.log(rightTop);
};

const leftBottomData = async () => {
  leftBottom.value = await getDataLeftBottom();
  console.log("------------D3----------");
  console.log(leftBottom);
};

const rightBottomData = async () => {
  rightBottom.value = await getDataRightBottom();
  console.log("------------D4----------");
  console.log(rightBottom);
};

loadData();
rightTopData();
leftTopData();
leftBottomData();
rightBottomData();

// setInterval(() => {
//   rightTopData();
// }, 3000);

// setInterval(() => {
//   leftBottomData();
// }, 3000);
</script>
