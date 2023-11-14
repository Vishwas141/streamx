import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const useFetchUsers = () => {
  const [users, setUsers] = React.useState([])
  const navigate = useNavigate();
    React.useEffect(() => {
        const email = localStorage.getItem('email')
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/all/`,{withCredentials:true})
        .then((response) => {
          setUsers(response.data.data.filter((user)=>user.email!==email))
        })
        .catch((error) => {
            console.log(error)
            if(error.message==="undefined behaviour"){
                navigate("/auth")
              }
        })
    }, [])
    const userlabel=users.map((user)=>{
        return {...user,label:user.email}
    })
    return userlabel;
}

export default useFetchUsers