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
import {IUpdateLocationFormMainState} from './IUpdateLocationFormMainState';
import {IUpdateLocationFormMainProps} from './IUpdateLocationFormMainProps';
import { IddOption } from "../../../common/Interfaces/IddOption";
import { ILocation, IState } from "../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
import UpdateLocationForm from './UpdateLocationForm/UpdateLocationForm';
import UpdateLocationForm2Main from './UpdateLocationForm2/UpdateLocationForm2Main';
//import RequestTypeForm from './CreateLocationForm/RequestType/RequestTypeForm';
import * as $ from 'jquery';
import { IQuestionSet } from '../../../common/Interfaces/IQuestionSet';


// import pnp and pnp logging system


    export default class CreateLocationFormMain extends React.Component<IUpdateLocationFormMainProps,IUpdateLocationFormMainState> {
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
        disabelPlantCodeField: true,
        successCreation: null
      };    

          // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
}
    
   componentDidMount()
   {
      //this.getRequestTypeList()
      this._getLocationDetails();
   }

   componentDidUpdate()
   {
    if(this.state.getStateQuestionListFlag)
    {
      //this.getStateQuestionList();    
    } 
    }
 
    
  public render() {
    let currentForm = this.state.currentForm;
    let formComponent: any;
    if (this.state.isLoading) {
      if (SpinnerSize && SpinnerSize.large) {
        return (
        <div className={styles.Forms}>
        <div className={styles.loadingWrapper} style={{display:'block'}}>
          <Spinner size={SpinnerSize.large} label='Loading Please Wait...' />
         
        </div>
        </div>
       );
      }
    }
    else
    {
        formComponent = 
        <div>
        <div id="CreateLocationForm">
        <UpdateLocationForm 
        Title=  {this.state.Title} 
        PlantNumber = {this.state.PlantNumber} 
        PlantAddress = {this.state.PlantAddress} 
        ManufacturingPlant= {this.state.ManufacturingPlant} 
        State= {this.state.State} 
        BusinessArea= {this.state.BusinessArea} 
        CompanyCode= {this.state.CompanyCode} 
        Pan = {this.state.Pan} 
        Gstin = {this.state.Pan} 
        onTitleChange={this.onTitleChange} 
        onPlantNumberChange={this.onPlantNumberChange} 
        onPlantAddressChange={this.onPlantAddressChange} 
        onManufacturingPlantChange={this.onManufacturingPlantChange} 
        onStateChange= {this.onStateChange} 
        onBusinessAreaChange={this.onBusinessAreaChange} 
        onCompanyCodeChange={this.onCompanyCodeChange} 
        onPanChange={this.onPanChange} 
        onGstinChange={this.onGstinChange} 
        stateList={this.state.stateList} 
        showHideComponent={this.showHideComponent} 
        context = {this.props.context}
        />
        </div>
         <div id="CreateLocationForm2Main" className={styles.hidden}>
         <div>
         </div>
         <div>
         </div>
         <UpdateLocationForm2Main 
         questionSet = {this.state.questionSet} 
         _handleToggleChange = {this._handleToggleChange} 
         showHideComponent={this.showHideComponent} 
         _createRequest={this._createRequest} 
         _onSelectDate={this._onSelectDate} 
         _handleFileChange={this._handleFileChange} 
         successCreation = {this.state.successCreation} 
         buttonDisabled = {this.state.buttonDisabled} 
         context = {this.props.context}
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

           //Get Location Details Request

           @autobind
           private async _getLocationDetails(): Promise<void> {
            let siteUrl = this.props.context.pageContext.web.absoluteUrl;
             this.props.dataProvider.readLocation("Plant", this.props.locationId).then(
               //resolve
               (response: any) => {
                this.props.dataProvider.getChoiceFieldvalues("Plant", "State" ).then(
                  //resolve
                  (result: any) => {
                  console.log("response for states is" + JSON.stringify(result));
                  console.log(result.Choices);
                  let stateArray: IState[] = [];
                  let questionArray: IQuestionSet[] = [];
                  //let requestFlag: boolean;
                  for(var i = 0;i<result.Choices.length;i++) {
                    //console.log(result[i].ID);
                    //console.log(result[i].Title);
                    let item: IState = {key: i, text: result.Choices[i]  };
                    //item.key = result[i].ID;
                    //item.text = result[i].Title;
                    stateArray[i]   = item;
                  }
                  let stateId = (stateArray.indexOf(response.State)).toString();
                  console.log("Response for Plant" + JSON.stringify(response))

                  console.log("Plant object is" + response);
                  console.log("Gstin is" + response.GSTIN);
                  console.log("State is" + response.State);

                 var array1=[];
                 var arrayFileDetail = [];
                 this.props.dataProvider.getFilteredlistitem("Documents","LocationId", this.props.locationId, 'getFileNames')
                 .then(result => {
                  arrayFileDetail = result;
                  console.log('result for arrayFileDetail is', arrayFileDetail);
                  this.props.dataProvider.getFilteredlistitem("LocationQuestionMapping","LocationId", this.props.locationId, '', 'group', 'CommHead')
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
                                taskCount: response2.length>result.length?response2.length-result.length:result.length-response2.length
                                //buttonDisabled: response.Approval_x0020_Status=='Functional'?true:false
                                //showEditButton: showButton,
                                //showApprovalButton: approvalbutton
                                });
                            })
                        })
                      })
                    })   
                })

                });
                },
             ).catch((ex) => {
               console.log(ex);

         
             });
               }
          
               
       

          // Create Request
          @autobind
          private async _createRequest(): Promise<void> {
            //this.setState({isLoading:true});
        
        
                let locationRequest: ILocation = {
                Title: this.state.Title,
                PlantNumber: this.state.PlantNumber,
                PlantAddress: this.state.PlantAddress,
                ManufacturingPlant: this.state.ManufacturingPlant,
                State: this.state.State,
                BusinessArea: this.state.BusinessArea,
                CompanyCode: this.state.CompanyCode,
                Pan: this.state.Pan,
                Gstin: this.state.Gstin
              }
                this.props.dataProvider.createUpdateLocation("Plant", locationRequest, this.state.questionSet, this.props.locationId).then(
          
                //resolve
                (successMessage: any) => {
                  console.log("updateRequest for response" + successMessage);
                  this.setState({
                    successCreation: successMessage,
                    buttonDisabled: true
                  });
                  alert(successMessage);
                  setTimeout(function(){ window.location.reload();
                  },3000);
          },
                (data: any) => {

                }
              ).catch((ex) => {
               
                console.log(ex);
              });
              }
             

/*         Eevent Handlers
 */        
            @autobind
            private onTitleChange(e: any) {
            console.log("onTitleChange called value: " + e)
            this.setState({
                Title: e
            });
            }
            @autobind
            private onPlantNumberChange(e: any) {
            console.log("onPlantNumberChange called value: " + e)
            this.setState({
            PlantNumber: e
            });
            }
            @autobind
            private onPlantAddressChange(e: any) {
            console.log("onPlantAddressChange called value: " + e)
            this.setState({
            PlantAddress: e
            });
            }
            @autobind
            private onManufacturingPlantChange(e: any) {
            console.log("onManufacturingPlantChange called value: " + e)
            this.setState({
            ManufacturingPlant: e
            });
            }
            @autobind
            private onStateChange(e: any) {
            console.log("onStateChange called value: " + JSON.stringify(e))
            this.setState({
            State: e.text
            });
            }
            @autobind
            private onBusinessAreaChange(e: any) {
            console.log("onBusinessAreaChange called value: " + e)
            this.setState({
            BusinessArea: e
            });
                                }
            @autobind
            private onCompanyCodeChange(e: any) {
            console.log("onCompanyCodeChange called value: " + e)
            this.setState({
                CompanyCode: e
            });
            }
            @autobind
            private onPanChange(e: any) {
            console.log("onPanChange called value: " + e)
            this.setState({
                Pan: e
            });
            }
            @autobind
            private onGstinChange(e: any) {
            console.log("onGstinChange called value: " + e)
            this.setState({
                Gstin: e
            });
            }
            
            //@autobind
            public changeState = (item: IDropdownOption): void => {
                   console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
                   this.setState({ State: item.text });
              };
              
              public onRequestChange = (item: IDropdownOption): void => {
                console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
                this.setState({ RequestType: item.text });
           };    
            
            //Methods for Child Component 2 CreateLocationForm2Main 
          
          @autobind
          private _onSelectDate(selectedDate: Date, qId: number)
           {
            console.log("qid is:" + qId);
            const questionSet = this.state.questionSet;
            let positionQuestionSet = this._findArrayPosition(questionSet,qId);
            console.log("positionQuestionSet for Select Date is" + positionQuestionSet);
            questionSet[positionQuestionSet].dueDate = selectedDate;
            this.setState({
              questionSet: questionSet
              });
          }


            @autobind
            private  _handleToggleChange(e: boolean, qId: number)
            {
                console.log(e);
                if(e)
                {
                  // To preserve Immutibility
                  // Hide End Date and Show File Attach Option
                  console.log("qid is:" + qId);
                  const questionSet = this.state.questionSet;
                  let positionQuestionSet = this._findArrayPosition(questionSet,qId);
                  console.log("positionQuestionSet" + positionQuestionSet)
                  questionSet[positionQuestionSet].datePickerHidden = e;
                  questionSet[positionQuestionSet].fileUploadHidden = !e;
                  questionSet[positionQuestionSet].taskFlag = false;
                  questionSet[positionQuestionSet].dueDate = null;    // remove Due date from Date Picker
                    const fileCountValue = this.state.fileCount;
                    const fileCountIncremented = fileCountValue + 1;
                    const taskCountValue = this.state.taskCount;
                    const taskCountDecremented = taskCountValue - 1;   
                  
                  this.setState({
                    questionSet: questionSet,
                    fileCount: fileCountIncremented,
                    taskCount: taskCountDecremented
                    });
                }
                else
                {
                  // Show End Date and Hide File Attach Option
                  console.log("eneterd else part");
                  console.log("qid is:" + qId);
                    // To preserve Immutibility
                    const questionSet = this.state.questionSet;
                    let positionQuestionSet = this._findArrayPosition(questionSet,qId);
                    questionSet[positionQuestionSet].datePickerHidden = e;      //false ,show End Date
                    questionSet[positionQuestionSet].fileUploadHidden = !e;
                    questionSet[positionQuestionSet].taskFlag = true;
                    questionSet[positionQuestionSet].document = null;   // remove file from file upload
                    const taskCountValue = this.state.taskCount;
                    const taskCountIncremented = taskCountValue + 1;
                    const fileCountValue = this.state.fileCount;
                    const fileCountDecremented = fileCountValue - 1;
        
                    this.setState({
                      questionSet: questionSet,
                      taskCount: taskCountIncremented,
                      fileCount: fileCountDecremented   
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

              // used when user clicks something that changes the current mode
   @autobind
   private _changeForm(newForm: string): void{
       console.log("Entered Change form in Create Location Form Main with next as" ,newForm)
       if(newForm!=='CreateLocationForm&&CreateLocationForm2Main')
       {
        this.setState({
          currentForm: newForm
          //isLoading: true
         });
      }
      else
      {
        if(this.state.RequestType=='')
        {
          this.setState({
            currentForm: 'default',
            RequestTypeError: 'Please select a Type of Location Request you need to raise.'
            //isLoading: true
           });
        }
        else
        {
          this.setState({
            currentForm: newForm,
            getStateQuestionListFlag: true
            //isLoading: true
           });
        }
      }
         //if(productId !== undefined){
         //this.setState({productId: productId});
     //}
   }

   // handler Files

   @autobind
   private  _handleFileChange(fileArray: FileList, qId: number)
   {
    const questionSet = this.state.questionSet;

    if(fileArray[0].type== 'text/plain')
    {
    alert('Files with .txt extension not allowed.');
    }
   else
   {
    let positionQuestionSet = this._findArrayPosition(questionSet,qId);
    console.log("positionQuestionSet for Document is" + positionQuestionSet);
    questionSet[positionQuestionSet].document = fileArray[0];
    questionSet[positionQuestionSet].documentPresent = true;
      }
      this.setState({
        questionSet: questionSet
        });
         console.log("the file array result is " + fileArray[0]);  
   }

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