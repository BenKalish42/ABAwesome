<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tic Tac Toe</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="board">
        <div v-for="(cell, index) in board" :key="index" class="cell" @click="makeMove(index)">
          {{ cell }}
        </div>
      </div>
      <ion-text class="game-status">{{ gameStatus }}</ion-text>
      <ion-button expand="full" @click="resetGame">Reset Game</ion-button>
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
  IonText
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText
  },
  data() {
    return {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      gameStatus: 'Player X\'s turn',
      winningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
  },
  methods: {
    makeMove(index) {
      if (!this.board[index] && !this.checkWinner()) {
        this.board[index] = this.currentPlayer;
        if (this.checkWinner()) {
          this.gameStatus = `Player ${this.currentPlayer} wins!`;
        } else if (this.board.every(cell => cell)) {
          this.gameStatus = 'It\'s a draw!';
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
          this.gameStatus = `Player ${this.currentPlayer}'s turn`;
        }
      }
    },
    checkWinner() {
      return this.winningCombinations.some(combination =>
        combination.every(index => this.board[index] === this.currentPlayer)
      );
    },
    resetGame() {
      this.board = Array(9).fill('');
      this.currentPlayer = 'X';
      this.gameStatus = 'Player X\'s turn';
    },
  },
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  justify-content: center;
  margin-top: 30px;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: rgb(47, 223, 117);
  font-size: 2em;
  border: 2px solid #333;
}
.game-status {
  text-align: center;
  margin-top: 20px;
  font-size: 1.5em;
}
</style>
