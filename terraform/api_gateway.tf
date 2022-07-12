resource "aws_apigatewayv2_domain_name" "mtig" {
  domain_name = var.env == "prod" ? "maketheinternetgo.com" : "${var.env}-api.maketheinternetgo.com"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.mtig.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

# data "aws_acm_certificate" "issued" {
#   domain   = var.env == "prod" ? "maketheinternetgo.com" : "${var.env}-api.maketheinternetgo.com"
#   statuses = ["ISSUED"]
#   most_recent = true
# }

resource "aws_acm_certificate" "mtig" {
  private_key      = tls_private_key.mtig.private_key_pem
  certificate_body = cloudflare_origin_ca_certificate.mtig.certificate
  certificate_chain = "${data.cloudflare_origin_ca_root_certificate.origin_ca.cert_pem}${cloudflare_origin_ca_certificate.mtig.certificate}"
}

resource "aws_apigatewayv2_api" "mtig" {
  name          = var.env == "prod" ? "mtig-http-api" : "${var.env}_mtig-http-api"
  protocol_type = "HTTP"
  target = aws_lambda_function.dns_lambda.invoke_arn
  route_key = "GET /dns"
}

resource "aws_apigatewayv2_api_mapping" "example" {
  api_id      = aws_apigatewayv2_api.mtig.id
  domain_name = aws_apigatewayv2_domain_name.mtig.id
  stage = "$default"
}

# output "mtig_url" {
#   value = aws_apigatewayv2_api.mtig.api_endpoint
# }