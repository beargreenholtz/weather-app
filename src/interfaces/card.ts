interface ICoordinates {
  longitude: number;
  latitude: number;
  name: string;
}

interface ICityData {
  dates: string[];
  temperature: number[];
}

export interface ICard {
  coordinates: ICoordinates;
  cityData: ICityData;
}
