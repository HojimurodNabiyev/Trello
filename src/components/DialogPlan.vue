<template>
    <q-dialog v-model="isOpen" seamless>
        <q-card class="!w-[250px] p-[15px] !rounded-[14px] !shadow-none dialogg sm:!w-[350px] sm:p-[30px]">
            <h6 class="text-center mb-5 text-white">{{ title }}</h6>
            <q-form @submit.prevent>
                <q-input class="onInput" type="text" autocomplete="new-password" filled v-model="planData.title"
                    label="Plan uchun nom kiriting" lazy-rules hint="Milos uchun: Bugun"
                    :rules="[val => val && val.length > 0 || 'Nom kiriting iltimos']" />
                <div class="flex justify-around mt-[30px]">
                    <q-btn label="Reset" @click="cancel" color="primary" class="!text-red-300" />
                    <q-btn label="Add" @click="ok" type="submit" color="primary"/>
                </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePlanStore } from '../store/usePlanStore'


const planStore = usePlanStore()

const planData = ref({
    title: '',
    author: {},
    tasks: []
})

const props = defineProps(['title', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
const isOpen = ref(props.modelValue)

watch(() => props.modelValue, val => (isOpen.value = val))
watch(isOpen, val => emit('update:modelValue', val))

const ok = () => {
    planStore.onAddPlan(planData.value)
    cancel()
}

const cancel = () => {
    planData.value.title = ''
    planData.value.author = {}
    isOpen.value = false
}

</script>

<style scoped>
.onInput :deep(input),
.onInput :deep(.q-field__label),
.onInput :deep(input::placeholder),
.onInput :deep(.q-field__bottom) {
    color: #ccc;
}
</style>
