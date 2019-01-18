import { WebPartContext } from '@microsoft/sp-webpart-base';



export interface ILocationTaskReadFormProps {
  Title: string;
  PlantNumber: number;
  PlantAddress: string;
  ManufacturingPlant: string;
  State: string;
  BusinessArea: number;
  CompanyCode: number;
  Pan: string;
  Gstin: string;
  showLocationCodeField: boolean;
  onBusinessAreaChange(e: string): void;  // method passed   
  _updateBusinessArea(): void; // method passed
  successCreation: string;
  buttonDisabled: boolean;
  context: WebPartContext;
}