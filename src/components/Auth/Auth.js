import { Container, Grid, Paper, Typography, Button, } from '@mui/material'
import { Alert } from '@mui/material'
import React, { useState } from 'react'
import Input from './Input'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, signUpUser } from '../../redux/actions/Auth'
import { useNavigate } from 'react-router-dom'
const initialState = {
  name: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar:''

}
function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const {socket}=useSelector((state)=>state.AuthReducer)
  const switchMode = () => {
    setForm(initialState)
    setError('')
    setIsSignUp((prevState) => !prevState)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSignUp) {
      (form.phoneNumber.length!=10)?
      setError('only indian phonenumber allowed'):
      form.password.length<6?
      setError('password should be minmum 6 character')
       :form.password!==form.confirmPassword?
       setError('password not match')
       :signUpNewOne();
    } else {
      const err =await  dispatch(LoginUser(form, navigate,socket))
      setError(err)
    }
  }

 async function signUpNewOne(){
     const err=await dispatch(signUpUser(form,navigate,socket))
     setError(err)
  }

  const handleChange = (e) => {
    setError('')
    if(e.target.type==='file'){
      const reader=new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend=()=>{

        setForm({ ...form, [e.target.name]: reader.result})
      }
    }
    else
      setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleShowPassword = {}
  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} className={classes.paper}>
        {error && <Alert severity="error">{error}— check it out!</Alert>}
        <Typography component='h1' variant='h5'>
          {isSignUp ? 'Sign UP' : 'Sign In'}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name='name' label='Name' handleChange={handleChange} autoFocus />
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              </>
            )}
            {
              !isSignUp &&(
                <>
                user-1<br/><br/>
                phonenumber: 9669669660<br/>
                password: 123456<br/><br/>
                user-2 (open in incognito mode)<br/><br/>
                phonenumber: 8792635047<br/>
                password: 123456<br/>
                </>
              )
            }
            <Input name='phoneNumber' label='Phone number' handleChange={handleChange} type='number'
            />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"
              />
            )}
            {isSignUp &&(
              <Input name='avatar'  handleChange={handleChange} accept='image/*'  type='file' />
            )}
            {form.avatar &&(
              <img alt="" src={form.avatar} width='90px' style={{padding:'10px'}}/>
            )}
          </Grid>

          <Grid container justify="flex-end">
            <Button className={classes.submit} type='submit' variant='text' fullWidth  >
              {isSignUp ? 'Signup' : 'Login'}
            </Button>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an Account? Sign In"
                  : "Don't have account Signup"}
              </Button>
            </Grid>
          </Grid>
        </form>

      </Paper>
    </Container>
  )
}

export default Auth