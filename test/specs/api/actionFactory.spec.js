import actionFactory from '@/api/actionFactory';

describe('actionFactory', () => {
  const mockCrud = {
    create: jest.fn(),
    read: jest.fn(),
    replace: jest.fn(),
    modify: jest.fn(),
    delete: jest.fn(),
  };
  const bindActionFact = (...args) => actionFactory.bind(undefined, ...args);

  it('invalid apiUrl parameter', () => {
    const err = /apiUrl/;
    [undefined, null, 1, true, [], {}].forEach((v) => {
      expect(bindActionFact(v, mockCrud, { url: 'test', method: 'read' })).toThrow(err);
    });
  });

  it('invalid crud parameter', () => {
    const err = /crud/;
    [undefined, null, 1, true, [], {}].forEach((v) => {
      expect(bindActionFact('http://api/', v, { url: 'test', method: 'read' })).toThrow(err);
    });
  });

  it('invalid actionConfig parameter', () => {
    const err = /actionConfig/;
    [undefined, null, 1, true, [], {}].forEach((v) => {
      expect(bindActionFact('http://api/', mockCrud, v)).toThrow(err);
    });
  });

  it('invalid actionConfig.url parameter', () => {
    const err = /actionConfig/;
    [undefined, null, 1, true, [], {}].forEach((v) => {
      expect(bindActionFact('http://api/', mockCrud, { url: v, method: 'read' })).toThrow(err);
    });
  });

  it('invalid actionConfig.method parameter', () => {
    const err = /actionConfig/;
    [undefined, null, 1, true, [], {}, '', 'readone', 'created'].forEach((v) => {
      expect(bindActionFact('http://api/', mockCrud, { url: 'test/{}', method: v })).toThrow(err);
    });
  });

  it('invalid parameter', () => {
    const err = /id/;
    const action = actionFactory('http://api/', mockCrud, { url: 'test/{}', method: 'create' });
    expect(typeof action).toBe('function');
    const actionOpts = { crudConfig: { a: 'test' }, data: {} };
    action(actionOpts).catch((e) => {
      e.message.match(err);
    });
  });

  it('valid parameters create', () => {
    const action = actionFactory('http://api/', mockCrud, { url: 'test/{}', method: 'create' });
    expect(typeof action).toBe('function');
    const actionOpts = { crudConfig: { a: 'test' }, data: {} };
    action('1', actionOpts);
    expect(mockCrud.create).toHaveBeenCalledWith('http://api/test/1', actionOpts);
  });

  it('valid parameters read', () => {
    const action = actionFactory('http://api/', mockCrud, { url: 'test/{}', method: 'read' });
    expect(typeof action).toBe('function');
    const actionOpts = undefined;
    action(2, actionOpts);
    expect(mockCrud.read).toHaveBeenCalledWith('http://api/test/2', {});
  });

  it('valid parameters list', () => {
    const action = actionFactory('http://api/', mockCrud, { url: 'test', method: 'read' });
    expect(typeof action).toBe('function');
    const actionOpts = undefined;
    action(actionOpts);
    expect(mockCrud.read).toHaveBeenCalledWith('http://api/test', {});
  });

  it('valid parameters replace', () => {
    const action = actionFactory('http://api/', mockCrud, { url: 'test/{}/{}', method: 'replace' });
    expect(typeof action).toBe('function');
    const actionOpts = { crudConfig: { a: 'test' }, data: { id: '3', name: 'test3' } };
    action(1, 3, actionOpts);
    expect(mockCrud.replace).toHaveBeenCalledWith('http://api/test/1/3', actionOpts);
  });

  it('valid parameters modify', () => {
    const action = actionFactory('http://api/', mockCrud, { url: 'test/{}/{}', method: 'modify' });
    expect(typeof action).toBe('function');
    const actionOpts = { crudConfig: { a: 'test' }, data: { id: '3', name: 'test3' } };
    action(1, 3, actionOpts);
    expect(mockCrud.modify).toHaveBeenCalledWith('http://api/test/1/3', actionOpts);
  });

  it('valid parameters delete', () => {
    const action = actionFactory('http://api/', mockCrud, { url: 'test/{}/{}/{}', method: 'delete' });
    expect(typeof action).toBe('function');
    const actionOpts = { crudConfig: { headers: {} }, data: {} };
    action(3, '5', '1', actionOpts);
    expect(mockCrud.delete).toHaveBeenCalledWith('http://api/test/3/5/1', actionOpts);
  });
});
