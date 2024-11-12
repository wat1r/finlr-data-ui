<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
    v-if="data"
  >
    <div class="flex-1 mt-2 p-1 flex flex-col">
      <!-- pic1:肌群肌力 -->
      <LeftTopBar
        class="h-1/3 box-border pb-1 mr-2 md-2 bg-opacity-50 bg-slate-800"
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

    <div>
      <select v-model="selected" @change="changeUser" style="width: 100%">
        <!-- 内联对象字面量 -->

        <option v-for="(item, index) in users" :key="index" :value="item.value">
          {{ item.label }}
        </option>
      </select>
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
  getDataUsers,
} from "@/api/visualization.js";

const data = ref(null);
const rightTop = ref(null);
const leftTop = ref(null);
const leftBottom = ref(null);
const rightBottom = ref(null);
const users = ref(null);

const loadData = async () => {
  data.value = await getDataTotal();
  console.log(data.value);
  console.log(data.value.relationData);
  console.log("------------D0----------");
};

const leftTopData = async (params) => {
  leftTop.value = await getDataLeftTop(params);
  console.log("------------D1----------");
  console.log("------------D1----------"+params);
  console.log(leftTop);
};

const rightTopData = async () => {
  rightTop.value = await getDataRightTop();
  console.log("------------D2----------");
  console.log(rightTop);
};

const leftBottomData = async () => {
  // console.log(e);
  leftBottom.value = await getDataLeftBottom();
  console.log("------------D3----------");
  console.log(leftBottom);
};

const rightBottomData = async () => {
  rightBottom.value = await getDataRightBottom();
  console.log("------------D4----------");
  console.log(rightBottom);
};

const changeUser = async (e) => {
  // rightBottom.value = await getDataRightBottom();
  console.log("------------changeUser----------");
  const params = {
    userId: "10",
  };
  leftTopData(params);
  // console.log(e);
  // console.log(e.target.value);
  // const t = e.target.value;
  // leftBottomData(t);
};

const usersData = async () => {
  users.value = await getDataUsers();
  console.log("------------usersData----------");
  console.log("------------00000000----------");
  console.log(users);

  //   users.forEach((item, index) => {
  //   // 可以访问外层的 `parentMessage`
  //   // 而 `item` 和 `index` 只在这个作用域可用
  //   // console.log(parentMessage, item.message, index)
  //   console.log("------------00000000----------"+item);
  // })
};

// const params = {
//   userId: "101",
// };

loadData();
rightTopData();
// leftTopData();
// leftTopData(params);
leftBottomData();
rightBottomData();
changeUser();
usersData();

// setInterval(() => {
//   rightTopData();
// }, 3000);

// setInterval(() => {
//   leftBottomData();
// }, 3000);
</script>
