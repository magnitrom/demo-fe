import {  throwError } from 'rxjs';


export const handleError = (error:any)=>{

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    let errorLog: any[] = JSON.parse(sessionStorage.getItem('errorLog')!);
    if (!errorLog) {
      errorLog = [];
    }
    const date = new Date(Date.now());
    errorLog.push({
      "errorMessage": errorMessage,
      "timestamp": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    });
    sessionStorage.setItem('errorLog', JSON.stringify(errorLog));
    return throwError(errorMessage);
}