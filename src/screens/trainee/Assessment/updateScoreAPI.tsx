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


export async function updateScoreAPI(assessment_id: number, user_id: number, score: number): Promise<Response>{
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
        assessment_id: assessment_id,
        user_id: user_id,
        score: score
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

