terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.22.0"
    }
    archive = {
      source = "hashicorp/archive"
      version = "2.2.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "archive" {
  # Configuration options
}