$(document).ready(function () {
    $('button').on('click', function () {
        
        let local = $('#local').val()
        let nowDate = new Date()
        let tempURL = 'https://query.yahooapis.com/v1/public/yql?format=json&rnd='+ nowDate.getFullYear()
         + nowDate.getMonth() + nowDate.getDay() + nowDate.getHours() + 
         '&diagnostics=true&callback=?&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+local+'") and u="c"'

        $.ajax({
            type: 'GET',
            url: encodeURI(tempURL),
            dataType: 'json',
            beforeSend:function(){
                $('#res').html('loading...')
            },
            success: function (data) {

                if(data !== null && data.query !== null && 
                    data.query.results !== null && 
                    data.query.results.channel.description !== 'YAHOO! Weather Error') {

                        let temp = data.query.results.channel.item.condition.temp

                        $('#res').html(temp+'º C')

                    }
            },
            error:function(){
                $('#res').html('Erro')
            }
        });

    })
})
