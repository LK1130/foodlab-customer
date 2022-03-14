/*
 * Create : zayar(03/02/2022)
 * Update :
 * Explain of function : To show customer name search
 * Prarameter : no
 * return :
 */
$(document).ready(function () {
    /*
     * Create : zayar(17/2/2022)
     * Update :
     * Explain of function : To toggle inform alert
     * Prarameter : no
     * return : toggle
     * */
    $(".dropdown-toggle").dropdown();
    document
        .getElementById("closeInform")
        .addEventListener("click", function () {
            $("#informAlert").removeClass("visible");
        });

    /*
     * Create : zayar(17/1/2022)
     * Update :
     * Explain of function : To toggle profile alert
     * Prarameter : no
     * return : toggle
     * */

    if (sessionHas) {
        console.log(sessionHas);

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                    "content"
                ),
            },
        });
        console.log(customerid);
        var formdata = { customerId: customerid };

        $.ajax({
            type: "GET",
            url: "searchcustomerdetails",
            data: formdata,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data["alertcount"] == 0) {
                    $("#alertCount").css("display", "none");
                } else $("#alertCount").text(data["alertcount"]);

                let newscount = data["limitednews"].length;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0");
                var yyyy = today.getFullYear();

                today = yyyy + "-" + mm + "-" + dd;
                console.log(today);
                if (newscount == 0) {
                    $(".forMessages").prepend(
                        `
                        <div class="news mb-3 nocursor d-flex flex-row justify-content-center align-items-center">
                            <p class="fs-5 fw-bolder ms-3 mt-2 me-auto">No new has left </p>
                        </div>
                        `
                    );
                } else {
                    let countNews = 0;
                    let more = ``;
                    for (const news of data["limitednews"]) {
                        countNews++;
                        if (countNews == 3)
                            more = `<a href="/customerNews" class=" ms-auto me-3"><button class="btn mb-2 alertButton ms-auto me-2 w-100">
                            More</button></a>`;

                        var oneD = 1000 * 60 * 60 * 24;

                        var sMS = new Date(news.newscreated);
                        var eMS = new Date(today);
                        var date = Math.round(
                            (eMS.getTime() - sMS.getTime()) / oneD
                        );

                        if (date < 3) {
                            $(".forNews").append(
                                `
                            <div class="news nocursor d-flex flex-row justify-content-center align-items-center mb-3">
                                    <img src="/storage/newsImage/${news.source}" class="my-3 ms-2 rounded" alt="">
                                    <div class=" d-flex flex-column  me-auto ms-3 text-truncate w-75">
                                    <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "  style="max-width: 80%; min-width:12vw;">${news.title}
                                        </p>
                                        <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "   style="max-width: 80%; min-width:12vw;">
                                        (${news.detail})</p>
                                        </div>
                                        <img src="img/new.png" alt="" class="newsLogo gleft" width="49px">
                                </div>
                                ${more}
                            `
                            );
                        } else {
                            $(".forNews").append(
                                `
                            <div class="news nocursor d-flex flex-row justify-content-center align-items-center mb-3">
                            
                                    <img src="/storage/newsImage/${news.source}" class="my-3 ms-2 rounded" alt="">
                                    <div class=" d-flex flex-column  me-auto ms-3 text-truncate w-75">
                                    <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "  style="max-width: 80%; min-width:12vw;">${news.title}
                                        </p>
                                        <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "   style="max-width: 80%; min-width:12vw;">
                                        (${news.detail})</p>
                                        </div>
                                        <img src="" alt="" class="newsLogo" >
                                </div>
                                ${more}
                            `
                            );
                        }
                    }
                }
                let messagecount = data["limitedmessages"].length;
                if (messagecount == 0) {
                    $(".forMessages").prepend(
                        `
                        <div class="news mb-3 d-flex flex-row justify-content-center align-items-center">
                            <p class="fs-5 fw-bolder mt-2 ms-3 me-auto">No message has left </p>
                        </div>
                        `
                    );
                } else {
                    let countMessage = 0;
                    let more = ``;
                    for (const messages of data["limitedmessages"]) {
                        countMessage++;
                        if (countMessage == 3)
                            more = `<a href="/messages" class=" ms-auto me-3"><button class="btn mb-2 alertButton ms-auto me-2 w-100">
                            More</button></a>`;

                        // $allcolor = ["yellow", "green", "yellow", "red"];
                        // $statusMessage = messages.decision_status;
                        $messagecolor = "";
                        if (messages.title == "APPROVED")
                            $messagecolor = "green";
                        if (messages.title == "REQUEST")
                            $messagecolor = "yellow";
                        if (messages.title == "WAITING")
                            $messagecolor = "yellow";
                        if (messages.title == "REJECT") $messagecolor = "gray";
                        if (messages.seen == 0) {
                            $(".forMessages").append(
                                `
        <div class="messages d-flex flex-row justify-content-center align-items-center mb-3" id="${messages.chargeid}">
        
                <p class="fs-6 fw-bolder me-auto w-50 ms-3 mt-3">${messages.detail}</p>
                <div class="d-flex flex-column me-4">
                    <p class="fs-5 fw-bolder  ms-auto mt-2 w-100 rounded ${$messagecolor} text-center">
                    ${messages.title}
                    </p>
                    <p class=" fw-bold  mb-1 ">${messages.messagecreated}</p>
                </div>
                <img src="img/new.png" alt="" class="newsLogo gleft" width="49px">
            </div>
            ${more}
        `
                            );
                        } else {
                            $(".forMessages").append(
                                `
                                <div class="messages d-flex flex-row justify-content-center align-items-center mb-3" id="${messages.chargeid}">
        
                                <p class="fs-6 fw-bolder me-auto w-50 ms-3 mt-3">${messages.detail}</p>
                                <div class="d-flex flex-column me-4">
                                    <p class="fs-5 fw-bolder  ms-auto mt-2 w-100 rounded ${$messagecolor} text-center">
                                    ${messages.title}
                                    </p>
                                    <p class=" fw-bold  mb-1 ">${messages.messagecreated}</p>
                                </div>
                                
                            </div>
            ${more}
        `
                            );
                        }
                    }
                    $(".messages").click(function () {
                        $id = $(this).attr("id");
                        window.location.replace("/messageDetail/" + $id);
                    });
                }

                let trackcount = data["limitedtracks"].length;
                if (trackcount == 0) {
                    $(".forTracks").prepend(
                        `
                        <div class="news mb-3 d-flex flex-row justify-content-center align-items-center">
                                <p class="fs-5 ms-3 fw-bolder mt-2 me-auto">No track has left </p>
                            </div>
                        `
                    );
                } else {
                    let countTrack = 0;
                    let more = ``;
                    for (const tracks of data["limitedtracks"]) {
                        countTrack++;
                        if (countTrack == 3)
                            more = `<a href="/tracks" class=" ms-auto me-3"><button class="btn mb-2 alertButton ms-auto me-2 w-100">
                            More</button></a>`;

                        $allcolor = [
                            "yellow",
                            "red",
                            "green",
                            "red",
                            "green",
                            "green",
                        ];
                        $statusMessage = tracks.order_status;
                        $messagecolor = $allcolor[$statusMessage - 1];
                        $names = tracks.title;
                        $name = $names.split(",");
                        $namesCount = $name.length - 1;
                        $howmuchtext = "";
                        $namesCount == 0
                            ? ($howmuchtext = "")
                            : ($namesCount = 1
                                  ? ($howmuchtext = `<span class="fw-bolder ">and ${$namesCount} other</span>`)
                                  : // "and " + $namesCount + " other"
                                    ($howmuchtext = `<span class="fw-bolder "> and ${$namesCount} others</span>`));
                        // "and " + $namesCount + " others")
                        for (const product of data["trackProduct"]) {
                            if ($name[0] == product.id) {
                                if (tracks.seen == 0) {
                                    $(".forTracks").append(
                                        `
                                        <div class="tracks d-flex flex-row justify-content-center align-items-center h-auto d-inline-block mb-3" id="${tracks.tid}">
                                        
                                        <div class="d-flex flex-column w-75 ms-1 ">
                                        <p class="fw-bolder "><span><p class="text-truncate fw-bolder  informText" >${product.product_name}</p>${$howmuchtext}
                                            
                                            
                                        <p class=" fw-bold mb-1 ms-2"><i class="coinCalInform fas fa-coins"></i> ${tracks.coin} </p>
                                        <p class=" fw-bold mb-1 ms-2">${tracks.amount} MMK</p>
                                        </div>
                                        <div class="d-flex flex-column me-3 w-100 mt-4">
                                            <p class="fs-5 fw-bolder rounded ${$messagecolor} text-center">
                                            ${tracks.status} </p>
                                            <p class=" fw-bold  mb-3 ">${tracks.trackscreated} </p>
                                        </div>
                                        <img src="img/new.png" alt="" class="newsLogo aleft" >
                                    </div>
                                    ${more}
                                        `
                                    );
                                } else {
                                    $(".forTracks").append(
                                        `
                                        <div class="tracks d-flex flex-row justify-content-center align-items-center h-auto d-inline-block mb-3" id="${tracks.tid}">
                                        
                                        <div class="d-flex flex-column w-100 ms-1 h-50">
                                        <div class="d-flex flex-row gap-1">
                                        <p class="text-truncate fw-bolder  informText" >${product.product_name}</p> ${$howmuchtext}
                                            </div>
                                            
                                        <p class=" fw-bold mb-1 ms-2"><i class="coinCalInform fas fa-coins"></i> ${tracks.coin} </p>
                                        <p class=" fw-bold mb-1 ms-2">${tracks.amount} MMK</p>
                                        </div>
                                        <div class="d-flex flex-column me-3 w-100 mt-4">
                                            <p class="fs-5 fw-bolder rounded ${$messagecolor} text-center">
                                            ${tracks.status} </p>
                                            <p class=" fw-bold  mb-3 ">${tracks.trackscreated} </p>
                                        </div>
                                        
                                    </div>
                                    ${more}
                                        `
                                    );
                                }
                            }
                        }
                    }
                    $(".tracks").click(function () {
                        $id = $(this).attr("id");
                        window.location.replace("/trackDetail/" + $id);
                    });
                }
            },
        });

        // document
        //     .getElementById("profileButton")
        //     .addEventListener("click", function () {
        //         $("#profileAlert").toggleClass("visible");
        //     });
        // document
        //     .getElementById("profileButton2")
        //     .addEventListener("click", function () {
        //         $("#profileAlert").toggleClass("visible");
        //     });
        // document.getElementById("back").addEventListener("click", function () {
        //     document.getElementById("profileAlert").style.display = "none";
        // });
        /*
         * Create : zayar(23/1/2022)
         * Update :
         * Explain of function : To toggle inform alert
         * Prarameter : no
         * return : toggle
         * */
        document
            .getElementById("informButton")
            .addEventListener("click", function () {
                $("#informAlert").toggleClass("visible");
            });

        /*
         * Create : zayar(23/1/2022)
         * Update :
         * Explain of function : for initial ifrom alert
         * Prarameter : no
         * return : toggle
         * */

        document.getElementById("forNews").removeAttribute("id");
        document.getElementById("clickNews").style.borderBottom =
            "1px solid black";

        /*
         * Create : zayar(23/1/2022)
         * Update :
         * Explain of function : To toggle inform alert headers
         * Prarameter : no
         * return : toggle
         * */

        document
            .getElementById("clickNews")
            .addEventListener("click", function () {
                document.getElementsByClassName("forMessages")[0].id =
                    "forMessages";
                document.getElementsByClassName("forTracks")[0].id =
                    "forTracks";
                document.getElementById("forNews").removeAttribute("id");
                // document.getElementsByClassName("informAlert")[0].style.height = "60vh";
                document.getElementById("clickMessages").style.borderBottom =
                    "";
                document.getElementById("clickNews").style.borderBottom =
                    "1px solid black";
                document.getElementById("clickTracks").style.borderBottom = "";
            });

        document
            .getElementById("clickMessages")
            .addEventListener("click", function () {
                document.getElementsByClassName("forNews")[0].id = "forNews";
                document.getElementsByClassName("forTracks")[0].id =
                    "forTracks";
                document.getElementById("forMessages").removeAttribute("id");

                document.getElementById("clickMessages").style.borderBottom =
                    "1px solid black";
                document.getElementById("clickNews").style.borderBottom = "";
                document.getElementById("clickTracks").style.borderBottom = "";
                // document.getElementsByClassName("informAlert")[0].style.height =
                //     "60vh";
            });

        document
            .getElementById("clickTracks")
            .addEventListener("click", function () {
                document.getElementsByClassName("forNews")[0].id = "forNews";
                document.getElementsByClassName("forMessages")[0].id =
                    "forMessages";
                document.getElementById("forTracks").removeAttribute("id");

                // document.getElementsByClassName("informAlert")[0].style.height =
                //     "70vh";
                document.getElementById("clickMessages").style.borderBottom =
                    "";
                document.getElementById("clickNews").style.borderBottom = "";
                document.getElementById("clickTracks").style.borderBottom =
                    "1px solid black";
            });
    } else {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                    "content"
                ),
            },
        });

        $.ajax({
            type: "GET",
            url: "getnews",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data["alertCount"] == 0) {
                    $("#alertCount").css("display", "none");
                } else $("#alertCount").text(data["alertCount"]);
                let newscount = data["limitednews"].length;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + "-" + mm + "-" + dd;
                console.log(today);
                if (newscount == 0) {
                    $(".forMessages").prepend(
                        `
                        <div class="news nocursor d-flex flex-row justify-content-center align-items-center">
                            <p class="fs-6 fw-bolder mt-2 me-auto">No new has left </p>
                        </div>
                        `
                    );
                } else {
                    let countNews = 0;
                    let more = ``;
                    for (const news of data["limitednews"]) {
                        var oneD = 1000 * 60 * 60 * 24;

                        var sMS = new Date(news.newscreated);
                        var eMS = new Date(today);
                        var date = Math.round(
                            (eMS.getTime() - sMS.getTime()) / oneD
                        );
                        countNews++;
                        if (countNews == 3)
                            more = `<a href="/customerNews" class=" ms-auto me-3"><button class="btn mb-2 alertButton ms-auto me-2 w-100">
                            More</button></a>`;
                        if (date < 3) {
                            $(".forNews").append(
                                `
                            <div class="news nocursor d-flex flex-row justify-content-center align-items-center mb-3">
                                    <img src="/storage/newsImage/${news.source}" class="my-3 ms-2 rounded" alt="">
                                    <div class=" d-flex flex-column  me-auto ms-3 text-truncate  w-75">
                                    <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "  style="max-width: 80%; min-width:12vw;">${news.title}
                                        </p>
                                        <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "   style="max-width: 80%; min-width:12vw;">
                                        (${news.detail})</p>
                                        </div>
                                        <img src="img/new.png" alt="" class="newsLogo gleft" width="49px">
                                </div>
                                ${more}
                            `
                            );
                        } else {
                            $(".forNews").append(
                                `
                            <div class="news nocursor d-flex flex-row justify-content-center align-items-center mb-3">
                                    <img src="/storage/newsImage/${news.source}" class="my-3 ms-2 rounded" alt="">
                                    <div class=" d-flex flex-column  me-auto ms-3  text-truncate w-75" >
                                    <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate "  style="max-width: 80%; min-width:12vw;">${news.title}
                                        </p>
                                        <p class="fs-5 fw-bolder mt-2 me-auto ms-3 text-truncate " style="max-width: 80%; min-width:12vw;"  >
                            (${news.detail})</p>
                                        </div>
                                        <img src="" alt="" class="newsLogo" >
                                </div>
                                ${more}
                            `
                            );
                        }
                    }
                }
            },
        });

        /*
         * Create : zayar(23/1/2022)
         * Update :
         * Explain of function : To toggle inform alert
         * Prarameter : no
         * return : toggle
         * */

        document
            .getElementById("informButton")
            .addEventListener("click", function () {
                $("#informAlert").toggleClass("visible");
            });

        /*
         * Create : zayar(23/1/2022)
         * Update :
         * Explain of function : for initial ifrom alert
         * Prarameter : no
         * return : toggle
         * */

        document.getElementById("forNews").removeAttribute("id");
        document.getElementById("clickNews").style.borderBottom =
            "1px solid black";

        /*
         * Create : zayar(23/1/2022)
         * Update :
         * Explain of function : To toggle inform alert headers
         * Prarameter : no
         * return : toggle
         * */

        document
            .getElementById("clickNews")
            .addEventListener("click", function () {
                document.getElementsByClassName("forMessages")[0].id =
                    "forMessages";
                document.getElementsByClassName("forTracks")[0].id =
                    "forTracks";
                document.getElementById("forNews").removeAttribute("id");
                // document.getElementsByClassName("informAlert")[0].style.height = "60vh";
                document.getElementById("clickMessages").style.borderBottom =
                    "";
                document.getElementById("clickNews").style.borderBottom =
                    "1px solid black";
                document.getElementById("clickTracks").style.borderBottom = "";
            });
    }
});
