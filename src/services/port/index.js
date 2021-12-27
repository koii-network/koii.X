import { PoRT } from "@_koi/port";
let port = new PoRT({
  trustedNodeAddress: process.env.REACT_APP_NODE_URL,
  node: 5
});

export default port;
