## Conventions

### Why?

    1. Co-location on code sharing same responsibility
    1. CRUD type repositories
    1. Single Responsability Services
    1. Unit, Integration, and E2E tests

All of these increase DX and serve to maintain cost of development and migrations low in the future.

1. Routers are responsible for:

   1. Declaring the router endpoints.
   1. Declaring input validations for each endpoint.
   1. Declaring output validations for each endpoint.
   1. Declaring the query or mutation resolver for each endpoint.

1. Resolvers are responsible for:

   1. Handle use-cases. e.g. `start a contract`.
   1. Reuse services. e.g. `email service` or `stripe service`.
   1. Reuse repositories. e.g. `update user`.

1. Services are responsible for:

   1. Encapsulating provider APIs. (email, stripe)
   1. Encapsulating business logic scoped to one responsibility (time service: exports methods to work with dates)

1. Repositories are reponsible for:
   1. mapping data in-and-out from DB and external providers into the app in resolvers or services
