import { defineStore } from 'pinia'
import { ipcRenderer } from 'electron';
import { onMounted, ref } from 'vue';

import { Gender, Country, Orientation, User } from '../../electron/server/model';


export const useStore = defineStore('store', () => {

    const users = ref<User[]>([])
    const plans = ref([])
    const errors = ref([])

    onMounted(() => {
        console.log('mounted')
        ipcRenderer.on('users', (_, list) => users.value = list);
        ipcRenderer.on('plans', (_, list) => plans.value = list);
        ipcRenderer.on('errors', (_, list) => errors.value = list);
    })

    function getUsers(query: string) {
        ipcRenderer.send('user-query', query)
    }

    function insertUser(gender: Gender, country: Country, orientation: Orientation) {
        ipcRenderer.send('generate-user', gender, country, orientation)
    }

    return {
        users,
        plans,
        errors,

        getUsers,
        insertUser
    }

})