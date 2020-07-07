import * as user from '../mock-data/user-data.json'

test('mock implementation of a basic function', ()=> {
  const mock = jest.fn((string) => 'I am a mock function');
  expect(mock('Papichulio')).toBe('I am a mock function');
  expect(mock).toBeCalledWith('Papichulio');
})

test('mock return value of a function one time', () => {
  const mock = jest.fn();

  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('there!')

  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);

  mock('Hello', 'there', 'Steve');
  expect(mock).toBeCalledWith('Hello', 'there', 'Steve')

  mock('Steve');
  expect(mock).toBeCalledWith('Steve');
});

test('mock implementation of a function', () => {
  const mock = jest.fn();
  mock.mockImplementation(()=> 'Bulgaria');

  expect(mock('Location')).toBe('Bulgaria');
  expect(mock).toBeCalledWith('Location');
});

test('spying using original implementation',() => {
  const pizza = {
    name: n => `Pizza name: ${n}`,
    size: s => `The size of the pizza is: ${s}`
  };
  const spy = jest.spyOn(pizza, 'name');
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
  expect(spy).toHaveBeenCalledWith('Cheese');
  
  const spy2 = jest.spyOn(pizza, 'size');
  expect(pizza.size('16oz')).toBe(`The size of the pizza is: 16oz`);
  expect(spy2).toHaveBeenCalledWith('16oz');
})

test('spying using mockImplementation', ()=> {
  const pizza = {
    name: n => `Pizza name: ${n}`
  };
  const spy = jest.spyOn(pizza, 'name');
  spy.mockImplementation(n => 'Crazy pizza!');

  expect(pizza.name('Cheese')).toBe('Crazy pizza!');
  spy.mockRestore();
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese')
});

test('user returns Patricia Lebsack last', ()=> {
  const user1 = user[0];
  const user2 = user[1];
  const user3 = user[2];
  const user4 = user[3];
  const _user = jest.fn(currentUser => currentUser.name);

  _user(user1) // Leanne Graham
  _user(user2) // Ervin Howell
  _user(user3) // Clementine Bauch
  _user(user4) // Patricia Lebsack

  expect(_user).toHaveLastReturnedWith('Patricia Lebsack')
});

test('check our fake db has user Leanne Graham and match object ', ()=> {
  const _user = {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  };

  expect(user[0]).toMatchObject(_user);
})

test('expect a promise to resolve', async () => {
  const _user = {
    getFullName: jest.fn(() => Promise.resolve('Veso'))
  };
  await expect(_user.getFullName()).resolves.toBe('Veso');
});

test('expect a promise to reject', async () => {
  const _user = {
    getFullName: jest.fn(() => Promise.reject(new Error('Something went terribly wrong')))
  };
  await expect(_user.getFullName()).rejects.toThrow('Something went terribly wrong');
});