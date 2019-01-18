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
import styles from './IRequestType.module.scss';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { escape, constant } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import {IRequestTypeFormProps} from './RequestTypeFormProps';
//import Util  from "../../../common/Util";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import question set component




    export default class RequestTypeForm extends React.Component<IRequestTypeFormProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: IRequestTypeFormProps) {

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
    <div className="main-container">
	<div className="left-sidebar"></div>
    <div className="page-content">
    <div className={ styles.Forms }>
       <div className={ styles.container }>
       <div className="ms-MessageBar-text" style={{color:"red"}}>
            {this.props.RequestTypeError}
            </div>
         <div className={styles.row}>
           <div className={styles.column} >
           
           
            </div>
            </div>
       <div className={styles.row}>
           <div className={styles.column} >
           <Dropdown
          placeHolder="Select the Request Type"
          label="Request Type"
          ariaLabel="Basic dropdown example"
          options={ this.props.RequestList}
          onChanged={e => this.props.onRequestChange(e)}
            />
           </div>
    </div>
    <div className={styles.row}>
    <div className={styles.column} >
    <DefaultButton
            primary={ true }
            //disabled= {this.state.buttonDisabled}
            data-automation-id='test'
            text='Next'
            onClick={() => this.props._changeForm('CreateLocationForm&&CreateLocationForm2Main') }
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