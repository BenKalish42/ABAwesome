<!-- src/views/Home.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Session Summary Generator</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="activity-section">
        <ion-label>Select or add activity:</ion-label>
        <ion-select v-model="selectedActivity" placeholder="Select Activity">
          <ion-select-option v-for="activity in activities" :key="activity" :value="activity">
            {{ activity }}
          </ion-select-option>
        </ion-select>
        <ion-input
          v-model="newActivity"
          placeholder="Type new activity"
          @ionChange="addActivity"
        ></ion-input>
      </div>
      <ion-textarea
        v-model="bulletPoints"
        placeholder="Enter your bullet points here"
        rows="10"
      ></ion-textarea>
      <ion-button expand="full" @click="generateSummary">Generate Summary</ion-button>
      <ion-card v-if="summary">
        <ion-card-content>
          <p>{{ summary }}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonLabel,
  IonTextarea,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonLabel,
    IonTextarea,
    IonButton,
    IonCard,
    IonCardContent,
  },
  data() {
    return {
      activities: [],  // Preloaded from the server
      selectedActivity: null,
      newActivity: '',
      bulletPoints: '',
      summary: '',
    };
  },
  mounted() {
    this.loadActivitiesFromServer();  // Load activities when the component is mounted
  },
  methods: {
    addActivity() {
      if (this.newActivity && !this.activities.includes(this.newActivity)) {
        this.activities.push(this.newActivity);  // Add to activities list locally
        this.saveActivityToServer(this.newActivity);  // Save new activity to the server
        this.newActivity = '';  // Clear the input field
      }
    },
    async saveActivityToServer(activity) {
      try {
        await fetch('/api/saveActivity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activity }),
        });
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    },
    async loadActivitiesFromServer() {
      try {
        const response = await fetch('/api/getActivities');
        this.activities = await response.json();
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    },
    async generateSummary() {
      try {
        const response = await axios.post('http://localhost:3000/generate-summary', {
          bulletPoints: this.bulletPoints,
        });
        this.summary = response.data.summary;
      } catch (error) {
        console.error(error);
        alert('Error generating summary. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
ion-textarea {
  margin-bottom: 20px;
}
</style>
