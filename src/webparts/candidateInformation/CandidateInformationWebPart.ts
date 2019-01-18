import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CandidateInformationWebPartStrings';
import CandidateInformation from './components/CandidateInformation';
import { ICandidateInformationProps } from './components/ICandidateInformationProps';
import { ICandidateInformationWebPartProps } from './ICandidateInformationWebPartProps';
import IDataProvider   from "../../dataproviders/IDataProvider";
import SharePointDataProvider   from "../../dataproviders/SharePointDataProvider";
//import MockupDataProvider   from "../../dataproviders/MockupDataProvider";




//let personalDetailsId = 40;
let Environ = '';

export default class CandidateInformationWebPart extends BaseClientSideWebPart<ICandidateInformationWebPartProps> {

  private _dataProvider: IDataProvider;
  private view: string;

  protected onInit(): Promise<void> {
 
   if (DEBUG && Environment.type === EnvironmentType.Local) {
     Environ = 'Local';
     //this._dataProvider = new MockupDataProvider();
   } 
   else {
    Environ = 'SharePoint';
     debugger;
         this._dataProvider = new SharePointDataProvider(this.context);
         this.view = this.getParameterByName("view"); 


   }
     return super.onInit();
     
   }

  public render(): void {
    const element: React.ReactElement<ICandidateInformationProps > = React.createElement(
      //personalDetailsId: this.getParameterByName("view") == 'read'?parseInt(this.getParameterByName("itemId")): null,
      //personalDetailsId: parseInt(this.getParameterByName("itemId")),
      
      
      CandidateInformation,
      {
        personalDetailsId: this.view == 'create'? null : parseInt(this.getParameterByName("itemId")),
        componentType: parseInt(this.getParameterByName("compId")),
        dataProvider: this._dataProvider,
        view: this.getParameterByName("view"),
        environ: Environ,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected getItemId(param: string): string          // Get Item Id from Query string paramaeter 
  // {
  //   let taskUrl = this.getParameterByName("itemId");
    
  // }

  protected getParameterByName(param: string): string          // Get Item Id from Query string paramaeter 
{
    let match = RegExp('[?&]' + param + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
