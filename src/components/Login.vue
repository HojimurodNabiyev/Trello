<template>
    <div class="fixed w-full h-full px-[15px]">
        <div
            class="max-w-[400px] px-[25px] py-[10px] m-auto mt-[10px] rounded-2xl text-white bg-[rgba(0,0,0,0.3)] sm:px-[50px] sm:pt-[25px] sm:pb-[50px] sm:mt-[30px]">
            <h5 class="mb-[10px] text-center sm:mb-[20px]">Login</h5>
            <q-form @submit.prevent="onSubmit" @reset="onReset">
                <q-input class="onInput" type="text" autocomplete="new-password" filled v-model="loginData.name"
                    label="Ismingizni kiriting" lazy-rules
                    :rules="[val => val && val.length >= 3 || 'Ismingizni kiriting iltimos']" />
                <q-input class="onInput" type="password" autocomplete="new-password" filled v-model="loginData.password"
                    label="Parolingizni kiriting" lazy-rules
                    :rules="[val => val && val.length == 7 || '7 honalik parol kiritin']" />
                <div class="flex justify-around mb-[10px] sm:mb-0 sm:mt-[30px]">
                    <q-btn label="Reset" type="reset" color="primary" class="!text-red-300" />
                    <q-btn label="Submit" type="submit" color="primary" />
                </div>
            </q-form>
        </div>
    </div>

</template>



<script setup>

import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useFormStore } from '../store/useFormStore';
import { onMounted, ref } from 'vue';


const router = useRouter()
const formStore = useFormStore()

const loginData = ref({
    name: '',
    password: null,
})

onMounted(() => {
    if (JSON.parse(localStorage.getItem('userData'))) {
        router.push('/')
        Notify.create({ message: 'Allaqachon login qilgansiz', color: 'negative', icon: 'check_circle', position: 'top', timeout: 1000, })
    }
})

const onSubmit = async () => {
    formStore.logIn(loginData.value)
}

const onReset = () => {
    loginData.value.name = null
    loginData.value.password = null
}

</script>

<style scoped>
.onInput :deep(input),
.onInput :deep(.q-field__label),
.onInput :deep(input::placeholder),
.onInput :deep(.q-field__bottom) {
    color: #ccc !important;
}
</style>
