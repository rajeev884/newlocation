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
              <div>{this.props.documentPresent?<a href={this.props.docLink} target="_blank">Click to read document</a>:'No document Uploaded'}</div>
              </div>
   </div>
  </div>
  </div> 
  </div>
  );
  }
}