# How It Works

What follows is an overview of how this extension works. This is not mean to be a comprehensive technical overview, rather this is meant to provide a high level view of how this extension communicates between Tableau and Einstein.

## The Tableau Side

This extension leverages Tableau parameters in order to pass data to Einstein. In order to do this, the extension makes use of out-of-the-box functionality provided by [Tableau's Extensions API](https://tableau.github.io/extensions-api/). At a high level, when you go through the setup process, you'll be asked to map Tableau parameters to Einstein model fields. The extension takes that information and watches for changes on any of the parameters identifed during setup. If any of them change, the extension makes a new call to Einstein to get an updated prediction.

## The Einstein (Salesforce) Side

On the Einstein side, this extension uses production APIs to make calls to Einstein models and get predictions. Salesforce provides a robust set of APIs that allow developers to integrate with nearly all elements of the Salesforce platform, including Einstein. These APIs are fully supported by Salesforce as official integration points.

In the case of this extension, the primary API endpoint that is used is the [Einstein Prediction Service Scoring API](https://developer.salesforce.com/docs/api-explorer/einstein-predict/predict). When a change to any of the mapped parameters is detected, a new request is made to this API in order to get an updated prediction.

## Security & Authentication

Salesforce's API utilizes [OAuth 2.0](https://oauth.net/2/) as it's authentication mechanism. OAuth is a widely adopted and implemented standard for authentication across the web. This extension leverages functionality that is provided, natively, as a part of the OAuth 2.0 specification.