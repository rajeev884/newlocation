

   import IDataProvider   from "../../../../../dataproviders/IDataProvider";
   import { WebPartContext } from '@microsoft/sp-webpart-base';

    export interface ICreateLocationFormMainProps {
        dataProvider: IDataProvider;
        context: WebPartContext;
      } 