resource "aws_apigatewayv2_domain_name" "api_maketheinternetgo_com" {
  domain_name = var.env == "prod" ? "maketheinternetgo.com" : "${var.env}.api.maketheinternetgo.com"

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.issued.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

data "aws_acm_certificate" "issued" {
  domain   = var.env == "prod" ? "maketheinternetgo.com" : "${var.env}.api.maketheinternetgo.com"
  statuses = ["ISSUED"]
  most_recent = true
}