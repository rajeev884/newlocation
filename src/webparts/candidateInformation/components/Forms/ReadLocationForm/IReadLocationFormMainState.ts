// ICandidateInformationState.ts
import { ILocation } from "../../../common/Interfaces/ILocation";


import { IState } from "../../../common/Interfaces/ILocation";

import {IQuestionSet} from '../../../common/Interfaces/IQuestionSet'

import {IddOption} from '../../../common/Interfaces/IddOption'


export interface ITask {

    LocationId: number;
    QId: number;
    QText: string
}

export interface IReadLocationFormMainState {
    //locationRequest : ILocation;
    Title: string;
    PlantNumber: number;
    PlantAddress: string;
    ManufacturingPlant: string;
    State: string;
    RequestType: string;
    RequestTypeError: string;
    BusinessArea: number;
    CompanyCode: number;
    Pan: string;
    stateList: IState[];
    taskList: ITask[];
    Gstin: string;
    errors: string[];
    isLoading: boolean;
    buttonDisabled: boolean;
    getStateQuestionListFlag: boolean, 
    taskCount: number;   //toggleYesCounter
    fileCount: number;   //toggleNoCounter
    questionSet: IQuestionSet[];
    currentForm: string;
    requestTypeList: IddOption[];
    successCreation: string;
    showEditButton: boolean;
    userGroup: string;
    showApprovalButton: boolean;
}