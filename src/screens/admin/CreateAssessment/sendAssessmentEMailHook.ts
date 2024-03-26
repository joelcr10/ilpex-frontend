import Constants from '../../../utils/Constants';
import { getItem } from '../../../utils/utils';
import instance from '../../../network/api'
 
interface SendAssessmentEmailProp {
    batch_id : number,
    assessmentName : string, 
    formattedStartDate : string,
    formattedEndDate : string
}
 
interface SendAssessmentEmailResponse {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  sendMailResp: any;
}
 
export async function SendAssessmentEmailHook({
  batch_id,
  assessmentName,
  formattedStartDate,
  formattedEndDate
}: SendAssessmentEmailProp): Promise<SendAssessmentEmailResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let sendMailResp: any;
 
  const sendMailPayload = {
    batch_id : batch_id,
    assessment_name : assessmentName,
    start_date : formattedStartDate,
    end_date : formattedEndDate
  };

  const token = await getItem(Constants.TOKEN);
  const authorization =  {
    headers: {
      'Authorization': 'Bearer ' + token
    }
}

 
  try {
    console.log("Received Data in Hook : ", batch_id, assessmentName, formattedStartDate, formattedEndDate);
    const sendMailResponse = await instance.post(
      '/api/v2//assessment/mail',sendMailPayload, authorization
  
    );

    statusCode = sendMailResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    
    sendMailResp = sendMailResponse.data;
    console.log("sendMailResp resp",sendMailResp);
 


  } catch (error: any) {
    console.log('Error while sending Assessment mail:', error);
    errorMessage = error.message;
  }
 
  return {success, statusCode, sendMailResp, errorMessage};
}