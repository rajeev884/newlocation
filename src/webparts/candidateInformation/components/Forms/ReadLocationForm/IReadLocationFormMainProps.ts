

   import IDataProvider   from "../../../../../dataproviders/IDataProvider";

   import { WebPartContext } from '@microsoft/sp-webpart-base';

    export interface IReadLocationFormMainProps {
        dataProvider: IDataProvider;
        locationId: number;
        context: WebPartContext;
        _changeForm(newForm: string): void;  // method passed to change the form
      } 