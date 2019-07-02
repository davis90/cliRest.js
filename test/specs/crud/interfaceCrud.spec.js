import interfaceCrud from '@/crud/interfaceCrud';

describe('interfaceCrud', () => {
  const def1 = {
    input: {
      url: 'string',
      options: {
        crudConfig: 'Object',
        data: 'Object',
      },
    },
    output: 'Promise',
  };

  const def2 = {
    input: {
      url: 'string',
      options: {
        crudConfig: 'Object',
      },
    },
    output: 'Promise',
  };

  it('create function', () => {
    expect(interfaceCrud.create).toEqual(def1);
  });

  it('read function', () => {
    expect(interfaceCrud.read).toEqual(def2);
  });

  it('delete function', () => {
    expect(interfaceCrud.delete).toEqual(def2);
  });

  it('modify function', () => {
    expect(interfaceCrud.modify).toEqual(def1);
  });

  it('replace function', () => {
    expect(interfaceCrud.replace).toEqual(def1);
  });
});
