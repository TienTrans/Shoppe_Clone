import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: 'Email không hợp lệ'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài email không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Email phải dài hơn 6 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },

    minLength: {
      value: 6,
      message: 'Mật khẩu phải dài hơn 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài mật khẩu không được quá 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password không được để trống'
    },
    minLength: {
      value: 6,
      message: 'phải dài hơn 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài không được quá 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => (value === getValues('password') ? true : 'Confirm password không khớp')
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}
export const schema = yup.object({
  email: yup
    .string()
    .email()
    .required('Email không được để trống')
    .min(6, 'Email phải dài hơn 6 ký')
    .max(160, 'Độ dài email không được quá 160 ký tự')
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Email không hợp lệ'),
  password: yup
    .string()
    .required('Password không được để trống')
    .min(6, 'Mật khẩu phải dài hơn 6 ký tự')
    .max(160, 'Độ dài mật khẩu không được quá 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại Password không được để trống')
    .min(6, 'Độ dài phải dài hơn 6 ký tự')
    .max(160, 'Độ dài không được quá 160 ký tự')
    .oneOf([yup.ref('password')], 'Confirm password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().trim().max(160, 'Độ dài tối đa là 160'),
  phone: yup
    .string()
    .trim()
    .max(20, 'Độ dài tối đa là 20')
    .matches(/^[0-9]*$/, 'Số điện thoại không hợp lệ'),
  address: yup.string().trim().max(160, 'Độ dài tối đa là 160'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự '),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

export const loginSchema = schema.omit(['confirm_password', 'price_min', 'price_max', 'name'])
export const registerSchema = schema.omit(['price_min', 'price_max', 'name'])
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
