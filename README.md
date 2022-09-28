# @api3/operations

> The Operations repository stores data and utilities relating to API3 operations and dAPIs

### Documentation

- #### To view the contents of Operations in action, visit the [API3 Market](https://market.api3.org).
- #### For a reader-oriented introduction to dAPIs, refer to the [API3 dAPI Documentation](https://docs.api3.org/dapis/).
- #### For an overview of the structure of Operations, refer to the [Operations Documentation](https://docs.api3.org/operations).
- #### For development usage refer to the [Development Usage Guide](https://docs.api3.org/operations/development_usage.html).
- #### For an example of how to read from data feeds, refer to our [data-feed-reader-example repository](https://github.com/api3dao/data-feed-reader-example).

### Integrating a new API Provider

Integrating a new API provider for the purposes of deploying data feeds and dAPIs requires the intervention of API3
staff, but we welcome PRs for this purpose. To integrate a new API provider, refer to
[Integrating a New Provider](https://docs.api3.org/operations/integrating_new_provider.html).

# Database

This repository includes Terraform resources to deploy an Amazon RDS instance for a PostgreSQL database. These can be
found in the `terraform` directory.

## Requirements

- [Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## Configuration

### AWS account

You will need to have an AWS account setup with the correct permissions. Make sure to note down your `AWS_ACCESS_KEY_ID`
and `AWS_SECRET_ACCESS_KEY` when creating a new user.

If you haven't configured the AWS CLI user, you can export these variables in your current shell:

```sh
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
```

## Deployment

To deploy the database `cd` into the `terraform` directory and run the following commands:

### Plan

You can view a "plan" of what Terraform will deploy by running:

```sh
terraform plan
```

This will not create or deploy anything to AWS.

### Init

You will need to initialize Terraform which will download the required plugins by running:

```sh
terraform init
```

### Apply

You can deploy the database by running:

```sh
terraform apply
# You can also optionally provide a region for the deployment (defaults to us-east-1) with e.g. -var 'aws_region=us-west-1'
# Enter the database password and username when prompted for var.db_password and var.db_username
```

### Destroy

You can remove the deployment by running:

```sh
terraform destroy -auto-approve
# Enter the database password and username when prompted for var.db_password and var.db_username
```
