data "cloudflare_zone" "example" {
  name = "maketheinternetgo.com"
}

resource "cloudflare_record" "mtig-api" {
  zone_id = data.cloudflare_zone.example.id
  name    = var.env == "prod" ? "api" : "${var.env}.api"
  value   = aws_apigatewayv2_domain_name.mtig.domain_name_configuration[0].target_domain_name
  type    = "CNAME"
  proxied = true
}
