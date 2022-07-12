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

resource "aws_apigatewayv2_api" "mtig" {
  name          = "mtig-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "mtig" {
  api_id           = aws_apigatewayv2_api.mtig.id
  integration_type = "HTTP-PROXY"

  description               = "Lambda example"
  integration_method        = "GET"
  integration_uri           = aws_lambda_function.dns_lambda.invoke_arn
}

resource "aws_apigatewayv2_integration_response" "mtig" {
  api_id                   = aws_apigatewayv2_api.mtig.id
  integration_id           = aws_apigatewayv2_integration.mtig.id
  integration_response_key = "/200/"
}