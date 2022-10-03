module "database" {
  source      = "./modules/database"
  db_username = var.db_username
  db_password = var.db_password
  vpc_id      = module.vpc.id
  subnet_ids  = module.vpc.subnet_ids
}

module "vpc" {
  source             = "./modules/vpc"
  availability_zones = data.aws_availability_zones.all_zones.names
}
