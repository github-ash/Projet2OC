import { OlympicParticipation } from './olympic-participation.model';

export interface OlympicCountry {
  id: number;
  country: string;
  participations: OlympicParticipation[];
}
