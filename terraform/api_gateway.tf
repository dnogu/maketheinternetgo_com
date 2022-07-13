resource "aws_apigatewayv2_domain_name" "mtig" {
  domain_name = var.env == "prod" ? "maketheinternetgo.com" : "${var.env}-api.maketheinternetgo.com"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.mtig.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_acm_certificate" "mtig" {
  private_key      = tls_private_key.mtig.private_key_pem
  certificate_body = cloudflare_origin_ca_certificate.mtig.certificate
  certificate_chain = "${data.cloudflare_origin_ca_root_certificate.origin_ca.cert_pem}${cloudflare_origin_ca_certificate.mtig.certificate}"
}

resource "aws_apigatewayv2_api" "mtig" {
  name          = var.env == "prod" ? "mtig-http-api" : "${var.env}_mtig-http-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = [ "GET" ]
  }
}

resource "aws_apigatewayv2_api_mapping" "example" {
  api_id      = aws_apigatewayv2_api.mtig.id
  domain_name = aws_apigatewayv2_domain_name.mtig.id
  stage = aws_apigatewayv2_stage.lambda_stage.name
}

resource "aws_apigatewayv2_integration" "mtig" {
  api_id           = aws_apigatewayv2_api.mtig.id
  integration_type = "AWS_PROXY"

  description               = "Lambda example"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.dns_lambda.invoke_arn
}

resource "aws_apigatewayv2_route" "mtig" {
  api_id = aws_apigatewayv2_api.mtig.id

  route_key = "GET /dns"
  target    = "integrations/${aws_apigatewayv2_integration.mtig.id}"
}

resource "aws_apigatewayv2_stage" "lambda_stage" {
  api_id = aws_apigatewayv2_api.mtig.id
  name   = "lambda_stage"
  auto_deploy = true
}