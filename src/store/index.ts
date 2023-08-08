import { defineStore } from 'pinia'
import { ipcRenderer } from 'electron';
import { onMounted, ref } from 'vue';



export const useStore = defineStore('store', () => {

    const users = ref([])
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

    function insertUser(user: any) {
        console.log(user)
        ipcRenderer.send('insert-user', user)
    }

    return {
        users,
        plans,
        errors,

        getUsers,
        insertUser
    }

})