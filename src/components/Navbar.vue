<script setup>
import { Dark } from 'quasar'
import { useFormStore } from '../store/useFormStore'
import { onMounted, ref } from 'vue'
import DialogPlan from './DialogPlan.vue'
import DialogModal from './DialogModal.vue'

const formData = useFormStore()

const DarkMode = ref(false)
const planDialog = ref(false)
const modalDialog = ref(false)


onMounted(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
        Dark.set(true)
        DarkMode.value = true
    } else {
        Dark.set(false)
        DarkMode.value = false
    }
})

const toggleDark = () => {
    Dark.toggle()
    DarkMode.value = Dark.isActive
    localStorage.setItem('darkMode', Dark.isActive.toString())
}


</script>


<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf" container style="height: 50px" class="bg-transparent !rounded-[10px]">
            <q-header elevated>
                <q-toolbar class="bg-[rgba(0,0,0,0.3)] rounded-[10px]">
                    <q-toolbar-title>
                        <q-btn to="/" flat label='Trello' class="!py-[5px] !pl-1 !pr-0  sm:!px-[20px]" />
                    </q-toolbar-title>
                    <div v-if="formData.toggleBtn" class="flex gap-2 sm:gap-[20px]">
                        <q-btn @click="planDialog = true" label="new plan" class="!py-[5px] !px-[7px] sm:!px-[20px]" />
                        <q-btn @click="modalDialog = true" label="logout" class="!py-[5px] !px-[7px] sm:!px-[20px]" />
                    </div>
                    <div v-else class="flex gap-2 sm:gap-[20px]">
                        <q-btn to="/login" label="Login" class="!py-[5px] !px-[7px] sm:!px-[20px]" />
                        <q-btn to="/register" label="register" class="!py-[5px] !px-[7px] sm:!px-[20px]" />
                    </div>
                    <q-btn flat round dense @click="toggleDark" :icon="DarkMode ? 'dark_mode' : 'light_mode'"
                        class="!ml-[5px] sm:!ml-[15px]" />
                </q-toolbar>
            </q-header>
        </q-layout>
    </div>
    <DialogPlan v-model="planDialog" title="Yangi plan oching" />
    <DialogModal v-model="modalDialog" title="Ogohlantirish" message="Accauntdan chiqish bazi imkoniyatlarni yopadi."/>
</template>
