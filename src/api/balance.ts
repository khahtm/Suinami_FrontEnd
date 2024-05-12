import { request } from "api";

export async function getBalance(walletAddress: string = '', coinType: string | null = null) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_getBalance",
    params: [walletAddress, coinType],
  };
  const result = await request.post("", body);
  return result.data.result;
}

export async function getSuiSystemState() {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_getSuiSystemState",
  };
  const result = await request.post("", body);
  return result.data.result;
}

export async function suiCoinMetadata(coinType: string) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_getCoinMetadata",
    params: [coinType],
  };
  const result = await request.post("", body);
  return result.data.result;
}

export async function getObject(object: string) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_getObject",
    params: [object],
  };
  const result = await request.post("", body);
  return result.data.result;
}

