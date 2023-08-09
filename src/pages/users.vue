<template>
    <div class="mt-4 container">
        <div class="row">
            <div class="col-8 table-responsive">
                <div class="row">
                    <button type="submit" class="m-2 col btn btn-danger">DELETE</button>
                    <button type="submit" class="m-2 col btn btn-warning">BLOCK</button>
                    <button type="submit" class="m-2 col btn btn-primary">ACTIVATE</button>
                </div>
                <div id="style-1" style="max-height: 70vh;" class="mt-3">
                    <table class="table table-dark table-hover table-striped border-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
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
                </div>

            </div>
            <div class="col-4">
                <div style="color: white;">{{ isVisible }}</div>
                <form class="p-3">
                    <div>
                        <label class="form-label text-light">Name</label>
                        <input class="form-control bg-dark text-white">
                    </div>
                    <div class="mt-3">
                        <label class="form-label text-light">Lastname</label>
                        <input class="form-control bg-dark text-white">
                    </div>
                    <div class="mt-3">
                        <label class="form-label text-light">Gender</label>
                        <select class="form-select bg-dark text-white">
                            <option value="">All</option>
                            <option v-for="x in ['MEN', 'WOMEN', 'OTHER']" :value="x">{{ x }}</option>
                        </select>
                    </div>
                    <div class="mt-3">
                        <label class="form-label text-light">Orientation</label>
                        <select class="form-select bg-dark text-white">
                            <option value="">All</option>
                            <option v-for="x in ['HETERO', 'HOMO', 'BY', 'OTHER']" :value="x">{{ x }}</option>
                        </select>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <label class="form-label text-light">Min</label>
                            <input type="number" class="form-control bg-dark text-white">
                        </div>
                        <div class="col">
                            <label class="form-label text-light">Max</label>
                            <input type="number" class="form-control bg-dark text-white">
                        </div>
                    </div>

                    <div class="d-grid mt-3">
                        <button type="submit" class="btn btn-primary">FILTER</button>
                    </div>
                </form>
            </div>
        </div>
        <button type="submit" class="btn btn-primary btn-circle" @click="isVisible = true">+</button>
    </div>

    <div class="modal" tabindex="-1" :style="isVisible ? 'display: block' : 'display: none'">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
                <div class="modal-body">
                    <div class="count-users">
                        <img src="" alt="">
                        <input type="number" value="100" class="form-control bg-dark text-white">
                    </div>

                    <form class="p-3">
                        <div class="mt-3">
                            <label class="form-label text-light">Gender</label>
                            <select class="form-select bg-dark text-white">
                                <option value="">All</option>
                                <option v-for="x in ['MEN', 'WOMEN', 'OTHER']" :value="x">{{ x }}</option>
                            </select>
                        </div>
                        <div class="mt-3">
                            <label class="form-label text-light">Orientation</label>
                            <select class="form-select bg-dark text-white">
                                <option value="">All</option>
                                <option v-for="x in ['HETERO', 'HOMO', 'BY', 'OTHER']" :value="x">{{ x }}</option>
                            </select>
                        </div>

                        <div class="d-grid mt-3">
                            <button @click="isVisible = false" type="submit" class="btn btn-primary">GENERATE</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { ref } from 'vue';
import { useStore } from '../store'

const store = useStore()
const isVisible = ref(false)


</script>
  
<style>
.btn-circle {
    position: fixed;
    right: 2rem;
    bottom: 1rem;
    width: 60px;
    height: 60px;
    padding: 6px 0px;
    border-radius: 50% !important;
    text-align: center;
    font-size: 2rem;
}

.count-users {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
}

.count-users img {
    min-width: 150px;
    min-height: 150px;
    border-radius: 50%;
    margin-right: 1rem;
    background-color: aliceblue;
}

.count-users input {
    width: 100px;
}
</style>
  