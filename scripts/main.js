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
        <!-- start-->
        <div class="container" id="result" style="border: solid 5px #FFFFFF;">
            <div class="row">
                <div class="col-sm" style="background-color:#d6d627;">
                    <h1>
                        <i class="fas fa-city"></i>
                        ${wheatherDatas.name}
                    </h1>
                    <h5><i class="far fa-calendar-alt"></i>
                        ${localDate}
                    </h5>
                </div>
                <div class="col-sm" style="background-color:#325aa8;">
                    <h4>
                        <i class="fas fa-thermometer-half"></i>
                        Temperature now:<br> ${kTemp} ºK | ${fTemp} ºF | ${cTemp} ºC
                    </h4>
                </div>
            </div>
        
            <div class="row">
                <div class="col-sm" style="background-color:#0eab1b;">
                    <h6>
                        <i class="fas fa-thermometer-quarter"></i>
                        Min. temp:<br>
                        ${kMin} | ºK ${fMin} | ºF ${cMin} ºC
                    </h6>
                </div>
                <div class="col-sm" style="background-color:#d64b91;">
                    <h6>
                        <i class="fas fa-wind"></i>
                        Wind:<br>
                        ${speedWindKmH}Km/h
                    </h6>
                </div>
                <div class="col-sm" style="background-color:#1b965f;">
                    <h6>
                        Latitude/Longitude:<br>
                        ${wheatherDatas.coord.lat}º/${wheatherDatas.coord.lon}º
                    </h6>
                </div>
            </div>
        
            <div class="row">
                <div class="col-sm" style="background-color:#0eab1b;">
                    <h6>
                        <i class="fas fa-temperature-high"></i>
                        Max. temp:<br>
                        ${kMax} | ºK ${fMax} | ºF ${cMax} ºC
                    </h6>
                </div>
                <div class="col-sm" style="background-color:#d64b91;">
                    <h6>
                        <i class="fas fa-tint"></i>
                        Humidity:<br>
                        ${wheatherDatas.main.humidity}%
                    </h6>
                </div>
                <div class="col-sm" style="background-color:#1b965f;">
                    <h6>
                        Pressure:<br>
                        ${wheatherDatas.main.pressure}mmHg
                    </h6>
                </div>
            </div>
        </div>
        <!-- end-->
        
        `)

            $('#local').val('')

    }
})
