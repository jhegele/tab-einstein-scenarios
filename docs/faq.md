# Frequently Asked Questions

This is intended to be something of a living document. I'm going to start by listing questions that I think might be commonly asked but, as more people use this extension, I'm sure this will evolve.

## Do you work for Tableau or Salesforce or something?

Yes. I mean, since Tableau was acquired by Salesforce I guess I work for both of them? I dunno, it's cool either way, they are both awesome companies full of super awesome people. But my primary focus is and has been Tableau and that's the company that actually hired me.

## I asked Tableau Support about this extension and they had no idea what I was talking about. What gives?

Well, as mentioned above, I do work for Tableau but I built this extension on my own and this is not officially supported by Tableau or Salesforce. Seriously, if you have issues, please, please, please [open an issue](https://github.com/jhegele/tab-einstein-scenarios/issues/new) and **do not** reach out to our awesome support teams. They are totally awesome people that will always go way out of their way to help you out but, since this is my thing that I built, they won't be able to support you, they'll spend some cycles figuring out what this thing is, then they'll reach out to me and I'll ask you to open an issue. So, save us all a lot of time here and just open an issue for me, please.

## How do I use extensions in Tableau?

Extensions were introduced in Tableau 2018.2 so, first of all, make sure you're using _at least_ that version of Tableau. You are? OK, great, in that case, open Tableau Desktop and go to one of your dashboards where you'd like to deploy the extension. In the left-hand panel, under Objects, you should see "Extension." Just drag that little fella out to your dashboard and drop it where you want the extension and, voila, you're on your way.

Still having trouble? Hey I never said I was a good teacher (or even a good coder, for that matter)! Here's some [support documentation from Tableau Support](https://help.tableau.com/current/pro/desktop/en-us/dashboard_extensions.htm) who are totally awesome and way better at this stuff than I'll ever be.

## What is a Tableau Extension?

Tableau Extensions are really, really cool things that allow you to add super cool, new functionality to all of the existing super cool functionality in Tableau. Oh wait, you wanted more than that? _SIGH_ OK, let's get into a little bit of detail, then.

Extensions, in Tableau, are basically web applications that can run inside your dashboard and are granted certain special permissions to interact with the dashboard. This **does not** necessarily mean that an extension has access to everything in your dashboard (though it _could_ have that level of access). By default, extensions are granted access to the Summary Data in Tableau (if you are a Tableau Creator, open a dashboard, right click on a worksheet, and choose View Data -- there are two tabs at the bottom, Summary Data and Full Data, extensions have access to Summary Data _only_ by default).

## When I use this extension and go through the Salesforce authentication for the first time, it asks for a lot of permissions. Why?

Yeah, that will eventually change. Honestly, I did that just to make life easier for me as I'm developing this. I've open sourced all of the code to provide full transparency around what this extension does. So, I'm definitely _not_ looking to gather any data or anything like that. I just requested full permissions because it makes it easier to focus on UI and functionality issues rather than permissions issues. Once this is stable, I'll update to request the minimum necessary permissions.

## So, wait, if I'm loading a webpage in my dashboard, are you sending my data somewhere?

Well, the short answer is, "yes, I'm sending the values from the parameters that you mapped to the web application I built which is running on Heroku". Heroku is a very widely used web services company that is also owned by Salesforce (so, for me, it's a pretty handy spot to deploy something like this).

The longer answer is still "yes." But to expand on this a bit, I'm _only_ sending the values from the parameters that you specified during setup and even those values are never stored on the Heroku server. Don't believe me? Good for you, I'm just a dude on the internet, you shouldn't believe me. But, I've made all of my source code available here and, if telling you that isn't good enough, I'll even [provide a link to the backend where all of this communication happens](https://github.com/jhegele/tab-einstein-scenarios/blob/master/app/app.py)!

## Why do you need to send my data anywhere at all?!

Well, this topic can get really complicated really quickly but just know that, if I had the option of never sending your data anywhere, I would 100% take that option. But there are a bunch of web security standards that exist for a ton of good reasons and, because of those, I need to use the application backend in order to send requests to Salesforce. That means I need to send the parameter data from your dashboard to my server and I then send it along to Einstein. If you want to understand more about this topic, start by checking out some info on CORS (cross-origin resource sharing).

## When I load your extension, I don't see anything at all. Nothing happens, what gives?

Uh, well, I'm just, like, writing this and trying to anticipate questions and this is kind of a tough one. The first thing you need to do is make sure you can actually access the location where this extension is hosted. Here, try [this link](http://einstein-scenarios.herokuapp.com/auth/confirm) and see if you can see the Authentication Complete message. If you can't then, well, I have some bad news for you, it seems like you can't access the hosting location of this extension so you probably can't use it.

If you _can_ access that page then I also have some bad news for you. I'm not sure why you aren't seeing anything. I mean, if you would do me a favor and [open an issue](https://github.com/jhegele/tab-einstein-scenarios/issues/new), I'd be forever grateful and I promise that I'll try to look into this for you. The more detail you can provide, the better.

## I have an issue that you haven't covered here. What should I do?!

Your best option is to [open an issue](https://github.com/jhegele/tab-einstein-scenarios/issues/new). I'll do my best to give it a look and try to figure out what's going on. Please provide as much detail as possible!

## Your extension is so awesome that I got promoted, paid off my house and student loans, and a news crew is asking to interview me. How can I thank you?

Well, I'm honestly just elated to hear that things are going so well and I hope that continues for you!