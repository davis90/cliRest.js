import isObject from '@/utils/isObject';

function deepMergeObjects(...sources) {
  const filteredSources = sources.filter(isObject);
  const result = {};
  filteredSources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        const sourceTomerge = isObject(result[key]) ? result[key] : {};
        result[key] = deepMergeObjects(sourceTomerge, source[key]);
      } else if (Array.isArray(source[key])) {
        const sourceTomerge = Array.isArray(result[key]) ? result[key] : [];
        result[key] = deepMergeArrays(sourceTomerge, source[key]); // eslint-disable-line no-use-before-define
      } else {
        result[key] = source[key];
      }
    });
  });
  return result;
}

function deepMergeArrays(...sources) {
  const filteredSources = sources.filter(Array.isArray);
  const result = [];
  filteredSources.forEach((source) => {
    source.forEach((entry, ind) => {
      if (isObject(entry)) {
        const sourceTomerge = isObject(result[ind]) ? result[ind] : {};
        result[ind] = deepMergeObjects(sourceTomerge, entry);
      } else if (Array.isArray(entry)) {
        const sourceTomerge = Array.isArray(result[ind]) ? result[ind] : [];
        result[ind] = deepMergeArrays(sourceTomerge, entry);
      } else {
        result[ind] = entry;
      }
    });
  });
  return result;
}

export default (firstCrud, secondCrud) => deepMergeObjects(firstCrud, secondCrud);
