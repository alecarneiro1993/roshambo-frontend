# Roshambo Frontend

Angular Frontend application that works together with [roshambo][roshambo-git].

## Welcome

To an exciting fighting game of :rock: :newspaper_roll: :scissors:

In this README, you will find (hopefully :pray:) all the information you need to get this game running :runner:.

## How does does the game work?

You might have heard at least once in your life about Street Fighter (or any other fighting game).
If not, don't worry, the game is easy.

The game consists of two players: one is **you**, the other the **Computer**.

The goal of the game is to knockout :punch: your opponents, but through a totally different mean.
You will both be playing a game of **ROSHAMBO**, but with fighting game elements.

### What does that mean?

Two players, two health bars, three options to pick.
Each time you pick an option, your opponent will do the same.

Each time you choose an option and submit it, one of the three outcomes will occur:

- **Win**: you won the turn, your opponent takes a random amount of damage (nice! :muscle:)
- **Lose**: you lost the turn, your opponent gave you a good beating, meaning you take damage (not nice! :face_with_head_bandage:)
- **Draw**: you both receive no damage, since you had the same choice (that was close! :face_exhaling:)

### How does the game end?

**Until one of you is left standing.**

Meaning: until one of you has no more health left.

When a player is knocked out, a winner is declared.

**Thats it. Rinse and repeat.**

You may restart the game and play again as many times you like.

## Description

The application provides the UI and is dependent on the responses that come from the backend.

The game is made of these components:

- `HomeComponent` -> which displays the title of the game and how to start the game (PRESS ENTER);
- `GameComponent` -> the main component, which uses some child components and provides the game logic, as well as "talking" with the backend;
  - `PlayerAvatarComponent` -> child component which displays the player's health bar and image;
  - `PlayerOptionsComponent` -> child component which shows the available options (ROCK, PAPER, SCISSOR) and limits the player depending on their type
- `OutcomeComponent` -> which displays the winner of the game and a button to go back to the `HomeComponent`

All the API conversation happens inside `GameComponent` through a `GameService`.

## Versions

```bash
typescript
~5.0.2

@angular
^16.0.0
```

## Installation and Setup

To run this effectively, you will need the backend from [roshambo][roshambo-git].
Make sure to get a server there up and running.

Meanwhile, you can run `npm install` to install dependencies.

## ESLint and Prettier

This application uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) as its linter and formatter.

## Documentation

Initially the idea was to use something like [compodoc](https://compodoc.app/),
but this project is simple, so it uses TSDoc.

## Get Server up

To do that, just run `ng serve` (provided you have `ng` CLI installed);

Go to `localhost:4200`, you will see the `HomeComponent`.

## Tests

The tests are located close to their respective subjects. You may find them with `.spec` in its name.

To run the tests, you may use `ng test`.

[roshambo-git]: https://github.com/alecarneiro1993/roshambo
