const ERROR_CODE = {
  JS_ERROR:1001,
  PROMISE_ERROR:1002,
  RESOURCE_ERROR:1003,
}
export class Monitor {
  private pid: string | undefined;
  private uid: string | undefined;
  constructor(pid:any | undefined,uid:any | undefined){
    this.pid = pid;
    this.uid = uid;
  }
  private _postLog(valuesData:any) {
    fetch('http://localhost:3000/api/monitor',{
      body: JSON.stringify(valuesData),
      method: "post",
      headers: {
        'Content-Type': 'application/json'
        }
    })
  }
  private _postJSError = (): void => {
    let valuesData:any ={
      pid:this.pid,
      uid:this.uid,
      code:ERROR_CODE.JS_ERROR,
      info:'',
      msg:'',
      href:window.location.href,
      ua: navigator.userAgent
    }
    fetch('http://localhost:3000/api/monitor',{
      body: JSON.stringify(valuesData),
      method: "post",
      headers: {
        'Content-Type': 'application/json'
        }
    })
  }
  private _postPromiseError = (): void => {
    let valuesData:any ={
      pid:this.pid,
      uid:this.uid,
      code:ERROR_CODE.PROMISE_ERROR,
      info:'',
      msg:'',
      href:window.location.href,
      ua: navigator.userAgent
    }
    fetch('http://localhost:3000/api/monitor',{
      body: JSON.stringify(valuesData),
      method: "post",
      headers: {
        'Content-Type': 'application/json'
        }
    })
  }
  private _postResourceError = (): void => {
    let valuesData:any ={
      pid:this.pid,
      uid:this.uid,
      code:ERROR_CODE.RESOURCE_ERROR,
      info:'',
      msg:'',
      href:window.location.href,
      ua: navigator.userAgent
    }
    fetch('http://localhost:3000/api/monitor',{
      body: JSON.stringify(valuesData),
      method: "post",
      headers: {
        'Content-Type': 'application/json'
        }
    })
  }
  public update(pid:string,uid:string):void {
    this.pid = pid;
    this.uid = uid;
    this.init()
  }
  public init() { 
    try {
      window.addEventListener('error',this._postJSError);
      window.addEventListener('rejectionhandled', this._postPromiseError);
      window.addEventListener('error', this._postResourceError,true);
    } catch (error) {
      console.log(error);
    }
  }
  public postLog(data:any) {
    let valuesData:any ={
      ...data,
      pid:this.pid,
      uid:this.uid,
      href:window.location.href,
      search:window.location.search,
      ua: navigator.userAgent
    }
    this._postLog(valuesData);
  }
  onunload = () => {
    window.removeEventListener('error', this._postJSError);
    window.removeEventListener('rejectionhandled', this._postPromiseError);
    window.removeEventListener('error', this._postResourceError,true);
  }
}

export default Monitor;