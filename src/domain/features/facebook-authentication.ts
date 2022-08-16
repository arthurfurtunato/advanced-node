import { AcessToken } from '@/domain/models'
import { AuthentiocationError } from '@/domain/errors'

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AcessToken | AuthentiocationError
}
