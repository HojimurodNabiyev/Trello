import axios from 'axios'
import { ref } from 'vue'
import { Notify } from 'quasar'
import { defineStore } from 'pinia'

export const usePlanStore = defineStore('plan', () => {

    const planMassiv = ref([])

    const onAddPlan = async (planData) => {
        planData.author = JSON.parse(localStorage.getItem('userData'))

        try {
            await fetch('http://localhost:8200/plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData)
            })
            planMassiv.value.push(planData)
            Notify.create({ message: `${result}`, position: 'top', color: 'positive', timeout: 10000 })
        } catch (error) {
            Notify.create({ message: `Tizimda xatolik \nKeyinroq urinib ko'ring`, position: 'top', color: 'negative', timeout: 1000 })
        }
    }

    const onAddTask = async (pId, taskData) => {
        try {
            const { data } = await axios.get(`http://localhost:8200/plan/${pId}`)
            data.tasks.push(taskData)
            const sortTasks = data.tasks.sort((a, b) => a.taskDate.localeCompare(b.taskDate))
            try {
                await fetch(`http://localhost:8200/plan/${pId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tasks: sortTasks })
                })
            } catch (error) {
                Notify.create({ message: `Tizimda xatolik \nKeyinroq urinib ko'ring`, position: 'top', color: 'negative', timeout: 1000 })
            }
        } catch (error) {
            Notify.create({ message: `Tizimda xatolik \nKeyinroq urinib ko'ring`, position: 'top', color: 'negative', timeout: 1000 })
        }
    }

    const onDeletePlan = async (planId) => {
        try {
            await axios.delete(`http://localhost:8200/plan/${planId}`)
            planMassiv.value = planMassiv.value.filter(item => item.id !== planId)
        } catch (error) {
            Notify.create({ message: 'Tizimda xatolik sabab o\'chira olmadik', color: 'negative', position: 'top', timeout: 800 })
        }
    }

    const onDeleteTask = async (pId, tId) => {
        try {
            const { data } = await axios.get(`http://localhost:8200/plan/${pId}`)
            const newData = data.tasks.filter(item => item.id !== tId)
            try {
                await axios.put(`http://localhost:8200/plan/${pId}`, { ...data, tasks: newData })
            } catch (error) {
                Notify.create({ message: 'Tizimda xatolik sabab o\'chira olmadik', color: 'negative', position: 'top', timeout: 800 })
            }
        } catch (error) {
            Notify.create({ message: 'Tizimda xatolik sabab o\'chira olmadik', color: 'negative', position: 'top', timeout: 800 })
        }
    }

    const onChangeTask = async (pId, taskData) => {
        try {
            const { data } = await axios.get(`http://localhost:8200/plan/${pId}`)
            const taskIndex = data.tasks.findIndex(e => e.id === taskData.id)
            data.tasks[taskIndex].id = taskData.id
            data.tasks[taskIndex].taskTitle = taskData.taskTitle
            data.tasks[taskIndex].taskDesc = taskData.taskDesc
            data.tasks[taskIndex].taskDate = taskData.taskDate
            data.tasks[taskIndex].taskStatus = taskData.taskStatus
            try {
                await axios.patch(`http://localhost:8200/plan/${pId}`, { tasks: data.tasks })
            } catch (error) {
                Notify.create({ message: `Tizimda xatolik \nKeyinroq urinib ko'ring`, position: 'top', color: 'negative', timeout: 1000 })
            }
        } catch (error) {
            Notify.create({ message: `Tizimda xatolik \nKeyinroq urinib ko'ring`, position: 'top', color: 'negative', timeout: 1000 })
        }
    }

    const onFilterTasks = async (status) => {
        try {
            const { data } = await axios.get('http://localhost:8200/plan')
            if (status === 'all') {
                planMassiv.value = data
            } else {
                const result = data.map(item => item.tasks.filter(value => value.taskStatus === status))
                planMassiv.value = planMassiv.value.map((item, index) => {
                    item.tasks = result[index]
                    return item
                })
            }
        } catch (error) {
            Notify.create({ message: 'Tizimda xatolik sabab o\'chira olmadik', color: 'negative', position: 'top', timeout: 800 })
        }
    }


    return { planMassiv, onAddPlan, onAddTask, onDeletePlan, onDeleteTask, onChangeTask, onFilterTasks }

})