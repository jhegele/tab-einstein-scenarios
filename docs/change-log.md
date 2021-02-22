# Change Log

## v0.4.1

_Released on 22 Feb 2021_

This is a minor release consisting of security fixes detailed below.

- Upgraded multiple JS package dependencies to resolve security issues
- Upgraded Python `crypotgraphy` package to resolve security issues

## v0.4.0

_Released on 17 Aug 2020_

This is a feature release consisting of the following new features, enhancements, and bug fixes:

- Added ability to specify tab names for Predict, Explain, and Action tabs. This is added as a tactical fix to allow more complete localization of the extension for end users.
- Upgraded two indirect dependencies (`serialize-javascript` and `prismjs`) to address security vulnerabilities in older versions.

## v0.3.3

_Released on 3 Aug 2020_

This is a minor release consisting of security fixes detailed below.

- Upgraded elliptical and dot-prop dependencies to remove security vulnerabilities in old versions. Neither library is a direct dependency of this project.

## v0.3.2

_Released on: 23 July 2020_

This is a minor release consisting of security fixes detailed below.

- Upgraded lodash dependency to latest version due to a security issue identified in the prior version. The impacted function in lodash was _not_ being used in this project.

## v0.3.1

_Released on: 16 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

- Fixed a bug where a dashboard with no Tableau parameters would allow the user to enter the setup phase, authenticate to Salesforce and then show a blank screen.

## v0.3.0

_Released on: 15 June 2020_

This is a major (beta) release consisting of the following new features, enhancements, and bug fixes:

- Added support for Einstein's next best actions via a new Action page
- Added preference configuration for the new Action page
- Added suggested mappings during setup process based on string similarity
- Reworked preferences controls to make them more concise and consistent
- Updated build process to provide greater automation

## v0.2.4

_Released on: 03 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

- Added error messaging when Einstein returns no predictive models. Previously the extension would just spin endlessly.

## v0.2.3

_Released on: 02 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

- Fixed a bug where two people authenticating at the same time could cause a collision and one user would see the other's models
- Fixed a bug where a prediction with no explanatory data would still show the Explain option as a page
