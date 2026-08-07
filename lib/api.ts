const PHASE_ONE =
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";
const PHASE_TWO =
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

export type PhaseOneResponse = {
  success: boolean;
  message?: string;
};

export type PhaseTwoResponse = {
  success: boolean;
  message?: string;
  data?: {
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  };
};

export async function submitPhaseOne(
  name: string,
  location: string,
): Promise<PhaseOneResponse> {
  const response = await fetch(PHASE_ONE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, location }),
  });
  return response.json();
}

export async function submitPhaseTwo(
  imageBase64: string,
): Promise<PhaseTwoResponse> {
  const response = await fetch(PHASE_TWO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageBase64 }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

/** Strip data-URL prefix if present; API expects raw base64. */
export function toRawBase64(dataUrlOrBase64: string): string {
  return dataUrlOrBase64.includes(",")
    ? dataUrlOrBase64.split(",")[1]
    : dataUrlOrBase64;
}
