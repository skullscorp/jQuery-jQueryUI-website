var NewsPagination = function () {
}

NewsPagination.prototype = function () {
    var newsDiv = $('#news-section'),
        loaderDiv = $('#news-loader'),
        paginationDiv = $('#pagination'),
        newsApiUrl = 'mocks/news-list.json.php',
        newsTemplate = 'templates/news-item.html',
        msgNoNews = 'Currently, there are no news.',
        apiVariable = 'stories',
        timeout = 25000,
        options = {
            itemsPerPage: 7
        },


        init = function () {

            loaderDiv.show();
            loadTemplateFromFile(newsTemplate)
                .done(function (newsTemplate) {
                    getApiContent()
                        .done(function (apiData) {
                            newsDiv.customPagination(newsTemplate, apiData[apiVariable], options);
                            paginationDiv.show();
                        })
                        .fail(function () {
                            newsDiv.text(msgNoNews).addClass('centered');
                        })
                        .always(function () {
                            loaderDiv.hide();
                        });
                });
        },

        getApiContent = function () {
            return $.ajax({
                url: newsApiUrl,
                dataType: 'json',
                timeout: timeout
            });
        },

        loadTemplateFromFile = function (path) {
            return $.ajax({
                url: path,
                async: false,
                dataType: 'text',
                cache: false
            });
        };

    return {
        init: init
    };


}();