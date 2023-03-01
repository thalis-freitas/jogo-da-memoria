const FRONT = 'card-front'
const BACK = 'card-back'
const CARD = 'card'
const ICON = 'icon'
const FLIP = 'flip'

document.querySelector('#game-board').style.position = 'fixed'
startGame()

document.querySelector('#start').addEventListener('click', () =>{
  document.querySelector('#new-game').style.display = 'none'
  document.querySelector('#game-board').style.position = 'static'
})

function startGame(){
  initializeCards(game.createCardsFromTechs())
}

function initializeCards(cards){
  let gameBoard = document.querySelector('#game-board')
  gameBoard.innerHTML = ''
  cards.forEach((card) => {
    let cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.icon
    createCardContent(card, cardElement)
    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  })
}

function createCardContent(card, cardElement){
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element){
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)
  if(face === FRONT){
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = `./assets/images/${card.icon}.svg`
    cardElementFace.appendChild(iconElement)
  }else{
    cardElementFace.innerHTML = '&lt/&gt'
  }
  element.appendChild(cardElementFace)
}

let gameOverLayer = document.getElementById('game-over')

function flipCard(){
  if(game.setCard(this.id)){
    this.classList.add(FLIP)
    if(game.secondCard){
      if (game.checkMatch()){
        game.clearCards()
        if (game.checkGameOver()){
          gameOverLayer.style.display = 'flex'
          document.querySelector('#game-board').style.position = 'fixed'
        }
      }else{
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)
          firstCardView.classList.remove(FLIP)
          secondCardView.classList.remove(FLIP)
          game.unflipCards()
        }, 1000)
      }
    }
  }
}

document.getElementById('restart').addEventListener('click', () => {
  game.clearCards()
  startGame()
  gameOverLayer.style.display = 'none'
  document.querySelector('#game-board').style.position = 'static'
})