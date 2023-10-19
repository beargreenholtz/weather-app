export type TCoordinates = {
  longitude: number;
  latitude: number;
  name: string;
};

export type TCityData = {
  dates: string[];
  temperature: number[];
};

export type TCard = {
  coordinates: TCoordinates;
  cityData: TCityData;
};
