<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>First-Then Board</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="board">
        <!-- First Task -->
        <div class="task">
          <h1>First</h1>
          <ion-input v-model="firstEmoji" placeholder="😀" maxlength="2" class="emoji-input"></ion-input>
          <ion-input v-model="firstText" placeholder="First Task" class="text-input"></ion-input>
        </div>

        <!-- Arrow -->
        <div class="arrow">➡️</div>

        <!-- Then Task -->
        <div class="task">
          <h1>Then</h1>
          <ion-input v-model="thenEmoji" placeholder="🎉" maxlength="2" class="emoji-input"></ion-input>
          <ion-input v-model="thenText" placeholder="Then Task" class="text-input"></ion-input>
        </div>
      </div>
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
  IonInput,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
  },
  data() {
    return {
      firstEmoji: '😀',  // Default emoji for the first task
      firstText: 'First Task',
      thenEmoji: '🎉',   // Default emoji for the then task
      thenText: 'Then Task',
    };
  },
};
</script>

<style scoped>
.board {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.task {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.emoji-input {
  font-size: 2em;
  text-align: center;
  width: 50px;
}

.text-input {
  text-align: center;
  margin-top: 10px;
  width: 100px;
}

.arrow {
  font-size: 3em;
}
</style>