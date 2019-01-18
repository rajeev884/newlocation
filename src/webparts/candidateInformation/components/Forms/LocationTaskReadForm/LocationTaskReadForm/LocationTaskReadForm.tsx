// locationRequestForm Component , parent component: CandidateInformation

import * as React from 'react';
import styles from '../Location.module.scss';
import {
  TextField,
  Button,
  DefaultButton,
  ButtonType,
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react';
import * as bootstrap from 'bootstrap';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import {ILocationTaskReadFormProps} from './ILocationTaskReadFormProps';
import { ILocation, IState } from "../../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import pnp and pnp logging system


    export default class LocationTaskReadForm extends React.Component<ILocationTaskReadFormProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: ILocationTaskReadFormProps) { 

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
       <div className={styles.row}>
       <div className="ms-MessageBar-text" style={{fontWeight: 600,color: "#144e0a",textAlign: "center", padding: "15px",  marginBottom: "20px",borderRadius: "4px",background:this.props.successCreation? "#9de4bd":"white"}}>
        {this.props.successCreation}
        </div>
       </div>
       <div className={styles.row}>
{/*         <div className={styles.heading}>
 */}    <header className ="header-title">
      <h1 className="title">Please Submit Location Code</h1>        
        </header>
{/*        </div>
 */}       </div>
       <div className={styles.row}>
{/*               {this._gerErrors()}
 */}            </div>
           <div className={styles.row}>
           <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Plant Name'
          autoComplete='off'
          disabled = {true}
          value={this.props.Title}
             />
           </div>
           <div className={styles.column} >
          <TextField
         className={ styles.textField }
         label='Plant Number'
         autoComplete='off'
         type='number'
         disabled = {true}
         value={(this.props.PlantNumber).toString()}
               />
          </div>
          </div>
        <div className={styles.row}>

          <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Plant Address'
          autoComplete='off'
          disabled = {true}
          value={this.props.PlantAddress} 
            />
           </div>
           <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Sales depot/warehouse/service office'
          autoComplete='off'
          disabled = {true}
          value={this.props.ManufacturingPlant}
            />
           </div>
          </div>
          <div className={styles.row}>
          <div className={styles.column} >
          <TextField
          className={ styles.textField }
          label='State'
          autoComplete='off'
          type='string'
          disabled = {true}
          value={this.props.State}
        />
      </div>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='Business Area'
          autoComplete='off'
          type='number'
          disabled = {!this.props.showLocationCodeField}
          value={(this.props.BusinessArea).toString()}
          onChanged={e => this.props.onBusinessAreaChange(e)}
        />
             </div>
             </div>
      <div className={styles.row}>
 
      </div>
      <div className={styles.row}>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='Company Code'
          autoComplete='off'
          type='number'
          disabled = {true}
          value={(this.props.CompanyCode).toString()}
            />
             </div>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='PAN NO.'
          autoComplete='off'
          disabled = {true}
          value={(this.props.Pan)}
            />
             </div>         
      </div>
      <div className={styles.row}>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='GSTIN Number'
          autoComplete='off'
          disabled = {true}
          value={(this.props.Gstin)}
            />
             </div>         
      </div>
      <div className={styles.row}>
           <div className={styles.column} > 
           </div>
           <div className={styles.column} >
           <DefaultButton
            primary={ true }
            disabled= {this.props.buttonDisabled}
            data-automation-id='test'
            text='Update'
            onClick={() => this.props._updateBusinessArea() }
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