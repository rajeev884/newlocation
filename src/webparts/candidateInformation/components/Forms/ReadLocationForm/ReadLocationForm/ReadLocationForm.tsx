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
import {IReadLocationFormProps} from './IReadLocationFormProps';
import { ILocation, IState } from "../../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import pnp and pnp logging system


    export default class ReadLocationForm extends React.Component<IReadLocationFormProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: IReadLocationFormProps) { 

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
{/*         <div className={styles.heading}>
 */}    <header className ="header-title">
      <h1 className="title">Request {this.props.RequestType}</h1>        
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
         value={this.props.PlantNumber==null?'':(this.props.PlantNumber).toString()}
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
           <div className = {this.props.RequestType!='Plant'?null:styles.hidden}>
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
          disabled = {true}
          value={this.props.BusinessArea==null?'':(this.props.BusinessArea).toString()}
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
      <div className = {this.props.userGroup == 'CommHead'? styles.hidden: null }>
      <div className={styles.row}>
           <div className={styles.column} > 
           </div>
           <div className={styles.column} >
           <DefaultButton
            primary={ true }
            //disabled= {this.state.buttonDisabled}
            data-automation-id='test'
            text='Next'
            onClick={() => this.props.showHideComponent(1) }
          />
           </div>
           </div>
      </div>
                </div>
</div>
</div>   
      </div>

      
    );
    }
}