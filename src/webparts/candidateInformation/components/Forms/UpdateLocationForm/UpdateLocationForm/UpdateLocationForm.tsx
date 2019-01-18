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
import {IUpdateLocationFormProps} from './IUpdateLocationFormProps';
import {ILocationState} from './ILocationState';
import { ILocation, IState } from "../../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import pnp and pnp logging system


    export default class CreateLocationForm extends React.Component<IUpdateLocationFormProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: IUpdateLocationFormProps) { 

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
      <h1 className="title">New item</h1>        
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
          value={this.props.Title}
          disabled= {true}
          onChanged={e => this.props.onTitleChange(e)}
             />
           </div>
           <div className={styles.column} >
          <TextField
         className={ styles.textField }
         label='Plant Number'
         autoComplete='off'
         type='number'
         value={this.props.PlantNumber?(this.props.PlantNumber).toString():''}
         disabled= {true}
         onChanged={e => this.props.onPlantNumberChange(e)}
               />
          </div>
          </div>
        <div className={styles.row}>

          <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Plant Address'
          autoComplete='off'
          value={this.props.PlantAddress}
          disabled= {true}
          onChanged={e => this.props.onPlantAddressChange(e)}
            />
           </div>
           <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Sales depot/warehouse/service office'
          autoComplete='off'
          value={this.props.ManufacturingPlant}
          disabled= {true}
          onChanged={e => this.props.onManufacturingPlantChange(e)}
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
            {/* <Dropdown
          placeHolder="Select a State"
          label="State"
          ariaLabel="Basic dropdown example"
          options={ this.props.stateList}
          defaultSelectedKey= {(this.props.State)}
          onChanged={e => this.props.onStateChange(e)}
          //onFocus={this._log('onFocus called')}
          //onBlur={this._log('onBlur called')}
          //componentRef={this._basicDropdown}
            /> */}
      </div>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='Business Area'
          autoComplete='off'
          type='number'
          value={this.props.BusinessArea?(this.props.BusinessArea).toString():''}
          disabled= {true}
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
          value={(this.props.CompanyCode).toString()}
          disabled= {true}
          onChanged={e => this.props.onCompanyCodeChange(e)}
            />
             </div>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='PAN NO.'
          autoComplete='off'
          value={(this.props.Pan).toString()}
          disabled= {true}
          onChanged={e => this.props.onPanChange(e)}
            />
             </div>         
      </div>
      <div className={styles.row}>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='GSTIN Number'
          autoComplete='off'
          value={(this.props.Gstin).toString()}
          disabled= {true}
          onChanged={e => this.props.onGstinChange(e)}
            />
             </div>         
      </div>
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

      
    );
    }
}