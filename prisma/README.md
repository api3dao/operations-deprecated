# Prisma ORM Database Resources

![Kiku](ERD.svg)

#### Useful commands for development on the database:

```shell
# Start an empty local database instance
yarn database:dev:start

# Set the database URL ENV
export DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres?schema=public

# Generate artifacts
yarn prisma generate

# Create migrations if applicable
yarn migrate dev

# Apply the migration(s)
yarn db push

# Browse the DB via a UI
yarn prisma studio

# Load operations into the database
yarn database:translate-operations
```

#### Or, all together: Reset the DB, migrate, load operations

```shell
yarn prisma format &&\
yarn prisma migrate reset --force &&\
yarn prisma generate &&\
yarn prisma db push &&\
yarn ts-node src/database/translate-operations.ts # or yarn database:translate-operations
```

#### Examples of database usage

Refer to `generate-exports.ts`, which partially replicates the functionality of `export-ops-json-payloads.ts` for
various query examples.

Refer to `translate-operations.ts` for examples of how data can be loaded en-masse.
