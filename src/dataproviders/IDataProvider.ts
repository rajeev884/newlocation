import { ILocation } from "../webparts/candidateInformation/common/Interfaces/ILocation";

import {IQuestionSet} from '../webparts/candidateInformation/common/Interfaces/IQuestionSet'

export default interface IDataProvider
{
    //validateSettings(): boolean;    
    
    // Fetching all the list names to populate the dropdown
    //readLists(): Promise<IOption[]>; 

    // Reading list items from the list
    getFilteredlistitem(listName: string, itemtitle:any, item: any, itemtitle2?: string, paramSelect?: string, group?: string): Promise<any>;

    readLocation(listName: string, itemId: number): Promise<any>;  

    createUpdateLocation(listName: string, item: ILocation, questionSetList: IQuestionSet[], locationId?: number, userId?: number, Group?: string): Promise<string>;

    getChoiceFieldvalues(listName: string, choiceFieldName: string): Promise<any>;

    getQuestionSets(listName: string): Promise<any>;

    createTask(listName: string, Title: string, Description: string, DueDate: Date, userId: number): Promise<void>;  

    createDocument(LocationId: number, libraryName: string, questionSetList: IQuestionSet, updateStatus? : number): Promise<void>


    updateApproval(listName: string, itemId: number, userGroup: string,decision:string): Promise<string>;
    
    getUserGroups(): Promise<any>;

    updateBusinessArea(listName: string, itemId: number, businessArea: number): Promise<string>;

    createLocationQuestionMapping(listName: string, qId: number, LocationId: number, group: string, qText: string ): Promise<void>;

    resolvePromiseArray(promiseArray): Promise<any>;
}


