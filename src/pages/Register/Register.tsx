import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/component/Input'
import { RegisterSchema, registerSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from 'src/utils/ultils'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/component/Button'
import { ErrorResponse } from 'src/types/utils.type'

type RegisterForm = RegisterSchema

export default function Register() {
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterForm, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setAuthenticated(true), setProfile(data.data.data.user), navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<RegisterForm, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<RegisterForm, 'confirm_password'>, {
                message: formError[key as keyof Omit<RegisterForm, 'confirm_password' | 'price_min'>],
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
              <div className='text-2xl'>Đăng ký</div>
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
              <Input
                name='confirm_password'
                register={register}
                placeholder='confirm password'
                type='password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-2'>
                <Button
                  isLoading={registerAccountMutation.status === 'pending'}
                  disabled={registerAccountMutation.status === 'pending'}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
// export default function Register() {
//   return <div>Register</div>
// }
