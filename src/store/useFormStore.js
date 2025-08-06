import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {

    const router = useRouter()

    const userData = ref(JSON.parse(localStorage.getItem('userData')) || null)
    const toggleBtn = ref(JSON.parse(localStorage.getItem('toggleBtn')) || false)

    const logIn = async (user) => {
        try {
            const response = await axios.get('https://json-server-api-ddcg.onrender.com/users')
            const result = response.data.find(item => item.name === user.name && item.password === user.password)
            console.log(result)
            if (result) {
                router.push('/')
                toggleBtn.value = true
                userData.value = JSON.parse(JSON.stringify(user))
                localStorage.setItem('userData', JSON.stringify(result))
                localStorage.setItem('toggleBtn', JSON.stringify(toggleBtn.value))
                Notify.create({ message: 'Accauntingizga kirdingiz', color: 'positive', icon: 'check_circle', position: 'top', timeout: 1000, })
            } else {
                Notify.create({ message: 'Bunday accaunt topilmadi', color: 'negative', icon: 'check_circle', position: 'top', timeout: 1000, })
            }
        } catch (error) {
            Notify.create({ message: 'Serverda xatolik \nKeyinroq urinib ko\'ring!', color: 'negative', icon: 'check_circle', position: 'top', timeout: 1000, })
        }
    }

    const logOut = () => {
        userData.value = null
        toggleBtn.value = false
        localStorage.removeItem('userData')
        localStorage.removeItem('toggleBtn')
        Notify.create({ message: 'Profil Logout qilindi', position: 'top', color: 'positive', timeout: 1000 })
    }

    return { userData, toggleBtn, logIn, logOut }

})
