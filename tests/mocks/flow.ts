import { FlowDefinition } from '../../src/flowDefinition'
import { UserModel } from './user'

class TestFlow extends FlowDefinition<UserModel> {}

export const Flow = new TestFlow()
