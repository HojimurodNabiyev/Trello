<template>
    <q-dialog v-model="isOpen" seamless>
        <q-card class="flex column w-[270px] p-[25px] !rounded-[14px] !shadow-none dialogg !text-white">
            <div class="flex justify-between items-center">
                <h5 class="w-[150px] capitalize break-all">{{ taskV.taskTitle }}</h5>
                <div class="flex gap-[7px]">
                    <button @click="emit('change', taskV)"
                        class="w-[27px] h-[27px] p-[5px] border-2 rounded-[10px] cursor-pointer border-[#00000040]"><img
                            src="../assets/pen.svg" alt="Pen Logo"></button>
                    <button @click="() => onDelete(taskV.id)"
                        class="w-[27px] h-[27px] p-[5px] border-2 rounded-[10px] cursor-pointer border-[#00000040]"><img
                            src="../assets/trash.svg" alt="Trash Logo"></button>
                </div>
            </div>
            <p class="text-neutral-300 !my-5 break-all">{{ taskV.taskDesc.length > 0 ? taskV.taskDesc : 'There is no description'}}</p>
            <div class="flex justify-between items-center mb-3">
                <h6 v-if="taskV.taskStatus === 'new'" class="text-red-400">Boshlanmagan</h6>
                <h6 v-if="taskV.taskStatus === 'inprogress'" class="text-amber-400">Jarayonda</h6>
                <h6 v-if="taskV.taskStatus === 'done'" class="text-emerald-400">Bajarildi</h6>
                <span>{{ taskV.taskDate }}</span>
            </div>
            <q-btn @click="cancel" label="cancel" />
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePlanStore } from '../store/usePlanStore'


const props = defineProps(['modelValue', 'planid', 'taskValue'])
const emit = defineEmits(['update:modelValue', 'ok', 'cancel', 'change'])
const pId = ref(props.planid)
const taskV = ref(props.taskValue)
const isOpen = ref(props.modelValue)
const planStore = usePlanStore()

watch(() => props.planid, val => (pId.value = val))
watch(() => props.taskValue, val => (taskV.value = val))
watch(() => props.modelValue, val => (isOpen.value = val))
watch(isOpen, val => emit('update:modelValue', val))

const cancel = () => {
    isOpen.value = false
}

const onDelete = async (id) => {
    planStore.onDeleteTask(pId.value, id)
    isOpen.value = false
}

</script>
