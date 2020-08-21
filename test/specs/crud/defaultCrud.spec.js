import defaultCrud from '@/crud/defaultCrud';

describe('defaultCrud', () => {
  it('create', async () => {
    expect.assertions(8);
    const objectToCreate = { id: '4', name: 'test 4' };
    let url = 'http://cliRest_.js/test/1';
    let error = `network error : ${url}`;
    fetch.mockRejectOnce(new Error(error), { status: 405 });
    await defaultCrud.create(url, { data: objectToCreate })
      .catch((e) => expect(e.message).toEqual(error));

    url = 'https://cliRest.js/tes_t/1';
    error = 'unknown url';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 404 });
    await defaultCrud.create(url)
      .catch((response) => {
        expect(response.status).toEqual(404);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'https://cliRest.js/test/1';
    error = 'invalid data';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 400 });
    await defaultCrud.create(url)
      .catch((response) => {
        expect(response.status).toEqual(400);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/test/1';
    await fetch.mockResponseOnce(JSON.stringify(objectToCreate), { status: 201 });
    defaultCrud.create(url, { data: objectToCreate })
      .then((response) => {
        expect(response.status).toEqual(201);
        return response.json();
      })
      .then((response) => {
        expect(response.id).toEqual('4');
        expect(response.name).toEqual('test 4');
      });
  });

  it('read', async () => {
    expect.assertions(14);
    let url = 'http://cliRest_.js/test/1';
    let error = `network error : ${url}`;
    fetch.mockRejectOnce(new Error(error), { status: 405 });
    await defaultCrud.read(url)
      .catch((e) => expect(e.message).toEqual(error));

    url = 'http://cliRest.js/tes_t/1';
    error = 'unknown url';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 404 });
    await defaultCrud.read(url)
      .catch((response) => {
        expect(response.status).toEqual(404);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/test/1';
    fetch.mockResponseOnce(JSON.stringify({ id: '1', name: 'test 1' }), { status: 200 });
    await defaultCrud.read(url)
      .then((response) => {
        expect(response.status).toEqual(200);
        return response.json();
      })
      .then((response) => {
        expect(response.id).toEqual('1');
        expect(response.name).toEqual('test 1');
      });

    url = 'http://cliRest.js/test';
    fetch.mockResponseOnce(JSON.stringify({
      page: '1',
      list: [
        { id: '1', name: 'test 1' },
        { id: '2', name: 'test 2' },
        { id: '3', name: 'test 3' },
      ],
    }), { status: 200 });
    await defaultCrud.read(url)
      .then((response) => {
        expect(response.status).toEqual(200);
        return response.json();
      })
      .then((response) => {
        expect(response.page).toEqual('1');
        expect(response.list[0].id).toEqual('1');
        expect(response.list[0].name).toEqual('test 1');
        expect(response.list[1].id).toEqual('2');
        expect(response.list[1].name).toEqual('test 2');
        expect(response.list[2].id).toEqual('3');
        expect(response.list[2].name).toEqual('test 3');
      });
  });

  it('delete', async () => {
    expect.assertions(7);
    let url = 'http://cliRest_.js/test/1';
    let error = `network error : ${url}`;
    fetch.mockRejectOnce(new Error(error), { status: 405 });
    await defaultCrud.delete(url)
      .catch((e) => expect(e.message).toEqual(error));

    url = 'http://cliRest.js/tes_t/1';
    error = 'unknown url';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 404 });
    await defaultCrud.delete(url)
      .catch((response) => {
        expect(response.status).toEqual(404);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/test/1';
    fetch.mockResponseOnce(JSON.stringify({ message: '1 have been deleted' }), { status: 200 });
    await defaultCrud.delete(url)
      .then((response) => {
        expect(response.status).toEqual(200);
        return response.json();
      })
      .then((response) => {
        expect(response.message).toEqual('1 have been deleted');
      });

    url = 'http://cliRest.js/test';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 404 });
    await defaultCrud.delete(url)
      .catch((response) => {
        expect(response.status).toEqual(404);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });
  });

  it('modify', async () => {
    expect.assertions(8);
    let url = 'http://cliRest_.js/test/1';
    let error = `network error : ${url}`;
    const objectToUpdate = { id: '4', name: 'test 4!' };
    fetch.mockRejectOnce(new Error(error), { status: 405 });
    await defaultCrud.modify(url, { data: objectToUpdate })
      .catch((e) => expect(e.message).toEqual(error));

    url = 'http://cliRest.js/tes_t/1';
    error = 'unknown url';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 404 });
    await defaultCrud.modify(url, { data: objectToUpdate })
      .catch((response) => {
        expect(response.status).toEqual(404);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/test/1';
    error = 'invalid data';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 400 });
    await defaultCrud.modify(url)
      .catch((response) => {
        expect(response.status).toEqual(400);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/test/4';
    fetch.mockResponseOnce(JSON.stringify(objectToUpdate), { status: 200 });
    await defaultCrud.modify(url, { data: objectToUpdate })
      .then((response) => {
        expect(response.status).toEqual(200);
        return response.json();
      })
      .then((response) => {
        expect(response.id).toEqual('4');
        expect(response.name).toEqual('test 4!');
      });
  });

  it('replace', async () => {
    expect.assertions(10);
    let url = 'http://cliRest_.js/test/1';
    let error = `network error : ${url}`;
    const objectToUpdate = { id: '4', name: 'test 4!' };
    fetch.mockRejectOnce(new Error(error), { status: 405 });
    await defaultCrud.replace(url, { data: objectToUpdate })
      .catch((e) => expect(e.message).toEqual(error));

    url = 'http://cliRest.js/tes_t/1';
    error = 'unknown url';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 404 });
    await defaultCrud.replace(url, { data: objectToUpdate })
      .catch((response) => {
        expect(response.status).toEqual(404);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/tes_t/1';
    error = 'invalid data';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 400 });
    await defaultCrud.replace(url)
      .catch((response) => {
        expect(response.status).toEqual(400);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });

    url = 'http://cliRest.js/test/4';
    fetch.mockResponseOnce(JSON.stringify(objectToUpdate), { status: 200 });
    await defaultCrud.replace(url, { data: objectToUpdate })
      .then((response) => {
        expect(response.status).toEqual(200);
        return response.json();
      })
      .then((response) => {
        expect(response.id).toEqual('4');
        expect(response.name).toEqual('test 4!');
      });

    url = 'http://cliRest.js/test/4';
    error = 'object must be complete';
    fetch.mockResponseOnce(JSON.stringify({ error }), { status: 400 });
    await defaultCrud.replace(url, { data: { id: '4' } })
      .catch((response) => {
        expect(response.status).toEqual(400);
        return response.json();
      })
      .then((response) => {
        expect(response.error).toEqual(error);
      });
  });
});
