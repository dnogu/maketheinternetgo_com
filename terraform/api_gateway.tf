# resource "aws_apigatewayv2_domain_name" "api.maketheinternetgo.com" {
#   domain_name = "api"

#   domain_name_configuration {
#     certificate_arn = aws_acm_certificate.example.arn
#     endpoint_type   = "REGIONAL"
#     security_policy = "TLS_1_2"
#   }
# }