<template>
    <q-page class="flex flex-center">
      <q-card>
        <q-card-section>
          <div class="text-h6">Зарегистрироваться на мероприятие</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="registerToEvent">
            <q-input v-model="participantId" label="Participant ID" />
            <q-input v-model="eventId" label="Event ID" />
  
            <q-btn type="submit" label="Register" color="primary" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { api } from 'boot/axios';
  
  export default {
    data() {
      return {
        participantId: '',
        eventId: ''
      };
    },
    methods: {
      async registerToEvent() {
        try {
          const response = await api.post('/participant/sign-to-event', {
            participantId: this.participantId,
            eventId: this.eventId
          });
          console.log('Registration to event successful', response.data);
        } catch (error) {
          console.error('Registration to event failed', error);
        }
      }
    }
  };
  </script>
  