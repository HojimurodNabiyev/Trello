<template>
    <div class="fixed w-full h-full px-[15px]">
        <div class="max-w-[400px] m-auto py-2 px-[25px] bg-[rgba(0,0,0,0.3)] text-white rounded-2xl sm:px-[50px] sm:pt-[25px] sm:pb-[50px] sm:mt-[30px]">
            <h5 class="text-center !text-[20px] mb-2 sm:!text-[30px] sm:mb-[20px]">Register</h5>
            <q-form @submit.prevent="onSubmit" @reset="onReset">
                <q-input class="onInput" autocomplete="new-password" filled v-model="formData.name" label="Ismingizni kiriting" lazy-rules :rules="[val => val && val.length >= 3 || 'Ismingizni kiriting iltimos']" />
                <q-input class="onInput" autocomplete="new-password" filled type="text" v-model="formData.age" label="Emailingizni kiriting" lazy-rules :rules="[ val => val !== null && val !== '' || 'Iltimos emailingizni kiriting', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Iltimos emailni to\'liq yozing' ]" />
                <q-input class="onInput" autocomplete="new-password" filled type="password" v-model="formData.password" label="Parolingizni kiriting" lazy-rules :rules="[val => val && val.length == 7 || '7 honalik parol kiritin']" />
                <q-input class="onInput" autocomplete="new-password" filled type="password" v-model="formData.aspassword" label="Parolingizni qayta kiriting" lazy-rules :rules="[val => val && val === formData.password || 'Parolingiz bir-biri bilan mos emas']" />
                <q-toggle v-model="formData.accept" label="shaxsiy malumotlarimni ko'rib chiqilishiga roziman" />
                <div class="my-[15px] sm:mt-[30px] flex justify-around">
                    <q-btn label="Reset" type="reset" color="primary" class="!text-red-300" />
                    <q-btn label="Submit" type="submit" color="primary" />
                </div>
            </q-form>
        </div>
    </div>
</template>



<script setup>
import axios from 'axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { useFormStore } from '../store/useFormStore'
import { onMounted, ref } from 'vue'


const router = useRouter()
const formStore = useFormStore()

const formData = ref({
    name: '',
    password: null,
    aspassword: null,
    accept: false,
})


onMounted(() => {
    if (JSON.parse(localStorage.getItem('userData'))) {
        router.push('/')
        Notify.create({ message: 'Allaqachon Register va Login qilgansiz', color: 'negative', icon: 'warning', position: 'top', timeout: 800})
    }
})

const onSubmit = async () => {
    if (formData.value.accept !== true) Notify.create({ message: 'Iltimos, shartlarga rozilik bildiring.', color: 'negative', icon: 'warning', position: 'top', timeout: 800})
    else {
        try {
            await axios.post('http://localhost:8200/plan/users', formData.value)
            formStore.toggleBtn = false
            onReset()
            router.push('/')
            Notify.create({ message: `Accauntingiz yaratildi \n Endi login qilishingiz mumkin.`, color: 'positive', icon: 'check_circle', position: 'top', timeout: 1000})
        } catch (error) {
            formStore.toggleBtn = false
            Notify.create({ message: 'Serverda xatolik', color: 'negative', icon: 'check_circle', position: 'top', timeout: 1000})
        }
    }
}

const onReset = () => {
    formData.value.name = null
    formData.value.accept = false
    formData.value.password = null
    formData.value.aspassword = null
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
