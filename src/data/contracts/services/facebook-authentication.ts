import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthentiocationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { CreateFacebookAccountRepository, LoadUserAccountRepository, UpdateFacebookAccountRepository } from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthentiocationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      if (accountData !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: accountData.id,
          facebookId: fbData.facebookId,
          name: accountData.name ?? fbData.name
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbData)
      }
    }
    return new AuthentiocationError()
  }
}
