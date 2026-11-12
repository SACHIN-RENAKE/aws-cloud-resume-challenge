# AWS Cloud Resume Challenge

A personal resume website hosted on AWS, with a serverless visitor counter and automated deployment through GitHub Actions.

**Live site:** https://d94lw7pfx35b1.cloudfront.net

## Architecture

- **Website:** Visitor → Amazon CloudFront → Amazon S3
- **Visitor counter:** Visitor → AWS Lambda (function URL) → Amazon DynamoDB
- **Deployment:** Developer → GitHub → GitHub Actions → Amazon S3 (sync files) and Amazon CloudFront (invalidate cache)

## Services used

| Service | Purpose |
|---|---|
| Amazon S3 | Stores the website files (HTML, CSS, JavaScript) in a private bucket with public access blocked |
| Amazon CloudFront | Serves the site over HTTPS |
| AWS Lambda (Python) | Updates and returns the visitor count |
| Amazon DynamoDB | Stores the visitor count |
| AWS IAM | Least-privilege permissions for the Lambda role and the deployment user |
| GitHub Actions | Deploys the site on every push to `main` |

## How it works

1. A visitor opens the CloudFront URL, and CloudFront serves the files from S3.
2. The page loads `index.js`, which calls the Lambda function URL.
3. Lambda adds one to the count stored in DynamoDB and returns the new number.
4. The page shows the count in the footer.

## CI/CD

Pushing to the `main` branch starts a GitHub Actions workflow (`.github/workflows/frontend-cicd.yaml`) that:

1. Logs in to AWS using GitHub repository secrets.
2. Syncs the website files to the S3 bucket.
3. Invalidates the CloudFront cache so visitors see the latest version.

The deployment user can only upload to the one bucket and create CloudFront invalidations.

## Possible improvements

- Define the infrastructure with Terraform
- Add automated tests for the Lambda function
- Add a custom domain

## Author

Sachin Jnaneshwar Renake
GitHub: [SACHIN-RENAKE](https://github.com/SACHIN-RENAKE)