import pathToRegexp from 'path-to-regexp';
import { BaseMenuProps } from './BaseMenu';
import { MenuDataItem } from '../typings';
import { urlToList } from '../utils/pathTools';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */

// {
//   authority?: string[] | string;
//   children?: MenuDataItem[];
//   hideChildrenInMenu?: boolean;
//   hideInMenu?: boolean;
//   icon?: string;
//   locale?: string;
//   name?: string;
//   path: string;
//   [key: string]: any;
// }
export const getFlatMenuKeys = (menuData = []) => {
  let keys = [];
  menuData.forEach((item) => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

export const getMenuMatches = (flatMenuKeys, path) =>
  flatMenuKeys.filter((item) => item && pathToRegexp(item).test(path));

/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = (props) => {
  const { location = { pathname: '/' }, flatMenuKeys } = props;
  return urlToList(location.pathname)
    .map((item) => getMenuMatches(flatMenuKeys, item)[0])
    .filter((item) => item)
    .reduce((acc, curr) => [...acc, curr], ['/']);
};
