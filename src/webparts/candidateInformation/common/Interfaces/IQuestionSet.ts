	// create Question Set item to work with it internally
        
    
   /*  interface IGroupsAllowed
    {


    } */
    
    
    export interface IQuestionSet {
        questionId: number;
        questionText: string;
        taskFlag: boolean;
        dueDate: Date;
        document: any,
        documentPresent: boolean;
        datePickerHidden: boolean;
        fileUploadHidden: boolean;
        defaultDocument?: boolean;
        docLink?: string;
        docName?: string;
        groupsAllowed?: string[];
        //_handleToggleChange(e: boolean, qId: number): void;   // method passed to   
        }
    