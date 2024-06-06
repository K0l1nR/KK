<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">Все мероприятия</div>
    <q-btn color="primary" @click="createEvent" class="q-mb-md">Создать мероприятие</q-btn>
    <q-row class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <q-col
        v-for="event in events"
        :key="event.id"
        cols="4"
        sm="3"
        md="2"
        lg="2"
        class="col-3"
      >
        <q-card class="q-pa-sm full-height text-center">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label><strong>Название мероприятия:</strong> {{ event.name }}</q-item-label>
                <q-item-label><strong>Описание: </strong> {{ event.description }}</q-item-label>
                <q-item-label><strong>Дата:</strong>  {{ new Date(event.date).toLocaleString() }}</q-item-label>
                <q-item-label><strong>Локация:</strong>  {{ event.location }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Количество участников: {{ participantCounts[event.id] || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="center" class="q-pt-none q-gutter-sm">
            <q-btn color="primary" @click="viewEvent(event.id)" label="Подробнее" class="q-mr-sm"/>
          </q-card-actions>
        </q-card>
      </q-col>
    </q-row>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { IEvent } from '../../../common/interfaces/event';

export default defineComponent({
  name: 'EventsPage',
  setup() {
    const events = ref<IEvent[]>([]);
    const participantCounts = ref<{ [key: string]: number }>({});
    const router = useRouter();

    const fetchEvents = async () => {
      try {
        const response = await api.get<{ data: IEvent[] }>('/event', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        events.value = response.data.data;

        for (const event of events.value) {
          const countResponse = await api.get<number>(`/event/${event.id}/participant/count`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          participantCounts.value[event.id] = countResponse.data;
        }
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    const viewEvent = (eventId: string) => {
      router.push(`/events/${eventId}`);
    };

    const createEvent = () => {
      router.push('/events/create');
    };

    onMounted(() => {
      fetchEvents();
    });

    return {
      events,
      participantCounts,
      viewEvent,
      createEvent
    };
  }
});
</script>

<style scoped>
.full-height {
  height: 100%;
}
.q-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.q-card-actions {
  justify-content: center;
}
.text-center {
  text-align: center;
}
.q-gutter-sm > * {
  margin: 0 4px;
}
</style>
