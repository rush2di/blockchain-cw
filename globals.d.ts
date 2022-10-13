/// ========= Modules declations ==========

declare module "uuid";
declare module "shortid";

/// ========= Provider fix ===========

/// refrence to etheruem in 'Window'
interface Window {
  ethereum: any;
}
