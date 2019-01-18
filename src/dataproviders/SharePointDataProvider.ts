import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
// import pnp and pnp logging system
import { ConsoleListener, Logger, FunctionListener, LogEntry, LogLevel, Web, ItemAddResult, sp } from "sp-pnp-js/lib/pnp";
//import { IListItem, IList, IOption } from "../common/IObjects";
import IDataProvider from "./IDataProvider";
import { ILocation } from "../webparts/candidateInformation/common/Interfaces/ILocation";
import {IQuestionSet} from '../webparts/candidateInformation/common/Interfaces/IQuestionSet'
import { Async } from '@uifabric/utilities';
import { Callout } from 'office-ui-fabric-react';
import pnp, { EmailProperties } from "sp-pnp-js";



export default class SharePointDataProvider implements IDataProvider {

  

    private _webPartContext: IWebPartContext;
    private _listAbsoluteUrl: string;
    private _webAbsoluteUrl: string;

    constructor(value: IWebPartContext) {
        this._webPartContext = value;
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;
        //this._listAbsoluteUrl = listUrl;
      /*   this._libraryAbsoluteUrl =
            libraryUrl.lastIndexOf("/") == libraryUrl.length - 1 ?
                libraryUrl.substr(0, libraryUrl.length - 1) :
                libraryUrl; */
    }
    public async getFilteredlistitem(listName: string, itemtitle:any, item: any, paramSelect?: string, itemtitle2?: string, group?: string): Promise<any>{
      try {
        console.log('in sp dataprovider item id is' + item);
        const webUrl = this._webPartContext.pageContext.web.absoluteUrl;
        console.log('from sp weburl is' + webUrl);
        let queryUrl: string;
        if(listName=='LocationQuestionMapping')
          {
            queryUrl = `${webUrl}/_api/web/lists/getByTitle('${listName}')/items?$filter=(${itemtitle} eq ${item}) and (${itemtitle2} eq '${group}')`
          }
        else if(paramSelect == 'getFileNames')
          {
            queryUrl = `${webUrl}/_api/web/lists/getByTitle('${listName}')/items?$select=File/Name,QuestionId&$filter=${itemtitle} eq ${item}&$expand=File`
          }
        else
          {
            queryUrl = `${webUrl}/_api/web/lists/getByTitle('${listName}')/items?$filter=(${itemtitle} eq ${item})`
          }

          let response;
          response = await $.ajax({
              url: queryUrl,
              method: "GET",
              headers: {"accept": "application/json"},
              dataType: "json",
              success: function(items){
                //console.log(items,'locationdata');
              },
              error: function(err){console.log(err,'errerr')}
          });
          return new Promise<any>((resolve) => {
            resolve(response);
           });
        }
      catch (error) {
        console.warn(error.responseText);
    }
  }


    public async readLocation(listName: string, itemId: number): Promise<any>{
      console.log("entered readLocation");
      console.log("itemId is " + itemId);
try {
    console.log("entered try block");
    let response: any;   // Initially we don't know the structure of response
    const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
    response = await web.lists
      .getByTitle(listName)
      .items.getById(itemId)
      //.select("PersonalTitle")
      //.select("Title","Product/Title","Product/ID","ProductEANcode","BrandName/Title","Division/Title","ProductManager/Title","ManufacturingLocation/Title","ProductWeight","bomPrice","launchDate","launchQuantity","unitPerCarton","printingRequirement","PackagingStandards","regularQuantity","productDescription","benchmarkProduct","additionalFeatures").expand("Product","BrandName","Division","ProductManager","ManufacturingLocation")
      .usingCaching()
      .get();
    console.log(response);
    console.log("Hello from Dataprovider");
    return new Promise<any>((resolve) => {
        resolve(response);
    });
  } catch (error) {
    //console.log(error);
    console.warn(error.responseText);
    // set a new state conserving the previous state + the new error
  }
}

    public async getQuestionSets(listName: string): Promise<any>{
    try
      {
        let response: any;   // Initially we don't know the structure of response
        const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
        response = await web.lists
          .getByTitle(listName)
          .items
          //.select("ID","Question","RequestType")
          .filter("disabled eq false")
          .usingCaching()
          .get();
        console.log("Question Array" + response);
        console.log("Hello from Dataprovider");
        return new Promise<any>((resolve) => {
            resolve(response);
        });
      }
      catch(err)
      {
        console.log(err);
      }
      
      }



  
  public async updateBusinessArea(listName: string, itemId: number, businessArea: number): Promise<string>{
    let successUpdation: string;
    try {
        let response: any;   // Initially we don't know the structure of response
        const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
          response = await web.lists
          .getByTitle(listName)
          .items.getById(itemId)
          .update({
            //TaskOutcome: "Approved",
            //Status: "Approved"
            BusinessArea: businessArea
        })
            if(response.data!= undefined)
            {
              successUpdation = 'Location Code updated successfully'
            }
            else(
              successUpdation = 'Some error occured. Please try again.'
            )
            // this result will have two properties "data" and "item"
            // data is what was returned from SharePoint after the update operation
            // and item is an object of type item representing the REST query to that item
            // so you can immediately chain off that
        
            console.log(response);
            return new Promise<any>((resolve) => {
              console.log(successUpdation,'successUpdation');
              resolve(successUpdation);
          });
        } catch (error) {
        console.log(error);
        successUpdation = error;
        return new Promise<any>((resolve) => {
          resolve(successUpdation);
      });
        // set a new state conserving the previous state + the new error
      }
}
  
  
  
  
  
  public async updateApproval(listName: string, itemId: number, userGroup: string,decision:string): Promise<string>{
    let successMessage: string;
          if(userGroup == 'Accounts')
          {
            try {
              let response: any;   // Initially we don't know the structure of response
              const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
                response = await web.lists
                .getByTitle(listName)
                .items.getById(itemId)
                .update({
                    Accounts: decision
              })
              const webUrl = this._webPartContext.pageContext.web.absoluteUrl;            
              let response1;
              response1 = await $.ajax({
                url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*,Author/EMail&$expand=Author/EMail&$filter=ID eq ${itemId}`,
                method: "GET",
                headers: {"accept": "application/json"},
                dataType: "json",
                success: function(items){
                  console.log(items.value[0].Author.EMail,'author');
                    const emailProps: EmailProperties = {
                      To: [items.value[0].Author.EMail],
                      Subject: "New Location Opening Notification",
                      Body: "Hello ,<br/> Your request for opening Plant Location has been "+decision+" by "+userGroup+"<br/> Thank You for raising the request",
                    };                
                    pnp.sp.utility.sendEmail(emailProps).then(_ => {                
                      console.log("Email Sent!");
                    });
                    if(decision=='Rejected'){
                      //sent devsite Scm & legal notification
                      // pnp.sp.web.siteGroups.getById(43).users.get().then(function(result) {
                      //   result.forEach(function (value) {
                      //     const emailSCMProps: EmailProperties = {
                      //       To: [value.Email],
                      //       Subject: "New Location Opening Notification",
                      //       Body: "Hello SCM,<br/> Request Id "+ items.value[0].ID +" for opening Plant Location has been "+decision+" by "+userGroup+"<br/> ",
                      //     };   
                      //     pnp.sp.utility.sendEmail(emailSCMProps).then(_ => {                
                      //       console.log("Email Sent! to Scm");
                      //     });
                      //   });
                      // });
                      // pnp.sp.web.siteGroups.getById(44).users.get().then(function(result) {
                      // result.forEach(function (value) {
                      //    const emailSCMProps: EmailProperties = {
                      //       To: [value.Email],
                      //       Subject: "New Location Opening Notification",
                      //       Body: "Hello Legal,<br/> Request Id "+ items.value[0].ID +" for opening Plant Location has been "+decision+" by "+userGroup+"<br/> ",
                      //     };   
                      //     pnp.sp.utility.sendEmail(emailSCMProps).then(_ => {                
                      //       console.log("Email Sent! to legal");
                      //     });
                      //   });
                      // });

                      //sent production legal scm
                      pnp.sp.web.siteGroups.getById(60).users.get().then(function(result) {
                        result.forEach(function (value) {
                          const emailSCMProps: EmailProperties = {
                            To: [value.Email],
                            Subject: "New Location Opening Notification",
                            Body: "Hello SCM,<br/> Request Id "+ items.value[0].ID +" for opening Plant Location has been "+decision+" by "+userGroup+"<br/> ",
                          };   
                          pnp.sp.utility.sendEmail(emailSCMProps).then(_ => {                
                            console.log("Email Sent! to Scm");
                          });
                        });
                      });
                      pnp.sp.web.siteGroups.getById(62).users.get().then(function(result) {
                        result.forEach(function (value) {
                          const emailLegalProps: EmailProperties = {
                            To: [value.Email],
                            Subject: "New Location Opening Notification",
                            Body: "Hello Legal,<br/> Request Id "+ items.value[0].ID +" for opening Plant Location has been "+decision+" by "+userGroup+"<br/> ",
                          };   
                          pnp.sp.utility.sendEmail(emailLegalProps).then(_ => {                
                            console.log("Email Sent! to legal");
                          });
                        });
                      });

                    }                    
                    
                },
                error: function(err){console.log(err,'errerr')}
               });
                if( response == undefined)
                {
                  successMessage =  'Request not Approved. Please try again';
                }
                else
                {
                  successMessage =  'Request '+decision+' successfully.';
                  // this result will have two properties "data" and "item"
                  // data is what was returned from SharePoint after the update operation
                  // and item is an object of type item representing the REST query to that item
                  // so you can immediately chain off that
              
                  console.log('response for update approval is' + response);
              }
      
              
               return new Promise<string>((resolve) => {
                  resolve(successMessage);
                });
            }
              catch (error) {
              console.log(error);
              // set a new state conserving the previous state + the new error
            } 
          }
          else if(userGroup == 'SCM')
          {
            try {
              let response: any;   
              const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
                response = await web.lists
                .getByTitle(listName)
                .items.getById(itemId)                
                .update({
                    SCM: decision
                 })

              const webUrl = this._webPartContext.pageContext.web.absoluteUrl;            
              let response1;
              response1 = await $.ajax({
                url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*,Author/EMail&$expand=Author/EMail&$filter=ID eq ${itemId}`,
                method: "GET",
                headers: {"accept": "application/json"},
                dataType: "json",
                success: function(items){
                  console.log(items.value[0].Author.EMail,'author');
                    const emailProps: EmailProperties = {
                      To: [items.value[0].Author.EMail],
                      Subject: "New Location Opening Notification",
                      Body: "Hello ,<br/> Your request for opening Plant Location has been "+decision+" by "+userGroup+"<br/> Thank You for raising the request",
                    };                
                    pnp.sp.utility.sendEmail(emailProps).then(_ => {                
                      console.log("Email Sent!");
                    });
                    
                },
                error: function(err){console.log(err,'errerr')}
               });

                if( response == undefined){
                  successMessage =  'Request not Approved. Please try again';
                }
                else{
                  successMessage =  'Request '+decision+' successfully.';
                  console.log('response for update approval is' , response);
                }
      
              
               return new Promise<string>((resolve) => {
                  resolve(successMessage);
                });
            }
              catch (error) {
              console.log(error);
            }
                    
            
           
          }
          else if(userGroup == 'Legal')
          {
            try {
              let response: any;   // Initially we don't know the structure of response
              const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
                response = await web.lists
                .getByTitle(listName)
                .items.getById(itemId)                
                .update({
                  Legal: decision
              })
              const webUrl = this._webPartContext.pageContext.web.absoluteUrl;            
              let response1;
              response1 = await $.ajax({
                url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=*,Author/EMail&$expand=Author/EMail&$filter=ID eq ${itemId}`,
                method: "GET",
                headers: {"accept": "application/json"},
                dataType: "json",
                success: function(items){
                  console.log(items.value[0].Author.EMail,'author');
                    const emailProps: EmailProperties = {
                      To: [items.value[0].Author.EMail],
                      Subject: "New Location Opening Notification",
                      Body: "Hello ,<br/> Your request for opening Plant Location has been "+decision+" by "+userGroup+"<br/> Thank You for raising the request",
                    };                
                    pnp.sp.utility.sendEmail(emailProps).then(_ => {                
                      console.log("Email Sent!");
                    });
                    if(decision=='Rejected'){
                      //sent devsite Scm  notification
                      // pnp.sp.web.siteGroups.getById(43).users.get().then(function(result) {
                      //   result.forEach(function (value) {
                      //     const emailSCMProps: EmailProperties = {
                      //       To: [value.Email],
                      //       Subject: "New Location Opening Notification",
                      //       Body: "Hello SCM,<br/> Request Id "+ items.value[0].ID +" for opening Plant Location has been "+decision+" by "+userGroup+"<br/> ",
                      //     };   
                      //     pnp.sp.utility.sendEmail(emailSCMProps).then(_ => {                
                      //       console.log("Email Sent! to Scm");
                      //     });
                      //   });
                      // });

                      //sent production  Scm  notification
                      pnp.sp.web.siteGroups.getById(60).users.get().then(function(result) {
                        result.forEach(function (value) {
                          const emailSCMProps: EmailProperties = {
                            To: [value.Email],
                            Subject: "New Location Opening Notification",
                            Body: "Hello SCM,<br/> Request Id "+ items.value[0].ID +" for opening Plant Location has been "+decision+" by "+userGroup+"<br/> ",
                          };   
                          pnp.sp.utility.sendEmail(emailSCMProps).then(_ => {                
                            console.log("Email Sent! to Scm");
                          });
                        });
                      });

                    }
                    
                },
                error: function(err){console.log(err,'errerr')}
               });
                if( response == undefined)
                {
                  successMessage =  'Request not Approved. Please try again';
                }
                else
                {
                  successMessage =  'Request '+decision+' successfully.';
                  // this result will have two properties "data" and "item"
                  // data is what was returned from SharePoint after the update operation
                  // and item is an object of type item representing the REST query to that item
                  // so you can immediately chain off that
              
                  console.log('response for update approval is' + response);
              }
      
              
               return new Promise<string>((resolve) => {
                  resolve(successMessage);
                });
            }
              catch (error) {
              console.log(error);
              // set a new state conserving the previous state + the new error
            }
          }
    


}

  public async createUpdateLocation(listName: string, item: ILocation, questionSetList: IQuestionSet[], locationId?: number, userId? : number): Promise<string>{
     debugger;
    let successMessage: string;
      if(locationId != undefined)
      {
        try {

          let promises = [];
                
          for(let i=0;i<questionSetList.length;i++)
          {
            if(questionSetList[i].document != null)
              {
                //console.log("Plant Name is" + response.data.Title);
                console.log("question is" + questionSetList[i].questionText);
                promises.push(this.createDocument(locationId,"Documents", questionSetList[i], 1));
              }
          }
          
            await this.resolvePromiseArray(promises);
            successMessage = 'Location Updated Successfully';
            return new Promise<string>((resolve) => {
              resolve(successMessage);
          });
        }
           catch (error) {
          console.log(error);
          successMessage = error;
          return new Promise<string>((resolve) => {
            resolve(successMessage);
        });
          // set a new state conserving the previous state + the new error
        }
      }
      else
      {
        try {
          console.log("item is" + JSON.stringify(item))
          let response: any;   // Initially we don't know the structure of response
          const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
            response = await web.lists
            .getByTitle('Plant')
            //.getById('8d765112-0a88-49f3-943f-969c92f6739b')
             .items
             .add({
               Title: item.Title,
               PlantNumber: item.PlantNumber,
               PlantAddress: item.PlantAddress,
               ManufacturingPlant: item.ManufacturingPlant,
               State: item.State,
               BusinessArea: item.BusinessArea,
               CompanyCode:  item.CompanyCode,
               PAN: item.Pan,
               GSTIN: item.Gstin,
               RequestType: item.RequestType 
             })
          //.then( response => {
              // this result will have two properties "data" and "item"
              // data is what was returned from SharePoint after the update operation
              // and item is an object of type item representing the REST query to that item
              // so you can immediately chain off that
              if( response.data.Id == undefined)
              {
                successMessage =  'Request not saved. Please try again';
                return new Promise<string>((resolve) => {
                  resolve(successMessage);
                })
              }
              else
              {
                console.log(response);
                
                let promises = [];
                
                for(let i=0;i<questionSetList.length;i++)
                {
                  if(questionSetList[i].taskFlag==true)
                    {
                      console.log("Plant Name is" + response.data.Title);
                      console.log("question is" + questionSetList[i].questionText);
                      promises.push(this.createTask("Tasks2",response.data.Title,questionSetList[i].questionText,questionSetList[i].dueDate, userId));
                    }
                }
                
                  await this.resolvePromiseArray(promises);
                  let promisesDouments = [];

                  for(let i=0;i<questionSetList.length;i++)
                  {
                    if(!questionSetList[i].taskFlag)
                      {
                        console.log("Plant Name is" + response.data.Title);
                        console.log("question is" + questionSetList[i].questionText);
                        promisesDouments.push(this.createDocument(response.data.Id,"Documents", questionSetList[i], 0));
                      }
                  }  

                  await this.resolvePromiseArray(promisesDouments);
  
                    let questionSetArrayWithGroups = [];
                    // Let's create a new question set array for ques loc mapping
                    for(let i=0;i<questionSetList.length;i++)
                    {
                      for(let j=0;j<questionSetList[i].groupsAllowed.length;j++)
                      {
                        let obj : any =
                        {
                          questionId : questionSetList[i].questionId,
                          questionText : questionSetList[i].questionText,
                          group : questionSetList[i].groupsAllowed[j]
                        }
                        questionSetArrayWithGroups.push(obj);
                      }
                    }

                    let promisesQuestions = [];

                    for(let i=0;i<questionSetArrayWithGroups.length;i++)
                    {
                      promisesQuestions.push(this.createLocationQuestionMapping('LocationQuestionMapping', questionSetArrayWithGroups[i].questionId, response.data.Id, questionSetArrayWithGroups[i].group, questionSetArrayWithGroups[i].questionText ));
                    }
                    
                    await this.resolvePromiseArray(promisesQuestions)

                    let promisesCommHeadQuestions = [];

                    for(let i=0;i<questionSetList.length;i++)
                    {
                      promisesCommHeadQuestions.push(this.createLocationQuestionMapping('LocationQuestionMapping', questionSetList[i].questionId, response.data.Id, 'CommHead' , questionSetList[i].questionText ));
                    }

                    await this.resolvePromiseArray(promisesCommHeadQuestions);
                      //console.log('Final response2 promisesCommHeadQuestions', finalResponse2)
                      successMessage =  'Request was saved successfully.';
                      return new Promise<string>((resolve) => {
                        resolve(successMessage);
                      })  
                    //})
                  //})
        //})
                  /* .catch((e) => {
                    console.log(e);
                  }); */
                    //})
                //.catch((e) => {
                  //console.log(e);
                    // Handle errors here
                //});
              }
            //})
          }
           catch (error) {
          console.log(error);
          // set a new state conserving the previous state + the new error
        }

      }
}

public async resolvePromiseArray(promiseArray): Promise<any> {

  const tasksCreated = await Promise.all(promiseArray);
  // ... do some stuff
  return new Promise<any>((resolve) => {
    resolve(tasksCreated);
  })
}


 public async createLocationQuestionMapping(listName: string, qId: number, LocationId: number, group: string, qText: string): Promise<void>{
  try {
        let response: any;   // Initially we don't know the structure of response
        const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
        let currentUserId = this._webPartContext.pageContext.user.email;
          response = await web.lists
          .getByTitle(listName)
          .items
          .add({
            QuestionId: qId,
            LocationId: LocationId,
            group: group,
            QuestionText: qText
        }).then((iar: ItemAddResult) => {
            // this result will have two properties "data" and "item"
            // data is what was returned from SharePoint after the update operation
            // and item is an object of type item representing the REST query to that item
            // so you can immediately chain off that
            
        console.log(iar);
        });
        } catch (error) {
        console.log(error);
        // set a new state conserving the previous state + the new error
      }
  } 
   

    public async getUserGroups(): Promise<any>{
      try
      {
        let result: any;
        const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
        let userEmail = this._webPartContext.pageContext.user.email;            
       /*  let curruser = web.currentUser.get().then(function(res){ 
          console.log(res.Title); })

          console.log('curruser object is: ' + curruser); */
           await web.siteUsers
           .getByEmail(userEmail)
           //.getByLoginName(userLoginName)
          .select('Id').get()
          .then(user => {
            console.log('User object for getUserGroups is' + user)
            return web.siteUsers.getById(user.Id).groups.get();
          })
          .then( response => {
            result = response;
            console.log('user groups are' + response)
          })
          return new Promise<any>((resolve) => {
            resolve(result);
          });
      }
      catch (error) {
        console.log(error);
        // set a new state conserving the previous state + the new error
      }
    }


    public async createTask(listName: string, Title: string, Description: string, DueDate: Date, userId: number): Promise<void>{
      try {
        //console.log('user id is in create doc', userId)
            let response: any;   // Initially we don't know the structure of response
            const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);         
            response = await web.lists
              .getByTitle(listName)
              .items
              .add({
                //TaskOutcome: "Approved",
                //Status: "Approved"
                Title: Title,
                Body: Description,
                //AssignedTo: userId,
                DueDate: DueDate,
                //RelatedItems: ''
            }).then((iar: ItemAddResult) => {
                // this result will have two properties "data" and "item"
                // data is what was returned from SharePoint after the update operation
                // and item is an object of type item representing the REST query to that item
                // so you can immediately chain off that
            console.log(iar);
            });
            } catch (error) {
            console.log(error);
            // set a new state conserving the previous state + the new error
          }
      }


      public async createDocument(LocationId: number, libraryName: string, questionSet: IQuestionSet, updateStatus? : number): Promise<void>{
        try {
              console.log('updateStatus for Document is' + questionSet);
              console.log('LocationId from createDocument is' + LocationId);
              let response: any;   // Initially we don't know the structure of response 
              var fileNameArray: string;
              var fileName: string;
              fileNameArray = questionSet.document.name.split(".");
              console.log('from sp new fileNameArray is' + fileNameArray)
              fileName = fileNameArray[0] + LocationId + questionSet.questionId + '.' +  fileNameArray[1];
              console.log('from sp new file name is' + fileName)
              const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
              //in case of multiple files,iterate or else upload the first file.
              if (questionSet.document!=undefined || questionSet.document!=null){
    //assuming that the name of document library is Documents, change as per your requirement, 
    //this will add the file in root folder of the document library, if you have a folder named test, replace it as "/Documents/test"
          let result = await web.getFolderByServerRelativeUrl(this._webPartContext.pageContext.web.serverRelativeUrl +"/Documents/").files.add(fileName, questionSet.document, true);
          console.log(JSON.stringify(result) + " upload successfully!");
          //result.file.getItem().then(item => {
          let item = await result.file.getItem();
           await item.update({
                LocationId: LocationId,
                QuestionId: questionSet.questionId,
                QuestionText: questionSet.questionText,
                updateStatus: updateStatus ,
                GroupsAllowed: {
                  results: questionSet.groupsAllowed
                }
            });
        //}); 
  }
                 // you can adjust this number to control what size files are uploaded in chunks
              } catch (error) {
              console.log(error);
              // set a new state conserving the previous state + the new error
            }
        }

        public async getChoiceFieldvalues(listName: string, choiceFieldName: string): Promise<any>{

          try
          {
            let response: any;   // Initially we don't know the structure of response
            const web: Web = new Web(this._webPartContext.pageContext.web.absoluteUrl);
            response = await web.lists
              .getByTitle(listName)
              .fields.getByInternalNameOrTitle(choiceFieldName)      
              .select('Choices')
              .get();
            console.log("Hello from Dataprovider choiceFieldvalues");
            console.log('response for choice fields' + response);
            return new Promise<any>((resolve) => {
                resolve(response);
            });
          }
          catch(err)
          {
            console.log(err);
          }
          }


        
}