export const mockedResponses = {
  options: ['ROCK', 'PAPER', 'SCISSOR'],
  players: [
    {
      id: 1,
      name: 'Player 1 (You)',
      type: 'player',
      image: '../../assets/images/ryu.png',
      health: 100,
    },
    {
      id: 2,
      name: 'CPU',
      type: 'computer',
      image: '../../assets/images/sagat.png',
      health: 100,
    },
  ],
  resolve: {
    message: "WIN: YOU'VE DEALT 25 DAMAGE TO THE ENEMY",
    computerChoice: 'SCISSOR',
    gameOver: false,
    players: [
      {
        id: 1,
        name: 'Player 1 (You)',
        type: 'player',
        image: '../../assets/images/ryu.png',
        health: 100,
      },
      {
        id: 2,
        name: 'CPU',
        type: 'computer',
        image: '../../assets/images/sagat.png',
        health: 75,
      },
    ],
  },
  gameOver: {
    message: "WIN: YOU'VE DEALT 25 DAMAGE TO THE ENEMY",
    computerChoice: 'SCISSOR',
    gameOver: true,
    players: [
      {
        id: 1,
        name: 'Player 1 (You)',
        type: 'player',
        image: '../../assets/images/ryu.png',
        health: 100,
      },
      {
        id: 2,
        name: 'CPU',
        type: 'computer',
        image: '../../assets/images/sagat.png',
        health: 0,
      },
    ],
  },
};
