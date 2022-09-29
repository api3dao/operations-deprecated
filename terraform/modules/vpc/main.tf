resource "aws_default_vpc" "main" {
  tags = {
    Name        = "default"
    Provisioner = "terraform"
  }
}

resource "aws_default_subnet" "main" {
  count             = length(var.availability_zones)
  availability_zone = element(var.availability_zones, count.index)

  tags = {
    Name        = "default-public-${element(var.availability_zones, count.index)}"
    Provisioner = "terraform"
  }
}
