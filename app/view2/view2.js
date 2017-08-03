'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function($scope) {
    var gameState = {
    playerOneWins: 0,
    playerTwoWins: 0,
    gameOver: "",
    PLAYER_ONE: "X",
    PLAYER_TWO: "O",
    currentPlayer: "X",
    board: ["","","","","","","","",""]
    }

    var winningStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    $scope.test = function(test){
      alert('test worked')
    }
    // Array of all win states. All we do is win
    $scope.resetBoard = function(){
      gameState.board = ["","","","","","","","",""]
      if (gameState.gameOver == ""){
        gameState.currentPlayer = gameState.PLAYER_ONE
      }
      gameState.gameOver = ""
      $scope.render()
    }

    $scope.checkWin = function(player) {
      var foundWinner = false
      gameState.winningStates.forEach(function(winners, i) {
      //winners => [6, 7, 8]
      //i => 2
        if(gameState.board[winners[0]] == player && // winners[0] => 6
           gameState.board[winners[1]] == player && // winners[1] => 7
           gameState.board[winners[2]] == player    // winners[2] => 8
          ) { foundWinner = true }
      })
      return foundWinner
    }
    //makePlay alternates the player
    //updates the board state
    //renders the board
    $scope.makePlay = function(cellId) {
      if (gameState.board[cellId] != ""){
        alert("Nice try, pick an empty square!")
        return false
      }
      if (gameState.gameOver != "" ){
        alert("Too late, suckaaa! Click new game")
        return false
      }
      gameState.board[cellId] = gameState.currentPlayer
      if (gameState.currentPlayer == gameState.PLAYER_ONE) {
        gameState.currentPlayer = gameState.PLAYER_TWO
      }
      else {
        gameState.currentPlayer = gameState.PLAYER_ONE
      }
      $scope.render()
    }
    $scope.checkCatsGame = function(){
      if (!gameState.board.includes("") && gameState.gameOver == ""){
        return true
      }
      else {
        return false
      }
    }
    $scope.render = function() {
      gameState.board.forEach(function (element, i){
        document.getElementById("cell"+i).innerHTML = element
        }
      )
      // does X win?
      if(gameState.checkWin(gameState.PLAYER_ONE)){
        document.getElementById("winner").innerHTML = "Congratulations Player One"
        gameState.gameOver = gameState.PLAYER_ONE
        gameState.playerOneWins++
        document.getElementById("p1Score").innerHTML = "Player One score: " + gameState.playerOneWins
      }
      // does O win?
      if($scope.checkWin(gameState.PLAYER_TWO)){
        document.getElementById("winner").innerHTML = "Congratulations Player Two"
        gameState.gameOver = gameState.PLAYER_TWO
        gameState.playerTwoWins++
        document.getElementById("p2Score").innerHTML = "Player Two score: " + gameState.playerTwoWins
      }
      if ($scope.checkCatsGame()){
        document.getElementById("winner").innerHTML = "Cats Game"
      }
    }

}]);
