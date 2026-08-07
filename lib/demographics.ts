export type DemographicOption = {
  name: string;
  confidence: number;
};

export type DemographicCategory = {
  prediction: string;
  confidence: number;
  options: DemographicOption[];
};

export type DemographicData = {
  race: DemographicCategory;
  age: DemographicCategory;
  sex: DemographicCategory;
};

export type RawDemographicPayload = {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
};

const AGE_ORDER = [
  "0-2",
  "3-9",
  "10-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70+",
];

function mapRaceOptions(race: Record<string, number>): DemographicOption[] {
  return Object.entries(race)
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
      confidence: Math.floor(100 * Number(value)),
    }))
    .sort((a, b) => b.confidence - a.confidence);
}

function mapAgeOptions(age: Record<string, number>): DemographicOption[] {
  return Object.entries(age)
    .map(([key, value]) => ({
      name: key,
      confidence: Math.floor(100 * Number(value)),
    }))
    .sort((a, b) => {
      const ai = AGE_ORDER.indexOf(a.name);
      const bi = AGE_ORDER.indexOf(b.name);
      if (ai === -1 && bi === -1) return b.confidence - a.confidence;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

function mapSexOptions(gender: Record<string, number>): DemographicOption[] {
  return Object.entries(gender)
    .map(([key, value]) => ({
      name: key.toUpperCase(),
      confidence: Math.floor(100 * Number(value)),
    }))
    .sort((a, b) => b.confidence - a.confidence);
}

function topByConfidence(options: DemographicOption[]): DemographicOption {
  return [...options].sort((a, b) => b.confidence - a.confidence)[0] ?? {
    name: "",
    confidence: 0,
  };
}

export function processDemographicData(
  payload: RawDemographicPayload,
): DemographicData {
  const race = mapRaceOptions(payload.race);
  const age = mapAgeOptions(payload.age);
  const sex = mapSexOptions(payload.gender);
  const raceTop = topByConfidence(race);
  const ageTop = topByConfidence(age);
  const sexTop = topByConfidence(sex);

  return {
    race: {
      prediction: raceTop.name,
      confidence: raceTop.confidence,
      options: race,
    },
    age: {
      prediction: ageTop.name,
      confidence: ageTop.confidence,
      options: age,
    },
    sex: {
      prediction: sexTop.name,
      confidence: sexTop.confidence,
      options: sex,
    },
  };
}
