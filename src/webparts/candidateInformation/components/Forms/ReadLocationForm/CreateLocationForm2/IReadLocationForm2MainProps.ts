// ICreateLocationForm2Props
import {IQuestionSet}   from "../../../../common/Interfaces/IQuestionSet";
import { WebPartContext } from '@microsoft/sp-webpart-base';


export interface IReadLocationForm2MainProps {
    questionSet: IQuestionSet[];
    showHideComponent(compId: number): void; // method passed
    successCreation: string;
    buttonDisabled: boolean;
    userGroup: string;
    showApprovalButton: boolean;
    _updateApproval(decision:string): void;
    context: WebPartContext;   
}
