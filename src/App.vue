
<template>
  <nav class="navbar bg-dark border-bottom border-body " data-bs-theme="dark">

    <div class="container-fluid">
      <a class="navbar-brand" href="#">Tester</a>
      <ul class="nav navbar-nav mr-auto"> </ul>
      <ul class="nav nav-pills navbar-right">
        <li class="nav-item active">
          <router-link to="/users" class="nav-link link-light" href="#">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/plans" class="nav-link link-light" href="#">Plans</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/erros" class="nav-link link-light" href="#">Errors</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>

  {{ store.users }}
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { useStore } from './store'

const store = useStore()

onMounted(() => {
  store.insertUser({ name: 'miguel' })
  store.getUsers('SELECT * FROM users')
})

</script>


<style></style>
