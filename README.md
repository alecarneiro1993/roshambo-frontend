# Roshambo Frontend

Angular Frontend application that works together with [roshambo][roshambo-git].

## Description

The application provides the UI and is dependent on the responses that come from the backend.

The game is made of these components:

- `HomeComponent` -> which displays the title of the game and how to start the game (PRESS ENTER);
- `GameComponent` -> the main component, which uses some child components and provides the game logic, as well as "talking" with the backend;
  - `PlayerAvatarComponent` -> child component which displays the player's health bar and image;
  - `PlayerOptionsComponent` -> child component which shows the available options (ROCK, PAPER, SCISSOR) and limits the player depending on their type
- `OutcomeComponent` -> which displays the winner of the game and a button to go back to the `HomeComponent`

All the backend conversation happens inside `GameComponent` through a `GameService`.
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

## ESLint and Prettier

This application uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) as its linter and formatter.

## Get Server up

To do that, just run `ng serve` (provided you have `ng` CLI installed);

Go to `localhost:4200`, you will see the `HomeComponent`.

## Tests

The tests are located close to their respective subjects. You may find them with `.spec` in its name.

To run the tests, you may use `ng test`.

## How does does the game work?

You might have heard at least once in your life about Street Fighter.
If not, don't worry, the game is easy.

It all starts with the home page, visiting `localhost:4200`.
You will be prompted with a message to press ENTER.

If you do that, you will be redirected to the game page.
On the left, you will see **YOU**, Ryu, star of the Street Fighter and awesome fighter.
Aside from your photo, you can see your Health Bar too.

At the same time, on the right, the same thing happens for your opponent, Sagat, pure evil and annoying brawler!
He will have his Health bar on top of his picture as well.

The game is a ROCK, PAPER, SCISSOR game, but with a twist!
It involves many **turns** in which you can select one of the 3 options given.

Each time you choose an option and submit it, one of the three outcomes will occur:

- Win: you won the turn, your opponent takes a random amount of damage (nice!)
- Lose: you lost the turn, your opponent gave you a good beating, meaning you take damage (not nice!)
- Draw: you both receive no damage, since you had the same choice (stop reading my mind!)

Everytime a turn is processed, there may be a chance that one of the players is **KO'd**.
That means, the player's `health` has reached 0 and he can no longer fight, meaning
that the last player standing wins!

When that happens, you will be redirected to a page where it shows the winner
and a button to play again and go through all this process.


[roshambo-git]: https://github.com/alecarneiro1993/roshambo
