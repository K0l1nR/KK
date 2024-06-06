<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md" style="width: 400px; max-width: 100%;">
      <q-card-section>
        <div class="text-h6 q-mb-md">Регистрация</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="register">
          <q-input v-model="name" label="Имя" outlined class="q-mb-md" />
          <q-input v-model="email" label="Электронная почта" outlined class="q-mb-md" />
          <q-input v-model="password" label="Пароль" type="password" outlined class="q-mb-md" />
          <q-input v-model="phone" label="Номер телефона" outlined class="q-mb-md" />

          <q-btn type="submit" label="Register" color="primary" class="full-width q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'UserRegister',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const phone = ref('');
    const store = useStore();
    const router = useRouter();

    const register = async () => {
      try {
        const response = await api.post('/participant/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          phone: phone.value
        });
        store.dispatch('login', response.data.accessToken);
        console.log('Registration successful', response.data);
        router.push('/events');
      } catch (error) {
        console.error('Registration failed', error);
      }
    };

    return {
      name,
      email,
      password,
      phone,
      register
    };
  }
});
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
