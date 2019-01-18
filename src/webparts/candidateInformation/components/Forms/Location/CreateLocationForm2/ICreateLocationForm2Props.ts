// ICreateLocationForm2Props
import {IQuestionSet}   from "../../../../common/Interfaces/IQuestionSet";
import { WebPartContext } from '@microsoft/sp-webpart-base';


export interface ICreateLocationForm2Props {
    questionSet: IQuestionSet[];
    _handleToggleChange(e: boolean, qId: number): void;   // method passed to
    showHideComponent(compId: number): void; // method passed
    _createRequest(): void; // method passed
    _onSelectDate(e: Date, qId: number): void;  // method passed
    _handleFileChange(fileArray: FileList, qId: number):void;
     successCreation: string;
     buttonDisabled: boolean;
     context: WebPartContext;   
}
