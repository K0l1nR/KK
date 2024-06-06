<template>
    <q-page class="q-pa-md">
      <q-card class="q-pa-md" style="max-width: 600px; margin: auto;">
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Edit Event' : 'Create Event' }}</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit.prevent="submitForm">
            <q-input v-model="event.name" label="Name" outlined class="q-mb-md" />
            <q-input v-model="event.description" label="Description" outlined class="q-mb-md" />
            <q-input v-model="eventDate" label="Date" type="datetime-local" outlined class="q-mb-md" />
            <q-input v-model="event.location" label="Location" outlined class="q-mb-md" />
  
            <q-btn type="submit" label="Save" color="primary" class="full-width q-mt-md" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { api } from 'src/boot/axios';
  import { IEvent, ICreateEvent, IUpdateEvent } from '../../../common/interfaces/event';
  
  function formatDateToLocalString(date: Date): string {
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  
  export default defineComponent({
    name: 'EventForm',
    setup() {
      const event = ref<ICreateEvent>({
        name: '',
        description: '',
        date: new Date(),
        location: ''
      });
      const eventDate = ref(formatDateToLocalString(new Date()));
      const isEdit = ref(false);
      const route = useRoute();
      const router = useRouter();
  
      const fetchEvent = async (id: string) => {
        try {
          const response = await api.get<IEvent>(`/event/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          event.value = {
            name: response.data.name,
            description: response.data.description,
            date: new Date(response.data.date),
            location: response.data.location
          };
          eventDate.value = formatDateToLocalString(new Date(response.data.date)); // Установить значение даты в формате yyyy-MM-ddTHH:mm
        } catch (error) {
          console.error('Failed to fetch event', error);
        }
      };
  
      const submitForm = async () => {
        try {
          event.value.date = new Date(eventDate.value); // Установить выбранную дату
          if (isEdit.value) {
            const updateEvent: IUpdateEvent = {
              id: route.params.id as string,
              ...event.value,
            };
            await api.put(`/event/${route.params.id}`, updateEvent, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
            });
          } else {
            await api.post('/event', event.value, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
            });
          }
          router.push('/events');
        } catch (error) {
          console.error('Failed to save event', error);
        }
      };
  
      onMounted(() => {
        if (route.params.id) {
          isEdit.value = true;
          fetchEvent(route.params.id as string);
        }
      });
  
      return {
        event,
        eventDate,
        isEdit,
        submitForm
      };
    }
  });
  </script>
  
  <style scoped>
  .full-width {
    width: 100%;
  }
  </style>
  