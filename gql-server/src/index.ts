import Fastify, {FastifyReply, FastifyRequest} from 'fastify'
import mercurius, {IResolvers} from 'mercurius'
import mercuriusCodegen, {loadSchemaFiles} from 'mercurius-codegen'
import {buildSchema} from 'graphql'
import faker from 'faker'

const app = Fastify()

const {schema} = loadSchemaFiles('src/graphql/schema/**/*.gql', {
  watchOptions: {
    enabled: process.env.NODE_ENV === 'development',
    onChange(schema) {
      app.graphql.replaceSchema(buildSchema(schema.join('\n')))
      app.graphql.defineResolvers(resolvers)

      mercuriusCodegen(app, {
        targetPath: './src/graphql/generated.ts',
        operationsGlob: './src/graphql/operations/*.gql',
      }).catch(console.error)
    },
  },
})

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    auth: req.headers.authorization,
  }
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

let employees = [...Array(25)].map(_ => ({
  id: faker.datatype.uuid(),
  name: faker.fake('{{name.firstName}} {{name.lastName}}'),
  email: faker.internet.exampleEmail(),
  phone: faker.phone.phoneNumber(),
  photo: faker.internet.avatar(),
  address: faker.address.streetAddress(true),
}))

const [profile] = employees

const resolvers: IResolvers = {
  Query: {
    allEmployee() {
      return employees
    },
    employee(_, {id}) {
      return employees.find(employee => employee.id === id)
    },
    profile(_) {
      return profile
    },
  },
  Mutation: {
    updateProfile(_, args) {
      if (args.input) {
        employees.splice(0, 0, {...args.input, id: profile.id})
      }

      return profile
    },
  },
}

app.register(mercurius, {
  schema,
  resolvers,
  context: buildContext,
  graphiql: process.env.NODE_ENV === 'development' ? 'playground' : false,
})

mercuriusCodegen(app, {
  targetPath: './src/graphql/generated.ts',
  operationsGlob: './src/graphql/operations/*.gql',
  watchOptions: {
    enabled: process.env.NODE_ENV === 'development',
  },
}).catch(console.error)

app.listen(8000)
