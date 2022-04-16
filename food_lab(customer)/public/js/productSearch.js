/*
 * Create : Aung Min Khant(18/3/2022)
 * Update :
 * Explain of function : To search engine product
 * Prarameter : no
 * return :
 */

$(document).ready(function () {

    $('#form1').unbind().keyup(function(e){

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                    "content"
                ),
            },
        })
        console.log($('#form1').val());
        var searchName = {name : $('#form1').val()};

        $.ajax({
            type : "POST",
            url : "searchFood",
            data: searchName,
            dataType: "json",
            beforeSend: function(){
                    $('.icons').hide();
                    $('.loader').show();
            },  
            success: function(data){

                $('.loader').hide();
                $('.icons').show('slow');
                $('.searchEngine').empty();
                for( const list of data ){
                       
                      $('.searchEngine').append(`
                    <option value="${list.value}"><span class="hello">${list.name}</span> </option>` );
              
                    
                }
            },
            error: function(data){
                console.log(data);
            }
        
        });


    });


    document.getElementById('form1').addEventListener('input',function(e){

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                    "content"
                ),
            },
        })

        if(e.inputType == "insertReplacementText" || e.inputType == null) {
           
    
            var formdata = { name : e.target.value};
            console.log(formdata);

            $.ajax({
                type : "POST",
                url : "specificFood",
                data: formdata,
                dataType: "json",
                beforeSend: function(){
                    $('#byCategory').empty();
                    $("#byCategory").hide('slow');
                    $('.loading').show();
                    $('#form1').blur();
                },
                success: function(data){
                   
                    $('.loading').hide('slow');
                  $("#byCategory").empty();
                 
                  $('#byCategory').show('slow');
                    
                  if(data.length == 0){
                    $('#byCategory').append(`
                        <div class="d-flex justify-content-center align-items-center p-3"
                                <p >There is no food in this category. We will announce later.</p>
                        </div>
                    `);
                }
                  for (const list of data) {
                    let amount = numberWithCommas(list.amount);
                    if(customerId){
                     $('#byCategory').append(
                         `<div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">
                         <div class="image-container">
                         <img src="/storage/${list.path}" class=" images" alt="bestitem1" />
                         </div>
                         <p class="fs-3 pt-2">${ list.product_name }</p>
                         <p class="fs-5"><i class="fas fa-coins pe-2 coins"></i>${ list.coin } </br> <p> <i class="fa-solid fa-money-bill money text-success"></i> ${amount} MMK</p>
                         <a href="productDetail?id=${ list.link_id }"><button type="button" class="btn detailbtns"> More Details</button></a>
                         <button type="button" id="${list.link_id}" class="btn shopbtns shopcart" data-bs-toggle="modal" data-bs-target="#modal" > Shop Now</button>
                         </div>`)
                    }else{
                     $('#byCategory').append(
                         `<div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">
                         <div class="image-container">
                         <img src="/storage/${list.path}" class=" images" alt="bestitem1" />
                         </div>
                         <p class="fs-3 pt-2">${ list.product_name }</p>
                         <p class="fs-5"><i class="fas fa-coins pe-2 coins"></i>${ list.coin } </br> <p> <i class="fa-solid fa-money-bill money text-success"></i> ${amount} MMK</p>
                         <a href="productDetail?id=${ list.link_id }"><button type="button" class="btn detailbtns"> More Details</button></a>
                         <a href="/signin"><button type="button" class="btn shopbtns"> Shop Now</button></a> 
                         </div>`)
                    }
                  }

                  $('.shopcart').click(function(e) {

                    $.ajaxSetup({
                        headers: {
                            "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                    });
                    e.preventDefault();
                    let count = 1;
                    let formdata = { "pid": Number(e.target.id), "q": Number(count) };
            
                    $.ajax({
                        type: "POST",
                        url: "sessionCount",
                        data: { data: formdata },
                        dataType: "json",
                        success: function(data) {
                            console.log(data);
            
            
                        },
                        error: function(data) {
                            console.log(data);
                        }
                    });
            
                });
                },
                error: function(data){
                    console.log(data);
                }
            
            });
        }
    });


    $('.search').click(function(){

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                    "content"
                ),
            },
        })

        let formdata = {name : $('#form1').val(),
                category : $("#selectpicker1").val(),
                  taste : $("#selectpicker2").val(),   
                };
        console.log(formdata);
        $.ajax({
            type : "POST",
            url : "searchFoodName",
            data : formdata,
            dataType : 'json',
            beforeSend :function(){
                $('#byCategory').empty();
                $("#byCategory").hide('slow');
                $('.loading').show();
            },
            success :function(data){
                $('.loading').hide('slow');
                $("#byCategory").empty();
                 
                $('#byCategory').show('slow');
                  
                if(data.length == 0){
                    $('#byCategory').append(`
                        <div class="d-flex justify-content-center align-items-center p-3"
                                <p >There is no food in this category. We will announce later.</p>
                        </div>
                    `);
                }
                for (const list of data) {
                  let amount = numberWithCommas(list.amount);
                  if(customerId){
                   $('#byCategory').append(
                       `<div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">
                       <div class="image-container">
                       <img src="/storage/${list.path}" class=" images" alt="bestitem1" />
                       </div>
                       <p class="fs-3 pt-2">${ list.product_name }</p>
                       <p class="fs-5"><i class="fas fa-coins pe-2 coins"></i>${ list.coin } </br> <p> <i class="fa-solid fa-money-bill money text-success"></i> ${amount} MMK</p>
                       <a href="productDetail?id=${ list.link_id }"><button type="button" class="btn detailbtns"> More Details</button></a>
                       <button type="button" id="${list.link_id}" class="btn shopbtns shopcart" data-bs-toggle="modal" data-bs-target="#modal" > Shop Now</button>
                       </div>`)
                  }else{
                   $('#byCategory').append(
                       `<div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">
                       <div class="image-container">
                       <img src="/storage/${list.path}" class=" images" alt="bestitem1" />
                       </div>
                       <p class="fs-3 pt-2">${ list.product_name }</p>
                       <p class="fs-5"><i class="fas fa-coins pe-2 coins"></i>${ list.coin } </br> <p> <i class="fa-solid fa-money-bill money text-success"></i> ${amount} MMK</p>
                       <a href="productDetail?id=${ list.link_id }"><button type="button" class="btn detailbtns"> More Details</button></a>
                       <a href="/signin"><button type="button" class="btn shopbtns"> Shop Now</button></a> 
                       </div>`)
                  }
                }

                $('.shopcart').click(function(e) {

                  $.ajaxSetup({
                      headers: {
                          "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr(
                              "content"
                          ),
                      },
                  });
                  e.preventDefault();
                  let count = 1;
                  let formdata = { "pid": Number(e.target.id), "q": Number(count) };
          
                  $.ajax({
                      type: "POST",
                      url: "sessionCount",
                      data: { data: formdata },
                      dataType: "json",
                      success: function(data) {
                        //   console.log(data);
          
          
                      },
                      error: function(data) {
                        //   console.log(data);
                      }
                  });
          
              });
            },
            error : function(data){
                console.log(data);
            }
        });
    });
    
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

