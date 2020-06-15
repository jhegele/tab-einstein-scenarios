# Change Log

## v0.3.0
_Released on: 15 June 2020_

This is a major (beta) release consisting of the following new features, enhancements, and bug fixes:

* Added support for Einstein's next best actions via a new Action page
* Added preference configuration for the new Action page
* Added suggested mappings during setup process based on string similarity
* Reworked preferences controls to make them more concise and consistent
* Updated build process to provide greater automation

## v0.2.4
_Released on: 03 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

* Added error messaging when Einstein returns no predictive models. Previously the extension would just spin endlessly.

## v0.2.3
_Released on: 02 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

* Fixed a bug where two people authenticating at the same time could cause a collision and one user would see the other's models
* Fixed a bug where a prediction with no explanatory data would still show the Explain option as a page