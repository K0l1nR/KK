<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>Система Управления Мероприятиями | EMS</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item clickable v-if="!isAuthenticated" to="/register">
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Регистрация</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-if="!isAuthenticated" to="/login">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Авторизация</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-if="isAuthenticated" to="/events">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Мероприятия</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-if="isAuthenticated" @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Выход</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.state.isAuthenticated);

    const logout = () => {
      store.dispatch('logout');
      router.push('/login');
    };

    return {
      leftDrawerOpen,
      isAuthenticated,
      logout,
    };
  },
});
</script>

<style scoped>
.q-toolbar-title {
  font-weight: bold;
}
.q-drawer .q-list {
  padding: 16px;
}
.q-list .q-item {
  margin-bottom: 8px;
}
.q-list .q-item:last-child {
  margin-bottom: 0;
}
</style>
