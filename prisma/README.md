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

# Load operations into the database TODO
yarn database:translate-operations
```
