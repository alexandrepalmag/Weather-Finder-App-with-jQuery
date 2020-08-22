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
                        <br>
                            <div class="alert alert-light" role="alert" id="loading" style="width: 96%;margin-left:2%">
                                <h5>Searching...</>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                                </div>
                            </div>
                `)

                },
                success: function (response) {

                    setTimeout(function () {

                        dataProcessing(response)

                    }, 1200);

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

                    }, 1200);
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
        console.log(wheatherDatas)
        /*Date
        =====================================
        */
        let date = new Date(wheatherDatas.dt * 1000)
        let localDate = date.toLocaleDateString()

        /*temperature
        =====================================
        */

        //Kelvin Temperature
        let kMin = wheatherDatas.main.temp_min
        let kMax = wheatherDatas.main.temp_max
        let kTemp = wheatherDatas.main.temp

        //Kelvin to Celsius
        let kelvinToCelsius = (k) => {return (k-273.15).toFixed(1)}

        let cMin = kelvinToCelsius(kMin)
        let cMax = kelvinToCelsius(kMax)
        let cTemp = kelvinToCelsius(kTemp)

        //Kelvin to Fahrenheit
        let kelvinToFahrenheit = (k) => {return (((k-273.15)*(9/5))+32).toFixed(1)}

        let fMin = kelvinToFahrenheit(kMin)
        let fMax = kelvinToFahrenheit(kMax)
        let fTemp = kelvinToFahrenheit(kTemp)

        //Mph to KM/h
        let speedWindKmH = (wheatherDatas.wind.speed*1.6093).toFixed(1)

        $('#res').html(`
        <hr>
        <div id="result">
            <span><h3>${wheatherDatas.name}</h3> <h4>Temperature now: ${kTemp} ºK ${fTemp} ºF ${cTemp} ºC </h4></span>
            
            <p>latitude: ${wheatherDatas.coord.lat}</p>
        
            <p>longitude: ${wheatherDatas.coord.lon}</p>

            date: ${localDate}

            <p>Min. temp: ${kMin} ºK ${fMin} ºF ${cMin} ºC</p>

            <p>Max. temp: ${kMax} ºK ${fMax} ºF ${cMax} ºC</p>

            Wind: ${speedWindKmH}Km/h

            Humidity: ${wheatherDatas.main.humidity}%

            Pressure: ${wheatherDatas.main.pressure}mmHg
        </div>
            
        `)

        $('#local').val('')

    }
})
