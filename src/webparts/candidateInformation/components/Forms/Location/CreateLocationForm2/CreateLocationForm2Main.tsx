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
  Toggle
} from 'office-ui-fabric-react';
import * as bootstrap from 'bootstrap';
import styles from './ICreateLocationForm2.module.scss';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
//import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss';
import { escape, constant } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import {ICreateLocationForm2Props} from './ICreateLocationForm2Props';
import {ICreateLocationForm2State} from './ICreateLocationForm2State';
import { IQuestionSet } from "../../../../common/Interfaces/IQuestionSet";
//import Util  from "../../../common/Util";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import question set component
import QuestionSetForm from './QuestionSet/QuestionSet';




    export default class CreateLocationForm2Main extends React.Component<ICreateLocationForm2Props,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: ICreateLocationForm2Props) {

        // initial component states will be here
      super(props);
        // load all css files from sharepoint
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/mdb.min.css?csf=1&e=5qqSqO');
        SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/style.css?csf=1&e=dpWYOr');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/layout.min.css?csf=1&e=B9Yjly');
  }
    
  public render() {

    var rows = this.props.questionSet
    .map(function(questionSetItem: IQuestionSet) {
        return (
          <QuestionSetForm questionId= {questionSetItem.questionId} questionText = {questionSetItem.questionText} dueDate = {questionSetItem.dueDate} taskFlag = {questionSetItem.taskFlag} documentPresent = {questionSetItem.documentPresent} document = {questionSetItem.document}  datePickerHidden= {questionSetItem.datePickerHidden} fileUploadHidden= {questionSetItem.fileUploadHidden} _handleToggleChange = {this.props._handleToggleChange} _onSelectDate = {this.props._onSelectDate} _handleFileChange = {this.props._handleFileChange} context = {this.props.context} />
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
    <div className="ms-MessageBar">
    <div className="ms-MessageBar-content">
        <div className="ms-MessageBar-icon">
        </div>
        <div className="ms-MessageBar-text" style={{fontWeight: 600,color: "#144e0a",textAlign: "center", padding: "15px",  marginBottom: "20px",borderRadius: "4px",background:this.props.successCreation? "#9de4bd":"white"}}>
        {this.props.successCreation}
        </div>
      </div>
   </div>
    <div className="accordion" id="question">
    {rows}
    </div>
    <div className={styles.row}>
           <div className={styles.column} >
           <DefaultButton
            primary={ true }
            data-automation-id='test'
            text='Previous'
            onClick={() => this.props.showHideComponent(2) }
          />
           </div>
           <div className={styles.column} >
           <DefaultButton
            primary={ true }
            disabled= {this.props.buttonDisabled}
            data-automation-id='test'
            text='Submit'
            onClick={() => this.props._createRequest() }
          />
           </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
    }
    }