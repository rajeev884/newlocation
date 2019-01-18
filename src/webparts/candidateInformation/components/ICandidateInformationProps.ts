//import { PageContext } from "@microsoft/sp-page-context";
import IDataProvider   from "../../../dataproviders/IDataProvider";
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface ICandidateInformationProps {
  personalDetailsId : number;
  componentType: number;
  dataProvider: IDataProvider;
  environ: string;
  view: string;
  context: WebPartContext;
}
