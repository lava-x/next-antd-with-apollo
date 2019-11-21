/* eslint-disable no-plusplus */
export const eraseCookieFromAllPaths = name => {
  // This function will attempt to remove a cookie from all paths.
  // eslint-disable-next-line no-restricted-globals
  const pathBits = location.pathname.split("/");
  let pathCurrent = " path=";
  // do a simple pathless delete first.
  document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
  for (let i = 0; i < pathBits.length; i++) {
    pathCurrent += (pathCurrent.substr(-1) !== "/" ? "/" : "") + pathBits[i];
    document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;${pathCurrent};`;
  }
};

export const constructAddress = address => {
  if (!address) {
    return "";
  }
  return `${address.address1}, ${
    address.address2 ? `${address.address2},` : ""
  } ${address.zipcode} ${address.city}, ${address.state}.`;
};

export default {
  eraseCookieFromAllPaths,
  constructAddress
};
