<template>
    <q-page class="q-pa-md">
      <div class="text-h6 q-mb-md">Участники мероприятия</div>
      <q-list bordered>
        <q-item v-for="participant in participants" :key="participant.id">
          <q-item-section>{{ participant.name }}</q-item-section>
          <q-item-section>{{ participant.email }}</q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { api } from 'src/boot/axios';
  import { IParticipant } from '../../../common/interfaces/participant';
  
export default defineComponent({
  name: 'EventParticipants',
  setup() {
    const participants = ref<IParticipant[]>([]);
    const route = useRoute();
    const eventId = route.params.eventId as string;

    const fetchParticipants = async () => {
      try {
        const response = await api.get<IParticipant[]>(`/event/${eventId}/participant`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        participants.value = response.data;
      } catch (error) {
        console.error('Failed to fetch participants', error);
      }
    };

    onMounted(() => {
      fetchParticipants();
    });

    return {
      participants
    };
  }
});
</script>