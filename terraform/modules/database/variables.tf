
variable "db_username" {
  description = "RDS root user username"
  sensitive   = true
}

variable "db_password" {
  description = "RDS root user password"
  sensitive   = true
}

variable "vpc_id" {
  description = "VPC id"
}

variable "subnet_ids" {
  description = "VPC subnet ids"
}
