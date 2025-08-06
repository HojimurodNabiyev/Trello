<template>
  <q-dialog v-model="isOpen" seamless>
    <q-card class="max-w-[400px] p-[15px] !rounded-[14px] !shadow-none dialogg sm:p-[50px]">
      <div class="text-h6 text-gray-100 text-center">{{ title }}</div>
      <div class="q-mt-md text-gray-100 text-center tracking-[1px]">{{ message }}</div>
      <div class="row justify-evenly q-mt-lg text-gray-100">
        <q-btn label="Cancel" @click="cancle" class="!text-red-400 !rounded-[10px]" />
        <q-btn label="Logout" @click="ok" class="!text-red-200 !rounded-[10px]" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFormStore } from '../store/useFormStore'

const formStore = useFormStore()

const props = defineProps(['title', 'message', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
const isOpen = ref(props.modelValue)


watch(() => props.modelValue, val => (isOpen.value = val))
watch(isOpen, val => emit('update:modelValue', val))


const ok = () => {
  formStore.logOut() 
  isOpen.value = !isOpen.value
}

const cancle = () => {
  isOpen.value = !isOpen.value
}

</script>
