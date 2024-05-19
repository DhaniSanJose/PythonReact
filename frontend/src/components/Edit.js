import {React, useEffect} from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyDatePickerField from './forms/MyDatePicker'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultiLineField'
import { useForm } from 'react-hook-form'
import MySelectField from './forms/MySelectField'
import AxiosInstance from './Axios'
import  Dayjs  from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'


const Create = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    // const [loading, setLoading] = useState(true)
    const GetData = () => {
      AxiosInstance.get(`project/${MyId}`).then((res)=>{
        console.log(res.data)
        setValue('name', res.data.name)
        setValue('comments', res.data.comments)
        setValue('status', res.data.status)
        setValue('start_date', Dayjs(res.data.start_date))
        setValue('end_date', Dayjs(res.data.end_date))

      })
  
    }
    useEffect(()=>{
      // console.log(MyId) 1st
      GetData();
    },[])// eslint-disable-line react-hooks/exhaustive-deps


    const navigate = useNavigate()
    const defaultValues = {
      name: '',
      comments: '',
      status: '',
    }
    const {handleSubmit,setValue,  control} = useForm({defaultValues:defaultValues})

    const submission = (data) => {
      const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
      const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
      AxiosInstance.put( `project/${MyId}/`,{
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

