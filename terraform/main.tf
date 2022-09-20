module "database" {
  source      = "./modules/database"
  db_username = var.db_username
  db_password = var.db_password
}

module "vpc" {
  source             = "./modules/vpc"
  availability_zones = data.aws_availability_zones.available.names
}
