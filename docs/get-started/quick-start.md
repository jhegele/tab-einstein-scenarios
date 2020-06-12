# Requirements

* Tableau 2018.2+
* Einstein license
* Internet access

# Installation

Tableau Extensions are loaded via a TREX file. [Download the latest TREX file from GitHub](https://github.com/jhegele/tab-einstein-scenarios/raw/master/trex/tableau-einstein-scenarios.trex) (you may need to right click the link and choose Save Link As).

# Create an Einstein Story & Deploy a Model

Einstein Scenarios for Tableau is built to leverage predictive models built in Salesforce's Einstein Discovery platform. So you'll need at least one model, built using the data set you're visualizing in Tableau, in order to use this extension. This documentation presumes that you already have a story built in Einstein and that you've deployed the model. If you are new to Einstein, Salesforce provides [comprehensive documentation and various Trailheads](http://pages.mail.salesforce.com/gettingstarted/analytics-cloud/einstein-data-discovery/) to help get you up to speed. Start there first, then come back to grab the extension.

# Creating Tableau Parameters

Once you have your Einstein Story built and your model deployed, you'll need to create parameters in Tableau that correspond to the columns that your Einstein model expects. For example, let's say I have an Einstein Story built to maximize the sales price of a residential home. Einstein has indicated that the following columns are the most significant factors in maximizing sales price:

* Neighborhood 
* Square Footage 
* Number of Bathrooms 
* Number of Bedrooms 
* Distance to Nearest School 

In Tableau, I would need to create five parameters, each of which uses a data type that is consistent with the data I used to build/train my Einstein Model. So, my Tableau parameters might look something like this

Param Name | Data Type
--- | ---
EA Neighborhood | `string`
EA Square Footage | `integer`
EA Number of Bathrooms | `float`
EA Number of Bedrooms | `integer`
EA Distance to Nearest School | `float`

I like to use EA (for Einstein Analytics) as a prefix to make it easy to find the parameters when I setup the extension. This isn't a requirement by any means, though.

# Adding the Extension

At this point, you're ready to add the extension to your dashboard. Drag an extension object onto your dashboard and select the TREX file you previously downloaded. The extension will walk you through the setup process.

# Deploying / Managing Extensions on Tableau Server/Online

Please refer to Tableau's Knowledge Base for details on how to [use Dashboard Extensions](https://help.tableau.com/current/pro/desktop/en-us/dashboard_extensions.htm) and/or how to [manage extensions](https://help.tableau.com/current/server/en-us/dashboard_extensions_server.htm) on Tableau Server or Online.