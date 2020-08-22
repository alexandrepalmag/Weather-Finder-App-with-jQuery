$(document).ready(function () {

    $('button').on('click', function (e) {
        e.preventDefault()

        let local = $('#local').val()
        let apiK = 'c784ca36b94410b176d76a3e5a0680ce'

        if ($('#local').val() != '') { //check that the field is not empty

            $.ajax({ //ajax requisition
                type: 'GET',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${apiK}`,
                dataType: 'json',
                beforeSend: function () {

                    $('#res').html(`
                <div class="alert alert-light" role="alert" id="loading" style="width: 96%;margin-left:2%">
                    <h5>Searching...</>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 88%;"></div>
                    </div>
                </div>
                `)

                },
                success: function (response) {

                    setTimeout(function () {

                        dataProcessing(response)

                    }, 1500);

                },
                error: function () {

                    setTimeout(function () {

                        $('#loading').remove()

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! Make sure the city name is correct!',
                        })

                        $('#local').val('')

                    }, 1500);
                }
            });
        } else {
            Swal.fire({
                title: 'Enter the name of the city!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                confirmButtonColor: '#06455a7a'
            })

            $('#local').val('')

        }

    })

    function dataProcessing(wheatherDatas) {

        /*Date cover
        =====================================
        */
        console.log(wheatherDatas)
        let date = new Date(wheatherDatas.dt * 1000)
        let localDate = date.toLocaleDateString()

        /*temperature convert
        =====================================
        */

        //Kelvin to Celsius


        $('#res').html(`
            ${wheatherDatas.name}
            ${wheatherDatas.coord.lat}
            ${wheatherDatas.coord.lon}
            ${localDate}
            ${wheatherDatas.main.temp}
            ${wheatherDatas.main.temp_max}
            ${wheatherDatas.main.temp_min}
        `)


        $('#local').val('')
    }
})
