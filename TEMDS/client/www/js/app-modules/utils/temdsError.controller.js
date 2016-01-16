angular.module('temds.utils.controllers')

    .factory('$temdsError', ['$ionicPopup', function ($ionicPopup) {
        return {
            errorWithStatusCode: function(statusCode, detail) {
                var title = 'Error',
                    message = (detail? detail : 'Unable to handle request') + ':\n';

                if (statusCode) {
                    title += ' (' + statusCode + ')';

                    switch (parseInt(statusCode)) {
                        case 500:
                            message += 'Internal Server Error';

                    }
                }

                $ionicPopup.alert({
                    title: title,
                    template: message
                });
            }
        }
    }]);