import api from "../../network/api";


interface reportRequestType{
    user_id: number
}



type responseType = {message: string}

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: responseType;
}


export async function percipioReportAPI(user_id: number): Promise<Response>{
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;

    
    console.log('user id------->'+user_id);

    const payload = {
        user_id: user_id
    }
    try{
        const response = await api.post(
            `/api/v3/percipio`,
            payload
        );
        

        statusCode = response.status.toString();
        {
            statusCode === '200' ? (success = true) : (success = false);
        }

        responseData = response.data;


    }catch(error: any){
        console.log('Error while logging in:', error);

        errorMessage = error.message;
    }

    return {success, statusCode, responseData, errorMessage};
}

