/// ========= Modules declations ==========

declare module "uuid";

/// ========= Provider fix ===========

/// refrence to etheruem in 'Window'
interface Window {
  ethereum: any;
}
