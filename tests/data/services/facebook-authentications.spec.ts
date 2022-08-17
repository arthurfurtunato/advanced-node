import { AuthentiocationError } from '@/domain/errors'
import { LoadFacebookUser } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/contracts/services'
import { mock } from 'jest-mock-extended'

describe('FacebookAuthentications', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    loadFacebookUserApi.loadUser.mockResolvedValue(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthentiocationError())
  })
})
