<template>
    <FilterBtns />
    <div class="fixed w-full h-full py-[15px] px-[5px]">
        <h1 v-if="!planStore?.planMassiv?.length > 0"
            class="text-center !text-[40px] text-[rgba(0,0,0,0.3)] sm:mt-[25vh] sm:!text-[100px]">There are no Plans
        </h1>

        <div ref="taskList"
            class="flex !flex-nowrap items-start max-w-full min-h-[75vh] overflow-x-auto custom-scroll sm:min-h-[77vh]">
            <div v-for="(plan, index) in planStore?.planMassiv" :key="plan?.id"
                class="min-w-[270px] p-[7px] mx-[10px] rounded-[16px] text-amber-50 bg-[#2a2626b4] sm:p-[15px] ">
                <div class="handleDrag flex items-center justify-between cursor-grab px-[15px]">
                    <h5>{{ plan?.title.length >= 10 ? `${plan?.title.slice(0, 6)}...` : plan?.title }}</h5>
                    <span>{{ plan?.author?.name.length >= 10 ? `${plan?.author?.name.slice(0, 10)}...` :
                        plan?.author?.name }}</span>
                </div>
                <div v-if="plan?.author?.name === userName?.name" class="flex justify-between px-[10px] py-[5px]">
                    <button @click="() => onAddTask(plan.id)"
                        class="p-[5px] border-2 rounded-[10px] cursor-pointer border-[#00000040]">Add task +</button>
                    <button @click="() => onDelete(plan.id)"
                        class="w-[30px] h-[32px] p-[5px] border-2 rounded-[10px] cursor-pointer border-[#00000040]"><img
                            src="../assets/trash.svg" alt="Trash Logo"></button>
                </div>
                <img v-else class="m-auto" src="../assets/lock.svg" alt="Lock logo" />
                <div v-if="plan?.author?.name === userName?.name" :ref="el => taskRefs[index] = el"
                    :data-plan-index="index"
                    :class="plan?.tasks?.length !== 0 && 'columns space-y-2.5 !w-full max-h-[300px] p-[10px] mt-[5px] border-t-2 overflow-x-hidden overflow-y-scroll custom-scroll border-[#00000040] sm:max-h-[400px]'">
                    <div v-for="task in plan?.tasks" :key="task.id" @click="() => onTaskModal(plan.id, task.id)"
                        class="!w-full flex items-center justify-between p-[10px] rounded-[5px] cursor-pointer bg-[#00000060]">
                        <span>{{ task?.taskTitle.length > 10 ? `${task?.taskTitle.slice(0, 10)}...` :
                            task?.taskTitle }}</span>
                        <small class="mb-[-2px]">{{ task?.taskDate }}</small>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <DialogInfo v-model="openTask" :planid="planId" :taskValue="taskValue" @change="onChangeTask" />
    <DialogTask v-model="openAdd" :planid="planId" title="Yangi task yozing" :valueFor="valueForChange"
        :forChBtn="forChangeBtn" @forBtnCh="forChangeBtn = false" />
</template>



<script setup>
import axios from 'axios';
import Sortable from 'sortablejs'
import FilterBtns from './FilterBtns.vue';
import DialogTask from './DialogTask.vue';
import DialogInfo from './DiologInfo.vue'
import { usePlanStore } from '../store/usePlanStore';
import { onMounted, ref, watchEffect } from 'vue';


const taskRefs = ref([])
const taskList = ref(null)

const planId = ref('')
const taskValue = ref('')
const valueForChange = ref(null)
const forChangeBtn = ref(false)
const openTask = ref(false)
const openAdd = ref(false)

const planStore = usePlanStore()
const userName = ref(JSON.parse(localStorage.getItem('userData')))

//  Refresh
onMounted(() => {
    Sortable.create(taskList.value, {
        animation: 550, handle: '.handleDrag', ghostClass: 'bg-[#282139]',
        onEnd(evt) {
            const massiveeee = JSON.parse(JSON.stringify(planStore.planMassiv))

            const movedItem = planStore.planMassiv.splice(evt.oldIndex, 1)[0]
            planStore.planMassiv.splice(evt.newIndex, 0, movedItem)

            massiveeee.forEach(async (obj, index) => {
                await axios.patch(`http://localhost:8200/plan/${obj.id}`, planStore.planMassiv[index])
            })
        }
    })
})

//  Refresh  
watchEffect(() => {
    if (taskRefs.value.length === 0) return

    taskRefs.value.forEach(el => {
        if (!el || Sortable.get(el)) return

        Sortable.create(el, {
            group: 'tasklar', animation: 200,
            onAdd(evt) {
                const fromIndex = +evt.from.dataset.planIndex
                const toIndex = +evt.to.dataset.planIndex

                const movedTask = planStore.planMassiv[fromIndex].tasks.splice(evt.oldIndex, 1)[0]
                planStore.planMassiv[toIndex].tasks.splice(evt.newIndex, 0, movedTask)

                axios.put(`http://localhost:8200/plan/${planStore.planMassiv[fromIndex].id}`, planStore.planMassiv[fromIndex])
                axios.put(`http://localhost:8200/plan/${planStore.planMassiv[toIndex].id}`, planStore.planMassiv[toIndex])
            }
        })
    })
})

const onAddTask = (id) => {
    planId.value = id
    openAdd.value = true
}

const onDelete = (id) => {
    planStore.onDeletePlan(id)
}

const onTaskModal = async (Pid, Tid) => {
    const plan = planStore.planMassiv.find(item => item.id === Pid)
    const taskObj = plan.tasks.find(item => item.id === Tid)
    taskValue.value = taskObj
    planId.value = Pid
    openTask.value = true
}

const onChangeTask = (value) => {
    valueForChange.value = value
    openTask.value = false
    openAdd.value = true
    forChangeBtn.value = true
}
</script>
