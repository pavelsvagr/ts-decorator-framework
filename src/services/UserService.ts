/* eslint-disable @typescript-eslint/no-unused-vars */
import { cached } from '../framework/decorators/cached'
import { logged } from '../framework/decorators/logged'
import { invalidates } from '../framework/decorators/invalidates'
import { userRepository } from '../connectors/fakeDb'
import { z } from 'zod'
import { validates } from '../framework/decorators/validates'
import { measure } from '../framework/decorators/measure'

export const UserDtoSchema = z.object({
  username: z.string(),
})

const hashArgs = (prefix: string) => (...args: string[]) => args.length ? `${prefix}:${args.join('-')}` : prefix
const keygen = hashArgs('users')

export default class UserService {
  @cached(5, keygen)
  @logged
  getUser(id: string) {
    return userRepository.detail({ id })
  }

  @logged
  @cached(10, 'users')
  getUsers() {
    return userRepository.list()
  }

  @logged
  @validates(UserDtoSchema, 1)
  @invalidates([(id: string) => keygen(id), 'users'])
  async updateUser(id: string, data: { username: string }) {
    await userRepository.update({ id }, data)
    return userRepository.detail({ id })
  }
}
