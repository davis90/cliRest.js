import InterfaceCrud from '@/crud/InterfaceCrud';

describe('isNonEmptyString', () => {
  const object1 = {
    index: 0,
    create() {
    },
  };

  const object2 = {
    cpt: 2,
    read() {
    },
  };

  const object3 = {
    replace() {
    },
    modify() {
    },
    delete() {
    },
  };
  Object.assign(object3, object2, object1);

  const object4 = {
    test() {
    },
  };
  Object.assign(object4, object3);

  const def1 = {
    input: {
      url: 'string',
      options: {
        crudConfig: 'Object',
        data: 'Object'
      }
    },
    output: 'Promise'
  };

  const def2 = {
    input: {
      url: 'string',
      options: {
        crudConfig: 'Object'
      }
    },
    output: 'Promise'
  };

  it('create function', () => {
    expect(InterfaceCrud.create()).toEqual(def1);
  });

  it('read function', () => {
    expect(InterfaceCrud.read()).toEqual(def2);
  });

  it('delete function', () => {
    expect(InterfaceCrud.delete()).toEqual(def2);
  });

  it('modify function', () => {
    expect(InterfaceCrud.modify()).toEqual(def1);
  });

  it('replace function', () => {
    expect(InterfaceCrud.replace()).toEqual(def1);
  });


  it('Objects that doesn\'t implement interface', () => {
    expect(InterfaceCrud.implements(object1)).toBe(false);
    expect(InterfaceCrud.implements(object2)).toBe(false);
  });

  it('Object that implements interface', () => {
    expect(InterfaceCrud.implements(object3)).toBe(true);
    expect(InterfaceCrud.implements(object4)).toBe(true);
  });
});
