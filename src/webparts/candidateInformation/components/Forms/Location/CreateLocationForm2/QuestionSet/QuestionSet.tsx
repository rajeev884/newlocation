// functional Component , parent component: CreateLocationForm

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
import styles from '../ICreateLocationForm2.module.scss';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { escape, constant } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
//import {ICreateLocationForm2Props} from './ICreateLocationForm2Props';
//import {ICreateLocationForm2State} from './ICreateLocationForm2State';
//import { ILocation, IState } from "../../../common/Interfaces/ILocation";
//import Util  from "../../../common/Util";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import pnp and pnp logging system
import {IQuestionSetProps} from './QuestionSetProps';


const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],                        //N

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],  //N
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],   
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],     //N
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year'
};



    export default class QuestionSetForm extends React.Component<IQuestionSetProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: any) {

        // initial component states will be here
      super(props);
        // load all css files from sharepoint
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/mdb.min.css?csf=1&e=5qqSqO');
        SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/style.css?csf=1&e=dpWYOr');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/layout.min.css?csf=1&e=B9Yjly');
   
}
    
 
 
    
  public render() {
    return (
    <div className="card">
          	<a href="#question01" data-toggle="collapse" aria-expanded="true" aria-controls="question">
            {this.props.questionText}
            </a>
            <div id="question01" className="collapse show" aria-labelledby="headingOne" data-parent="#question">
            <div className="card">
              <div className="card-body">
                <div className="clearfix">
                	<div className="form-check btn-radio form-check-inline">
                    <Toggle
                    style={{minWidth:"48px"}}
      defaultChecked={false}
      label={this.props.datePickerHidden ? 'Please Attach the Document below' : 'Please Enter the End Date for document Submission'}
      onText="Yes"
      offText="No"
      onChanged = { (e) => this.props._handleToggleChange(e, this.props.questionId) } 
    />                    </div>
                </div>
                <div className={this.props.datePickerHidden ? styles.hidden : ''}>
                <div className="clearfix">
                <DatePicker
                strings={DayPickerStrings}
                placeholder="Select a date..."
                value= {this.props.dueDate}
                minDate = {this._findToday()}
                onSelectDate = { (e) => this.props._onSelectDate(e, this.props.questionId) } 
                />
                </div>
                </div>
                <div className={this.props.fileUploadHidden ? styles.hidden : ''}>
                <div className="clearfix attached">
                <h3>Attachments</h3>
                <input type="file" id={(this.props.questionId).toString()} onChange={ (e) => this.props._handleFileChange(e.target.files, this.props.questionId)  }  /> 
                <label htmlFor={(this.props.questionId).toString()}><i className="attach-icon"><img src="https://havells.sharepoint.com/:i:/r/sites/devsite/Style%20Library/attached-icon.png?csf=1&e=Wg5iv4"/></i> <span>Attach file</span></label>
                <span>{this.props.documentPresent ?  this.props.document.name : ''} </span>
                <div className="file-name" id="file-upload-filename"></div>
                </div>
                </div>
    </div>
    </div>
    </div>
    </div>
    );
    }

    @autobind
    private  _findToday(): Date
    {
      let currentTime = new Date();
      console.log("Today is" + currentTime);
      return currentTime;
    }

    /* @autobind
    private  _handleFileChange(selectorFiles: FileList)
    {
        console.log(selectorFiles);
    } */
}