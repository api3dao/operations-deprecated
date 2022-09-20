resource "aws_db_instance" "api3-operations" {
  identifier             = "api3-operations"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "13.1"
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.api3-operations.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  skip_final_snapshot    = true
}


resource "aws_db_subnet_group" "api3-operations" {
  name       = "api3-operations"
  subnet_ids = module.vpc.subnet_ids

  tags = {
    Name = "api3-operations"
  }
}
