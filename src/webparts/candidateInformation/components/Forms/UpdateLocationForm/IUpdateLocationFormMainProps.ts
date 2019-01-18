

   import IDataProvider   from "../../../../../dataproviders/IDataProvider";
   import { WebPartContext } from '@microsoft/sp-webpart-base';

    export interface IUpdateLocationFormMainProps {
        dataProvider: IDataProvider;
        locationId: number;
        context: WebPartContext;
      } 