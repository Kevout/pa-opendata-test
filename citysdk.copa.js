            /**
             * This is the CitySDK Module for the City of Palo Alto data.
             * This module requires a key from http://data.cityofpaloalto.org/developers/
             */

            //Attach a new module object to the CitySDK prototype.
            CitySDK.prototype.modules.copa = new COPAModule();

            //Module object definition. Every module should have an "enabled" property and an "enable"  function.
            function COPAModule() {
                this.enabled = false;
            };

            //Enable function. Stores the API key for this module and sets it as enabled
            COPAModule.prototype.enable = function(apiKey) {
                this.apiKey = apiKey;
                this.enabled = true;
            };


            /**
             * Call which returns data from the specified guid
             *
             * Request should specify a GUID, if not, nothing will happen
             *
             * {
             *      guid: "BUSIN-REGIS-CERTI-92992"
             * }
             *
             * @param request
             * @param callback
             */
            COPAModule.prototype.guidRequest = function(request, callback) {
                var apiKeyPattern = /({apiKey})/;
                var guidPattern = /({guid})/;

                var guidURL = "http://paloalto.cloudapi.junar.com/datastreams/invoke/{guid}?auth_key={apiKey}"

                if(!("invoke" in request)) return;

                guidURL = guidURL.replace(apiKeyPattern, this.apiKey);
                guidURL = guidURL.replace(guidPattern, request.guid);

                CitySDK.prototype.sdkInstance.ajaxRequest(guidURL).done(function(response) {
                    response = $.parseJSON(response);
                    callback(response);
                });
            };


            //After this point the module is all up to you
            //References to an instance of the SDK should be called as:
            CitySDK.prototype.sdkInstance;
            //And references to this module should be called as
            CitySDK.prototype.modules.copa;
            //when 'this' is ambiguous
