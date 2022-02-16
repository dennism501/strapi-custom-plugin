module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/email/send',
    handler: 'myController.send',
    config: {
      policies: [],
    }
  },
];
