import { WebPartContext } from '@microsoft/sp-webpart-base';


export interface IReadLocationFormProps {
  Title: string;
  PlantNumber: number;
  PlantAddress: string;
  ManufacturingPlant: string;
  State: string;
  BusinessArea: number;
  CompanyCode: number;
  Pan: string;
  Gstin: string;
  userGroup: string;
  RequestType: string;
  context: WebPartContext;
  //createRequest(): void; // method passed
  showHideComponent(compId: number): void; // method passed
}