<template>
    <q-dialog v-model="isOpen" seamless>
        <q-card class="!w-[250px] p-[15px] !rounded-[14px] !shadow-none dialogg sm:!w-[350px] sm:p-[30px]">
            <h6 class="text-center mb-3 text-white sm:mb-5">{{ title }}</h6>
            <q-form @submit.prevent class="space-y-2.5">
                <q-input class="onInput mb-[-10px]" type="text" autocomplete="new-password" filled
                    v-model="taskData.taskTitle" label="Nom kiriting" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Nom kiriting iltimos', val => val.length < 20 || '20tagacha harf bo\'lishi kerak']" />
                <q-input class="onInput max-h-[60px] sm:max-h-[100px] !text-white overflow-y-auto custom-scroll"
                    type="textarea" v-model="taskData.taskDesc" label="Nima haqida" autocomplete="new-password"
                    filled />
                <q-input class="onInput text-white" type="time" autocomplete="new-password" filled
                    v-model="taskData.taskDate" label="Vaqtini tanlang" />
                <q-option-group class="text-white" type="radio" color="white" :options="statusOptions"
                    v-model="taskData.taskStatus" />
                <div class="mt-[30px] flex justify-around">
                    <q-btn label="Reset" @click="cancel" color="primary" class="!text-red-300" />
                    <q-btn v-if="!forChBtn" label="Add" @click="add" type="submit" color="primary" />
                    <q-btn v-if="forChBtn" label="Change" @click="change" type="submit" color="primary" />
                </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { Notify } from 'quasar'
import { ref, watch } from 'vue'
import { usePlanStore } from '../store/usePlanStore'


const props = defineProps(['title', 'modelValue', 'planid', 'valueFor', 'forChBtn'])
const emit = defineEmits(['update:modelValue', 'forBtnCh'])

const planStore = usePlanStore()
const planId = ref(props.planid)
const isOpen = ref(props.modelValue)
const forChBtn = ref(props.forChBtn)

watch(() => props.forChBtn, val => (forChBtn.value = val))
watch(() => props.planid, val => (planId.value = val))
watch(() => props.modelValue, val => (isOpen.value = val))
watch(isOpen, val => emit('update:modelValue', val))
watch(() => props.valueFor, val => {
    if (val) {
        taskData.value = {
            id: val.id,
            taskTitle: val.taskTitle,
            taskDesc: val.taskDesc,
            taskDate: val.taskDate,
            taskStatus: val.taskStatus,
        }
    }
})

const statusOptions = ref([
    { label: 'Yangi', value: 'new' },
    { label: 'Jarayonda', value: 'inprogress' },
    { label: 'Bajarildi', value: 'done' },
])

const taskData = ref({
    id: new Date(),
    taskTitle: '',
    taskDesc: '',
    taskDate: null,
    taskStatus: 'new',
})


const add = async () => {
    if (taskData.value.taskTitle && taskData.value.taskDate && taskData.value.taskStatus) {
        planStore.onAddTask(planId.value, taskData.value)
        isOpen.value = false
    } else {
        Notify.create({ message: 'Iltimos barchasini to\'ldiring', position: 'top', color: 'negative', timeout: 1000 })
    }
}

const change = async () => {
    if (taskData.value.taskTitle && taskData.value.taskDate && taskData.value.taskStatus) {
        planStore.onChangeTask(planId.value, taskData.value)
        isOpen.value = false
        emit('forBtnCh')
    } else {
        Notify.create({ message: 'Iltimos barchasini to\'ldiring', position: 'top', color: 'negative', timeout: 1000 })
    }
}

const cancel = () => {
    taskData.value.taskTitle = ''
    taskData.value.taskDesc = ''
    taskData.value.taskDate = null
    taskData.value.taskStatus = null
    isOpen.value = false
    emit('forBtnCh')
}

</script>

<style scoped>
.onInput :deep(input),
.onInput :deep(.q-field__label),
.onInput :deep(input::placeholder),
.onInput :deep(.q-field__bottom) {
    color: #ccc !important;
}

:deep(.q-radio__inner),
:deep(.q-radio--truthy .q-radio__bg),
:deep(.q-option-label) {
    color: #ccc !important;
}
</style>
