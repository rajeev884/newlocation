// locationRequestForm Component , parent component: CandidateInformation

import * as React from 'react';
import styles from './Location.module.scss';
import {
  TextField,
  Button,
  DefaultButton,
  ButtonType,
  Spinner,
  SpinnerSize,
  findIndex
} from 'office-ui-fabric-react';
import * as bootstrap from 'bootstrap';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
//import {ILocationProps} from './CreateLocationFormMainProps';
import {IReadLocationFormMainState} from './IReadLocationFormMainState';
import {IReadLocationFormMainProps} from './IReadLocationFormMainProps';
import { IddOption } from "../../../common/Interfaces/IddOption";
import { ILocation, IState } from "../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
import ReadLocationForm from './ReadLocationForm/ReadLocationForm';
import ReadLocationForm2Main from './CreateLocationForm2/ReadLocationForm2Main';
//import RequestTypeForm from './CreateLocationForm/RequestType/RequestTypeForm';
import * as $ from 'jquery';
import { IQuestionSet } from '../../../common/Interfaces/IQuestionSet';
import pnp from "sp-pnp-js/lib/pnp";

// import pnp and pnp logging system


    export default class CreateLocationFormMain extends React.Component<IReadLocationFormMainProps,IReadLocationFormMainState> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: any) {

        // initial component states will be here
      super(props);
        // load all css files from sharepoint
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/mdb.min.css?csf=1&e=5qqSqO');
        SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/style.css?csf=1&e=dpWYOr');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/layout.min.css?csf=1&e=B9Yjly');
  
      this.state = {
        Title: '',
        PlantNumber: null,
        PlantAddress: '',
        ManufacturingPlant: '',
        State: '',
        RequestType: '',
        RequestTypeError: '',
        BusinessArea: null,
        CompanyCode: null,
        Pan: '',
        Gstin: '',
        stateList: [],
        errors: [],
        isLoading: true,
        buttonDisabled: false,
        taskCount: 0,
        fileCount: 0,
        currentForm: 'RequestTypeForm',
        requestTypeList: [],
        taskList: [],
        getStateQuestionListFlag: false,
        questionSet:[],
        successCreation: '',
        showEditButton: false,
        userGroup: '',
        showApprovalButton: false
       
      };    

          // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
}
    
   componentDidMount()
   {
      this._getLocationDetails();
      //this.questionlink();
   }


 
    
  public render() {
    let currentForm = this.state.currentForm;
    let formComponent: any;
/*     formComponent =  <RequestTypeForm RequestList= {this.state.requestTypeList} RequestTypeError= {this.state.RequestTypeError} _changeForm= {this._changeForm} onRequestChange= {this.onRequestChange}/>  
 */
    if (this.state.isLoading) {
      if (SpinnerSize && SpinnerSize.large) {
        return (
        <div className={styles.Forms}>
        <div className={styles.loadingWrapper}>
          <Spinner size={SpinnerSize.large} label='Loading Please Wait...' />
        </div>
        </div>
       );
      }
    }
    else
    {
      formComponent= <div>
        <div id="CreateLocationForm">
        <div className={styles.row}>
        <div className={styles.column} >
        {
this.state.showEditButton == true ?
<div>
<DefaultButton
primary={ true }
data-automation-id='test'
text='Edit'
//disabled= {this.props._changeForm('UpdateLocationFormMain')}
onClick= {() => this.props._changeForm('UpdateLocationFormMain') }
/> 
</div>
: null
}
        </div>
           </div>
         <ReadLocationForm  
         Title=  {this.state.Title} 
         PlantNumber = {this.state.PlantNumber} 
         PlantAddress = {this.state.PlantAddress} 
         ManufacturingPlant= {this.state.ManufacturingPlant} 
         State= {this.state.State} 
         BusinessArea= {this.state.BusinessArea} 
         CompanyCode= {this.state.CompanyCode} 
         Pan = {this.state.Pan} 
         Gstin = {this.state.Pan} 
         showHideComponent={this.showHideComponent} 
         userGroup={this.state.userGroup}
         RequestType={this.state.RequestType}
         context={this.props.context}
         />
        </div>
         <div id="CreateLocationForm2Main" className={styles.hidden}>
         <div>
         </div>
         <div>
         </div>
          <ReadLocationForm2Main 
          questionSet = {this.state.questionSet} 
          showHideComponent={this.showHideComponent} 
          successCreation = {this.state.successCreation} 
          _updateApproval = {this._updateApproval} 
          buttonDisabled = {this.state.buttonDisabled} 
          userGroup = {this.state.userGroup} 
          showApprovalButton = {this.state.showApprovalButton} 
          context={this.props.context}
          />
           </div> 
          </div> 
        return formComponent; 
      }
    }


  // async functions were introduced with ES3/ES5 native support in TypeScript 2.1
  // https://blogs.msdn.microsoft.com/typescript/2016/12/07/announcing-typescript-2-1/
  // async function always return a Promise, on this scenario we return void Promise
  //   because we will not need it as we are directly setting the Component´s state

    @autobind
    private showHideComponent(compId: number) {
      console.log("showHideComponent called with" + compId)
      if(compId==1)
      {
        $("#CreateLocationForm").hide();
        $("#CreateLocationForm2Main").show();        
      }
      else
      {
        $("#CreateLocationForm").show();
        $("#CreateLocationForm2Main").hide();    
      }
    }

    public getStateQuestionList = (): void => {
      this.props.dataProvider.getChoiceFieldvalues("Plant", "State" ).then(
        //resolve
        (response: any) => {
        console.log("response for states is" + JSON.stringify(response));
        console.log(response.Choices);
        let stateArray: IState[] = [];
        let questionArray: IQuestionSet[] = [];
        //let requestFlag: boolean;
        for(var i = 0;i<response.Choices.length;i++) {
          //console.log(result[i].ID);
          //console.log(result[i].Title);
          let item: IState = {key: i, text: response.Choices[i]  };
          //item.key = result[i].ID;
          //item.text = result[i].Title;
          stateArray[i]   = item;
        }

        this.props.dataProvider.getQuestionSets("QuestionMaster").then(
            (response: any) => {
              console.log("response for getQuestionSets is" + JSON.stringify(response));
              console.log("response for getQuestionSets response.RequestType is" + JSON.stringify(response.RequestType));
          for(var i = 0;i<response.length;i++) {
            console.log(response[i].ID);
            console.log(response[i].Question);
             for(var j = 0;j<response[i].RequestType.length;j++) {
              if(this.state.RequestType==response[i].RequestType[j])         // Filtering the Array
              {
                let item: IQuestionSet = {questionId: response[i].ID, questionText: response[i].Question, taskFlag: true, datePickerHidden: false, fileUploadHidden: true, dueDate: null, document: null, documentPresent: false};
                questionArray.push(item);    
                console.log("question array is" + JSON.stringify(questionArray));
                console.log("new questionset array" + response)
                  }
            } 
          /*   let item: IQuestionSet = {questionId: response[i].ID, questionText: response[i].Question, taskFlag: true, datePickerHidden: false, fileUploadHidden: true, dueDate: null, document: null};
            questionArray[i] = item;    
            console.log("question array is" + JSON.stringify(questionArray));
            console.log("new questionset array" + response) */
      }
        this.setState({
          stateList: stateArray,
          questionSet: questionArray,
          taskCount: questionArray.length,
          isLoading: false,
          getStateQuestionListFlag: false
        });
        console.log('pppp',this.state)
      }
         )
      }  
      )
        }
          
          private async _getLocationDetails(): Promise<void> {
            let showButton= false;
            let approvalbutton = false; 
            let userGroup: string;
            let siteUrl = this.props.context.pageContext.web.absoluteUrl;
            this.props.dataProvider.readLocation("Plant", this.props.locationId).then(
              //resolve
              (response: any) => {
                console.log("Response for Address" , response)
                console.log("Address object is" , response);
                console.log("Gstin is" , response.Gstin);
            this.props.dataProvider.getUserGroups().then(
              (result: any) => {
                console.log('result for getusergroups is' ,result);
              //for Read Form
              for(let i =0; i<result.length;i++)
              {
                if(result[i].LoginName == 'CommHead')
                {
                  showButton = true;
                  userGroup = 'CommHead'
                  break;
                }
                else if(result[i].LoginName == 'SCM')
                {
                  console.log(approvalbutton,'SCMapprovalbutton',response)
                  approvalbutton =  response.SCM && response.SCM == 'Pending'?true:false;
                  userGroup = 'SCM'
                  break;
                }
                else if(result[i].LoginName == 'Accounts')
                {
                  console.log(approvalbutton,'Accountapprovalbutton',response)
                  approvalbutton =  response.Accounts && response.Accounts == 'Pending'?true:false;
                  userGroup = 'Accounts'
                  break;
                }
                else if(result[i].LoginName == 'Legal')
                {
                  console.log(approvalbutton,'legalapprovalbutton',response)
                  approvalbutton =  response.Legal && response.Legal == 'Pending'?true:false;
                  userGroup = 'Legal'
                  break;
                }
              }
              console.log('request type is', response.RequestType)
              if(userGroup=='CommHead')
              {
                this.setState({
                  Title: response.Title,
                  PlantNumber: response.PlantNumber,
                  PlantAddress: response.PlantAddress,
                  ManufacturingPlant: response.ManufacturingPlant,
                  State: response.State,
                  BusinessArea: response.BusinessArea,
                  CompanyCode: response.CompanyCode,
                  Pan: response.PAN,
                  Gstin: response.GSTIN,
                  RequestType: response.RequestType,
                  isLoading: false,
                  showEditButton: showButton,
                  showApprovalButton: approvalbutton,
                  userGroup: userGroup
                  });
              }
              else
              {
                var array1=[];
                var arrayFileDetail = [];
                this.props.dataProvider.getFilteredlistitem("Documents","LocationId", this.props.locationId, 'getFileNames')
                .then(result => {
                 arrayFileDetail = result;
                 console.log('result for arrayFileDetail is', arrayFileDetail);
                 this.props.dataProvider.getFilteredlistitem("LocationQuestionMapping","LocationId", this.props.locationId, '', 'group', userGroup)
                 .then(response1 => {
                     console.log(response1.value,'localoca',this);
                     response1.value.forEach((val,index) =>{
                       this.props.dataProvider.getFilteredlistitem("QuestionMaster","ID", val.QuestionId)
                       .then(response2=>{
                           console.log(response2.value,'quesques',this);
                           array1.push(response2.value[0]);
                           this.props.dataProvider.getFilteredlistitem("Documents","LocationId", this.props.locationId)
                           .then(response3=>{
                            console.log('response 3 is', response3);
                           var finalarray=array1.map((obj) =>{ 
                               var links=response3.value.filter(item => item.QuestionId == obj.ID);
                               var fileObject=result.value.filter(item => item.QuestionId == obj.ID);
                               console.log('fileobject is', fileObject)
                               console.log('fileobject name is', fileObject.length?fileObject[0].File.Name:'')
                               interface Idocument
                               {
                                 docLink: string;
                                 docName: string;
                               } 
                               
                               //let documentLink: string;
                               let previewUrl: string;

                               if(links.length>0)
                               {
                                 if(links[0].ServerRedirectedEmbedUri==null)
                                 {
                                   // for .png files
                                   console.log('siteurl is' + siteUrl);
                                   previewUrl = siteUrl + '/_layouts/15/getpreview.ashx?path=' +
                                   siteUrl + '/Shared%20Documents/';
                                   
                                   console.log('preview url is', previewUrl);

                                   let fileName = fileObject.length?fileObject[0].File.Name:'';

                                   console.log('fileName is', fileName);

                                   previewUrl = previewUrl + fileName; 
                                   console.log('new preview url is', previewUrl);

                                 }
                               }
                               let documentObj: Idocument =
                               {
                                 docLink : links.length?links[0].ServerRedirectedEmbedUri==null?previewUrl:links[0].ServerRedirectedEmbedUri:' ',
                                 docName : fileObject.length?fileObject[0].File.Name:''
                               }
                               return {  
                                 questionId:obj.ID,
                                 questionText: obj.Question,
                                 taskFlag: true, 
                                 dueDate: null,
                                 document: null, 
                                 documentPresent: fileObject.length?true:false,
                                 datePickerHidden: true,
                                 fileUploadHidden: true,
                                 defaultDocument: fileObject.length?true:false,
                                 groupsAllowed: obj.GroupsAllowed,
                                 docLink: documentObj.docLink,
                                 docName: documentObj.docName,
                               } 
                             }).sort((a, b) =>{return a.questionId - b.questionId; });
                             console.log(finalarray,'finalarray',this);
                             this.setState({
                               questionSet:finalarray,
                               Title: response.Title,
                               PlantNumber: response.PlantNumber,
                               PlantAddress: response.PlantAddress,
                               ManufacturingPlant: response.ManufacturingPlant,
                               State: response.State,
                               BusinessArea: response.BusinessArea,
                               CompanyCode: response.CompanyCode,
                               Pan: response.PAN,
                               Gstin: response.GSTIN,
                               isLoading: false,
                               taskCount: response2.length>result.length?response2.length-result.length:result.length-response2.length,
                               //buttonDisabled: response.Approval_x0020_Status=='Functional'?true:false
                               //showEditButton: showButton,
                               userGroup: userGroup,
                               showApprovalButton: approvalbutton
                               });
                           })
                       })
                     })
                   })   
               })
              }
            })
        },
            ).catch((ex) => {
              console.log(ex);
            /*   this.setState({
                allDocuments: [],
                displayedDocuments: [],
                isLoading: false,
                isErrorOccured: true,
                errorMessage: ex.errorMessage
              }); */
        
            });
              }
              
              @autobind
              private async _updateApproval(decision:string): Promise<void> {
                if(decision=='Approve'){
                  console.log("Approval",decision);
                   this.props.dataProvider.updateApproval("Plant", this.props.locationId, this.state.userGroup,'Approved').then(
                  (successMessage: any) => {
                    console.log("Response for _updateApproval: " + successMessage)
                    this.setState({
                      buttonDisabled: true,
                      successCreation: successMessage
                    });
                },                 
                  (data: any) => {
                 
                  }
                ).catch((ex) => {
                  console.log(ex);              
                });
                }

                else if(decision=='Reject'){
                  console.log("Approval",decision);
                   this.props.dataProvider.updateApproval("Plant", this.props.locationId, this.state.userGroup,'Rejected').then(
                  (successMessage: any) => {
                    console.log("Response for _updateApproval: " + successMessage);

                    //mail initiator

                    
                    this.setState({
                      buttonDisabled: true,
                      successCreation: successMessage
                    });
                },                 
                  (data: any) => {
                 
                  }
                ).catch((ex) => {
                  console.log(ex);              
                });
                }
            
              }

  @autobind
  private _findArrayPosition(questionSet: IQuestionSet[],qId: number): number
  {
    console.log("entered _findArrayPosition qid is: " + qId + "quesionset is" + questionSet);
    let positionQuestionSet: number;
    /* questionSet.forEach(function (item) {
      console.log(item);
      if(item.questionId==qId)
      {
        positionQuestionSet = findIndex(item, 1);
        break;
      }
  }); */
    for(let i=0;i<questionSet.length;i++)
    {
      if(questionSet[i].questionId==qId)
      {
        positionQuestionSet = i;
        break;
      }
    }  
    return positionQuestionSet;
  }

   // handler Files

            @autobind
            private findCountInArray(Array: IQuestionSet[], param: string ): number {
              console.log("Entered findCountInArray and IQuestionSet Array is" + Array + "And Param is " + param );
              let count: number = 0;
              if(param == 'DueDate')
              {
                for(let i =0;i<Array.length;i++)
                {
                  if(Array[i].dueDate != null)
                  {
                    count = count + 1;
                  }
                }
              }
              else
              {
                for(let i =0;i<Array.length;i++)
                {
                  if(Array[i].document != null)
                  {
                    count = count + 1;
                  }
                }
              }
              return count;
              }
}