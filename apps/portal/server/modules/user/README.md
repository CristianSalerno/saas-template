## Conventions

### Why?
    1. Co-location
    1. Single Responsability files
    1. Simple architecture for easy navigation
    1. Unit, Integration, and E2E tests
All of these increase DX and serve to maintain cost of development and migrations low in the future.
 

1. Resolvers are the entry point of the server. It's responsabilities are:
    1. Handle use-cases. e.g. `start a contract`
    1. Reuse services
    1. Map output dto