import { LoadFacebookUser } from '@/data/contracts/apis'
import { AuthentiocationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUser) {}
  async perform (params: FacebookAuthentication.Params): Promise<AuthentiocationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthentiocationError()
  }
}