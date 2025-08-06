<template>
    <div class="flex justify-center">
        <div class="flex items-center gap-1 text-white sm:gap-3 sm:p-[10px] sm:rounded-[30px] sm:bg-[#2a2626b4]">
            <q-btn @click="() => onFilter('all')" :class="`toBtns ${smBtns}`" label="All" />
            <span class="hidden sm:!block sm:text-gray-300">|</span>
            <q-btn v-for="value in btnsMassive" :key="value.id" @click="() => onFilter(value.lable)" :class="`toBtns ${smBtns}`" :label="value.title"/>
        </div>
    </div>
</template>



<script setup>
import { usePlanStore } from '../store/usePlanStore';

const planStore = usePlanStore()
const smBtns = 'sm:!text-[15px] sm:!px-[15px] sm:!py-[7px] sm:!rounded-[20px] sm:!bg-transparent'
const btnsMassive = [
    {
        id: 0,
        title: 'Boshlanmagan',
        lable: 'new',
    },
    {
        id: 1,
        title: 'Jarayonda',
        lable: 'inprogress',
    },
    {
        id: 2,
        title: 'Bajarilgan',
        lable: 'done',
    },
]

const onFilter = (status) => {
    planStore.onFilterTasks(status)
}

</script>

<style scoped>
.toBtns {
    margin: 0 !important;
    padding: 0 7px !important;
    font-size: small !important;
    font-weight: 400 !important;
    border-radius: 10px !important;
    background: #2a26269b !important;
    text-transform: capitalize !important;
}
</style>