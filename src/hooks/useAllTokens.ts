import { Token } from "entities/Token";

export function useAllTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList();
  return useTokensFromMap(allTokens, true);
}
