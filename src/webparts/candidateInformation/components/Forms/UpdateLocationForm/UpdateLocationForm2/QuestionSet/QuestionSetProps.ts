import { WebPartContext } from '@microsoft/sp-webpart-base';



export interface IQuestionSetProps {
    questionId: number;
    questionText: string;
    dueDate: Date;
    documentPresent: boolean;
    document: any;
    datePickerHidden: boolean;
    fileUploadHidden: boolean;
    taskFlag: boolean;
    docLink: string;
    docName: string; 
    defaultDocument: boolean;
    _handleToggleChange(e: boolean, qId: number): void;  // method passed to change the form
    _onSelectDate(e: Date, qId: number): void;  // method passed
    _handleFileChange(e: any, qId: number):void;
    context: WebPartContext;   
    }