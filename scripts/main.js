$(document).ready(function () {
    $('button').on('click', function () {
        
        let local = $('#local').val()
        let apiK = 'c784ca36b94410b176d76a3e5a0680ce'
       
        $.ajax({
            type: 'GET',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${apiK}`,
            dataType: 'json',
            beforeSend:function(){
                $('#res').html('loading...')
            },
            success: function (response) {
                console.log(response)
                $('#res').html(`${response.name}`)
                $('input').val('')
                
            },
            error:function(){
                $('#res').html('Erro')
            }
        });

    })
})
