import {React, useEffect, useState} from 'react'
import { Box, Button, Typography } from '@mui/material'

import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'


const Delete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    // const [loading, setLoading] = useState(true)
    const GetData = () => {
      AxiosInstance.get(`project/${MyId}`).then((res)=>{
        setMyData(res.data)
        console.log(res.data)
        setLoading(false)


      })
  
    }
    useEffect(()=>{
      // console.log(MyId) 1st
      GetData();
    },[])// eslint-disable-line react-hooks/exhaustive-deps


    const navigate = useNavigate()
 


    const submission = (data) => {
      AxiosInstance.delete( `project/${MyId}/`)
      .then((res)=>{
        navigate(`/`)
      })
    }
  return (
    <div>
      { loading ? <p>Loading Data...</p>:
      <div>
      <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px', color:'#fff'}}>
          Delete Project:{myData.name}
        </Typography>
      </Box>
      <Box sx={{display:'flex', width:'100%', boxShadow:3,padding:4, flexDirection:'column'}}>
       
       <Box sx={{display:'flex',justifyContent:'start', marginBottom:'40px'}}>
         Are You Sure Yor Want To Delete The {myData.name}
       </Box>
     
       <Box sx={{width:'30%'}}>
           <Button variant='contained' onClick={submission} sx={{width:'100%'}}>
             DELETE THE PROJECT
           </Button>
       </Box>

      </Box>
      </div>
      }
    </div>
  )
}

export default Delete

