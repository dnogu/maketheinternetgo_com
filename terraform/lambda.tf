resource "aws_lambda_function" "dns_lambda" {
  # If the file is not in the current working directory you will need to include a 
  # path.module in the filename.
  filename      = data.archive_file.lambda_zip.output_path
  function_name = "${var.env}_mtig_dns_lambda"
  role          = aws_iam_role.iam_for_lambda.arn

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  runtime = "nodejs16.x"
  handler = "index.handler"

}

resource "aws_iam_role" "iam_for_lambda" {
  name = "${var.env}-iam_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "policy" {
  name        = "${var.env}-mtig-lambda-execution-policy"
  path        = "/"
  description = "Policy used in ${var.env} for lambda role to funciton."

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:815468840516:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:815468840516:log-group:/aws/lambda/${var.env}_mtig_dns_lambda:*"
            ]
        }
    ]
})
}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.policy.arn
}

resource "aws_lambda_permission" "allow_apigateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.dns_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.mtig.execution_arn}/*/*/dns"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "../aws/index.js"
  output_path = "files/dns_js.zip"
}
