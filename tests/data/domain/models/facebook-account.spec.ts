import { FacebookAccount } from '@/domain/models/facebook-account'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_name',
    email: 'any_email',
    facebookId: 'any_fb_id'
  }

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(fbData)
  })

  it('should update name with its empty', () => {
    const accountData = {
      id: 'any_id'
    }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should not update name with its not empty', () => {
    const accountData = {
      id: 'any_id',
      name: 'other_name'
    }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'other_name',
      email: 'any_email',
      facebookId: 'any_fb_id'
    })
  })
})
