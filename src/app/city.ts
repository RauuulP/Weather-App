export interface City {
  city: string;
  continent: string;
  tempMax: Number;
  tempAverageMax: Number;
  tempMin: Number;
  tempAverageMin: Number;
  precipitation: Number[];
  isFavourite?: boolean;
}
