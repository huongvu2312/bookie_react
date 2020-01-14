var faker = require('faker');

var database = {
  finishedBooks: [],
  droppedBooks: [],
  currentBooks: [],
  wishlistBooks: [],
  users: []
};

for (var i = 1; i<= 50; i++) {
  database.finishedBooks.push({
    id: i,
    name: faker.lorem.words(),
    author: faker.name.findName(),
    startDate: faker.date.past(),
    endDate: faker.date.future()
  });

  database.droppedBooks.push({
    id: i,
    name: faker.lorem.words(),
    author: faker.name.findName(),
    startDate: faker.date.past(),
    stopDate: faker.date.recent()
  });

  database.currentBooks.push({
    id: i,
    name: faker.lorem.words(),
    author: faker.name.findName(),
    startDate: faker.date.past()
  });

  database.wishlistBooks.push({
    id: i,
    name: faker.lorem.words(),
    author: faker.name.findName()
  });
}

database.users.push({
  id: 1,
  username: 'vu',
  pass: '2312',
  email: 'vu@gmail.com'
});

console.log(JSON.stringify(database));

