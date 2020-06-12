# Change Log

## v0.3.0
_Released on:_

This is a major (beta) release consisting of the following new features, enhancements, and bug fixes:

* Added support for Einstein's next best actions via a new Action page
* Added preference configuration for the new Action page
* Added support for versioning to avoid breaking existing integrations as new versions are published
* Any extension deployed prior to this version (0.3.0) will default to using the 0.2.4 release
* Reworked text and number formatting controls to make them more concise
* Added suggested Tableau parameter mappings based on string similarity between the Tableau parameter and the Einstein model parameter

## v0.2.4
_Released on: 03 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

* Added error messaging when Einstein returns no predictive models. Previously the extension would just spin endlessly.

## v0.2.3
_Released on: 02 June 2020_

This is a minor release consisting of critical bug fixes detailed below.

* Fixed a bug where two people authenticating at the same time could cause a collision and one user would see the other's models
* Fixed a bug where a prediction with no explanatory data would still show the Explain option as a page