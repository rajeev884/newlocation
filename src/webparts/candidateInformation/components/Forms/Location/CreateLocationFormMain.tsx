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
import {ICreateLocationFormMainState} from './CreateLocationFormMainState';
import {ICreateLocationFormMainProps} from './CreateLocationFormMainProps';
import { IddOption } from "../../../common/Interfaces/IddOption";
import { ILocation, IState } from "../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
import CreateLocationForm from './CreateLocationForm/CreateLocationForm';
import CreateLocationForm2Main from './CreateLocationForm2/CreateLocationForm2Main';
import RequestTypeForm from './CreateLocationForm/RequestType/RequestTypeForm';
import * as $ from 'jquery';
import { IQuestionSet } from '../../../common/Interfaces/IQuestionSet';


// import pnp and pnp logging system


    export default class CreateLocationFormMain extends React.Component<ICreateLocationFormMainProps,ICreateLocationFormMainState> {
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
        successCreation: ''
    };    

          // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
}
    
   componentDidMount()
   {
      this.getRequestTypeList();
   }

   componentDidUpdate()
   {
    if(this.state.getStateQuestionListFlag)
    {
      this.getStateQuestionList();    
    } 
    }
 
    
  public render() {
    let currentForm = this.state.currentForm;
    let formComponent: any;
    formComponent =  <RequestTypeForm RequestList= {this.state.requestTypeList} RequestTypeError= {this.state.RequestTypeError} _changeForm= {this._changeForm} onRequestChange= {this.onRequestChange} context= {this.props.context}/>  

    if (this.state.isLoading) {
      if (SpinnerSize && SpinnerSize.large) {
        return (
        <div className={styles.Forms}>
        <div className={styles.loadingWrapper}  style={{display:'block'}}>
          <Spinner size={SpinnerSize.large} label="Loading...Please Wait" ariaLive="assertive" />
        </div>
        </div>
       );
      }
    }
    else
    {
       switch(currentForm){
        case 'CreateLocationForm&&CreateLocationForm2Main':
        formComponent = 
        <div>
        <div id="CreateLocationForm">
        <CreateLocationForm 
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
        RequestType={this.state.RequestType}
        context={this.props.context}
        />
        </div>
         <div id="CreateLocationForm2Main" className= {styles.hidden}>
         <CreateLocationForm2Main 
         questionSet = {this.state.questionSet} 
         _handleToggleChange = {this._handleToggleChange} 
         showHideComponent={this.showHideComponent} 
         _createRequest={this._createRequest} 
         _onSelectDate={this._onSelectDate} 
         _handleFileChange={this._handleFileChange} 
         successCreation = {this.state.successCreation} 
         buttonDisabled = {this.state.buttonDisabled}  
         context =  {this.props.context}
         />
          </div> 
          </div>
      } 
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
        if(this.state.Title==''|| this.state.PlantAddress==''
        ||this.state.State==''|| this.state.CompanyCode==null||this.state.Pan==''||this.state.Gstin=='')
        {
          alert('Please fill all mandatory fields*');
        }
        else if(this.state.Pan.length!=10){
          alert('Pan should be of 10 digits');
        }
        else if(this.state.Gstin.length!=15){
          alert('Gstin should be of 15 digits');
        }
        else
        {
          $("#CreateLocationForm").hide();
          $("#CreateLocationForm2Main").show();          
        }
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
        console.log('absolute Url is', this.props.context.pageContext.web.absoluteUrl)
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
              debugger;
              console.log("response for getQuestionSets is",response);
              console.log("response for getQuestionSets response.RequestType is" + JSON.stringify(response.RequestType));
          for(var i = 0;i<response.length;i++) {
            console.log(response[i].ID);
            console.log(response[i].Question);
             for(var j = 0;j<response[i].RequestType.length;j++) {
              if(this.state.RequestType==response[i].RequestType[j])         // Filtering the Array
              {
                let item: IQuestionSet = {questionId: response[i].ID, questionText : response[i].Question, groupsAllowed: response[i].GroupsAllowed, taskFlag: true, datePickerHidden: false, fileUploadHidden: true, dueDate: null, document: null, documentPresent: false};
                questionArray.push(item);    
                //console.log("question array is" + JSON.stringify(questionArray));
                  }
            } 
            console.log("new questionset array is", questionArray);
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
      }
         )
      }  
      )
        }



        // Get Request Type List
        public getRequestTypeList = (): IddOption[]  => {
          let requestArray: IddOption[] = [];
          this.props.dataProvider.getChoiceFieldvalues("Plant", "RequestType" ).then(
            //resolve
            (response: any) => {
            console.log("response for RequestType List is" + JSON.stringify(response));
            console.log(response.Choices);
            for(var i = 0;i<response.Choices.length;i++) {
              //console.log(result[i].ID);
              //console.log(result[i].Title);
              let item: IddOption = {key: i, text: response.Choices[i]  };
              //item.key = result[i].ID;
              //item.text = result[i].Title;
              requestArray[i]   = item;
            }

            this.setState({
              requestTypeList: requestArray,
              isLoading: false
            });
          }  
          )
          return requestArray
            }

          //Create Request

          @autobind
          private async _createRequest(): Promise<void> {
            console.log("Is Loading Value is" + this.state.isLoading);
            console.log("questionset",this.state.questionSet);
            /* this.setState({
              isLoading: true
            }); */

              let dueDateCount = this.findCountInArray(this.state.questionSet, 'DueDate');
              let fileCount = this.findCountInArray(this.state.questionSet, 'file');

                if(this.state.Title==''|| this.state.PlantAddress==''
                ||this.state.State==''|| this.state.CompanyCode==null||this.state.Pan==''||this.state.Gstin=='')
              {
                 this.setState({
                  isLoading: false,

                }); 
              //alert("Please fill all fields");
              }
              else if(this.state.taskCount!= dueDateCount)
              {
                alert("Please fill all the due dates where document is missing currently.");
                //let dueDateCount = this.findCountInArray();
                //let fileCount = this.findCountInArray();

              }
              else if(this.state.fileCount!= fileCount)
              {
                alert("Please upload all the required documents.");
                //let dueDateCount = this.findCountInArray();
                //let fileCount = this.findCountInArray();
              }
              else if(this.state.questionSet.filter(item=>{if(item.document){return item}}).length==0){
                alert("Please Upload atleast 1 document");
              }
              else
              {
        
                /* this.setState({
                  isLoading: true
                }); */
                this.setState({isLoading:true})
                let locationRequest: ILocation = {
                Title: this.state.Title,
                PlantNumber: this.state.PlantNumber,
                PlantAddress: this.state.PlantAddress,
                ManufacturingPlant: this.state.ManufacturingPlant,
                State: this.state.State,
                BusinessArea: this.state.BusinessArea,
                CompanyCode: this.state.CompanyCode,
                Pan: this.state.Pan,
                Gstin: this.state.Gstin,
                RequestType: this.state.RequestType
              }
              //this.props.dataProvider.readListItem("locationRequests", this.props.locationRequestId).then(
                this.props.dataProvider.createUpdateLocation("Plant", locationRequest, this.state.questionSet).then(
          
                //resolve
                (successMessage: string) => {
                  console.log("createRequest for sucess message: " + successMessage);
                  console.log("this.state.isLoading",this.state.isLoading);
                  this.setState({
                    successCreation: successMessage,
                    buttonDisabled: true
                  });
                  alert(successMessage);
                  let siteUrl = this.props.context.pageContext.web.absoluteUrl;
                  setTimeout(function(){ window.location.href= siteUrl + "/Lists/Plant/AllItems.aspx";
                },3000);
                },
                //reject
                (data: any) => {

                 /*    this.setState({
                    locationRequest: item,
                    errors
                  }); */
                }
              ).catch((ex) => {
                //debugger;
                this.setState({isLoading:false})
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
            console.log("onPlantNumberChange called value: ", e);
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
                console.log('qid is ' + qId);
                if(e)
                {
                  //toggle Yes 
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
                  //toggle No 
                  // Show End Date and Hide File Attach Option
                  let fileObject: any;
                  fileObject = $(('#' + qId.toString()))[0];

                  console.log("eneterd else part");
                  console.log("qid is:" + qId);
                    // To preserve Immutibility
                    const questionSet = this.state.questionSet;
                    let positionQuestionSet = this._findArrayPosition(questionSet,qId);
                    questionSet[positionQuestionSet].datePickerHidden = e;      //false ,show End Date
                    questionSet[positionQuestionSet].fileUploadHidden = !e;
                    questionSet[positionQuestionSet].taskFlag = true;
                     if(fileObject.files.length != 0)
                    {
                      $(('#' + qId.toString())).val(null); // remove file from file upload
                      questionSet[positionQuestionSet].document = null;   
                      questionSet[positionQuestionSet].documentPresent = false;  
                    } 
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
       console.log("Entered Change form in Create Location Form Main with next as" + newForm)
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
    console.log("current file question set array is", this.state.questionSet);
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
    console.log("the file array result is ", fileArray[0]);
    console.log("New questionSet array result is " + questionSet);
    }
    this.setState({
      questionSet: questionSet
      });
       
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