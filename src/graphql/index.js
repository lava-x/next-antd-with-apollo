import lodash from 'lodash';
import typeDefinition from 'graphql/typeDefs';

const files = {
  queries: {},
  mutations: {},
  subscriptions: {},
  resolvers: {},
};

const extractForExport = (type) => {
  concatFiles(type, getFilesFromDirectory(type));
};

const getFilesFromDirectory = (type) => {
  switch (type) {
    case 'queries':
      return require.context('./queries/', false, /\.js$/);
    case 'mutations':
      return require.context('./mutations/', false, /\.js$/);
    case 'subscriptions':
      return require.context('./subscriptions/', false, /\.js$/);
    case 'resolvers':
      return require.context('./resolvers/', false, /\.js$/);
  }
};

const concatFiles = (type, req) => {
  req.keys().forEach((key, index) => {
    if (type === 'resolvers') {
      files[type] = lodash.merge(files[type], req(key).default);
      return;
    }
    const storeName = key.replace(/^.*(\\|\/|\|js|:)/, '').split('.')[0];
    files[type][storeName] = req(key).default;
  });
};

extractForExport('queries');
extractForExport('mutations');
extractForExport('subscriptions');
extractForExport('resolvers');

export const queries = files.queries;
export const mutations = files.mutations;
export const subscriptions = files.subscriptions;
export const resolvers = files.resolvers;
export const typeDefs = typeDefinition;
export default { ...files, typeDefs: typeDefinition };
