output "id" { value = aws_default_vpc.main.id }

output "subnet_ids" { value = aws_default_subnet.main[*].id }
