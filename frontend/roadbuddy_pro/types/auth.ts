export type SignupPayload = {
  email: string
  name: string
  password: string
  date_of_birth: string
}

export type SigninPayload = {
  email: string
  password: string
}

export type SignupResponse = {
  id: string
  email: string
  full_name?: string | null
}

export type SigninResponse = {
  access_token: string
  token_type: string
}