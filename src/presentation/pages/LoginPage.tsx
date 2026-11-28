import { Button } from '@/presentation/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { axiosInstance } from '@/core/api'
import { useAuthStore } from '@/core/stores'
import { Input } from '../components/forms/Input'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const authStore = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data)
      const { user, token } = response.data
      authStore.login(user, token)
    } catch (error) {
      console.error('Login failed:', error)
    }
  })

  return (
    <section className="space-y-6">
      <div className="bg-background-secondary rounded-lg p-6 space-y-4 border border-background-tertiary">
        <h1 className="login-title">Login</h1>
        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <Input
              type="email"
              id="email"
              {...register('email')}
              error={errors.email?.message}
              className="form-input w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <Input
              type="password"
              id="password"
              {...register('password')}
              error={errors.password?.message}
              className="form-input w-full"
            />
          </div>
          <Button type="submit" variant="secondary" size="md" className="w-full mt-4">
            Entrar
          </Button>
        </form>
      </div>
    </section>
  )
}