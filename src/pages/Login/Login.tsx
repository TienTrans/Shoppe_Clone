import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/component/Button'
import Input from 'src/component/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { loginSchema, LoginSchema } from 'src/utils/rules'
import { isAxiosError } from 'src/utils/ultils'

type LoginForm = LoginSchema

export default function Login() {
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) })

  const loginMutation = useMutation({
    mutationFn: (body: LoginForm) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setAuthenticated(true), setProfile(data.data.data.user), navigate('/')
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse<LoginForm>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginForm, {
                message: formError[key as keyof LoginForm],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                placeholder='email'
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                register={register}
                placeholder='password'
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  isLoading={loginMutation.status === 'pending'}
                  disabled={loginMutation.status === 'pending'}
                  type='submit'
                  className='w-full flex py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 justify-center items-center'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
