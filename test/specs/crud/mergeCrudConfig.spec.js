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
    res = mergeCrudConfig({ method: 'POST', body: { test2: 'test2', test3: [] }, test2: 'test2' },
      { body: { test: 'test', test3: 'test3' } });
    expect(res.method).toBe('POST');
    expect(res.body.test).toBe('test');
    expect(res.body.test2).toBe('test2');
    expect(res.body.test3).toBe('test3');
    expect(res.test2).toBe('test2');
  });

  it('with arrays', () => {
    const res = mergeCrudConfig({ body: { test: [{ a: 'a' }, 2, 3] } },
      { method: 'GET', body: { test: [{ b: 'b' }, 'test'] } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBeInstanceOf(Array);
    expect(res.body.test).toHaveLength(3);
    expect(res.body.test[0].a).toBe('a');
    expect(res.body.test[0].b).toBe('b');
    expect(res.body.test[1]).toBe('test');
    expect(res.body.test[2]).toBe(3);
  });

  it('with array in array', () => {
    const res = mergeCrudConfig({ body: { test: [{ a: 'a' }, [7, 8], 3] } },
      { method: 'GET', body: { test: [{ b: 'b' }, ['test']] } });
    expect(res.method).toBe('GET');
    expect(res.body.test).toBeInstanceOf(Array);
    expect(res.body.test).toHaveLength(3);
    expect(res.body.test[0].a).toBe('a');
    expect(res.body.test[0].b).toBe('b');
    expect(res.body.test[1][0]).toBe('test');
    expect(res.body.test[1][1]).toBe(8);
    expect(res.body.test[2]).toBe(3);
  });
});
