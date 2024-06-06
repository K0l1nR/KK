<template>
    <q-page class="q-pa-md">
      <q-card v-if="event" class="q-pa-md" style="max-width: 600px; margin: auto;">
        <q-card-section>
          <div class="text-h6">Детали мероприятия</div>
        </q-card-section>
  
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label><strong>Название мероприятия: </strong>{{ event.name }}</q-item-label>
              <q-item-label><strong>Описание: </strong>{{ event.description }}</q-item-label>
              <q-item-label><strong>Дата: </strong>{{ new Date(event.date).toLocaleString() }}</q-item-label>
              <q-item-label><strong>Локация: </strong> {{ event.location }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Количество участников: {{ participantCount }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
  
        <q-card-actions align="center" class="q-pt-none q-gutter-sm">
          <q-btn color="primary" @click="registerForEvent" label="Зарегистрироваться" class="q-mr-sm"/>
          <q-btn color="secondary" @click="viewParticipants" label="Участники" class="q-mr-sm"/>
          <q-btn color="warning" @click="editEvent" label="Редактировать" class="q-mr-sm"/>
          <q-btn color="negative" @click="deleteEvent" label="Удалить"/>
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { api } from 'src/boot/axios';
  import { IEvent } from '../../../common/interfaces/event';
  
  export default defineComponent({
    name: 'EventDetails',
    setup() {
      const event = ref<IEvent | null>(null);
      const participantCount = ref(0);
      const route = useRoute();
      const router = useRouter();
  
      const fetchEventDetails = async (id: string) => {
        try {
          const response = await api.get<IEvent>(`/event/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          event.value = response.data;
  
          const countResponse = await api.get<number>(`/event/${id}/participant/count`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          participantCount.value = countResponse.data;
        } catch (error) {
          console.error('Failed to fetch event details', error);
        }
      };
  
      const registerForEvent = async () => {
        if (!event.value) return;
        try {
          await api.post('/participant/register-to-event', {
            eventId: event.value.id
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          console.log(`Registered for event ${event.value.id}`);
        } catch (error) {
          console.error('Failed to register for event', error);
        }
      };
  
      const viewParticipants = () => {
        if (!event.value) return;
        router.push(`/events/${event.value.id}/participants`);
      };
  
      const editEvent = () => {
        if (!event.value) return;
        router.push(`/events/${event.value.id}/edit`);
      };
  
      const deleteEvent = async () => {
        if (!event.value) return;
        try {
          await api.delete(`/event/${event.value.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          router.push('/events');
        } catch (error) {
          console.error('Failed to delete event', error);
        }
      };
  
      onMounted(() => {
        if (route.params.id) {
          fetchEventDetails(route.params.id as string);
        }
      });
  
      return {
        event,
        participantCount,
        registerForEvent,
        viewParticipants,
        editEvent,
        deleteEvent
      };
    }
  });
  </script>
  
  <style scoped>
  .q-gutter-sm > * {
    margin: 0 4px;
  }
  </style>
  