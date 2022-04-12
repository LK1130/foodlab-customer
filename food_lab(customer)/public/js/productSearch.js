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

        var searchName = {name : $('#form1').val()};
        $.ajax({
            type : "POST",
            url : "searchFood",
            data: searchName,
            dataType: "json",
            beforeSend: function(){
              
            },
            success: function(data){
                console.log(data);
                $('.searchEngine').empty();
                for( const list of data ){
                        console.log(list.value);
                      $('.searchEngine').append(`
                    <option value="${list.value}"><span class="hello">${list.name}</span> </option>` );
              
                    
                }
            },
            error: function(data){
                console.log(data);
            }
        
        });
    });
    
});