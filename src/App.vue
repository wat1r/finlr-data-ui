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
      <select
        v-model="selectedValue"
        @change="changeUser"
        style="width: 100%; color: #333; background-color: #f0f0f0"
      >
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

import { ref, onMounted } from "vue";
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

const usersData = async () => {
  const t = await getDataUsers();
  console.log(t);
  users.value = t.usersData;
  console.log("------------usersData----------");
  console.log("------------00000000----------");
  console.log(users);
};

usersData();
// 使用 onMounted 钩子在组件挂载时调用 usersData 函数
onMounted(usersData);

console.log("before default value" + users);

var selectedValue = ref(users.value ? users.value[0].value : null);
console.log("before default value->selectedValue" + selectedValue);

const loadData = async () => {
  data.value = await getDataTotal();
  console.log(data.value);
  console.log(data.value.relationData);
  console.log("------------D0----------");
};

const leftTopData = async (params) => {
  leftTop.value = await getDataLeftTop(params);
  console.log("------------D1----------");
  console.log("------------D1----------" + params);
  console.log(leftTop);
};

const rightTopData = async (params) => {
  rightTop.value = await getDataRightTop(params);
  console.log("------------D2----------");
  console.log(rightTop);
};

const leftBottomData = async (params) => {
  // console.log(e);
  leftBottom.value = await getDataLeftBottom(params);
  console.log("------------D3----------");
  console.log(leftBottom);
};

const rightBottomData = async (params) => {
  rightBottom.value = await getDataRightBottom(params);
  console.log("------------D4----------");
  console.log(rightBottom);
};

const changeUser = async (e) => {
  // rightBottom.value = await getDataRightBottom();
  console.log("------------changeUser----------{}", e);
  console.log("selectedValue:", selectedValue.value);
  var _userId = selectedValue.value;
  const params = {
    userId: _userId,
  };
  leftTopData(params);
  leftBottomData(params);
  rightTopData(params);
  rightBottomData(params);
};



const params = {
  userId: "101",
};

loadData();
// rightTopData(params);
// leftTopData(params);
// leftBottomData(params);
// rightBottomData(params);
changeUser();
selectedValue = ref(users.value ? users.value[0].value : null);
console.log("before default value->selectedValue" + selectedValue);

// setInterval(() => {
//   rightTopData();
// }, 3000);

// setInterval(() => {
//   leftBottomData();
// }, 3000);
</script>
