
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        console.log(window.location.pathname)
        var nextUrl = $('#next-url').text().substr(1,$('#next-url').text().length);
        $.ajax({
            url:window.location.pathname + nextUrl,
            method:'GET',
            dataType: "html",
            crossDomain:true
            //success:function(data){alert('sdf')
            //    console.log(data)
            //    $('.row').append(data);
            //}
        })
        .success(function(data){
            console.log(data);
            $('#next-url').remove();
            $('#template').append(data)
        });
        return false
    }
});