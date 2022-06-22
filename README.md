# @api3/operations

> A repository that houses data and utilities required for API3 operations

For development usage refer to the [development usage guide](DEVELOPMENT_USAGE.md)

For developer documentation around the data structure of this repository, refer to the
[validation schema](src/utils/validation.ts).

## Branches and versioning

`main` represents the current state of the system. Deprecated versions are housed in individual branches. Deprecated
versions that are still supported are:

- `v0.1`: RrpBeaconServer-based Beacons

## Updates Flow

1. Create new branch with the updates
2. Open PR to `main` (or to a deprecated version branch)
3. Have changes approved by reviewers
4. Apply changes if needed, e.g., have an API provider redeploy
5. Merge PR immediately after step 4

If an update has moved on to step 4, block all other updates from doing so until the PR is merged. This is to prevent
parallel updates from overwriting each other's changes.
