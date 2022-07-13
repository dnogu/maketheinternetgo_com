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
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "3.18.0"
    }
    http = {
      source = "hashicorp/http"
      version = "2.2.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

provider "archive" {
  # Configuration options
}

provider "cloudflare" {
  email   = var.cloudflare_email
  api_key = var.cloudflare_api_key
}

provider "http" {
  # Configuration options
}