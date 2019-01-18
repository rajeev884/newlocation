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
import {ICreateLocationFormProps} from './ICreateLocationFormProps';
import {ILocationState} from './ILocationState';
import { ILocation, IState } from "../../../../common/Interfaces/ILocation";
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js/lib/pnp";
import { SPComponentLoader } from '@microsoft/sp-loader';
// import pnp and pnp logging system


    export default class CreateLocationForm extends React.Component<ICreateLocationFormProps,{}> {
      //private _placeHolderText: string = 'Enter your Title';

      constructor(props: ICreateLocationFormProps) { 

        // initial component states will be here
      super(props);
        // load all css files from sharepoint
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/mdb.min.css?csf=1&e=5qqSqO');
        SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/style.css?csf=1&e=dpWYOr');
        SPComponentLoader.loadCss( this.props.context.pageContext.web.absoluteUrl + '/Style%20Library/layout.min.css?csf=1&e=B9Yjly');
        
      }
  
  public onKeyPress(event) {
   console.log(event.target,'event');
   var array1=[69,189,190];
    if(array1.indexOf(event.keyCode)!=-1){
      event.preventDefault();
      return false;
    }
   }
   public filterFunction(e){
    this.props.stateList.filter(person =>{
      if(person.text.toLowerCase().indexOf("an")>-1){
        console.log(person,'<><><');
        return person;
      };
    });

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
          label='Name*'
          autoComplete='off'
          onChanged={e => this.props.onTitleChange(e)}
             />
           </div>
           <div className={styles.column} >
          <TextField
            className={ styles.textField }
            label='Plant Number'
            autoComplete='off'
            type='number'
            min= '0'
            onChanged={e => this.props.onPlantNumberChange(e)}
            onKeyDown={this.onKeyPress.bind(this)}
               />
          </div>
          </div>
        <div className={styles.row}>

          <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Plant Address*'
          autoComplete='off' 
          onChanged={e => this.props.onPlantAddressChange(e)}
            />
           </div>
           <div className = {this.props.RequestType!='Plant'?null:styles.hidden}>
           <div className={styles.column} >
           <TextField
          className={ styles.textField }
          label='Sales depot/warehouse/service office'
          autoComplete='off'
          onChanged={e => this.props.onManufacturingPlantChange(e)}
            />
           </div>
           </div>
          </div>
          <div className={styles.row}>
          <div className={styles.column} >
          {/* <input type="text" placeholder="Search.." onKeyDown={this.filterFunction.bind(this)} /> */}
            <Dropdown
              placeHolder="Select a State"
              label="State*"
              ariaLabel="Basic dropdown example"
              options={ this.props.stateList}
              onChanged={e => this.props.onStateChange(e)}
              //onKeyDown={this.filterFunction.bind(this)}
        //onFocus={this._log('onFocus called')}
          //onBlur={this._log('onBlur called')}
          //componentRef={this._basicDropdown}
            />
          </div>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='Business Area'
          autoComplete='off'
          type='number'
          min= '0'
          onChanged={e => this.props.onBusinessAreaChange(e)}
          onKeyDown={this.onKeyPress.bind(this)}
            />
             </div>
      </div>

      <div className={styles.row}>
 
      </div>
      <div className={styles.row}>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='Company Code*'
          autoComplete='off'
          type='number'
          min= '0'
          onChanged={e => this.props.onCompanyCodeChange(e)}
          onKeyDown={this.onKeyPress.bind(this)}
            />
             </div>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='PAN NO*'
          autoComplete='off'
          onChanged={e => this.props.onPanChange(e)}
          onKeyDown={this.onKeyPress.bind(this)}
          maxLength={10}
          
          
            />
             </div>         
      </div>
      <div className={styles.row}>
      <div className={styles.column} >
      <TextField
          className={ styles.textField }
          label='GSTIN Number*'
          autoComplete='off'
          onChanged={e => this.props.onGstinChange(e)}
          onKeyDown={this.onKeyPress.bind(this)}
          maxLength={15}
          
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