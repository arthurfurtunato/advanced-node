import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthentiocationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadUserAccountRepository } from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthentiocationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData.email })
    }
    return new AuthentiocationError()
  }
}
