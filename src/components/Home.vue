<template>
    <Plans v-if="formStore?.toggleBtn"/>
    
    <div v-else class="fixed w-full h-ful">
        <div class="flex flex-col text-center items-center justify-center p-[10px] gap-2 sm:gap-5 sm:mt-[70px]">
            <img src="../assets/trello.svg" alt="Trello Logo" class="w-[150px] sm:w-[200px]" style="filter: drop-shadow(0px 0px 18px rgb(207, 212, 255));">
            <h4 class="text-white sm:!text-[50px]">Trelloga Xush Kelibsiz</h4>
            <p class="text-white">Agar bizning xizmatimizdan foydalanmoqchi bo'lsangiz, <br>avval accaunt orqali tizimga kirishingiz kerak! <br> bu uchun register yoki login qiling.</p>
        </div>
    </div>
</template>



<script setup>
import axios from 'axios';
import Plans from './Plans.vue';
import { onMounted } from 'vue';
import { usePlanStore } from '../store/usePlanStore';
import { useFormStore } from '../store/useFormStore'

const formStore = useFormStore()
const planStore = usePlanStore()

onMounted(async () => {
    const response = await axios.get('https://json-server-api-ddcg.onrender.com/plan')
    planStore.planMassiv = response.data
})

</script>