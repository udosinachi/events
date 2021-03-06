import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const theme = createTheme()

export default function Signup() {
  const [loader, setLoader] = useState(false)
  const history = useHistory()

  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('')
  const [userText, setUserText] = useState('')
  const [career, setCareer] = useState([])
  const [eye, setEye] = useState(true)
  const [description, setDescription] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    axios
      .get('https://eventplanningweb.herokuapp.com/category/allcategory')
      .then((res) => {
        setCareer(res.data.categories)
      })
      .catch((err) => {
        toast.error('Unable to Display Categories')
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      fullName,
      businessName,
      phoneNumber,
      email,
      password,
      category,
      userText,
      isAdmin,
    }
    setLoader(true)
    axios
      .post('https://eventplanningweb.herokuapp.com/auth/users/register', data)
      .then((res) => {
        if (res.data.hasError === false) {
          toast.success(res.data.message)
          setFullName('')
          setBusinessName('')
          setPhoneNumber('')
          setEmail('')
          setPassword('')
          setCategory('')
          setUserText('')
          setIsAdmin(res.data.user.isAdmin)
          localStorage.setItem('token', res.data.user.token)
          localStorage.setItem('id', res.data.user._id)
          localStorage.setItem('fullName', res.data.user.fullName)
          localStorage.setItem('businessName', res.data.user.businessName)
          localStorage.setItem('email', res.data.user.email)
          localStorage.setItem('phoneNumber', res.data.user.phoneNumber)
          localStorage.setItem('password', res.data.user.password)
          localStorage.setItem('category', res.data.user.category)
          localStorage.setItem('image', res.data.user.image)
          localStorage.setItem('userText', res.data.user.userText)
          localStorage.setItem('isAdmin', res.data.user.isAdmin)
          setLoader(false)
          window.setTimeout(() => {
            history.push('/')
          }, 1000)
        } else {
          toast.error(res.data.message)
          setLoader(false)
        }
      })
  }

  const nextClick = (e) => {
    e.preventDefault()

    if (
      !fullName ||
      !businessName ||
      !email ||
      !phoneNumber ||
      !password ||
      !category
    ) {
      toast.error('all fields must be entered')
    } else {
      setDescription(false)
    }
  }

  return (
    <div>
      {description === true ? (
        <ThemeProvider theme={theme}>
          <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light'
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#20364b' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign Up
                </Typography>
                <Box component='form' noValidate sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete='fname'
                        name='fullName'
                        required
                        fullWidth
                        id='fullName'
                        label='Full Name'
                        autoFocus
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id='businessName'
                        label='Business Name'
                        name='businessName'
                        autoComplete='lname'
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id='phoneNumber'
                        label='Phone Number'
                        name='phoneNumber'
                        autoComplete='pnumber'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} className='password-grid'>
                      <TextField
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type={eye ? 'password' : 'text'}
                        id='password'
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {eye ? (
                        <Visibility
                          className='password-icon'
                          onClick={() => setEye(false)}
                        />
                      ) : (
                        <VisibilityOff
                          className='password-icon'
                          onClick={() => setEye(true)}
                        />
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Category *
                        </InputLabel>

                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Category *'
                          onChange={(e) => setCategory(e.target.value)}
                          value={category}
                        >
                          {career.map((cat) => (
                            <MenuItem key={cat._id} value={cat.name}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value='allowExtraEmails' color='primary' />
                        }
                        label='I want to receive updates via email.'
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type='button'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2, bgcolor: '#20364b' }}
                    onClick={(e) => nextClick(e)}
                  >
                    Next
                  </Button>

                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                      <Link to='login' variant='body2' className='link'>
                        Already have an account? Sign In
                      </Link>
                    </Grid>
                  </Grid>
                  <div sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <ToastContainer />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light'
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ mt: 1, bgcolor: '#20364b' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                    Company's Description
                  </Typography>
                </Box>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='usertext'
                        name='userText'
                        required
                        fullWidth
                        id='userText'
                        label="Company's Description"
                        autoFocus
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  {loader === false ? (
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2, bgcolor: '#20364b' }}
                    >
                      Sign Up
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2, bgcolor: '#20364b' }}
                    >
                      <CircularProgress />
                    </Button>
                  )}
                  <div sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <ToastContainer />
        </ThemeProvider>
      )}
    </div>
  )
}
