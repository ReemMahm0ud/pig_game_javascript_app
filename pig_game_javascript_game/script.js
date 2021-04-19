'use strict';
const p0 = document.querySelector('.player--0');
const p1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const curr0 = document.getElementById('current--0');
const curr1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

var scores = [0, 0];
var currentscore = 0;
var active = 0;
var state = true;
//the start
const startgame = function () {
    score0.textContent = 0;
    score1.textContent = 0;
    curr0.textContent = 0;
    curr1.textContent = 0;
    p0.classList.remove('player--winner');
    p1.classList.remove('player--winner');
    p0.classList.add('player--active');
    p1.classList.remove('player--active');
    dice.classList.add('hidden');
    currentscore = 0;
    scores = [0, 0];
    state = true;
    active = 0;

};

const switchplayer = function () {
    document.getElementById(`current--${active}`).textContent = 0;
    active = active === 0 ? 1 : 0;
    currentscore = 0;
    p0.classList.toggle('player--active');
    p1.classList.toggle('player--active');
}

startgame();

//rolling logic 
btnroll.addEventListener('click', function () {
    if (state) {
        //1 random number
        let rollDice = Math.trunc(Math.random() * 6) + 1;
        console.log(rollDice);
        //2 show dice
        dice.classList.remove('hidden');
        dice.src = `dice-${rollDice}.png`;

        //check if 1
        if (rollDice !== 1) {
            //add score
            currentscore += rollDice;
            document.getElementById(`current--${active}`).textContent = currentscore;


        } else {
            //switch
            switchplayer();

        }
    }
});

btnhold.addEventListener('click', function () {
    if (state) {
        //1 add current score
        scores[active] += currentscore;
        document.getElementById(`score--${active}`).textContent = scores[active];

        //2 chek if score>=100
        if (scores[active] >= 100) {
            state = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${active}`).classList.add('player--winner');
            document.querySelector(`.player--${active}`).classList.remove('player--active');
        } else {
            //switch
            switchplayer();
        }
    }


});

btnNew.addEventListener('click', startgame);