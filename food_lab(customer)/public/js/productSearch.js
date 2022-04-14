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
              
            },
            success: function(data){
               
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
                  
                },
                success: function(data){
                   
                  console.log(data);
                },
                error: function(data){
                    console.log(data);
                }
            
            });
        }
    });
    
});

