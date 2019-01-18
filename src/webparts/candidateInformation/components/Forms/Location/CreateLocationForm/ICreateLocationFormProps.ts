// IPackagingRequestsProps
/* import IDataProvider   from "../../../../../../dataproviders/IDataProvider";

export interface ILocationProps {
  locationRequestId : number;
  dataProvider: IDataProvider;
  _changeForm(newForm: string): void;  // method passed to change the form
} */

import { IState } from "../../../../common/Interfaces/ILocation";

import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { WebPartContext } from '@microsoft/sp-webpart-base';


export interface ICreateLocationFormProps {

  stateList: IState[];
  RequestType: string;
  onTitleChange(e: string): void;  // method passed   
  onPlantNumberChange(e: number): void;  // method passed   
  onPlantAddressChange(e: string): void;  // method passed   
  onManufacturingPlantChange(e: string): void;  // method passed   
  onStateChange(e: string): void;  // method passed   
  onBusinessAreaChange(e: string): void;  // method passed   
  onCompanyCodeChange(e: number): void;  // method passed   
  onPanChange(e: string): void;  // method passed   
  onGstinChange(e: string): void;  // method passed 
  onStateChange(e: IDropdownOption): void; // method passed
  //createRequest(): void; // method passed
  showHideComponent(compId: number): void; // method passed
  context: WebPartContext;
}