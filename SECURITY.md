# Security Policy

## Supported Versions

We take the security of legal data on **LawLink** seriously. Below are the versions currently receiving security updates.

| Version | Supported          | Notes |
| ------- | ------------------ | ----- |
| 1.2.x   | :white_check_mark: | Latest Stable (Recommended) |
| 1.1.x   | :white_check_mark: | Maintenance Mode |
| 1.0.x   | :x:                | End of Life (EOL) |
| < 1.0   | :x:                | Beta/Development |

## Reporting a Vulnerability

If you discover a potential security vulnerability in this project, please **do not** report it through public issues or social media. Instead, follow the process below:

### How to Report
1. **Email us:** Send a detailed report to `security@lawlink-dev.io`.
2. **Details:** Include a summary of the vulnerability, the environment it was found in (e.g., Android app, Web dashboard), and step-by-step instructions to reproduce it.
3. **PoC:** If possible, include a Proof-of-Concept (PoC) script or screenshots.

### Our Response Process
* **Acknowledgment:** We will acknowledge receipt of your report within **48 hours**.
* **Investigation:** Our team will investigate the issue and determine its severity.
* **Fix & Release:** For critical vulnerabilities, we aim for a resolution within **7–10 business days**.
* **Credit:** We are happy to credit researchers who follow these guidelines in our release notes.

## Security Best Practices
As this project utilizes **Node.js** and **React**, please ensure you are running the following commands locally before pushing changes:

* `npm audit`: To identify known vulnerabilities in dependencies.
* `npm audit fix`: To automatically patch minor security issues.

---
*Last updated: April 14, 2026*
