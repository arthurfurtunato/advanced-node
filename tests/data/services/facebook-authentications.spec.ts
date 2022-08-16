import { AuthentiocationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUser) {}
  async perform (params: FacebookAuthentication.Params): Promise<AuthentiocationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthentiocationError()
  }
}

interface LoadFacebookUser {
  loadUser: (params: LoadFacebookUser.Params) => Promise<LoadFacebookUser.Result>
}

namespace LoadFacebookUser {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

class LoadFacebookUserApiSpy implements LoadFacebookUser {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthentications', () => {
  it('should call LoadFacebookUserAp with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthentiocationError())
  })
})
