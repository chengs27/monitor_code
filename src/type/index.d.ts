namespace API {
    export interface IBaseResponse {
      code: number;
      msg: string;
      success: boolean;
    }
  
    export interface IProjectInfo {
      id?: number;
      name?: string;
      owner?: string;
      type?: string;
      monitorCount?: number;
    }

    export interface ICodeInfo {
      id?: number;
      name?: string;
      code?: number;
      codeName: string;
      yesterdayCount?: number;
      todayCount?: number;
      dataValues: any;
      todayList: Array<any>;
    }
  
    export interface IProjectRes extends IBaseResponse {
      data: Array<IProjectInfo>;
    }
  }