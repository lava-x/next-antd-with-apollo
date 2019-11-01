import lodash from 'lodash';
import typeDefinition from 'graphql/typeDefs';

const files = {
  queries: {},
  mutations: {},
  subscriptions: {},
  resolvers: {},
};

const concatFiles = (type, req) => {
  req.keys().forEach((key /* , index */) => {
    if (type === 'resolvers') {
      files[type] = lodash.merge(files[type], req(key).default);
      return;
    }
    const storeName = key.replace(/^.*(\\|\/|\|js|:)/, '').split('.')[0];
    files[type][storeName] = req(key).default;
  });
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
    default:
      return null;
  }
};

const extractForExport = (type) => {
  const filesFromDirectory = getFilesFromDirectory(type);
  if (!filesFromDirectory) {
    throw new Error(`Invalid graphql files for type ${type}`);
  }
  concatFiles(type, filesFromDirectory);
};

extractForExport('queries');
extractForExport('mutations');
extractForExport('subscriptions');
extractForExport('resolvers');

export const { queries } = files;
export const { mutations } = files;
export const { subscriptions } = files;
export const { resolvers } = files;
export const typeDefs = typeDefinition;
export default { ...files, typeDefs: typeDefinition };
