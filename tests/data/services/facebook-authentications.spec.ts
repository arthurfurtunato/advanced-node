import { AuthentiocationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/contracts/services'
import { LoadFacebookUser } from '@/data/contracts/apis'

class LoadFacebookUserApiSpy implements LoadFacebookUser {
  token?: string
  result = undefined
  callsCount = 0

  async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}

describe('FacebookAuthentications', () => {
  it('should call LoadFacebookUserAp with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
    expect(loadFacebookUserApi.callsCount).toBe(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthentiocationError())
  })
})
