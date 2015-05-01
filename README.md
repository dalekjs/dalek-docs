# Dalek Documentation Source Aggregation

This repository contains the *raw* documentation data extracted from modules all over the place. This repository is responsible for hosting the tools to acquire and mutate the data, as well as the collected data itself. In a later stage this repository might also contain the tools to generate docs (HTML, man-pages, …)

## Specifications And Libraries

* decomposed [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol) in [data/jsonwire/0.0.0](data/jsonwire/0.0.0)
  * decomposed (but unstructured) [JsonWireProtocol DesiredCapabilities](https://code.google.com/p/selenium/wiki/DesiredCapabilities) in [data/jsonwire/0.0.0/desired-capabilities.js](data/jsonwire/0.0.0/desired-capabilities.js)
  * [OperaDriver DesiredCapabilities](https://code.google.com/p/selenium/wiki/OperaDriver) in [data/jsonwire/0.0.0/capabilities.opera.js](data/jsonwire/0.0.0/capabilities.opera.js)
  * [ChromeDriver DesiredCapabilities](https://sites.google.com/a/chromium.org/chromedriver/capabilities)
* decomposed [W3C WebDriver](https://github.com/w3c/webdriver) in [data/webdriver/0.0.0](data/webdriver/0.0.0)
* simplified [WD.js](https://github.com/admc/wd/blob/master/doc/jsonwire-full-mapping.md) in [data/wd/0.3.11/methods.json](data/wd/0.3.11/methods.json)

## Documentation To Scan

* [JsonWireProtocol Mobile](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md)
* [Appium server capabilities](http://appium.io/slate/en/v1.2.0/?javascript#appium-server-capabilities)

DesiredCapabilities relevant Selenium sources

* [org/openqa/selenium/remote/DesiredCapabilities.java](https://github.com/SeleniumHQ/selenium/blob/6b4e6de722fcccd18619951543143999e9a30657/java/client/src/org/openqa/selenium/remote/DesiredCapabilities.java)
* [org/openqa/selenium/remote/CapabilityType.java](https://github.com/SeleniumHQ/selenium/blob/6b4e6de722fcccd18619951543143999e9a30657/java/client/src/org/openqa/selenium/remote/CapabilityType.java)