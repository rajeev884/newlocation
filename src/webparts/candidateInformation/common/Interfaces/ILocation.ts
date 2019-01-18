// Location Code Model


export interface IState
{
    key: number;
    text: string;
}

export  interface ILocation  {
    Title: string;
    PlantNumber: number;
    PlantAddress: string;
    ManufacturingPlant: string;
    State: string;
    BusinessArea: number;
    CompanyCode: number;
    Pan: string;
    Gstin: string;
    RequestType? : string;
    //stateList: IState[];
    }