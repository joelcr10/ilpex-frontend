import api from "../api";

interface Response{
    success: boolean;
    errorMessage: string;
    statusCode: string;
    responseData: any;
}


export async function getHook(api_url: string): Promise<Response>{
    let success: boolean = false;
    let errorMessage: string = '';
    let statusCode: string = '';
    let responseData: any;

    try{
        const response = await api.get(
            api_url,
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

