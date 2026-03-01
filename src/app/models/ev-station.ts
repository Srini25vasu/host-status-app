import { EvStationStatus } from "../enums/ev-station";

export interface EvStation {
    id: number;
    name: string;
    location: Location;
    status: EvStationStatus;
};

