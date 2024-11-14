<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
  >
    <div class="flex-1 mt-2 p-1 flex flex-col">
      <!-- pic1:肌群肌力 -->
      <LeftTopBar
        class="h-1/2 box-border pb-1 mr-2 md-2 bg-opacity-50 bg-slate-800"
        v-if="leftTop"
        :key="count1"
        :data="leftTop.leftTopData"
      />
      <!-- pic3:关节角度 -->
      <LeftBottomBar
        class="h-1/2 box-border pb-1 mr-2 mt-2 bg-opacity-50 bg-slate-800"
        :key="count3"
        v-if="leftBottom"
        :data="leftBottom.leftBottomData"
      />
    </div>

    <div class="flex-1 bg-opacity-50 bg-slate-800 p-1 mt-2 flex flex-col">
      <!-- 筛选用户的界面 -->
      <div class="flex justify-end">
        <select
          v-model="selectedValue"
          @change="changeUser"
          style="width: 8%; color: #333; background-color: #ce961d"
        >
          <option
            v-for="(item, index) in users"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

      <!-- pic2:拉伸牵张幅度/位移速度 -->
      <RightTopBar
        class="h-1/2 box-border pb-1 mr-2 md-2 bg-opacity-50 bg-slate-800"
        v-if="rightTop"
        :key="count2"
        :data="rightTop.rightTopData"
      />
      <!-- pic4:疲劳程度 -->
      <RightBottomBar
        class="h-1/2 box-border pb-1 mr-2 mt-2 bg-opacity-50 bg-slate-800"
        :key="count4"
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

import { ref, onMounted } from "vue";
import {
  getDataLeftBottom,
  getDataLeftTop,
  getDataRightTop,
  getDataRightBottom,
  getDataUsers,
} from "@/api/visualization.js";

let data = ref(null);
let rightTop = ref(null);
let leftTop = ref(null);
let leftBottom = ref(null);
let rightBottom = ref(null);
let users = ref(null);
let selectedValue = ref(null);
let count1 = ref(0);
let count2 = ref(0);
let count3 = ref(0);
let count4 = ref(0);

const usersData = async () => {
  const t = await getDataUsers();
  console.log(t);
  users.value = t.usersData;
  console.log("------------usersData----------");
  console.log("------------00000000----------");
  console.log(users);
  selectedValue = ref(users.value ? users.value[0].value : null);
  changeUser(selectedValue);
  console.log("before default value->selectedValue" + selectedValue);
};

console.log("before default value" + users);

const leftTopData = async (params) => {
  leftTop.value = await getDataLeftTop(params);
  console.log("------------D1----------");
  console.log("------------D1----------" + params);

  count1.value += 1;
  // console.log('lefttop', count);
};

const rightTopData = async (params) => {
  rightTop.value = await getDataRightTop(params);
  console.log("------------D2----------");
  console.log(rightTop);
  count2.value += 1;
};

const leftBottomData = async (params) => {
  // console.log(e);
  leftBottom.value = await getDataLeftBottom(params);
  console.log("------------D3----------");
  console.log(leftBottom);
  count3.value += 1;
};

const rightBottomData = async (params) => {
  rightBottom.value = await getDataRightBottom(params);
  console.log("------------D4----------");
  console.log(rightBottom);
  count4.value += 1;
};

const changeUser = async (e) => {
  // if (!selectedValue) {
  //   // selectedValue = ref(users.value ? users.value[0].value : null);
  // }
  console.log("------------changeUser----------{}", e);
  console.log("selectedValue:", selectedValue.value);
  var _userId = selectedValue.value;
  const params = {
    userId: _userId,
  };
  leftTopData(params);
  console.log("!!!!!lefttop:", leftTop);
  leftBottomData(params);
  rightTopData(params);
  rightBottomData(params);
};

usersData();
</script>
