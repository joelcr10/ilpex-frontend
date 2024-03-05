import instance from '../../../network/api';
 
interface DayListResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  Resp: any;
}
 
export async function getCourseHook(day_id:number,trainee_id:number): Promise<DayListResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let Resp: any;

 
  try {
    const Response = await instance.get(
      `/api/v3/trainee/${trainee_id}/course/day/${day_id}`,
    );

    statusCode = Response.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    Resp = Response.data;

    console.log(`Responce data is ${Resp}`)


  } catch (error: any) {
    console.log('Error while fetching', error);
    errorMessage = error.message;
  }

 
  return {success, statusCode, Resp, errorMessage};
}