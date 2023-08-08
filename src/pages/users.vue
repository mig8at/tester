<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Sub</th>
                <th scope="col">Name</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Orientation</th>
                <th scope="col">Birthday</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in store.users">
                <th scope="row">
                    <img style="width: 40px; border-radius: 50%;" :src="user.image" alt="">
                </th>
                <td>{{ user.sub }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.orientation }}</td>
                <td>{{ new Date().getFullYear() - new Date(user.birthday).getFullYear() }} years</td>

            </tr>

        </tbody>
    </table>
</template>


<script setup lang="ts">

import { useStore } from '../store'

const store = useStore()


</script>
  
<style></style>
  