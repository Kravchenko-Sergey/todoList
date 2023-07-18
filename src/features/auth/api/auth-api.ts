import { instance } from 'common/api/common-api'
import { ResponseType } from 'common/api/common-api'
import { LoginParamsType } from 'features/auth/api/auth-api-types'

export const authApi = {
	login(data: LoginParamsType) {
		return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
	},
	logout() {
		return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
	},
	me() {
		return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
	}
}
