// Main component with a default form which opens all the child forms
import * as React from 'react';
import { ICandidateInformationProps } from './ICandidateInformationProps';
import { ICandidateInformationState } from './ICandidateInformationState';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
// importing all the forms
import CreateLocationFormMain from './Forms/Location/CreateLocationFormMain'
import ReadLocationFormMain from './Forms/ReadLocationForm/ReadLocationFormMain'
import UpdateLocationFormMain from './Forms/UpdateLocationForm/UpdateLocationFormMain'
import LocationTaskReadFormMain from './Forms/LocationTaskReadForm/LocationTaskReadFormMain'




export default class CandidateInformation extends React.Component<ICandidateInformationProps, ICandidateInformationState> {
  
  constructor(props: ICandidateInformationProps) {
    super(props);
    this.state = {
      currentForm: 'PersonalDetailsForm',
      personalDetailsId: this.props.personalDetailsId
    };
}

  public render(): React.ReactElement<ICandidateInformationProps> {
   
    
  
   
    let currentForm = this.state.currentForm
    let formComponent: any;
        //<PersonalDetailsForm personalDetailsId = {this.state.personalDetailsId} dataProvider = {this.props.dataProvider} _changeForm = {this._changeForm} />  
        
        
        // if(this.props.componentType == 0)
        // {
        //   formComponent =  <PackagingRequestForm packagingRequestId = {this.state.personalDetailsId} dataProvider = {this.props.dataProvider} _changeForm = {this._changeForm} />  

        // }
        // else
        // {
        //   formComponent =   <RfqForm packagingRequestId = {this.state.personalDetailsId} dataProvider = {this.props.dataProvider} _changeForm = {this._changeForm} />  
        // }
        
        if(this.props.view == 'create')
        {
            formComponent =  <CreateLocationFormMain dataProvider= {this.props.dataProvider} context = {this.props.context} />  
        }
        else if(this.props.view == 'read')
        {
          formComponent =  <ReadLocationFormMain dataProvider= {this.props.dataProvider} _changeForm = {this._changeForm} locationId = {this.state.personalDetailsId} context = {this.props.context}/>  
        }
        else
        {
          formComponent =  <LocationTaskReadFormMain dataProvider= {this.props.dataProvider} locationId = {this.state.personalDetailsId} context = {this.props.context}/>  
        }
        



        switch(currentForm){
            case 'UpdateLocationFormMain':
            formComponent = 
            <UpdateLocationFormMain dataProvider= {this.props.dataProvider} locationId = {this.state.personalDetailsId} context = {this.props.context} />
            break;
            default:
            break;
        }
 
        return formComponent; 
    }

   // used when user clicks something that changes the current mode
   @autobind
   private _changeForm(newForm: string): void{
       console.log("Entered Change form with next as" + newForm)
     this.setState({currentForm: newForm});
         //if(productId !== undefined){
         //this.setState({productId: productId});
     //}
   }

  }


  



