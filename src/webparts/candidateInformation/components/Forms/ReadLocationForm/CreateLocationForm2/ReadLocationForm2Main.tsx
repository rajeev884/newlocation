// locationRequestForm Component , parent component: CandidateInformation

import * as React from 'react';
//import styles from './Location.module.scss';
import {
  TextField,
  Button,
  DefaultButton,
  ButtonType,
  Spinner,
  SpinnerSize,
  Checkbox,
  Toggle,
  FontWeights
} from 'office-ui-fabric-react';
import * as bootstrap from 'bootstrap';
import styles from './ICreateLocationForm2.module.scss';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { escape, constant } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import {IReadLocationForm2MainProps} from './IReadLocationForm2MainProps';
import { IQuestionSet } from "../../../../common/Interfaces/IQuestionSet";
//import Util  from "../../../common/Util";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import question set component
import QuestionSetForm from './QuestionSet/QuestionSet';




    export default class ReadLocationForm2Main extends React.Component<IReadLocationForm2MainProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: IReadLocationForm2MainProps) {

        // initial component states will be here
      super(props);
        // load all css files from sharepoint
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/mdb.min.css?csf=1&e=5qqSqO');
        SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/style.css?csf=1&e=dpWYOr');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/layout.min.css?csf=1&e=B9Yjly');
  }
    
  public render() {
    console.log(this.props,'questionn')
    var rows = this.props.questionSet
    .map(function(questionSetItem: IQuestionSet) {
        return (
          <div>
            <span style={{fontWeight: 600}}>Question. { this.props.questionSet.findIndex(k => k==questionSetItem) + 1}</span>
            <QuestionSetForm 
          questionId= {questionSetItem.questionId} 
          questionText = {questionSetItem.questionText} 
          dueDate = {questionSetItem.dueDate} 
          taskFlag = {questionSetItem.taskFlag} 
          documentPresent = {questionSetItem.documentPresent} 
          document = {questionSetItem.document} 
          defaultDocument = {questionSetItem.defaultDocument} 
          docLink = {questionSetItem.docLink} 
          docName = {questionSetItem.docName}  
          datePickerHidden= {questionSetItem.datePickerHidden} 
          fileUploadHidden= {questionSetItem.fileUploadHidden} 
          _handleToggleChange = {this.props._handleToggleChange} 
          _onSelectDate = {this.props._onSelectDate} 
          _handleFileChange = {this.props._handleFileChange} 
          context = {this.props.context}
          />
          </div>
                );
    }.bind(this));
    
    
    //const datePickerHiddenstatus: boolean = this.state;
    //const fileUploadHiddenstatus: boolean = this.state.fileUploadHidden;

    //console.log("curent datePickerHidden status is" + datePickerHiddenstatus);
    //console.log("curent fileUploadHiddenstatus status is" + fileUploadHiddenstatus);
    return (
      <div className={ styles.Forms }>
      <div className={ styles.container }>

    <div className="main-container">
	<div className="left-sidebar"></div>
    <div className="page-content">
                <div className='alert alert-success' style={{fontWeight: 600,color: "#144e0a",textAlign: "center", padding: "15px",  marginBottom: "20px",borderRadius: "4px", background:this.props.successCreation? "#9de4bd":"white"}}>
                    {this.props.successCreation}
                </div>
    <div className="accordion" id="question">
    {rows}
    </div>
    <div className={styles.row}>
           <div className={styles.column} style={{width:'33%'}} >
           <DefaultButton
            primary={ true }
            data-automation-id='test'
            text='Previous'
            onClick={() => this.props.showHideComponent(2) }
          />
           </div>
           
           <div className={styles.column} style={{width:'33%'}}>
           {
            this.props.showApprovalButton == true ?
            <div>
           <DefaultButton
              primary={ true }
              data-automation-id='test'
              text='Reject'
              disabled= {this.props.buttonDisabled}
              onClick={() => this.props._updateApproval('Reject') }
            />           
          </div>
          : null
          }

           </div>
           <div className={styles.column} style={{width:'33%'}}>
           {
            this.props.showApprovalButton == true ?
            <div>
           <DefaultButton
            primary={ true }
            data-automation-id='test'
            text='Approve'
            disabled= {this.props.buttonDisabled}
            onClick={() => this.props._updateApproval('Approve') }
          /> 
          
          </div>
          : null
          }

           </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
    }
    }