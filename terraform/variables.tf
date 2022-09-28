variable "aws_region" {
  default     = "us-east-1"
  description = "AWS region"
}


variable "db_username" {
  description = "RDS root user username"
  sensitive   = true
}

variable "db_password" {
  description = "RDS root user password"
  sensitive   = true
}
