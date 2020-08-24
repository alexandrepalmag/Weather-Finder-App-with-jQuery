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
                        <br><!-- loading animation -->
                            <div class="alert alert-light" role="alert" id="loading" style="width: 96%;margin-left:2%">
                                <h5>Searching...</h5>
                                <div class="spinner-grow text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-secondary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-success" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-danger" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-warning" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-dark" role="status">
                                    <span class="sr-only">Loading...</span>
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

    function dataProcessing(weatherDatas) {
        console.log(weatherDatas)
        /*Date
        =====================================
        */
        let date = new Date(weatherDatas.dt * 1000)
        let localDate = date.toLocaleDateString()

        /*temperature
        =====================================
        */

        //Kelvin Temperature
        let kMin = weatherDatas.main.temp_min
        let kMax = weatherDatas.main.temp_max
        let kTemp = weatherDatas.main.temp

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
        let speedWindKmH = (weatherDatas.wind.speed*1.6093).toFixed(1)

        $('#res').html(`
       
     
        <!-- start-->
        <div class="container" id="result" style="color:#FFFFFF;">
            <div class="row">
                <div class="col-sm">
                    <h2 style="color:rgba(0, 123, 255, 0.8);">
                        <i class="fas fa-city"></i>
                        ${weatherDatas.name}
                    </h2>
                    <h5><i class="far fa-calendar-alt"></i>
                        ${localDate}
                    </h5>
                </div>
                <div class="col-sm">
                    <h4 style="color:rgba(0, 123, 255, 0.8);>
                        <i class="fas fa-thermometer-half"></i>
                        Temperature now:<br>
                    </h4>
                    <h5>
                        ${kTemp} ºK | ${fTemp} ºF | ${cTemp} ºC
                    </h5>
                </div>
            </div>
            <hr style="background:rgba(101, 178, 180, 0.8);height: 0.005rem; border: none;">
            <div class="row">
                <div class="col-sm">
                    <h6>
                        <i class="fas fa-thermometer-quarter"></i>
                        Min. temp:<br>
                        ${kMin} | ºK ${fMin} | ºF ${cMin} ºC
                    </h6>
                </div>
                <div class="col-sm">
                    <h6>
                        <i class="fas fa-wind"></i>
                        Wind:<br>
                        ${speedWindKmH} Km/h
                    </h6>
                </div>
                <div class="col-sm">
                    <h6>
                        Latitude/Longitude:<br>
                        ${weatherDatas.coord.lat}º/${weatherDatas.coord.lon}º
                    </h6>
                </div>
            </div>
        
            <div class="row">
                <div class="col-sm">
                    <h6>
                        <i class="fas fa-temperature-high"></i>
                        Max. temp:<br>
                        ${kMax} | ºK ${fMax} | ºF ${cMax} ºC
                    </h6>
                </div>
                <div class="col-sm">
                    <h6>
                        <i class="fas fa-tint"></i>
                        Humidity:<br>
                        ${weatherDatas.main.humidity}%
                    </h6>
                </div>
                <div class="col-sm">
                    <h6>
                        Pressure:<br>
                        ${weatherDatas.main.pressure} mmHg
                    </h6>
                </div>
            </div>
        </div>
        <!-- end-->
        
        `)

            $('#local').val('')

    }
})
