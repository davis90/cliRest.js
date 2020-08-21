const fnctypes = ['[object GeneratorFunction]', '[object Function]', '[object Proxy]', '[object AsyncFunction]'];

export default (value) => fnctypes.includes(Object.prototype.toString.call(value));
