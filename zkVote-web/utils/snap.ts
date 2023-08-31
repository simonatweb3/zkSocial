declare const window: any;
export const defaultSnapOrigin = `npm:zkvote-snap`;
// export const defaultSnapOrigin = `local:http://localhost:7070`;
export type GetSnapsResponse = Record<string, Snap>;
export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  console.log("Connecting to snap", snapId, params)
  console.log("window.ethereum", window.ethereum)
  await window.ethereum.request({
  
    method: 'wallet_requestSnaps',
    params: { [snapId]: { version: '0.8.0', }, },
    // params: { [snapId]: { ...params, }, },
  });
  console.log("heyyyo")
  return true;
};

export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();
    return Object.values(snaps).find(
      (snap) => snap.id === defaultSnapOrigin && (!version || snap.version === version),);
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export function requestSnap(
  method: string,
  params?: unknown[],
): Promise<unknown> {
  const result = window.ethereum.request({
    method : "wallet_invokeSnap",
    params : {
      snapId : defaultSnapOrigin,
      // defaultSnapOrigin,
      request : { method : method, params : params}
    }
  });
  console.log({ method, params, result });
  return result;
}
