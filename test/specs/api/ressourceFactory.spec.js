import ressourceFactory from '@/api/ressourceFactory';

describe('ressourceFactory', () => {
  const mockCrud = {
    create: jest.fn(),
    read: jest.fn(),
    replace: jest.fn(),
    modify: jest.fn(),
    delete: jest.fn(),
  };
  const bindRessourceFact = (...args) => ressourceFactory.bind(undefined, ...args);

  it('invalid name parameter', () => {
    const err = /name/;
    const apiUrl = 'http://clirest.com/api/';
    [null, undefined, {}, [], 15, true, ''].forEach((v) => {
      expect(bindRessourceFact(v, apiUrl, mockCrud)).toThrow(err);
    });
  });

  it('invalid apiUrl parameter', () => {
    const err = /apiUrl/;
    const apiUrl = 'http://clirest.com/api/';
    [null, undefined, {}, [], 15, true, ''].forEach((v) => {
      expect(bindRessourceFact('test', v, mockCrud)).toThrow(err);
    });
  });

  it('invalid crud parameter', () => {
    const err = /crud/;
    const apiUrl = 'http://clirest.com/api/';
    [null, undefined, {}, [], 15, true, 'crud'].forEach((v) => {
      expect(bindRessourceFact('test', apiUrl, v)).toThrow(err);
    });
  });

  it('invalid actionsConfig parameter', () => {
    const err = /actionsConfig/;
    const apiUrl = 'http://clirest.com/api/';
    [[], true, 5].forEach((v) => {
      expect(bindRessourceFact('test', apiUrl, mockCrud, { actionsConfig: v })).toThrow(err);
    });
  });

  it('invalid path parameter', () => {
    const err = /path/;
    const apiUrl = 'http://clirest.com/api/';
    [{}, [], 15, true, ''].forEach((v) => {
      expect(bindRessourceFact('test', apiUrl, mockCrud, { path: v })).toThrow(err);
    });
  });

  it('undefined actionConfig parameter', () => {
    const apiUrl = 'https://api.fr/';
    const ressource1 = ressourceFactory('test', apiUrl, mockCrud, { actionsConfig: undefined });
    const ressource2 = ressourceFactory('test', apiUrl, mockCrud, { actionsConfig: null });
    [ressource1, ressource2].forEach((v) => {
      expect(typeof v).toEqual('object');
      expect(typeof v.create).toEqual('function');
      expect(typeof v.read).toEqual('function');
      expect(typeof v.list).toEqual('function');
      expect(typeof v.modify).toEqual('function');
      expect(typeof v.replace).toEqual('function');
      expect(typeof v.delete).toEqual('function');
    });
  });
});
