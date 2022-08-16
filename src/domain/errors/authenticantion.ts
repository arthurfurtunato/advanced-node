export class AuthentiocationError extends Error {
  constructor () {
    super('Authentication failed')
    this.name = 'AuthentiocationError'
  }
}
