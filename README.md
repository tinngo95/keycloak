# Axis Dashboard

Axis Dashboard là giao diện quản trị danh tính và truy cập được xây dựng trên nền tảng Keycloak.
Các namespace, API, package và cấu trúc database kỹ thuật của Keycloak được giữ nguyên để bảo đảm tương thích.

## Chạy source này bằng Docker Desktop

Cấu hình trong repository sẽ build Keycloak trực tiếp từ source. Máy host chỉ cần cài
[Git](https://git-scm.com/downloads) và
[Docker Desktop](https://www.docker.com/products/docker-desktop/); không cần cài Java,
Maven, Node.js hoặc pnpm riêng.

## Build và chạy

Khởi động Docker Desktop, mở terminal tại thư mục repository rồi chạy:

```powershell
docker compose up -d --build
```

Lần build đầu tiên cần tải dependency và biên dịch backend/frontend nên có thể mất vài phút.
Khi container báo `healthy`, truy cập:

- Admin Console: http://localhost:8080/admin/master/console/
- Health endpoint: http://localhost:9000/health/ready

Tài khoản local mặc định:

```text
Username: admin
Password: admin
```

Có thể thay tài khoản bootstrap trước lần chạy đầu bằng biến môi trường:

```powershell
$env:KEYCLOAK_ADMIN_USERNAME="my-admin"
$env:KEYCLOAK_ADMIN_PASSWORD="change-this-password"
docker compose up -d --build
```

## Các lệnh quản lý

```powershell
# Xem trạng thái
docker compose ps

# Xem log
docker compose logs -f keycloak

# Tắt và giữ nguyên dữ liệu
docker compose down

# Chạy lại, không build source
docker compose up -d

# Build lại sau khi sửa source
docker compose up -d --build
```

Dữ liệu local được lưu trong Docker volume `keycloak-local-data`. Không dùng
`docker compose down -v` nếu muốn giữ realms, users, clients và cấu hình đã tạo.

> Cấu hình này chạy `start-dev` cùng database H2 và tài khoản mặc định, chỉ phù hợp
> cho phát triển/thử nghiệm cục bộ. Không dùng nguyên trạng cho production.

Các file liên quan:

- `Dockerfile.local`: build server distribution từ source bằng Maven Wrapper và JDK 25.
- `docker-compose.yml`: chạy container, cấu hình tài khoản, port, healthcheck và volume.
- `.dockerignore`: loại các artifact không cần thiết khỏi Docker build context.

---

<!-- Logo Keycloak mặc định đã được ẩn theo branding Axis Dashboard. -->

![GitHub Release](https://img.shields.io/github/v/release/keycloak/keycloak?label=latest%20release)
[![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/6818/badge)](https://bestpractices.coreinfrastructure.org/projects/6818)
[![CLOMonitor](https://img.shields.io/endpoint?url=https://clomonitor.io/api/projects/cncf/keycloak/badge)](https://clomonitor.io/projects/cncf/keycloak)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/keycloak/keycloak/badge)](https://securityscorecards.dev/viewer/?uri=github.com/keycloak/keycloak)
[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/keycloak-operator)](https://artifacthub.io/packages/olm/community-operators/keycloak-operator)
![GitHub Repo stars](https://img.shields.io/github/stars/keycloak/keycloak?style=flat)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/keycloak/keycloak)
[![Translation status](https://hosted.weblate.org/widget/keycloak/svg-badge.svg)](docs/translation.md)

# Open Source Identity and Access Management

Add authentication to applications and secure services with minimum effort. No need to deal with storing users or authenticating users.

Keycloak provides user federation, strong authentication, user management, fine-grained authorization, and more.


## Help and Documentation

* [Documentation](https://www.keycloak.org/documentation.html)
* [User Mailing List](https://groups.google.com/d/forum/keycloak-user) - Mailing list for help and general questions about Keycloak
* Join [#keycloak](https://cloud-native.slack.com/archives/C056HC17KK9) for general questions, or [#keycloak-dev](https://cloud-native.slack.com/archives/C056XU905S6) on Slack for design and development discussions, by creating an account at [https://slack.cncf.io/](https://slack.cncf.io/).


## Reporting Security Vulnerabilities

If you have found a security vulnerability, please look at the [instructions on how to properly report it](https://github.com/keycloak/keycloak/security/policy).


## Reporting an issue

If you believe you have discovered a defect in Keycloak, please open [an issue](https://github.com/keycloak/keycloak/issues).
Please remember to provide a good summary, description as well as steps to reproduce the issue.


## Getting started

To run Keycloak, download the distribution from our [website](https://www.keycloak.org/downloads.html). Unzip and run:

    bin/kc.[sh|bat] start-dev

Alternatively, you can use the Docker image by running:

    docker run quay.io/keycloak/keycloak start-dev
    
For more details refer to the [Keycloak Documentation](https://www.keycloak.org/documentation.html).


## Building from Source

To build from source, refer to the [building and working with the code base](docs/building.md) guide.


### Testing

To run tests, refer to the [running tests](docs/tests.md) guide.


### Writing Tests

To write tests, refer to the [writing tests](docs/tests-development.md) guide.


## Contributing

Before contributing to Keycloak, please read our [contributing guidelines](CONTRIBUTING.md). Participation in the Keycloak project is governed by the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md).

Joining a [community meeting](https://www.keycloak.org/community) is a great way to get involved and help shape the future of Keycloak.

## Code of Conduct

We are committed to providing a safe, welcoming, and constructive environment for all Keycloak contributors and users.
To protect this space, we actively enforce our [Code of Conduct](https://github.com/keycloak/.github/blob/main/CODE_OF_CONDUCT.md).
If you wish to report an incident or appeal a moderation decision, please email `keycloak-coc@googlegroups.com`.

## Other Keycloak Projects

* [Keycloak](https://github.com/keycloak/keycloak) - Keycloak Server and Java adapters
* [Keycloak Client](https://github.com/keycloak/keycloak-client) - Keycloak client libraries
* [Keycloak QuickStarts](https://github.com/keycloak/keycloak-quickstarts) - QuickStarts for getting started with Keycloak
* [Keycloak Node.js Connect](https://github.com/keycloak/keycloak-nodejs-connect) - Node.js adapter for Keycloak


## License

* [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
