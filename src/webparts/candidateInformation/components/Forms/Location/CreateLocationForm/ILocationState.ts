// ICandidateInformationState.ts
import { ILocation } from "../../../../common/Interfaces/ILocation";


import { IState } from "../../../../common/Interfaces/ILocation";


export interface ILocationState {
    //locationRequest : ILocation;
    Title: string;
    PlantNumber: number;
    PlantAddress: string;
    ManufacturingPlant: string;
    State: string;
    BusinessArea: number;
    CompanyCode: number;
    Pan: string;
    stateList: IState[];
    Gstin: string;
    errors: string[];
    isLoading: boolean;
    buttonDisabled: boolean;
}