// 

import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { WebPartContext } from '@microsoft/sp-webpart-base';


export interface IRequest
{
    key: number;
    text: string;
}




export interface IRequestTypeFormProps
{
    RequestList: IRequest[];
    RequestTypeError: string;
    onRequestChange(e: IDropdownOption): void; // method passed
    _changeForm(newForm: string): void;  // method passed to change the form
    context: WebPartContext;
}

