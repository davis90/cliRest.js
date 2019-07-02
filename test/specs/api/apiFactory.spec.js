import apiFactory from '@/api/apiFactory';
import defaultCrud from '@/crud/defaultCrud';

describe('apiFactory', () => {
  const mockCrud = {
    create: jest.fn(),
    read: jest.fn(),
    replace: jest.fn(),
    modify: jest.fn(),
    delete: jest.fn(),
  };
  const bindApiFact = (...args) => apiFactory.bind(undefined, ...args);

  it('invalid url parameter', () => {
    const err = /url/;
    const opts = { crud: mockCrud };
    [undefined, null, 1, true, [], {}].forEach((v) => {
      expect(bindApiFact(v, opts)).toThrow(err);
    });
  });

  it('invalid crud parameter', () => {
    const err = /crud/;
    const apiUrl = 'https://api.fr/';
    [null, 1, true, [], {}].forEach((v) => {
      expect(bindApiFact(apiUrl, { crud: v })).toThrow(err);
    });
  });

  it('invalid crudConfigMerge parameter', () => {
    const err = /crudConfigMerge/;
    const apiUrl = 'https://api.fr/';
    [null, 1, true, [], {}].forEach((v) => {
      expect(bindApiFact(apiUrl, { crudConfigMerge: v })).toThrow(err);
    });
  });

  it('valid parameters', () => {
    const apiUrl = 'https://apiUrl.fr/';
    const crudConfig = { a: 'a', b: 'coucou' };
    const api = apiFactory(apiUrl, { crudConfig });
    expect(api.url).toBe(apiUrl);
    expect(api.crudConfig).toEqual(crudConfig);
    expect(api.crudConfig).not.toBe(crudConfig);
    expect(api.crud).toBe(defaultCrud);
    expect(api.ressources).toEqual([]);
  });

  it('valid parameters #2', () => {
    const apiUrl = 'https://apiUrl.fr/';
    const api = apiFactory(apiUrl);
    expect(api.url).toBe(apiUrl);
    expect(api.crud).toBe(defaultCrud);
    expect(api.ressources).toEqual([]);
  });

  it('valid parameters #3', () => {
    const apiUrl = 'https://apiUrl2.fr/';
    const crudConfig = { a: 'b', b: 'coucou2' };
    const api = apiFactory(apiUrl, { crudConfig, crud: mockCrud });
    api.addRessource('test');
    expect(api.url).toBe(apiUrl);
    expect(api.crudConfig).toEqual(crudConfig);
    expect(api.crudConfig).not.toBe(crudConfig);
    expect(api.crud).toBe(mockCrud);
    expect(typeof api.test).toEqual('object');
    expect(typeof api.test.create).toEqual('function');
    expect(typeof api.test.read).toEqual('function');
    expect(typeof api.test.list).toEqual('function');
    expect(typeof api.test.modify).toEqual('function');
    expect(typeof api.test.replace).toEqual('function');
    expect(typeof api.test.delete).toEqual('function');
  });

  it('valid parameters #4', () => {
    const apiUrl = 'https://apiUrl3.fr/';
    const api = apiFactory(apiUrl, { crud: mockCrud });
    const actionsConfig = {
      test: { method: 'read', url: '{}/{}/test/test2' },
    };
    api.addRessource('test', { actionsConfig });
    expect(api.url).toBe(apiUrl);
    expect(api.crud).toBe(mockCrud);
    expect(typeof api.test).toEqual('object');
    expect(typeof api.test.test).toEqual('function');
    expect(api.test.create).toEqual(undefined);
    expect(api.test.read).toEqual(undefined);
    expect(api.test.list).toEqual(undefined);
    expect(api.test.modify).toEqual(undefined);
    expect(api.test.replace).toEqual(undefined);
    expect(api.test.delete).toEqual(undefined);
  });
});
