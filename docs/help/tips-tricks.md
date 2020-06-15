# Tips & Tricks

## Update Prediction Based on Mark Selection

Credit to my colleagues John Demby and Curt Budd for figuring this one out. Partial credit to my colleague Andrea Gossett for asking about it before anyone else. Zero credit to me for totally missing the boat on this one. Now that everyone (except me) has received appropriate credit, let's discuss how this works.

This extension is linked to parameters but there may be cases where you want to use the extension and trigger updates based on mark selection on a worksheet within your dashboard. The key to making this work are parameter actions. Parameter actions were introduced in 2019.2 and they allow you to update a parameter based on, for example, selecting a mark in a worksheet. So, you can set a parameter action to update one or more of the parameters that you've linked to your Einstein model and get updated predictions based on selections the user makes.

**A couple of very important notes on this topic**:

* You must set your parameter actions at the _dashboard_ level and not at the worksheet level.
* Parameters in Tableau are "sticky" so if you click on a mark where a parameter receives a new value, then click on a mark where that parameter should be set to `null`, the parameter will retain the old, non-null value. (Thanks to Lovekesh Babbar for figuring this one out as it would have taken me forever to diagnose this!)