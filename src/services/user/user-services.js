import http from "../http-service.js/http-service";


export const getUserListApi  = async(params) => {
    const response = await http.get('/User/UserMannage', { params })
    return response.data
}
export const createUsers  = async(data) => {updateUser
    const response = await http.post('User/CreateUser', data )
    return response.data
}
export const updateUser  = async(id, payload) => {
    const response = await http.put('User/UpdateUser',{ 
         ...payload,
                 id
}  )
    return response.data
}
