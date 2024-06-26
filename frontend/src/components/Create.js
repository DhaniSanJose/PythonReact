import {React,useState} from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyDatePickerField from './forms/MyDatePicker'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultiLineField'
import { useForm } from 'react-hook-form'
import MySelectField from './forms/MySelectField'
import AxiosInstance from './Axios'
import  Dayjs  from 'dayjs'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Create = () => {
    const navigate = useNavigate()
    const defaultValues = {
      name: '',
      comments: '',
      status: '',
    }
    const schema = yup
      .object({
        name: yup.string().required('Name is a Required Field'),
        status: yup.string().required('Status is a Required Field'),
        comments: yup.string(),
        start_date: yup.date().required('Start Date is a Required Field'),
        end_date: yup.date().required('End Date is a Required Field').min(yup.ref('start_date'),'End Date can not be before the Start Date'),

      })


    const {handleSubmit, control} = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)})
  
    const submission = (data) => {
      const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
      const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
      AxiosInstance.post( `project/`,{
        name: data.name,
        status:data.status,
        comments: data.comments,
        start_date: StartDate,
        end_date: EndDate,
      })
      .then((res)=>{
        navigate(`/`)
      })
    }
  return (
    <div>
      {/* { loading ? <p>Loading Data...</p>:  */}
      <form onSubmit={handleSubmit(submission)}>
      <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px', color:'#fff'}}>
          Create Record
        </Typography>
      </Box>
      <Box sx={{display:'flex', width:'100%', boxShadow:3,padding:4, flexDirection:'column'}}>
       
        <Box sx={{display:'flex',justifyContent:'space-around', marginBottom:'40px'}}>
            <MyTextField 
              label="Name"
              name="name"
              control={control}
              placeholder="Provide a project name" 
              width={'30%'}
            />

            <MyDatePickerField 
            label="Start Date"
            name="start_date"
            control={control}
            width={'30%'}
            />

            <MyDatePickerField 
            label="End Date"
            name="end_date"
            control={control}
            width={'30%'}
            />

        </Box>

        <Box sx={{display:'flex',justifyContent:'space-around'}}>
            <MyMultilineField 
              label="Comments"
              name="comments"
              control={control}
              placeholder="Provide a project Comments" 
              width={'30%'}
            />

            <MySelectField 
            label="Status"
            name="status"
            control={control}
            width={'30%'}
            />
          <Box sx={{width:'30%'}}>
              <Button variant='contained' type='submit' sx={{width:'100%'}}>
                Submit
              </Button>
          </Box>


        </Box>


      </Box>
      </form> 
    </div>
  )
}

export default Create

