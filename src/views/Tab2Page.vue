<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Token Economy Board</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="token-container">
        <!-- Token Buttons -->
        <ion-button
          v-for="(token, index) in tokens"
          :key="index"
          class="token-button"
          :color="token ? 'success' : 'light'"
          shape="round"
          size="large"
          @click="toggleToken(index)"
        >
          <span v-if="token">⭐</span>
        </ion-button>
      </div>
      <ion-item>
        <!-- <ion-label>Number of Tokens</ion-label> -->
        <ion-input
          label="Number of Tokens"
          type="number"
          min="1"
          v-model.number="numTokens"
          @ionChange="resetTokens">
        </ion-input>
      </ion-item>
      <ion-modal :is-open="showModal" @didDismiss="showModal = false">
        <div class="modal-content">
          <h1>Yay! You did it!</h1>
          <h1>🎉</h1>
        </div>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonItem,
  // IonLabel,
  IonInput
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonModal,
    IonItem,
    // IonLabel,
    IonInput
  },
  data() {
    return {
      numTokens: 5,
      tokens: Array(5).fill(false), // Default: 5 empty tokens
      showModal: false,
    };
  },
  methods: {
    toggleToken(index) {
      // Toggle token state
      this.tokens[index] = !this.tokens[index];

      this.playSound("token");

      // Check if all tokens are earned
      if (this.tokens.every((token) => token)) {
        this.showModal = true; // Show success message
        this.playSound("celebration"); // Play celebration sound
      }
    },
    resetTokens() {
      this.tokens = Array(this.numTokens).fill(false); // Reset tokens based on the new number
    },
    playSound(sound) {
      const audio = new Audio('/assets/sounds/' + sound + '.mp3'); // Path to your sound file
      audio.play();
    },
  },
};
</script>

<style scoped>
.token-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
}

.token-button {
  width: 60px;
  height: 60px;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2em;
  text-align: center;
}
</style>
