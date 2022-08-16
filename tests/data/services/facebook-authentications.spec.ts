import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUser) {}
  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params)
  }
}

interface LoadFacebookUser {
  loadUser: (params: LoadFacebookUser.Params) => Promise<void>
}

namespace LoadFacebookUser {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUser {
  token?: string

  async loadUser (params: LoadFacebookUser.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthentications', () => {
  it('should call LoadFacebookUserAp with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })
})
