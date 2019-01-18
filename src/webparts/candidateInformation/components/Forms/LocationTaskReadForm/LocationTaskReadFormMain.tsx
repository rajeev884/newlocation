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
import { escape, times } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
//import {ILocationProps} from './CreateLocationFormMainProps';
import {ILocationTaskReadFormMainState} from './ILocationTaskReadFormMainState';
import {ILocationTaskReadFormMainProps} from './ILocationTaskReadFormMainProps';
import { IddOption } from "../../../common/Interfaces/IddOption";
import { ILocation, IState } from "../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
import LocationTaskReadForm from './LocationTaskReadForm/LocationTaskReadForm';
//import RequestTypeForm from './CreateLocationForm/RequestType/RequestTypeForm';
import * as $ from 'jquery';
import pnp from "sp-pnp-js/lib/pnp";

// import pnp and pnp logging system


    export default class LocationTaskReadFormMain extends React.Component<ILocationTaskReadFormMainProps,ILocationTaskReadFormMainState> {
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
        showLocationCodeField: false,
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
      return (
         <LocationTaskReadForm 
         Title=  {this.state.Title} 
         PlantNumber = {this.state.PlantNumber} 
         PlantAddress = {this.state.PlantAddress} 
         ManufacturingPlant= {this.state.ManufacturingPlant} 
         State= {this.state.State} 
         BusinessArea= {this.state.BusinessArea} 
         CompanyCode= {this.state.CompanyCode} 
         Pan = {this.state.Pan} 
         Gstin = {this.state.Pan} 
         onBusinessAreaChange={this.onBusinessAreaChange} 
         _updateBusinessArea={this._updateBusinessArea} 
         successCreation = {this.state.successCreation} 
         buttonDisabled = {this.state.buttonDisabled} 
         showLocationCodeField = {this.state.showLocationCodeField}
         context = {this.props.context}
         />
      )
        }
    }


  // async functions were introduced with ES3/ES5 native support in TypeScript 2.1
  // https://blogs.msdn.microsoft.com/typescript/2016/12/07/announcing-typescript-2-1/
  // async function always return a Promise, on this scenario we return void Promise
  //   because we will not need it as we are directly setting the Component´s state

          
          private async _getLocationDetails(): Promise<void> {
            let showField= false;
            let approvalbutton = false; 
            let userGroup: string;
            
            this.props.dataProvider.readLocation("Plant", this.props.locationId).then(
              //resolve
              (response: any) => {
                console.log("Response for Plant" + response)
                console.log("Plant object is" , response);
                console.log("Gstin is" , response.Gstin);
            this.props.dataProvider.getUserGroups().then(
              (result: any) => {
                console.log('result for getusergroups is' + JSON.stringify(result));
              //for Read Form
              for(let i =0; i<result.length;i++)
              {
                debugger;
                if(result[i].LoginName == 'FunctionalBI' && response.FunctionalBI  == 'Pending')
                {
                  showField = true;
                  userGroup = 'FunctionalBI'
                  break;
                }
              }
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
                            isLoading: false,
                            showLocationCodeField: showField,
                            showApprovalButton: approvalbutton,
                            userGroup: userGroup
                            });
                        })
        },
              //reject
              (data: any) => {
               /*    this.setState({
                  personalDetails: item,
                  errors
                }); */
              }
            ).catch((ex) => {
              debugger;
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
              private async _updateBusinessArea(): Promise<void> {
                console.log("updateBusinessArea called")
                this.setState({isLoading:true});
                this.props.dataProvider.updateBusinessArea("Plant", this.props.locationId, this.state.BusinessArea).then(
                 // response1 => {console.log("messge",response1)}
                  (successMessage: any) => {
                    console.log("Response for _updateApproval: " + successMessage)
                    this.setState({
                      buttonDisabled: true,
                      successCreation: successMessage,
                      isLoading:false
                    });
                    setTimeout(function(){ window.location.href="https://havells.sharepoint.com/sites/devsite/Lists/Plant/AllItems.aspx";
                     },3000);
            },
                  (data: any) => {
                  }
                
          ).catch((ex) => {
                  debugger;
                  console.log(ex);
            
                });
                  }

                  // event handlers

                  @autobind
                  private onBusinessAreaChange(e: any) {
                  console.log("onBusinessAreaChange called value: " + e)
                  this.setState({
                  BusinessArea: e
                  });
                }
                  // handler Files
                
}