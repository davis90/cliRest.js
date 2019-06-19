import mergeCrudConfig from '@/crud/mergeCrudConfig';

describe('mergeCrudConfig', () => {
  it('undefined or null values', () => {
    let res = mergeCrudConfig();
    expect(res).toEqual({});
    res = mergeCrudConfig(undefined, undefined);
    expect(res).toEqual({});
    res = mergeCrudConfig(undefined, null);
    expect(res).toEqual({});
    res = mergeCrudConfig(null, undefined);
    expect(res).toEqual({});
    res = mergeCrudConfig(null, null);
    expect(res).toEqual({});
  });

  it('with invalid values', () => {
    let res = mergeCrudConfig('test', 'test');
    expect(res).toEqual({});
    res = mergeCrudConfig(true, false);
    expect(res).toEqual({});
    res = mergeCrudConfig(7, 8);
    expect(res).toEqual({});
    res = mergeCrudConfig([], []);
    expect(res).toEqual({});
    res = mergeCrudConfig(2, { method: 'GET', body: { test: 'test' } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig({ method: 'GET', body: { test: 'test' } }, 2);
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig(true, { method: 'GET', body: { test: 'test' } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig({ method: 'GET', body: { test: 'test' } }, false);
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig('test', { method: 'GET', body: { test: 'test' } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig({ method: 'GET', body: { test: 'test' } }, 'test');
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig([], { method: 'GET', body: { test: 'test' } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig({ method: 'GET', body: { test: 'test' } }, []);
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
  });

  it('with valid values', () => {
    let res = mergeCrudConfig({}, { method: 'GET', body: { test: 'test' } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig({ method: 'POST' }, { method: 'GET', body: { test: 'test' } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBe('test');
    res = mergeCrudConfig({ method: 'POST', body: { test2: 'test2' }, test2: 'test2' },
      { body: { test: 'test' } });
    expect(res.method).toBe('POST');
    expect(res.body.test).toBe('test');
    expect(res.body.test2).toBe('test2');
    expect(res.test2).toBe('test2');
  });
});
