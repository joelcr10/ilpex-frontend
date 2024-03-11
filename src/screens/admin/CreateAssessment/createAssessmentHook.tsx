import { useSelector } from "react-redux";
import api from "../../../network/api";
import Constants from "../../../utils/Constants";
import { getItem } from "../../../utils/utils";


type responseType = {message: string}

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: responseType;
}


export const createAssessmentAPI=async(batch_id: number,assessment_name : string, user_id: number, start_date: Date,end_date : Date): Promise<Response>=>{
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;

    const token = useSelector((state: any) => state.userDetailsReducer.token);


    console.log("--------------:"+token+":-------------------------");

    const authorization =  {
        headers: {
          'Authorization': 'Bearer' + token
        }
    }


    const payload = {
        batch: batch_id,
        assessment_name: assessment_name,
        user_id: user_id,
        start_date : start_date,
        end_date : end_date
    }

    try{
        const response = await api.post(
            `/api/v3/assessment/`,
            payload,
            authorization
        );
        

        statusCode = response.status.toString();
        {
            statusCode === '200' ? (success = true) : (success = false);
        }

        responseData = response.data;


    }catch(error: any){
        console.log('Error while updating assessment score:', error);

        errorMessage = error.message;
    }

    return {success, statusCode, responseData, errorMessage};
}

