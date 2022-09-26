resource "aws_db_instance" "api3-operations" {
  identifier                      = "api3-operations"
  instance_class                  = "db.t4g.micro"
  allocated_storage               = 5
  engine                          = "postgres"
  engine_version                  = "14.1"
  username                        = var.db_username
  password                        = var.db_password
  db_subnet_group_name            = aws_db_subnet_group.api3-operations.name
  vpc_security_group_ids          = [aws_security_group.rds.id]
  publicly_accessible             = false
  skip_final_snapshot             = true
  multi_az                        = true
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  backup_window                   = "05:00-05:30"
  backup_retention_period         = 1
}

resource "aws_security_group" "rds" {
  name   = "api3-operations-rds"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "api3-operations-rds"
  }
}

resource "aws_db_subnet_group" "api3-operations" {
  name       = "api3-operations"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "api3-operations"
  }
}
