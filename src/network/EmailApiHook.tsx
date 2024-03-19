import Constants from '../utils/Constants';
import { getItem } from '../utils/utils';
import instance from './api';

interface Trainee  {
  trainee_id: number;
  Batch: string;
  user_name: string;
  email: string;
};
 
interface SendMailProp {
    incompleteTraineeList: Trainee[];
    day_number:number;
}
 
interface SendMailResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  sendMailResp: any;
}
 
export async function sendMail({
  incompleteTraineeList,
  day_number,
}: SendMailProp): Promise<SendMailResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let sendMailResp: any;
 
  const sendMailPayload = {
    IncompleteTraineeList:incompleteTraineeList,
    day_number:day_number
  };

  const token = await getItem(Constants.TOKEN);
  const authorization =  {
    headers: {
      'Authorization': 'Bearer ' + token
    }
}

 
  try {
    console.log(incompleteTraineeList);
    const sendMailResponse = await instance.post(
      '/api/v2/pending/day/mail',sendMailPayload, authorization
  
    );

    statusCode = sendMailResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    sendMailResp = sendMailResponse.data;
    console.log("sendMailResp resp",sendMailResp);
 


  } catch (error: any) {
    console.log('Error while sending mail:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, sendMailResp, errorMessage};
}